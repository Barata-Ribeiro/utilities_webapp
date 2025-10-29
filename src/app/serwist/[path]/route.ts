import { createSerwistRoute } from '@serwist/turbopack';
import path from 'node:path';

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute({
    globDirectory: path.join(process.cwd(), '.next/static'),
    globPatterns: ['**/*.{js,css,html,ico,apng,png,avif,jpg,jpeg,jfif,pjpeg,pjp,gif,svg,webp,json,webmanifest}'],
    injectionPoint: 'self.__SW_MANIFEST',
    manifestTransforms: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (manifestEntries: any[]) => {
            const manifest = manifestEntries.map((m) => {
                m.url = `/_next/static/${m.url}`;
                return m;
            });
            return { manifest, warnings: [] };
        },
    ],
    nextConfig: {},
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
    swSrc: path.join(process.cwd(), 'src/app/sw.ts'),
});
