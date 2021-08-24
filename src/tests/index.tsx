/* eslint-disable react/function-component-definition */
import React, { FC, ReactElement } from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { render as originalRender, RenderOptions } from "@testing-library/react";

// == Types ================================================================

// == Constants ============================================================

const Providers: FC = ({ children }) => {
  return (
    <GeistProvider themeType="light">
      <CssBaseline />
      {children}
    </GeistProvider>
  );
};

// == Exports ==============================================================

export const render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  originalRender(ui, { wrapper: Providers, ...options });
export * from "@testing-library/react";
