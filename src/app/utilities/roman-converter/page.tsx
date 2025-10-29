import RomanConverter from '@/components/utilities/roman-converter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Roman Numeral Converter',
    description:
        'Convert between Roman numerals and Arabic numbers. Enter a number to see its Roman numeral equivalent, or enter a Roman numeral to see its numeric value.',
    keywords: [
        'roman numerals',
        'roman converter',
        'arabic to roman',
        'roman to arabic',
        'numeral conversion',
        'converter',
        'utilities',
    ],
    manifest: '/manifest.webmanifest',
};

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <h1 className="font-serif text-xl">Roman Numeral Converter</h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Convert between Roman numerals and Arabic numbers. Enter a number to see its Roman numeral equivalent,
                or enter a Roman numeral to see its numeric value.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>
                        <strong>Roman to Arabic</strong>: Enter a valid Roman numeral (e.g., &ldquo;XIV&rdquo;) to see
                        its numeric value (e.g., 14).
                    </li>
                    <li>
                        <strong>Arabic to Roman</strong>: Enter a number between 1 and 3999 (e.g., 2024) to see its
                        Roman numeral equivalent (e.g., &ldquo;MMXXIV&rdquo;).
                    </li>
                    <li>The converter handles both uppercase and lowercase Roman numerals.</li>
                </ul>
            </section>

            <div className="mt-4">
                <RomanConverter />
            </div>

            <footer className="mt-4 text-xs text-muted-foreground">
                Note: This utility runs locally in your browser and does not transmit any data to a server.
            </footer>
        </article>
    );
}
