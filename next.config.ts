import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    reactStrictMode: true,
    serverExternalPackages: ["postcss", "sharp"],
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
                source: "/manifest.json",
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

export default nextConfig
