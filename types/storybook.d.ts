import { ReactElement } from "react";
import { Args as DefaultArgs, Annotations, BaseMeta, BaseStory } from "@storybook/addons";
import { Meta, Story } from "@storybook/react/types-6-0";

export {};
declare global {
  interface ICustomParameters {
    parameters?: { mocks?: Schema.TypeMocks };
  }

  export type TStoryMeta<TArgs = DefaultArgs> = Meta<TArgs extends Object ? TArgs : {}> & ICustomParameters;
  export type TStory<TArgs = DefaultArgs> = Story<TArgs extends Object ? TArgs : {}> & ICustomParameters;
}
