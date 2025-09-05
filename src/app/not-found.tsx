import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "404 - Page not found",
    description: "We could not find the page you are looking for. It may have been moved or renamed.",
    manifest: "/manifest.webmanifest",
}

export default function NotFound() {
    return (
        <article
            aria-labelledby="notfound-title"
            aria-describedby="notfound-desc"
            tabIndex={-1}
            className="grid min-h-[calc(100vh-4rem)] place-items-center">
            <Card className="w-full max-w-2xl text-center">
                <CardContent>
                    <h1 id="notfound-title" aria-label="404, Page not found" className="text-center font-serif">
                        <span className="text-primary block text-sm font-semibold">404</span>
                        <span className="block text-4xl leading-tight tracking-widest sm:text-5xl">Page not found</span>
                    </h1>

                    <p id="notfound-desc" className="text-muted-foreground mt-2">
                        We could not find the page you are looking for. It may have been moved or renamed.
                    </p>
                </CardContent>

                <CardFooter className="flex-wrap justify-center gap-2">
                    <Button asChild>
                        <Link href="/" aria-label="Go to homepage">
                            Go to homepage
                        </Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link href="/about" aria-label="Learn about this project">
                            Learn about this project
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </article>
    )
}
