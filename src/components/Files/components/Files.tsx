import { useState } from "react";
import { Card, Tabs, useMediaQuery } from "@geist-ui/react";
// import { X } from "@geist-ui/react-icons";
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
      {/* <X style={{ zIndex: 10 }} onClick={onClose} /> */}
    </div>
  );
}

function FileTab({ file }: { file: TFileTreeNode }) {
  return (
    <Tabs.Item
      key={file.id}
      label={
        <FileName
          name={file.name}
          // onClose={() => {
          //   closeFile(file);
          // }}
        />
      }
      value={file.id}
    >
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

  //   const closeFile = (file: TFileTreeNode) => {
  //     setOpenFiles((previousOpenFiles) => {
  //       const newFiles = new Set(previousOpenFiles);
  //       newFiles.delete(file);
  //       return newFiles;
  //     });
  //     setTimeout(() => {
  //       if (openFiles.size === 0) return;
  //
  //       const nextFile = Array.from(openFiles.values()).find(({ id }) => id !== file.id);
  //       if (nextFile?.id) setTab(nextFile.id);
  //     }, 15);
  //   };

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
              //               const c = useTabsContext();
              //
              //               return (
              //                 <Tabs.Item
              //                   key={file.id}
              //                   label={
              //                     <FileName
              //                       name={file.name}
              //                       onClose={() => {
              //                         c.unRegister(file.id);
              //                         closeFile(file);
              //                       }}
              //                     />
              //                   }
              //                   value={file.id}
              //                 >
              //                   <FileViewer file={file} />
              //                 </Tabs.Item>
              //               );
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
