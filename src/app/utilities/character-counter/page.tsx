import type { Metadata } from "next"
import CharCounter from "@/components/utilities/char-counter"

export const metadata: Metadata = {
    title: "Character Counter",
    description:
        "A simple, accessible character counter utility. Counts characters, words, and lines for any pasted or typed text.",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Character Counter</h1>

            <p className="text-muted-foreground mt-2 text-sm">
                Quickly measure the length and structure of any text. Useful for composing social posts, writing
                descriptions, or checking snippets of code.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Characters</strong>: counts all visible characters, including spaces and punctuation.
                    </li>
                    <li>
                        <strong>Words</strong>: counts sequences separated by whitespace.
                    </li>
                    <li>
                        <strong>Lines</strong>: counts newline-separated lines.
                    </li>
                    <li>
                        <strong>Paragraphs</strong>: counts blocks of text separated by one or more blank lines.
                    </li>
                </ul>
            </section>

            <div className="mt-4">
                <CharCounter />
            </div>

            <footer className="text-muted-foreground mt-4 text-xs">
                Tip: paste text into the editor to analyze. This utility runs locally in your browser and does not
                transmit the text to any server.
            </footer>
        </article>
    )
}
