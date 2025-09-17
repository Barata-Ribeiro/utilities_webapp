import withSerwistInit from "@serwist/next"
import type { NextConfig } from "next"
import { execSync } from "node:child_process"

const revision = execSync("git rev-parse HEAD", { encoding: "utf8" }).trim().slice(0, 7)
const allowedDevOrigins = (process.env.ALLOWED_DEV_HOSTS ?? "").split(",").filter(Boolean)

const nextConfig: NextConfig = {
    reactStrictMode: true,
    trailingSlash: false,
    skipTrailingSlashRedirect: false,
    images: {
        qualities: [25, 50, 75, 100],
    },
    serverExternalPackages: ["postcss", "sharp"],
    experimental: {
        reactCompiler: true,
        optimizePackageImports: [
            "@radix-ui/react-avatar",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "clsx",
            "date-fns",
            "hash-wasm",
            "lucide-react",
            "mathjs",
            "qrcode",
            "tailwindcss",
        ],
    },
    turbopack: {
        resolveAlias: {
            underscore: "lodash",
        },
        resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    },
    allowedDevOrigins,
    headers: async () => {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "geolocation=(), microphone=(), camera=()",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=31536000; includeSubDomains; preload",
                    },
                ],
            },
            {
                source: "/manifest\\.(json|webmanifest)",
                headers: [
                    {
                        key: "cache-control",
                        value: "public, max-age=3600",
                    },
                ],
            },
        ]
    },
}

const withSerwist = withSerwistInit({
    cacheOnNavigation: true,
    reloadOnOnline: false,
    swSrc: "src/app/sw.ts",
    swDest: "public/sw.js",
    disable: process.env.NODE_ENV !== "production",
    additionalPrecacheEntries: [
        { url: "/", revision },
        { url: "/~offline", revision },
    ],
})

export default withSerwist(nextConfig)
