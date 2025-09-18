import Base64TextEncodeDecodeTab from "@/components/programming/base64-text-encode-decode-tab"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Base64 Text Encoder/Decoder",
    description:
        "Quickly encode or decode text to and from Base64 format online. Paste your text and get the Base64 representation or decode Base64 back to plain text.",
    keywords: [
        "base64 text encoder",
        "base64 text decoder",
        "text converter",
        "online tool",
        "utilities",
        "programming",
        "data encoding",
        "text processing",
    ],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Base64 Text Encoder/Decoder</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Quickly encode or decode text to and from Base64 format online. Paste your text and get the Base64
                representation or decode Base64 back to plain text.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Paste Text</strong>: Input your plain text or Base64 encoded string into the provided
                        field.
                    </li>
                    <li>
                        <strong>Encode/Decode</strong>: Choose to either encode the plain text to Base64 or decode the
                        Base64 string back to plain text.
                    </li>
                    <li>
                        <strong>Copy & Use</strong>: Copy the resulting text for use in your projects or communications.
                    </li>
                </ul>
            </section>

            <div className="my-4">
                <Base64TextEncodeDecodeTab />
            </div>

            <footer className="text-muted-foreground text-xs">
                Tip: Ensure your Base64 string is correctly formatted. This utility runs locally in your browser and
                does not transmit your data to any server.
            </footer>
        </article>
    )
}
