import { useState } from "react";
import { Page, Grid } from "@geist-ui/react";
import dynamic from "next/dynamic";
import { ClapButton, BackgroundScoreChart, WelcomeModal, TotalClicksCount } from "@components";
import { useTrackClicks } from "@hooks";
import { useChartData } from "@hooks/useChartData";

// == Types ================================================================

// == Constants ============================================================

const ViewFilesButton = dynamic<Record<string, never>>(
  () => import("@components/Files/ViewFilesButton").then((module) => module.ViewFilesButton),
  {
    ssr: false,
  }
);

// == Functions ============================================================

// == Component ============================================================

export default function Home() {
  const [user, setUser] = useState<IUser>({ id: "", name: "" });
  const trackClicks = useTrackClicks();
  const [clickCount, setClickCount] = useState(0);
  const chartData = useChartData(user, clickCount);

  const incrementClickCount = () => {
    setClickCount((previousCount) => previousCount + 1);
    trackClicks.increment(user);
  };

  return (
    <Page
      height="100%"
      style={{
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        minHeight: "-webkit-fill-available",
      }}
      width="100%"
    >
      <Page.Header>
        <ViewFilesButton />
      </Page.Header>
      <Page.Content>
        <Grid.Container>
          <Grid.Container alignItems="center" direction="column" justify="center" width="100%">
            <ClapButton clickCount={clickCount} incrementClickCount={incrementClickCount} />
            <TotalClicksCount />
          </Grid.Container>
          <Grid
            style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: "100%", zIndex: 3 }}
          >
            <BackgroundScoreChart data={chartData} />
          </Grid>
        </Grid.Container>
        <WelcomeModal setUser={setUser} />
      </Page.Content>
    </Page>
  );
}

// == Styles ===============================================================
