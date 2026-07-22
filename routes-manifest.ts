import { promises as fs } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Plugin } from 'vite';

export function routesManifest(): Plugin {
    return {
        name: 'routes-manifest',

        async closeBundle() {
            const file = pathToFileURL(path.resolve('app/routes.ts')).href;

            const { default: routes } = await import(file);

            const urls = extractRoutes(routes);

            await fs.writeFile(path.resolve('build/client/routes.json'), JSON.stringify(urls, null, 2));
        },
    };
}

function extractRoutes(routes: any[]): string[] {
    const urls = new Set<string>();

    function walk(items: any[]) {
        for (const item of items) {
            if (item?.path != null) urls.add(item.path);

            if (item?.index) urls.add('/');

            if (item?.children) walk(item.children);
        }
    }

    walk(routes);

    return [...urls];
}
