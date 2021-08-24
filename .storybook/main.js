const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { prettier } = require("../package.json");

// Interesting addons to explore:
// https://github.com/atlassian-labs/storybook-addon-performance
// https://github.com/storybookjs/storybook/tree/master/addons/jest
// https://github.com/chromaui/storybook-addon-pseudo-states

// == Constants ============================================================

// == Functions ============================================================

// == Exports ==============================================================

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-queryparams",
    "storybook-addon-next-router",
    {
      name: "@storybook/addon-storysource",
      options: {
        parser: "typescript",
        loaderOptions: {
          prettierConfig: prettier,
        },
      },
    },
  ],
  typescript: {
    check: false,
    reactDocgen: "none",
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss|.sass$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../src"),
    });

    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ];
    return config;
  },
};
