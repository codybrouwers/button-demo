import { ThemeUIStyleObject } from "theme-ui";
import { Interpolation } from "@emotion/react";

declare module "react" {
  interface DOMAttributes<T> {
    css?: Interpolation<any>;
  }
  interface Attributes {
    sx?: ThemeUIStyleObject;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: Interpolation<any>;
    }
  }
}
