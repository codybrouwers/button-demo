import { memo } from "react";
import { Tree } from "@geist-ui/react";
import { ITheme } from "@hooks";
import { FileIcon } from "./FileIcon";

// == Types ================================================================

interface IProps {
  files: TFileTree;
  nestedLevel?: number;
  theme: ITheme;
}

// == Constants ============================================================

// == Functions ============================================================

// == Component ============================================================

export const FileTree = memo(({ files, nestedLevel = 1, theme }: IProps) => {
  return (
    <Tree style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      {files.map((file) => {
        if (file.files?.length) {
          return (
            <Tree.Folder
              extra={<FileIcon file={file} isLoading={false} theme={theme} />}
              key={file.id}
              name={file.name}
            >
              <FileTree files={file.files} nestedLevel={nestedLevel + 1} theme={theme} />
            </Tree.Folder>
          );
        }
        return (
          <Tree.File
            extra={<FileIcon file={file} isLoading={false} theme={theme} />}
            key={file.id}
            name={file.name}
          />
        );
      })}
      {nestedLevel === 1 && (
        <style global jsx>{`
          .tree span.icon {
            visibility: hidden;
          }
        `}</style>
      )}
    </Tree>
  );
});

// == Styles ===============================================================
