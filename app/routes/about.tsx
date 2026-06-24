import { BookOpen, Heart, Rocket, Wrench, Zap } from 'lucide-react';
import { memo } from 'react';
import { Link, NavLink } from 'react-router';

export default function About() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <header className="mb-4">
                <h1 className="flex items-center gap-2 font-serif text-2xl">
                    <BookOpen aria-hidden /> About Utilities
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Utilities is an open-source collection of small, focused web tools — calculators, converters and
                    handy utilities — built for speed, accessibility and local-first privacy.
                </p>
            </header>

            <section className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                    <h2 className="font-medium">Project overview</h2>
                    <p className="text-sm text-muted-foreground">
                        This project groups short, useful web utilities into a single, fast interface. Each tool runs
                        client-side where possible so user data stays in the browser. The app is intentionally small and
                        composable so features can be reused across tools.
                    </p>

                    <div className="mt-2">
                        <h3 className="text-sm font-medium">Highlights</h3>
                        <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                            <li>Client-first utilities: most tools run entirely in the browser.</li>
                            <li>Accessible UI primitives (Radix, Tailwind, shadcn patterns).</li>
                            <li>Simple, composable components so new tools are quick to add.</li>
                        </ul>
                    </div>

                    <div className="mt-3">
                        <h3 className="text-sm font-medium">Quick links</h3>
                        <ul className="mt-2 flex flex-col gap-2 text-sm">
                            <li>
                                <NavLink to="/" className="text-primary underline">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Barata-Ribeiro/utilities_webapp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-primary underline"
                                >
                                    Repository on GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Barata-Ribeiro/utilities_webapp/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline"
                                >
                                    Report an issue
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <aside className="space-y-3">
                    <h2 className="font-medium">At a glance</h2>
                    <dl className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
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
                            <dd>Vite + React Router (SSR)</dd>
                        </div>
                        <div>
                            <dt className="font-medium">Styling</dt>
                            <dd>Tailwind CSS + shadcn/ui</dd>
                        </div>
                    </dl>

                    <div className="mt-2">
                        <h3 className="text-sm font-medium">Status</h3>
                        <p className="text-sm text-muted-foreground">Actively maintained — contributions welcome.</p>
                    </div>
                </aside>
            </section>

            <section className="mt-6">
                <h2 className="font-medium">Features</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-md bg-background p-3">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                            <Zap size={14} aria-hidden /> Fast & small
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Tools are lightweight and optimized for quick tasks.
                        </p>
                    </div>

                    <div className="rounded-md bg-background p-3">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                            <Wrench size={14} aria-hidden /> Reusable components
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Components are designed to be composable and accessible.
                        </p>
                    </div>

                    <div className="rounded-md bg-background p-3">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                            <Rocket size={14} aria-hidden /> Local-first privacy
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Where possible, computations happen client-side only.
                        </p>
                    </div>

                    <div className="rounded-md bg-background p-3">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                            <Heart size={14} aria-hidden /> Open Source
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Released under GPL-3.0-only — contributions are encouraged.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-6">
                <h2 className="font-medium">Tech & architecture</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    The app uses Vite with the React Router, React 19, Tailwind CSS for styling, shadcn/ui for
                    accessible building blocks, and small client/server actions for optional functionality (examples in{' '}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">app/routes</code>).
                </p>

                <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                    <li>Client-first pages and components where appropriate.</li>
                    <li>Server actions used sparingly for things like setting up cookies and handling some logic.</li>
                    <li>
                        Organized routes under <code className="rounded bg-muted px-1 py-0.5 text-xs">app/routes</code>.
                    </li>
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="font-medium">Contributing</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Contributions are welcome. If you would like to contribute, pick one of the small utilities or file
                    an issue to discuss bigger changes.
                </p>

                <ol className="mt-2 list-inside list-decimal text-sm text-muted-foreground">
                    <li>Fork the repository on GitHub.</li>
                    <li>Create a feature branch with a clear, small scope.</li>
                    <li>Open a pull request and reference the related issue (if any).</li>
                </ol>

                <div className="mt-3 text-sm">
                    <strong>Local development</strong>
                    <pre className="mt-2 w-max overflow-auto rounded bg-muted p-3 text-xs">
                        pnpm install && pnpm run dev
                    </pre>
                </div>
            </section>

            <section className="mt-6">
                <h2 className="font-medium">Roadmap</h2>
                <p className="mt-2 text-sm text-muted-foreground">Planned improvements include:</p>
                <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                    <li>More utilities and converters.</li>
                    <li>Improved offline/PWA behavior and tests.</li>
                    <li>Better examples and documentation for extending components.</li>
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="font-medium">Credits & license</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Built and maintained by João Mendes Jorge Barata Ribeiro. The project is released under the
                    GPL-3.0-only license. See the{' '}
                    <Link
                        to="https://github.com/Barata-Ribeiro/utilities_webapp/blob/main/LICENSE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                    >
                        LICENSE
                    </Link>{' '}
                    file for details.
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                    Thanks to the open-source ecosystem (Vite.js, React, Tailwind, shadcn/ui, etc.).
                </p>
            </section>

            <footer className="mt-6 text-sm text-muted-foreground">
                <div className="flex flex-wrap items-center gap-3">
                    <span>
                        Made with <Heart size={14} aria-hidden className="inline" /> by Barata Ribeiro
                    </span>
                    <Link
                        to="https://github.com/Barata-Ribeiro/utilities_webapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary underline"
                    >
                        <GitHubIcon />
                        View on GitHub
                    </Link>
                </div>
            </footer>
        </article>
    );
}

const GitHubIcon = memo(() => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
));
