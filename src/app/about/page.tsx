import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about this project and its purpose.",
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">About This Project</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Utilities is a small collection of helpful tools and converters built with Next.js and Tailwind.
            </p>
        </article>
    )
}
