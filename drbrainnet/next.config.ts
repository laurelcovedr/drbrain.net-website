import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Metadata is local and fast. Emit it in the initial head for all user agents.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
