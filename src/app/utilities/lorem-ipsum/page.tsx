import LoremIpsumGenerator from '@/components/utilities/lorem-ipsum-generator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lorem Ipsum Generator',
    description:
        'Generate placeholder text for your designs and layouts. Customize the number of paragraphs, words, or sentences to fit your needs.',
    keywords: ['lorem ipsum', 'placeholder text', 'dummy text', 'text generator', 'design', 'layout', 'utilities'],
    manifest: '/manifest.webmanifest',
};

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <h1 className="font-serif text-xl">Lorem Ipsum Generator</h1>

            <p className="mt-2 text-sm text-muted-foreground">
                Generate placeholder text for your designs and layouts. Customize the number of paragraphs, words, or
                sentences to fit your needs.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>
                        <strong>Paragraphs</strong>: Generate multiple paragraphs of placeholder text.
                    </li>
                    <li>
                        <strong>Sentences</strong>: Create a set number of sentences for your layout.
                    </li>
                    <li>
                        <strong>Words</strong>: Specify the number of words to generate.
                    </li>
                    <li>
                        <strong>Bytes</strong>: Generate text based on a specific byte size.
                    </li>
                    <li>
                        <strong>Lists</strong>: Create lists of items for your layout.
                    </li>
                </ul>
            </section>

            <div className="mt-4 w-full">
                <LoremIpsumGenerator />
            </div>

            <footer className="mt-4 text-xs text-muted-foreground">
                Tip: Use the generated text to fill in your designs and layouts. This utility runs locally in your
                browser and does not transmit any data to a server.
            </footer>
        </article>
    );
}
