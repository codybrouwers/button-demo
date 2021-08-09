import { useState } from "react";
import { Card, Tabs, useMediaQuery } from "@geist-ui/react";
import { useTheme } from "@hooks";
import filesList from "@public/files/list.json";
import { FileTree } from "./FileTree";

// == Types ================================================================

// == Constants ============================================================

// == Functions ============================================================

// == Component ============================================================

export function Files() {
  const downXS = useMediaQuery("xs", { match: "down" });
  const theme = useTheme();
  const [tab, setTab] = useState("files");

  return (
    <Card
      style={{
        ...styles.container,
        width: downXS ? "85%" : "auto",
      }}
    >
      <Tabs value={tab} onChange={setTab}>
        <Tabs.Item label="Files" value="files">
          <FileTree files={filesList as TFileTree} theme={theme} />
        </Tabs.Item>
      </Tabs>
    </Card>
  );
}

// == Styles ===============================================================

const styles = {
  container: {
    overflow: "scroll",
    height: "90vh",
  },
} as const;
