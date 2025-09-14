import Bytes from "@/components/converters/bytes"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Bytes Converter",
    description:
        "Easily convert data sizes between bytes, kilobytes, megabytes, gigabytes, terabytes and petabytes. Perfect" +
        " for digital" +
        " storage and file management.",
    keywords: [
        "bytes converter",
        "kilobytes",
        "megabytes",
        "gigabytes",
        "terabytes",
        "petabytes",
        "convert data size",
        "units",
        "utilities",
    ],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Bytes Converter</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Easily convert data sizes between bytes, kilobytes, megabytes, gigabytes, and terabytes. Perfect for
                digital storage and file management.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Bytes (B)</strong>: The basic unit of digital information storage.
                    </li>
                    <li>
                        <strong>Kilobytes (KB)</strong>: A unit of data equal to 1,024 bytes, commonly used for small
                        files.
                    </li>
                    <li>
                        <strong>Megabytes (MB)</strong>: A unit of data equal to 1,024 kilobytes, often used for images
                        and documents.
                    </li>
                    <li>
                        <strong>Gigabytes (GB)</strong>: A unit of data equal to 1,024 megabytes, typically used for
                        videos and larger files.
                    </li>
                    <li>
                        <strong>Terabytes (TB)</strong>: A unit of data equal to 1,024 gigabytes, commonly used for
                        high-capacity storage devices.
                    </li>
                    <li>
                        <strong>Petabytes (PB)</strong>: A unit of data equal to 1,024 terabytes, used for large-scale
                        data storage and cloud services.
                    </li>
                </ul>
            </section>

            <div className="my-8 border-y py-8">
                <Bytes />
            </div>

            <footer className="text-muted-foreground text-xs">
                Tip: Use this converter to quickly switch between different data size units for better file management
                and understanding of digital storage. This utility runs locally in your browser and does not transmit
                any data to a server.
            </footer>
        </article>
    )
}
