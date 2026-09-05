import { Meta } from '~/components/application/meta';
import DeadPixelCheck from '~/components/pages/utilities/dead-pixel-check';
import type { Metadata } from '~/types/metadata';

export const metadata: Metadata = {
    title: 'Dead-pixel Check',
    description: 'Inspect your screen for dead pixels with a full-screen test in five solid colors.',
    keywords: ['dead pixel check', 'screen test', 'LCD', 'subpixel defects'],
    manifest: '/manifest.webmanifest',
};

export default function Page() {
    return (
        <>
            <Meta {...metadata} />
            <article className="rounded-md bg-card p-6 shadow">
                <h1 className="font-serif text-xl">Dead-pixel Check</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Dead pixels are defective pixels on an LCD screen that do not work as expected. Defects can appear
                    as dark spots, bright spots, or partial subpixel defects. Inspect your screen using five solid
                    colors.
                </p>

                <section className="mt-4" aria-labelledby="dead-pixel-instructions">
                    <h2 id="dead-pixel-instructions" className="font-medium">
                        How it works
                    </h2>
                    <ol className="mt-2 flex list-decimal flex-col gap-2 pl-5 text-sm text-muted-foreground">
                        <li>Gently clean your screen with a soft cloth and click &ldquo;Start test&rdquo;.</li>
                        <li>Press F11 if your browser does not automatically enter full-screen mode.</li>
                        <li>Look for pixels that stay dark, stay bright, or show an unexpected color.</li>
                        <li>Left-click or press Space to cycle through white, black, red, green, and blue.</li>
                        <li>Press Esc to exit full-screen mode, stop the test, and return to this page.</li>
                    </ol>
                </section>

                <div className="mt-6">
                    <DeadPixelCheck />
                </div>
                <footer className="mt-4 text-xs text-muted-foreground">
                    Take your time inspecting each color. The test cycles only when you click or press Space.
                </footer>
            </article>
        </>
    );
}
