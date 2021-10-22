// const bundleAnalyzerPlugin = require("@next/bundle-analyzer");
// const { withPlugins } = require("next-compose-plugins");

// == Constants ============================================================

// const bundleAnalyze = bundleAnalyzerPlugin({
//   enabled: process.env.ANALYZE === "true",
// });

// == Exports ==============================================================

module.exports = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  // pageExtensions: ["page.tsx", "api.ts"],
  eslint: {
    dirs: ["src"],
  },
};
