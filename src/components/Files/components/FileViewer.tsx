import { useEffect, useState } from "react";

// == Types ================================================================

// == Constants ============================================================

const FILES_FOLDER = "/files/content";

// == Functions ============================================================

// == Component ============================================================

export function FileViewer({ file }: { file: TFileTreeNode }) {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    const getCode = async () => {
      const response = await fetch(`${FILES_FOLDER}/${file.id}.json`);
      const json = (await response.json()) as IContentJSON;
      const html = Buffer.from(json.html.dark, "base64").toString();
      setCode(html);
    };
    void getCode();
  }, [file.id]);
  // eslint-disable-next-line react/no-danger
  if (code) return <div dangerouslySetInnerHTML={{ __html: code }} />;
  return <span>Loading</span>;
}

// == Styles ===============================================================
