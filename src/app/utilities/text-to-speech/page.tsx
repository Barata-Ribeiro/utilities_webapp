import TextToSpeech from '@/components/utilities/text-to-speech';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Text to Speech',
    description: 'Convert written text into natural-sounding speech with customizable voices and languages.',
    keywords: ['text-to-speech', 'speech synthesis', 'natural language processing'],
    manifest: '/manifest.webmanifest',
};

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <h1 className="font-serif text-xl">Text to Speech</h1>

            <p className="mt-2 text-sm text-muted-foreground">
                Convert written text into natural-sounding speech with customizable voices and languages.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>Input your text into the provided text area.</li>
                    <li>Select your preferred voice and language options.</li>
                    <li>Click the &ldquo;Convert&rdquo; button to generate speech from your text.</li>
                </ul>
            </section>

            <div className="mt-4 w-full">
                <TextToSpeech />
            </div>

            <footer className="mt-4 text-xs text-muted-foreground">
                Tip: The text to speech functionality relies on your browser&apos;s built-in speech synthesis
                capabilities. For the best experience, use a modern browser that supports the Web Speech API.
            </footer>
        </article>
    );
}
