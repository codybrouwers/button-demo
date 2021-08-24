import { themes } from "@storybook/theming/create";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { setConsoleOptions, withConsole } from "@storybook/addon-console";
import { StoryWrapper } from "@storybook/addons";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

setConsoleOptions({
  panelExclude: [/\[bugsnag\]/, /enabledReleaseStages/],
});

const withConsoleDecorator: StoryWrapper = (StoryComponent, context) => {
  return withConsole()(StoryComponent)(context);
};

const geistDecorator: StoryWrapper = (StoryComponent, context) => {
  return (
    <GeistProvider themeType={context?.args?.theme ?? "dark"}>
      <CssBaseline />
      <StoryComponent {...context} />
    </GeistProvider>
  );
};

export const decorators = [withConsoleDecorator, geistDecorator];

export const parameters = {
  docs: {
    theme: themes.dark,
  },
  layout: "centered",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
