import PasswordPinTab from "@/components/utilities/password-pin-tab"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Password Generator",
    description:
        "Generate strong, random passwords to enhance your online security. Customize length and character types to create passwords that meet your needs.",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Password Generator</h1>

            <p className="text-muted-foreground mt-2 text-sm">
                Generate strong, random passwords to enhance your online security. Customize length and character types
                to create passwords that meet your needs.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Choose length</strong>: Pick a length (8–128). Longer passwords (12+ characters) provide
                        much stronger protection against guessing and brute-force attacks.
                    </li>
                    <li>
                        <strong>Select character types</strong>: Combine uppercase, lowercase, numbers, and symbols to
                        increase entropy. Each additional character set makes the password exponentially harder to
                        crack.
                    </li>
                    <li>
                        <strong>PIN option</strong>: Switch to PIN mode to generate numeric-only codes when you need
                        short, memorable numeric values (e.g., 3–12 digits).
                    </li>
                    <li>
                        <strong>Strong randomness</strong>: Passwords and PINs are generated locally in your browser
                        using the secure Web Crypto API (crypto.getRandomValues) for high-quality randomness.
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
