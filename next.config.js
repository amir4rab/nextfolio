/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: process.env.NODE_ENV === 'production',
  output: process.env.DOCKER_BUILD === '1' ? 'standalone' : undefined
};

module.exports = nextConfig;
