import ChuckNorrisJokesClient from '@/components/home/chuck-norris-jokes-client';
import SystemInfoClient from '@/components/home/system-info-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    manifest: '/manifest.webmanifest',
};

export default function Home() {
    return (
        <article className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <section className="flex flex-col gap-4 md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-serif text-2xl">Welcome to my Utilities Web App</CardTitle>
                        <CardDescription>Quick handy tools to speed up everyday tasks.</CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/utilities/character-counter">Char. Counter</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/utilities/password-generator">Pass. Generator</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/utilities/lorem-ipsum">Lorem Ipsum Generator</Link>
                        </Button>
                    </CardContent>
                    <CardFooter />
                </Card>

                {/* System info is a client component */}
                <SystemInfoClient />

                <Card>
                    <CardHeader>
                        <CardTitle className="font-serif text-lg">About</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            This app groups small utilities and converters in a single, fast interface. Use the sidebar
                            to navigate through available tools.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <aside className="flex flex-col gap-4">
                {/* Jokes is a client component */}
                <ChuckNorrisJokesClient />

                <Card>
                    <CardHeader>
                        <CardTitle className="font-serif text-lg">Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Button variant="link" asChild>
                                    <Link href="/about">About this project</Link>
                                </Button>
                            </li>
                            <li>
                                <Button variant="link" asChild>
                                    <Link
                                        href="https://github.com/Barata-Ribeiro/utilities_webapp/issues"
                                        target="_blank"
                                        rel="noopener noreferrer external"
                                    >
                                        Report an issue
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </aside>
        </article>
    );
}
