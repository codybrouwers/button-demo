export {};
declare global {
  // Boolean value indicating if process.env.NODE_ENV is not equal to "production"
  const __DEV__: boolean;

  /** Fix this type, preferably before accepting the PR */
  type $FixMe = unknown;
  /** This `unknown` is intentional and never has to be fixed */
  type $IntentionalUnknown = unknown;
  /** This `any` is intentional and never has to be fixed */
  type $IntentionalAny = any;
  /** Typescript cannot express the proper type currently */
  type $Unexpressable = any;

  /** The values that can be stringified into JSON */
  type $JSONSerializable =
    | null
    | string
    | boolean
    | number
    | Array<$JSONSerializable>
    | Partial<{
        [key: string]: $JSONSerializable | undefined;
      }>;

  /** Return type from Object.entries.
   * Note: Must only be used for Exact types, otherwise is not type safe!
   * Explanations:
   * https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
   * */
  type TEntries<T> = [keyof T, T[keyof T]][];

  /**
   * Remove readonly attribute on a nested interface
   */
  type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

  /**
   * Unwrap promise value
   */
  type TAwaited<T> = T extends PromiseLike<infer U> ? U : T;

  // File Types

  /**
   * A node in the file tree with files as a record for easy search
   */
  interface IFileTreeMapNode {
    type: "directory" | "file";
    id: string;
    name: string;
    files: Record<string, IFileTreeMapNode> | null;
    icon: string | null;
    url: string;
    styles: { dark?: string; light?: string };
  }
  type TFileTreeMap = Record<string, IFileTreeMapNode>;

  /**
   * A node in the file tree with files as an array for easy consumption
   */
  type TFileTreeNode = {
    files: TTreeNode[] | null;
  } & Omit<IFileTreeMapNode, "files">;
  type TFileTree = TFileTreeNode[];

  interface IContentJSON {
    id: string;
    name: string;
    language: string;
    html: {
      dark: string;
      light: string;
    };
  }

  // User Types
  interface IUser {
    id: string;
    name: string;
  }
}
