import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/resume2",
  // Stop `next dev` from generating AGENTS.md; agent instructions live in CLAUDE.md.
  agentRules: false,
};

export default nextConfig;
