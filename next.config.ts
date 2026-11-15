import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves only static files, so `next build` emits plain HTML/JS into `out/`.
  // This rules out server features (Server Actions, rewrites, default image loader).
  output: "export",
  // The site is served from https://<user>.github.io/resume2/, not the domain root.
  // Inlined at build time; next/link applies it, raw asset URLs must include it.
  basePath: "/resume2",
  // Stop `next dev` from generating AGENTS.md; agent instructions live in CLAUDE.md.
  agentRules: false,
};

export default nextConfig;
