import QRCodeGenerator from "@/components/utilities/qrcode-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "QR Code Generator",
    description: "Generate QR codes for your URLs. Share links easily with customizable QR codes.",
    keywords: ["qr code", "qr code generator", "utilities", "web development", "data encoding"],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">QR Code Generator</h1>

            <p className="text-muted-foreground mt-2 text-sm">
                Generate QR codes for your URLs. Share links easily with customizable QR codes.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Input</strong>: Enter the URL you want to encode into a QR code.
                    </li>
                    <li>
                        <strong>Download</strong>: Click the generate button to create your QR code and download it as
                        an image file.
                    </li>
                    <li>
                        <strong>Share</strong>: Use the generated QR code to share links easily via print or digital
                        media.
                    </li>
                </ul>
            </section>

            <div className="mt-4">
                <QRCodeGenerator />
            </div>

            <footer className="text-muted-foreground mt-4 text-xs">
                Tip: Use the generated QR codes to share links quickly and conveniently. This utility runs locally in
                your browser and does not transmit any data to a server.
            </footer>
        </article>
    )
}
