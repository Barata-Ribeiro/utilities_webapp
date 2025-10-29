import HashingTab from '@/components/programming/hashing-tab';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Text Hashing Tool',
    description:
        'Generate hashes for your text using SHA (including SHA3 variants) and MD (MD4, MD5) algorithms. Choose the algorithm family and produce hashes locally in your browser.',
    keywords: [
        'text hashing',
        'hash generator',
        'SHA',
        'SHA3',
        'MD',
        'MD5',
        'MD4',
        'hash algorithms',
        'data integrity',
        'security',
        'online tool',
        'utilities',
        'programming',
    ],
    manifest: '/manifest.webmanifest',
};

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <h1 className="font-serif text-xl">Text Hashing Tool</h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Generate hashes for your text using algorithms from the SHA family (SHA-1, SHA-224, SHA-256, SHA-384,
                SHA-512, and SHA3 variants) or the MD family (MD4 and MD5). Select the algorithm group using the tabs
                and generate hashes locally in your browser — nothing is sent to a server.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>
                        <strong>Input Text</strong>: Enter the text you want to hash in the provided field.
                    </li>
                    <li>
                        <strong>Select Algorithm Family</strong>: Use the tabs to choose between the <em>SHA</em> family
                        (including SHA3 variants) and the <em>MD</em> family (MD4, MD5).
                    </li>
                    <li>
                        <strong>Generate Hash</strong>: Click the &quot;Hash&quot; button to compute the selected
                        algorithms for your text.
                    </li>
                    <li>
                        <strong>View & Copy</strong>: View the generated hash and copy it for your use.
                    </li>
                </ul>
            </section>

            <div className="my-8 flex flex-col items-center-safe gap-4 border-y py-8">
                <HashingTab />
            </div>

            <footer className="text-xs text-muted-foreground">
                Tip: Prefer modern SHA algorithms (e.g. SHA-256, SHA-512, or SHA3 variants) for security-sensitive uses.
                MD4 and MD5 are included for compatibility and non-cryptographic purposes only — they are considered
                broken for cryptographic security and should not be used to protect sensitive data.
            </footer>
        </article>
    );
}
