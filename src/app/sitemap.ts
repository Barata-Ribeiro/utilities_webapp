import { MetadataRoute } from 'next';

const ROUTES = [
    '/',
    '/about',
    '/calculators',
    '/calculators/bmi',
    '/calculators/dates',
    '/calculators/gcf-and-lcm',
    '/calculators/general',
    '/calculators/percentage',
    '/calculators/rule-of-three',
    '/converters',
    '/converters/bytes',
    '/converters/length',
    '/converters/mass',
    '/converters/speed',
    '/converters/temperature',
    '/converters/time',
    '/programming',
    '/programming/base64-text-encode-decode',
    '/programming/base64-to-image',
    '/programming/image-to-base64',
    '/programming/text-hashing',
    '/utilities',
    '/utilities/character-counter',
    '/utilities/lorem-ipsum',
    '/utilities/meme-generator',
    '/utilities/password-generator',
    '/utilities/qrcode-generator',
    '/utilities/roman-converter',
    '/utilities/text-to-speech',
    '/utilities/url-slug-generator',
] as const;

function createSitemapEntry(base: string, pathname: (typeof ROUTES)[number]): MetadataRoute.Sitemap[number] {
    const depth = pathname === '/' ? 0 : pathname.split('/').filter(Boolean).length;
    const priority = pathname === '/' ? 1 : Math.max(0.5, 1 - depth * 0.15);

    const entry: Record<string, unknown> = {
        url: `${base}${pathname}`,
        priority: Number(priority.toFixed(2)),
    };

    if (pathname === '/') entry.changeFrequency = 'yearly';

    return entry as MetadataRoute.Sitemap[number];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = 'https://utilities-webapp.vercel.app';

    return ROUTES.map((pathname) => createSitemapEntry(base, pathname));
}
