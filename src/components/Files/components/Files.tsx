import { useState } from "react";
import { Card, Tabs, useMediaQuery } from "@geist-ui/react";
import { useTheme } from "@hooks";
import filesList from "@public/files/list.json";
import { FileTree } from "./FileTree";
import { FileViewer } from "./FileViewer";

// == Types ================================================================

// == Constants ============================================================

// == Functions ============================================================

function FileName({ name }: { name: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ textTransform: "none" }}>{name}</span>
    </div>
  );
}

function FileTab({ file }: { file: TFileTreeNode }) {
  return (
    <Tabs.Item key={file.id} label={<FileName name={file.name} />} value={file.id}>
      <div style={styles.filesContainer}>
        <FileViewer file={file} />
      </div>
    </Tabs.Item>
  );
}

// == Component ============================================================

export function Files() {
  const downXS = useMediaQuery("xs", { match: "down" });
  const theme = useTheme();
  const [tab, setTab] = useState<string | null>(null);
  const [openFiles, setOpenFiles] = useState<Set<TFileTreeNode>>(new Set());

  const openFile = (file: TFileTreeNode) => {
    setOpenFiles((previousOpenFiles) => {
      return new Set([...previousOpenFiles, file]);
    });
    setTab(file.id);
  };

  const hasOpenFiles = openFiles.size >= 1;
  const openFilesArray = Array.from(openFiles.values());
  console.log({ hasOpenFiles });
  return (
    <Card
      style={{
        ...styles.container,
        width: downXS ? "85%" : "auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Tabs initialValue="files" style={{ width: hasOpenFiles ? "10rem" : "100%" }}>
          <Tabs.Item label="Files" value="files">
            <div style={styles.filesContainer}>
              <FileTree files={filesList as TFileTree} openFile={openFile} theme={theme} />
            </div>
          </Tabs.Item>
        </Tabs>
        {hasOpenFiles && tab && (
          <Tabs value={tab} width="40rem" onChange={setTab}>
            {openFilesArray.map((file) => {
              return <FileTab file={file} key={file.id} />;
            })}
          </Tabs>
        )}
      </div>
    </Card>
  );
}

// == Styles ===============================================================

const styles = {
  container: {
    overflow: "hidden",
    height: "100%",
  },
  filesContainer: {
    overflow: "scroll",
    height: "70vh",
  },
} as const;
