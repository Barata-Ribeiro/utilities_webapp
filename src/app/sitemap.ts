import { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';

const PAGE_FILE_NAMES = ['page.tsx', 'page.ts', 'page.jsx', 'page.js'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = 'https://utilities-webapp.vercel.app';
    const appDir = path.join(process.cwd(), 'src', 'app');

    async function collectRoutes(dir: string, rel = ''): Promise<MetadataRoute.Sitemap> {
        const entries: MetadataRoute.Sitemap = [];
        const children = await fs.promises.readdir(dir, { withFileTypes: true });

        for (const pageName of PAGE_FILE_NAMES) {
            const pagePath = path.join(dir, pageName);
            if (fs.existsSync(pagePath)) {
                const stat = await fs.promises.stat(pagePath);
                const lastModified = new Date(stat.mtime).toISOString().split('T')[0];

                const route = rel === '' ? '/' : `/${rel.replaceAll(/\\/g, '/')}`;

                const depth = rel === '' ? 0 : rel.split(path.sep).length;
                const priority = Math.max(0.5, 1 - depth * 0.15);

                const itemPlain: Record<string, unknown> = {
                    url: `${base}${route}`,
                    lastModified,
                    priority: Number(priority.toFixed(2)),
                };

                if (route === '/') {
                    itemPlain.changeFrequency = 'yearly';
                    itemPlain.priority = 1;
                }

                entries.push(itemPlain as unknown as MetadataRoute.Sitemap[number]);
                break;
            }
        }

        for (const child of children) {
            if (child.isDirectory()) {
                // skip internal-next files or special folders
                if (child.name.startsWith('_') || child.name === 'api' || child.name === 'components') continue;
                const childDir = path.join(dir, child.name);
                const childRel = rel === '' ? child.name : path.join(rel, child.name);
                const sub = await collectRoutes(childDir, childRel);
                entries.push(...sub);
            }
        }

        return entries;
    }

    const routes = await collectRoutes(appDir);

    routes.sort((a, b) => {
        if (a.url === `${base}/`) return -1;
        if (b.url === `${base}/`) return 1;
        return a.url.length - b.url.length;
    });

    return routes;
}
