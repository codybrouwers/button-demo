import fs from "fs";
import { promisify } from "util";
import chalk from "chalk";
import fetch from "node-fetch";
import { getIconForFile, getIconForFolder } from "vscode-icons-js";

const writeFile = promisify(fs.writeFile);

// == Types ================================================================

interface IFile {
  path: string;
  /**
   * 100644 for file
   * 100755 for executable
   * 040000 for subdirectory
   * 160000 for submodule
   * 120000 for a blob that specifies the path of a symlink.
   */
  mode: "100644" | "100755" | "160000" | "120000";
  type: "blob";
  sha: string;
  size?: number;
  url: string;
}

interface IFolder {
  path: string;
  mode: "040000";
  type: "tree";
  sha: string;
  url: string;
}

type TGithubFilesList = (IFolder | IFile)[];

interface IGithubTreeResponse {
  sha: string;
  url: string;
  truncated: boolean;
  tree: TGithubFilesList;
}

// == Constants ============================================================

const GITHUB_TREE_URL = "https://api.github.com/repos/CodyBrouwers/button-demo/git/trees/master?recursive=1";
const FILES_LIST_PATH = "./public/files/list.json";
const FILE_ICONS_PATH = "./public/files/icons/";

const FILE_OVERRIDES: Record<string, Partial<TFileTreeNode>> = {
  ".vercelignore": {
    styles: {
      dark: `
        filter: invert(1);
        -webkit-filter: invert(1);
      `.trim(),
    },
  },
  "next.config.js": {
    styles: {
      dark: `
        filter: invert(1);
        -webkit-filter: invert(1);
      `.trim(),
    },
  },
  "favicon.ico": {
    icon: "/favicon.ico",
  },
} as const;
const EXCLUDED_FILES = ["yarn.lock"];

const iconsSet = new Set<string>();

// == Functions ============================================================

function getIconName(name: string, type: "blob" | "tree"): string | null {
  const iconName = type === "blob" ? getIconForFile(name) : getIconForFolder(name);
  if (!iconName) return null;
  iconsSet.add(iconName);
  return iconName;
}

async function fetchAndSaveIcons() {
  const fetchPromises = Array.from(iconsSet.values()).map(async (iconName) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/${iconName}`
    );
    return { iconName, blob: await response.blob() };
  });
  const responses = await Promise.all(fetchPromises);
  const writePromises = responses.map(async ({ iconName, blob }) => {
    try {
      const svgString = await blob.text();
      await writeFile(`${FILE_ICONS_PATH}${iconName}`, svgString);
    } catch (error) {
      console.error(error);
    }
  });
  await Promise.all(writePromises);
  console.log(chalk.green(`✅ Icons successfully written to public/files/icons folder`));
}

function parseFileTree(fileTree: TGithubFilesList) {
  const tree: TFileTreeMap = {};
  for (let index = 0; index < fileTree.length; index += 1) {
    const file = fileTree[index];
    const pathParts = file.path.split("/");
    const fileName = pathParts.pop();
    if (!fileName) continue; // eslint-disable-line no-continue

    if (pathParts.length) {
      let nestedFolder: IFileTreeMapNode | null = null;
      for (const part of pathParts) {
        const topLevelFolder = tree[part];
        if (!nestedFolder && topLevelFolder) {
          nestedFolder = topLevelFolder;
        } else if (!nestedFolder && !topLevelFolder) {
          tree[part] = {
            type: "directory",
            name: part,
            id: part,
            icon: getIconName(fileName, file.type),
            url: file.url,
            styles: {},
            files: {},
          };
          nestedFolder = tree[part];
        } else if (nestedFolder?.files?.[part]) {
          nestedFolder = nestedFolder?.files?.[part];
        }
      }
      if (nestedFolder?.files) {
        nestedFolder.files[fileName] = {
          type: file.type === "blob" ? "file" : "directory",
          name: fileName,
          id: file.sha,
          icon: getIconName(fileName, file.type),
          url: file.url,
          styles: {},
          files: file.type === "blob" ? null : {},
        };
      }
    } else if (!EXCLUDED_FILES.includes(file.path)) {
      tree[file.path] = {
        type: file.type === "blob" ? "file" : "directory",
        id: file.sha,
        name: fileName,
        icon: getIconName(fileName, file.type),
        url: file.url,
        styles: {},
        files: file.type === "blob" ? null : {},
      };
    }
  }

  const transformToFilesArray = (parsedFileTree: TFileTreeMap | null): TFileTree => {
    if (!parsedFileTree) return [];

    return Object.values(parsedFileTree)
      .map((fileOrFolder): TFileTreeNode => {
        const overrides = FILE_OVERRIDES[fileOrFolder.name];
        return {
          ...fileOrFolder,
          icon: overrides?.icon ?? fileOrFolder.icon,
          styles: overrides?.styles ?? fileOrFolder.styles,
          files: transformToFilesArray(fileOrFolder.files),
        };
      })
      .sort((file1, file2) => {
        if (file1.files?.length && file2.files?.length) {
          return file1.name > file2.name ? 1 : -1;
        }
        if (file1.files?.length) return -1;
        if (file2.files?.length) return 1;
        if (file1.name > file2.name) return 1;
        return 0;
      });
  };

  return transformToFilesArray(tree);
}

async function fetchGithubFileTree(): Promise<TGithubFilesList | null> {
  try {
    const response = await fetch(GITHUB_TREE_URL);
    const files = (await response.json()) as IGithubTreeResponse;
    return files.tree;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// == Exports ==============================================================

async function generateFileTree() {
  try {
    const githubFileTree = await fetchGithubFileTree();
    if (!githubFileTree) return;

    const files = parseFileTree(githubFileTree);
    await fetchAndSaveIcons();
    await writeFile(FILES_LIST_PATH, JSON.stringify(files));
    console.log(chalk.green("✅ Files list successfully saved!"));
  } catch (error) {
    console.error(error);
  }
}

void generateFileTree();
