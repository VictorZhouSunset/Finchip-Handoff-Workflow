/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  basePath: '/Finchip-Handoff-Workflow',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
