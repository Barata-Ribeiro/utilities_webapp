import type { NextConfig } from "next"

// const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
// const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? BASE_PATH ?? ""

const nextConfig: NextConfig = {
    // TODO: enable for static export later
    // output: "export",
    // distDir: "dist",
    // basePath: BASE_PATH ?? undefined,
    // assetPrefix: ASSET_PREFIX ?? undefined,
    reactStrictMode: true,
    trailingSlash: false,
    skipTrailingSlashRedirect: true,
    serverExternalPackages: ["postcss"],
    experimental: {
        reactCompiler: true,
        optimizePackageImports: [
            "tailwindcss",
            "@radix-ui/react-avatar",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-tooltip",
            "lucide-react",
        ],
    },
}

export default nextConfig
