import ChuckNorrisJokesClient from "@/components/home/chuck-norris-jokes-client"
import SystemInfoClient from "@/components/home/system-info-client"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    manifest: "/manifest.webmanifest",
}

export default function Home() {
    return (
        <article className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <section className="flex flex-col gap-4 md:col-span-2">
                <div className="bg-card rounded-md p-6 shadow">
                    <h1 className="font-serif text-2xl">Welcome to my Utilities Web App</h1>
                    <p className="text-muted-foreground mt-2 text-sm">Quick handy tools to speed up everyday tasks.</p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <Link href="/utilities/character-counter">
                            <Button variant="outline">Char. Counter</Button>
                        </Link>
                        <Link href="/utilities/password-generator">
                            <Button variant="outline">Pass. Generator</Button>
                        </Link>
                        <Link href="/utilities/roman-converter">
                            <Button variant="outline">Roman Converter</Button>
                        </Link>
                    </div>
                </div>

                {/* System info is a client component */}
                <SystemInfoClient />

                <div className="bg-card rounded-md p-6 shadow">
                    <h2 className="font-serif text-lg">About</h2>
                    <p className="text-muted-foreground mt-2 text-sm">
                        This app groups small utilities and converters in a single, fast interface. Use the sidebar to
                        navigate through available tools.
                    </p>
                </div>
            </section>

            <aside className="flex flex-col gap-4">
                {/* Jokes is a client component */}
                <ChuckNorrisJokesClient />

                <div className="bg-card rounded-md p-6 shadow">
                    <h2 className="font-serif text-lg">Quick Links</h2>
                    <ul className="mt-3 flex flex-col gap-2">
                        <li>
                            <Link href="/about">
                                <Button variant="link">About this project</Button>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://github.com/Barata-Ribeiro/utilities_webapp/issues"
                                target="_blank"
                                rel="noopener noreferrer external">
                                <Button variant="link">Report an issue</Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </article>
    )
}
