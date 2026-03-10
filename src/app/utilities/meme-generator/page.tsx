import MemeGenerator from '@/components/utilities/meme-generator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Meme Generator',
    description:
        'Create your own memes with our easy-to-use Meme Generator. Customize text, fonts, and styles to make your memes stand out.',
    keywords: ['meme generator', 'create memes', 'custom memes', 'funny images', 'text on images', 'utilities'],
    manifest: '/manifest.webmanifest',
};

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <h1 className="font-serif text-xl">Meme Generator</h1>

            <p className="mt-2 text-sm text-muted-foreground">
                Create your own memes with our easy-to-use Meme Generator. Customize text, fonts, and styles to make
                your memes stand out.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>
                        <strong>Upload an Image</strong>: Start by uploading your own image.
                    </li>
                    <li>
                        <strong>Add Text</strong>: Customize the text on your meme with different fonts and styles.
                    </li>
                    <li>
                        <strong>Download</strong>: Once you&apos;re happy with your meme, download it to share with
                        friends.
                    </li>
                </ul>
            </section>

            <div className="mt-4 w-full">
                <MemeGenerator />
            </div>

            <footer className="mt-4 text-xs text-muted-foreground">
                Tip: Use the Meme Generator to create fun and personalized memes. This utility runs locally in your
                browser and does not transmit any data to a server.
            </footer>
        </article>
    );
}
