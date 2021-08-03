import { useState } from "react";
import { ClapButton, BackgroundScoreChart, WelcomeModal } from "components";
import { useTrackClicks } from "hooks";
import { useChartData } from "hooks/useChartData";

// == Types ================================================================

// == Constants ============================================================

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
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ClapButton clickCount={clickCount} incrementClickCount={incrementClickCount} />
      </div>
      {!!user.id && <BackgroundScoreChart data={chartData} />}
      <WelcomeModal setUser={setUser} />
    </>
  );
}

// == Styles ===============================================================
