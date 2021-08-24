import * as React from "react";
import { useArgs } from "@storybook/client-api";
import { Header } from "./Header";

// == Types ================================================================

type TProps = React.ComponentProps<typeof Header>;

// == Constants ============================================================

// == Default Meta =========================================================

const defaultMeta: TStoryMeta<TProps> = {
  title: "components/Header",
  component: Header,
  args: {
    theme: "dark",
  },
  argTypes: {
    theme: {
      options: ["dark", "light"],
      control: { type: "inline-radio" },
    },
  },
};
export default defaultMeta;

// == Stories ==============================================================

export const Default: TStory = ({ theme }) => {
  const [, updateArgs] = useArgs();
  const setTheme = () => updateArgs({ theme: theme === "dark" ? "light" : "dark" });
  return <Header setTheme={setTheme} theme={theme} />;
};
