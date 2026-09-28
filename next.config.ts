import type { NextConfig } from "next";

// This repo lives on a Windows drive mounted into WSL (/mnt/c/...), where
// file-change events don't reach the dev server — edits never hot-reload.
// Polling is the documented last resort (see the "Use Dev Drive or WSL 2"
// section of node_modules/next/dist/docs/01-app/02-guides/local-development.md),
// so it's only switched on when the project is actually on a mounted drive.
const onMountedWindowsDrive = process.cwd().startsWith("/mnt/");

const nextConfig: NextConfig = {
  ...(onMountedWindowsDrive ? { watchOptions: { pollIntervalMs: 1000 } } : {}),
};

export default nextConfig;
