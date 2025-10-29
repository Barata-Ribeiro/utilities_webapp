import { MoveRightIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Programming',
    description: 'Programming related tools such as base64 encoding/decoding and text hashing.',
    keywords: ['programming', 'development', 'web development', 'coding', 'tools', 'utilities'],
    manifest: '/manifest.webmanifest',
};

const programmingTools = [
    {
        title: 'Base64 Text Encoder/Decoder',
        href: '/programming/base64-text-encode-decode',
        description: 'Encode or decode text to and from Base64 format easily in your browser.',
    },
    {
        title: 'Base64 to Image',
        href: '/programming/base64-to-image',
        description: 'Convert Base64 encoded strings into downloadable image files.',
    },
    {
        title: 'Image to Base64',
        href: '/programming/image-to-base64',
        description: 'Convert image files into Base64 encoded strings for easy embedding.',
    },
    {
        title: 'Text Hashing',
        href: '/programming/text-hashing',
        description: 'Generate cryptographic hashes (MD5, SHA-1, SHA-256, etc.) for any text input.',
    },
];

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <header>
                <h1 className="font-serif text-2xl">Programming</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    A collection of programming related tools to assist developers and coders with common tasks.
                </p>
            </header>

            <nav aria-label="Programming Tools menu" className="mt-6">
                <h2 className="sr-only">Available programming related tools</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {programmingTools.map((p, idx) => {
                        const descId = `prog-desc-${idx}`;

                        return (
                            <Link
                                key={p.href}
                                href={p.href}
                                aria-describedby={descId}
                                className="block overflow-hidden rounded-md bg-background p-4 transition-shadow duration-150 hover:shadow-md focus:ring-2 focus:ring-ring focus:outline-none"
                            >
                                <h3 className="text-lg font-medium">{p.title}</h3>
                                <p id={descId} className="mt-2 text-sm text-muted-foreground">
                                    {p.description}
                                </p>
                                <div className="mt-3 inline-flex items-center gap-x-2 text-xs text-primary">
                                    Open <MoveRightIcon aria-hidden size={16} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <footer className="mt-6 text-xs text-muted-foreground">
                Tip: All tools run locally in your browser and do not transmit your data to any server.
            </footer>
        </article>
    );
}
