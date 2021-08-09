import { memo } from "react";
import { Loading } from "@geist-ui/react";
import Image from "next/image";
import { ITheme } from "@hooks";

// == Types ================================================================

interface IProps {
  file: TFileTreeNode;
  theme: ITheme;
  isLoading: boolean;
}

// == Constants ============================================================

const iconsContext = require.context("@public/files/icons", false, /\.svg$/);
const iconList = iconsContext.keys().reduce<Record<string, string>>((icons, path) => {
  icons[path] = iconsContext(path).default as string;
  return icons;
}, {});

// == Functions ============================================================

// == Component ============================================================

export const FileIcon = memo(({ file, theme, isLoading }: IProps) => {
  const iconSource = file.icon ? iconList[`./${file.icon}`] ?? file.icon : null;
  if (!iconSource) return null;

  return (
    <>
      <div style={{ position: "absolute", left: -1, bottom: 0 }}>
        <Image alt={`${file.name} extension icon`} height={22} id={file.id} src={iconSource} width={22} />
        {theme.type in file.styles && (
          <style>
            {`[id="${file.id}"] { ${(file.styles as Record<typeof theme.type, string>)[theme.type]} }`}
          </style>
        )}
      </div>
      {!!isLoading && (
        <span style={{ position: "relative" }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Loading scale={1 / 4} style={{ position: "absolute", left: "0%" }} />
        </span>
      )}
    </>
  );
});

// == Styles ===============================================================
