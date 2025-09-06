import PasswordPinTab from "@/components/utilities/password-pin-tab"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Password & PIN Generator",
    description:
        "Generate strong passwords, memorable passphrases, and numeric PINs locally in your browser. Customize length, character sets, and options to create secure, usable credentials.",
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Password & PIN Generator</h1>

            <p className="text-muted-foreground mt-2 text-sm">
                Create strong, random passwords, memorable passphrases, or short numeric PINs — all generated locally in
                your browser. Use the tabs to switch between the standard password generator, a memorable passphrase
                generator, and a numeric PIN generator. Customize length and options to meet different use-cases (e.g.,
                long site passwords, easy-to-remember passphrases, or short PIN codes).
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Choose length</strong>: For standard passwords pick a length (8–128). For memorable
                        passphrases pick the number of words (3–15). For PINs choose 3–12 digits. Longer values provide
                        stronger protection against guessing and brute-force attacks.
                    </li>
                    <li>
                        <strong>Select character types</strong>: For passwords you can include uppercase, lowercase,
                        numbers, and symbols. Each additional character set increases entropy and makes the credential
                        harder to crack.
                    </li>
                    <li>
                        <strong>Memorable passphrases</strong>: Generate passphrases made of common words (optionally
                        shortened or capitalized) to balance memorability and security.
                    </li>
                    <li>
                        <strong>PIN option</strong>: Switch to PIN mode to generate numeric-only codes when you need
                        short, memorable numeric values.
                    </li>
                    <li>
                        <strong>Strong randomness</strong>: All values are generated locally using the secure Web Crypto
                        API (crypto.getRandomValues) when available, ensuring high-quality randomness without sending
                        data to any server.
                    </li>
                    <li>
                        <strong>Generate & copy</strong>: Use the Generate (Refresh) button to create a new value, then
                        use Copy to move it to your clipboard. Clipboard access requires a secure context (HTTPS or
                        localhost).
                    </li>
                    <li>
                        <strong>Security advice</strong>: Use a unique password per account and consider storing them in
                        a reputable password manager. This tool runs locally and does not transmit your data to any
                        server.
                    </li>
                </ul>
            </section>

            <div className="mt-4">
                <PasswordPinTab />
            </div>

            <footer className="text-muted-foreground mt-4 text-xs">
                Note: This utility runs locally in your browser and does not transmit any data to a server.
            </footer>
        </article>
    )
}
