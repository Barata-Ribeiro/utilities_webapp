import { BookOpen, Github, Heart, Rocket, Wrench, Zap } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "About",
    description:
        "Utilities is an open-source collection of small, focused web tools — calculators, converters and handy utilities — built with Next.js and Tailwind CSS to be fast, accessible and easy to use.",
    keywords: ["utilities", "converters", "calculators", "next.js", "tailwindcss", "open source", "web tools"],
    authors: [{ name: "João Mendes Jorge Barata Ribeiro", url: "https://github.com/Barata-Ribeiro" }],
    openGraph: {
        title: "Utilities — Small web tools & converters",
        description:
            "A curated collection of simple, useful web-based calculators and converters built for quick tasks and demonstrations of Next.js + Tailwind.",
        url: "https://github.com/Barata-Ribeiro/utilities_webapp",
        siteName: "Utilities",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Utilities — Small web tools & converters",
        description:
            "A curated collection of simple, useful web-based calculators and converters built for quick tasks and demonstrations of Next.js + Tailwind.",
    },
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <header className="mb-4">
                <h1 className="flex items-center gap-2 font-serif text-2xl">
                    <BookOpen aria-hidden /> About Utilities
                </h1>
                <p className="text-muted-foreground mt-2 text-sm">
                    Utilities is an open-source collection of small, focused web tools — calculators, converters and
                    handy utilities — built for speed, accessibility and local-first privacy.
                </p>
            </header>

            <section className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                    <h2 className="font-medium">Project overview</h2>
                    <p className="text-muted-foreground text-sm">
                        This project groups short, useful web utilities into a single, fast interface. Each tool runs
                        client-side where possible so user data stays in the browser. The app is intentionally small and
                        composable so features can be reused across tools.
                    </p>

                    <div className="mt-2">
                        <h3 className="text-sm font-medium">Highlights</h3>
                        <ul className="text-muted-foreground mt-2 list-inside list-disc text-sm">
                            <li>Client-first utilities: most tools run entirely in the browser.</li>
                            <li>Accessible UI primitives (Radix, Tailwind, shadcn patterns).</li>
                            <li>Simple, composable components so new tools are quick to add.</li>
                        </ul>
                    </div>

                    <div className="mt-3">
                        <h3 className="text-sm font-medium">Quick links</h3>
                        <ul className="mt-2 flex flex-col gap-2 text-sm">
                            <li>
                                <Link href="/" className="text-primary underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Barata-Ribeiro/utilities_webapp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary inline-flex items-center gap-2 underline">
                                    Repository on GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Barata-Ribeiro/utilities_webapp/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline">
                                    Report an issue
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <aside className="space-y-3">
                    <h2 className="font-medium">At a glance</h2>
                    <dl className="text-muted-foreground grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <dt className="font-medium">Tools</dt>
                            <dd>~20+ (converters, calculators, utilities)</dd>
                        </div>
                        <div>
                            <dt className="font-medium">Local-first</dt>
                            <dd>Most features run in-browser</dd>
                        </div>

                        <div>
                            <dt className="font-medium">Framework</dt>
                            <dd>Next.js (app router)</dd>
                        </div>
                        <div>
                            <dt className="font-medium">Styling</dt>
                            <dd>Tailwind CSS + shadcn/ui</dd>
                        </div>
                    </dl>

                    <div className="mt-2">
                        <h3 className="text-sm font-medium">Status</h3>
                        <p className="text-muted-foreground text-sm">Actively maintained — contributions welcome.</p>
                    </div>
                </aside>
            </section>

            <section className="mt-6">
                <h2 className="font-medium">Features</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="bg-background rounded-md p-3">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                            <Zap size={14} aria-hidden /> Fast & small
                        </h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Tools are lightweight and optimized for quick tasks.
                        </p>
                    </div>

                    <div className="bg-background rounded-md p-3">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                            <Wrench size={14} aria-hidden /> Reusable components
                        </h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Components are designed to be composable and accessible.
                        </p>
                    </div>

                    <div className="bg-background rounded-md p-3">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                            <Rocket size={14} aria-hidden /> Local-first privacy
                        </h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Where possible, computations happen client-side only.
                        </p>
                    </div>

                    <div className="bg-background rounded-md p-3">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                            <Heart size={14} aria-hidden /> Open Source
                        </h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Released under GPL-3.0-only — contributions are encouraged.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-6">
                <h2 className="font-medium">Tech & architecture</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                    The app uses Next.js with the App Router, React 19, Tailwind CSS for styling, shadcn/ui for
                    accessible building blocks, and small client/server actions for optional functionality (examples in{" "}
                    <code className="bg-muted rounded px-1 py-0.5 text-xs">src/actions</code>).
                </p>

                <ul className="text-muted-foreground mt-2 list-inside list-disc text-sm">
                    <li>Client-first pages and components where appropriate.</li>
                    <li>Server actions used sparingly for things like IP lookups and jokes API caching.</li>
                    <li>
                        Organized routes under <code className="bg-muted rounded px-1 py-0.5 text-xs">src/app</code>.
                    </li>
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="font-medium">Contributing</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                    Contributions are welcome. If you would like to contribute, pick one of the small utilities or file
                    an issue to discuss bigger changes.
                </p>

                <ol className="text-muted-foreground mt-2 list-inside list-decimal text-sm">
                    <li>Fork the repository on GitHub.</li>
                    <li>Create a feature branch with a clear, small scope.</li>
                    <li>Open a pull request and reference the related issue (if any).</li>
                </ol>

                <div className="mt-3 text-sm">
                    <strong>Local development</strong>
                    <pre className="bg-muted mt-2 w-max overflow-auto rounded p-3 text-xs">
                        pnpm install && pnpm run dev
                    </pre>
                </div>
            </section>

            <section className="mt-6">
                <h2 className="font-medium">Roadmap</h2>
                <p className="text-muted-foreground mt-2 text-sm">Planned improvements include:</p>
                <ul className="text-muted-foreground mt-2 list-inside list-disc text-sm">
                    <li>More utilities and converters.</li>
                    <li>Improved offline/PWA behavior and tests.</li>
                    <li>Better examples and documentation for extending components.</li>
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="font-medium">Credits & license</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                    Built and maintained by João Mendes Jorge Barata Ribeiro. The project is released under the
                    GPL-3.0-only license. See the{" "}
                    <Link
                        href="https://github.com/Barata-Ribeiro/utilities_webapp/blob/main/LICENSE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline">
                        LICENSE
                    </Link>{" "}
                    file for details.
                </p>

                <p className="text-muted-foreground mt-2 text-sm">
                    Thanks to the open-source ecosystem (Next.js, Tailwind, shadcn/ui, etc.).
                </p>
            </section>

            <footer className="text-muted-foreground mt-6 text-sm">
                <div className="flex flex-wrap items-center gap-3">
                    <span>
                        Made with <Heart size={14} aria-hidden className="inline" /> by Barata Ribeiro
                    </span>
                    <Link
                        href="https://github.com/Barata-Ribeiro/utilities_webapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary inline-flex items-center gap-2 underline">
                        <Github size={14} aria-hidden /> View on GitHub
                    </Link>
                </div>
            </footer>
        </article>
    )
}
