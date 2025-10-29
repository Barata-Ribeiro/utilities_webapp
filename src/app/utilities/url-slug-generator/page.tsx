import UrlSlugGenerator from '@/components/utilities/url-slug-generator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'URL Slug Generator',
    description:
        'Create SEO-friendly URL slugs from your titles or phrases. Customize the format and style to suit your needs.',
    keywords: [
        'url slug',
        'slug generator',
        'seo-friendly',
        'url formatting',
        'utilities',
        'web development',
        'string manipulation',
    ],
    manifest: '/manifest.webmanifest',
};

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <h1 className="font-serif text-xl">URL Slug Generator</h1>

            <p className="mt-2 text-sm text-muted-foreground">
                Create SEO-friendly URL slugs from your titles or phrases. Customize the format and style to suit your
                needs.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>
                        <strong>Input</strong>: Enter a title or phrase that you want to convert into a URL slug.
                    </li>
                    <li>
                        <strong>Customization</strong>: Choose options for case (lowercase, uppercase), separator
                        (hyphen, underscore), and removal of special characters or numbers.
                    </li>
                    <li>
                        <strong>Generate</strong>: Click the generate button to create your SEO-friendly URL slug.
                    </li>
                    <li>
                        <strong>Copy</strong>: Easily copy the generated slug to your clipboard for use in your web
                        projects.
                    </li>
                </ul>
            </section>

            <div className="mt-4 w-full">
                <UrlSlugGenerator />
            </div>

            <footer className="mt-4 text-xs text-muted-foreground">
                Tip: Use the generated slugs to improve your website&#39;s SEO and make your URLs more user-friendly.
                This utility runs locally in your browser and does not transmit any data to a server.
            </footer>
        </article>
    );
}
