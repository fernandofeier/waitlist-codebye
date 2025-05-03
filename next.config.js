/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    webpackBuildWorker: true
  },
  devIndicators: {
    buildActivity: false
  }
};

module.exports = nextConfig;
