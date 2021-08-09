import { useLayoutEffect, useState } from "react";
import { Card, Button, Grid, Loading, useMediaQuery } from "@geist-ui/react";
import { Code } from "@geist-ui/react-icons";
import dynamic from "next/dynamic";
import { useToggle } from "@hooks";

// == Types ================================================================

// == Constants ============================================================

const Files = dynamic<Record<string, never>>(
  () => import("./components/Files").then((module) => module.Files),
  {
    loading: () => {
      return (
        <Card width="auto">
          <Card.Content>
            <Loading />
          </Card.Content>
        </Card>
      );
    },
  }
);

// == Functions ============================================================

// == Component ============================================================

export function ViewFilesButton() {
  const upSM = useMediaQuery("sm", { match: "up" });
  const [showIcon, setShowIcon] = useState(false);

  useLayoutEffect(() => {
    setShowIcon(upSM);
  }, [upSM]);
  const [showCode, toggleShowCode] = useToggle(false);

  return (
    <Grid margin={1} style={styles.container}>
      <Button
        auto
        icon={showIcon ? <Code /> : undefined}
        scale={1 / 2}
        style={{ minWidth: "auto" }}
        width="10%"
        onClick={() => {
          toggleShowCode();
        }}
      >
        {showCode ? "Hide" : "View the code"}
      </Button>
      {!!showCode && <Files />}
    </Grid>
  );
}

// == Styles ===============================================================

const styles = {
  container: {
    position: "fixed",
    left: 0,
    zIndex: 5,
  },
} as const;
