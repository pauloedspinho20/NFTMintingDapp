const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_PUBLIC_ANALYZE === 'true',
  distDir: 'build',
  trailingSlash: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [ 'ipfs.io', 'api.opensea.io', 'rinkebi.opensea.io' ],
  },
  target: 'serverless',
  /*  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  }, */
});

module.exports = withBundleAnalyzer({});
