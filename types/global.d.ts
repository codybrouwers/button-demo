export {};
declare global {
  // Boolean value indicating if process.env.NODE_ENV is not equal to "production"
  const __DEV__: boolean;

  /** Fix this type, preferably before accepting the PR */
  type $FixMe = unknown;
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

  interface IUser {
    id: string;
    name: string;
  }
}
