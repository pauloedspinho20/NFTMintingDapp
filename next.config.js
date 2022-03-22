const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_PUBLIC_ANALYZE === 'true',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [ 'ipfs.io' ],
  },
  target: 'serverless',
});

module.exports = withBundleAnalyzer({});
