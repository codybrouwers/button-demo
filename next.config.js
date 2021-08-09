const bundleAnalyzerPlugin = require("@next/bundle-analyzer");
const { withPlugins } = require("next-compose-plugins");
const execa = require("execa");

// == Constants ============================================================

const bundleAnalyze = bundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === "true",
});

// == Exports ==============================================================

module.exports = withPlugins([bundleAnalyze], {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts"],
  eslint: {
    dirs: ["src"],
  },
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      void execa.command("node -r esbuild-register ./bin/generateFileTree.ts", { shell: true });
    }
    return config;
  },
});
