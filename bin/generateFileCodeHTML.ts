import fs from "fs";
import { promisify } from "util";
import chalk from "chalk";
import fetch from "node-fetch";
import shiki, { Lang, BUNDLED_LANGUAGES } from "shiki";

const writeFile = promisify(fs.writeFile);

// == Types ================================================================

interface IFile {
  id: string;
  name: string;
  url: string;
}

interface IGithubFileResponse {
  sha: string;
  node_id: string;
  size: number;
  url: string;
  content: string;
  encoding: "base64";
}

// == Constants ============================================================

const FILES_FOLDER = "./public/files/content";
const DARK_THEME = "github-dark";
const LIGHT_THEME = "github-light";
const cachedHighlighters: Map<Lang | "plaintext", shiki.Highlighter> = new Map();
const SUPPORTED_LANGUAGES = new Set(getSupportedLanguages());

// == Functions ============================================================

function getSupportedLanguages() {
  const languages = new Set();
  for (const { embeddedLangs, aliases } of BUNDLED_LANGUAGES) {
    embeddedLangs?.forEach((lang) => languages.add(lang));
    aliases?.forEach((lang) => languages.add(lang));
  }
  return languages;
}

function getFileLanguage(name: string): Lang | "plaintext" {
  const matches = /\.([^.]*?)$/.exec(name);
  if (!matches) return "plaintext";
  const language = matches[1];
  if (SUPPORTED_LANGUAGES.has(language)) return language as Lang;

  return "plaintext";
}

async function getHighlighter(language: Lang | "plaintext") {
  if (language && cachedHighlighters.has(language)) return cachedHighlighters.get(language);

  const highlighter = await shiki.getHighlighter({
    themes: [DARK_THEME, LIGHT_THEME],
    langs: language === "plaintext" ? ["html"] : [language],
  });
  cachedHighlighters.set(language, highlighter);
  return highlighter;
}

async function generateCodeHTML({ name }: IFile, { content, encoding }: IGithubFileResponse) {
  const codeBuffer = Buffer.from(content, encoding);
  const codeString = codeBuffer.toString();
  const language = getFileLanguage(name);
  const highlighter = await getHighlighter(language);
  if (!highlighter) return null;

  const htmlDarkTheme = highlighter.codeToHtml(codeString, language, DARK_THEME);
  const htmlLightTheme = highlighter.codeToHtml(codeString, language, LIGHT_THEME);
  return {
    language,
    html: {
      dark: Buffer.from(htmlDarkTheme).toString("base64"),
      light: Buffer.from(htmlLightTheme).toString("base64"),
    },
  };
}

async function fetchGithubFileContent(file: IFile): Promise<IGithubFileResponse | null> {
  try {
    const { GITHUB_ACCESS_TOKEN } = process.env;
    if (!GITHUB_ACCESS_TOKEN) throw new Error("Missing GITHUB_ACCESS_TOKEN ENV");

    const response = await fetch(file.url, {
      headers: { Authorization: `token ${GITHUB_ACCESS_TOKEN}` },
    });
    const githubFile = (await response.json()) as IGithubFileResponse;
    return githubFile;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// == Exports ==============================================================

export async function generateFileCodeHTML(file: IFile): Promise<boolean> {
  try {
    const githubFile = await fetchGithubFileContent(file);
    if (!githubFile) return false;

    const fileContent = await generateCodeHTML(file, githubFile);
    if (!fileContent) return false;

    const content: IContentJSON = {
      id: file.id,
      name: file.name,
      ...fileContent,
    };
    await writeFile(`${FILES_FOLDER}/${file.id}.json`, JSON.stringify(content));
    console.log(chalk.green(`✅ ${file.name} successfully saved!`));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
