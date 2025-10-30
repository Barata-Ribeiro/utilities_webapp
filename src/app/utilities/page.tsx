import { MoveRightIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Utilities',
    description: 'A collection of useful web utilities to simplify your tasks.',
    keywords: ['utilities', 'web tools', 'productivity', 'online tools', 'web utilities'],
    manifest: '/manifest.webmanifest',
};

const utilities = [
    {
        title: 'Password & PIN Generator',
        href: '/utilities/password-generator',
        description:
            'Generate secure passwords, memorable passphrases, or numeric PINs locally in your browser with customizable options.',
    },
    {
        title: 'QR Code Generator',
        href: '/utilities/qrcode-generator',
        description: 'Create and download QR codes for URLs and short text snippets.',
    },
    {
        title: 'Roman Numeral Converter',
        href: '/utilities/roman-converter',
        description: 'Convert between Roman numerals and Arabic numbers (1–3999).',
    },
    {
        title: 'URL Slug Generator',
        href: '/utilities/url-slug-generator',
        description: 'Turn titles or phrases into SEO-friendly URL slugs with formatting options.',
    },
    {
        title: 'Lorem Ipsum',
        href: '/utilities/lorem-ipsum',
        description: 'Generate placeholder text (Lorem Ipsum) with adjustable length and structure.',
    },
    {
        title: 'Character Counter',
        href: '/utilities/character-counter',
        description: 'Count characters, words, and lines for any text input quickly.',
    },
    {
        title: 'Text to Speech',
        href: '/utilities/text-to-speech',
        description: 'Convert written text into natural-sounding speech with customizable voices and languages.',
    },
];

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <header>
                <h1 className="font-serif text-2xl">Utilities</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    A curated set of small, helpful web utilities — everything runs locally in your browser and is
                    designed for quick, focused tasks. Choose a utility to get started.
                </p>
            </header>

            <nav aria-label="Utilities menu" className="mt-6">
                <h2 className="sr-only">Available utilities</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {utilities.map((u, idx) => {
                        const descId = `util-desc-${idx}`;
                        return (
                            <Link
                                key={u.href}
                                href={u.href}
                                aria-describedby={descId}
                                className="block overflow-hidden rounded-md bg-background p-4 transition-shadow duration-150 hover:shadow-md focus:ring-2 focus:ring-ring focus:outline-none"
                            >
                                <h3 className="text-lg font-medium">{u.title}</h3>
                                <p id={descId} className="mt-2 text-sm text-muted-foreground">
                                    {u.description}
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
                Tip: All utilities run locally in your browser and do not transmit your data to any server.
            </footer>
        </article>
    );
}
