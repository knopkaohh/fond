import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const exporting = basePath.length > 0;

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  ...(exporting
    ? {
        basePath,
        output: "export" as const,
        trailingSlash: true,
        distDir: ".next-export",
      }
    : {}),
};

export default nextConfig;
