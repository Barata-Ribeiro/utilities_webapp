import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Utilities Webapp',
        short_name: 'Utilities',
        description: 'A Progressive Web App built with Next.js - Utilities Webapp',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: 'oklch(0.9851 0 0)',
        theme_color: 'oklch(0.6229 0.2012 35.9323)',
        icons: [
            {
                src: '/icon',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/apple-icon',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icon',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/apple-icon',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/apple-icon',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        orientation: 'portrait',
    };
}
