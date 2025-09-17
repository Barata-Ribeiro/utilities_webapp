import Base64ToImage from "@/components/programming/base64-to-image"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Base64 to Image Converter",
    description:
        "Easily convert Base64 encoded strings back to images online. Paste your Base64 string and download the decoded image in various formats.",
    keywords: [
        "base64 to image",
        "image converter",
        "base64 decoding",
        "online tool",
        "utilities",
        "programming",
        "data URI",
        "image download",
    ],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Base64 to Image Converter</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Easily convert Base64 encoded strings back to images online. Paste your Base64 string and download the
                decoded image in various formats.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Paste Base64 String</strong>: Input your Base64 encoded string into the provided field.
                    </li>
                    <li>
                        <strong>Convert</strong>: The tool will decode the Base64 string and generate the corresponding
                        image.
                    </li>
                    <li>
                        <strong>Download & Use</strong>: Download the decoded image in your preferred format for use in
                        your projects.
                    </li>
                </ul>
            </section>

            <div className="my-8 flex flex-col items-center-safe gap-4 border-y py-8">
                <Base64ToImage />
            </div>

            <footer className="text-muted-foreground text-xs">
                Tip: Ensure your Base64 string is correctly formatted. This utility runs locally in your browser and
                does not transmit your data to any server.
            </footer>
        </article>
    )
}
