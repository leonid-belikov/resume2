import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stop `next dev` from generating AGENTS.md; agent instructions live in CLAUDE.md.
  agentRules: false,
};

export default nextConfig;
