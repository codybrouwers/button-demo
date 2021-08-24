import * as React from "react";
import { ClapButton } from "./ClapButton";

// == Types ================================================================

type TProps = React.ComponentProps<typeof ClapButton>;

// == Constants ============================================================

// == Default Meta =========================================================

const defaultMeta: TStoryMeta<TProps> = {
  title: "components/ClapButton",
  component: ClapButton,
  args: {
    clickCount: 5,
  },
};
export default defaultMeta;

// == Stories ==============================================================

export const Default: TStory = ({ clickCount }) => {
  return <ClapButton clickCount={clickCount} incrementClickCount={() => null} />;
};
