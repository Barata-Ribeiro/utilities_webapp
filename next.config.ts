import type { NextConfig } from 'next';

const allowedDevOrigins = (process.env.ALLOWED_DEV_HOSTS ?? '').split(',').filter(Boolean);

const nextConfig: NextConfig = {
    reactStrictMode: true,
    trailingSlash: false,
    skipTrailingSlashRedirect: false,
    images: {
        qualities: [25, 50, 75, 100],
    },
    serverExternalPackages: ['postcss', 'sharp', 'esbuild-wasm'],
    reactCompiler: true,
    experimental: {
        optimizePackageImports: [
            'radix-ui',
            'clsx',
            'date-fns',
            'hash-wasm',
            'lucide-react',
            'mathjs',
            'qrcode',
            'tailwindcss',
        ],
    },
    turbopack: {
        resolveAlias: {
            underscore: 'lodash',
        },
        resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    },
    allowedDevOrigins,
    headers: async () => {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'geolocation=(), microphone=(), camera=()',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                ],
            },
            {
                source: String.raw`/manifest\.(json|webmanifest)`,
                headers: [
                    {
                        key: 'cache-control',
                        value: 'public, max-age=3600',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
