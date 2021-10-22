const bundleAnalyzerPlugin = require("@next/bundle-analyzer");
const { withPlugins } = require("next-compose-plugins");

// == Constants ============================================================

const bundleAnalyze = bundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === "true",
});

// == Exports ==============================================================

module.exports = withPlugins([bundleAnalyze], {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  // pageExtensions: ["page.tsx", "api.ts"],
  eslint: {
    dirs: ["src"],
  },
});
