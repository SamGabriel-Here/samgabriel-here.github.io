import type { NextConfig } from "next";

const repo = "personal-site";
const onGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: onGitHubPages ? `/${repo}` : "",
  assetPrefix: onGitHubPages ? `/${repo}/` : "",
};

export default nextConfig;
