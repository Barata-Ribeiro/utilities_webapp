import HashingTab from "@/components/programming/hashing-tab"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Text Hashing Tool",
    description:
        "Generate secure hashes for your text using various algorithms like SHA-1, SHA-256, and more. Ideal for data integrity and security.",
    keywords: [
        "text hashing",
        "hash generator",
        "SHA",
        "MD",
        "hash algorithms",
        "data integrity",
        "security",
        "online tool",
        "utilities",
        "programming",
    ],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Text Hashing Tool</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Generate secure hashes for your text using various algorithms like SHA-1, SHA-256, and more. Ideal for
                data integrity and security.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Input Text</strong>: Enter the text you want to hash in the provided field.
                    </li>
                    <li>
                        <strong>Select Algorithm</strong>: Choose from available hashing algorithms.
                    </li>
                    <li>
                        <strong>Generate Hash</strong>: Click the &rsquo;Hash&lsquo; button to generate the hash.
                    </li>
                    <li>
                        <strong>View & Copy</strong>: View the generated hash and copy it for your use.
                    </li>
                </ul>
            </section>

            <div className="my-8 flex flex-col items-center-safe gap-4 border-y py-8">
                <HashingTab />
            </div>

            <footer className="text-muted-foreground text-xs">
                Tip: Use strong hashing algorithms like SHA-256 or SHA-512 for better security. This tool runs locally
                in your browser and does not transmit your data to any server.
            </footer>
        </article>
    )
}
