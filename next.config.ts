import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  // 必须匹配你的 GitHub 仓库名称
  basePath: '/Finchip-Handoff-Workflow',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
