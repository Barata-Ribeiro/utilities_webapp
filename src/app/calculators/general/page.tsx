import GeneralCalculator from "@/components/calculators/general-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Calculator",
    description: "A calculator for various general purposes.",
    keywords: ["calculator", "arithmetic", "math", "compute", "utilities"],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">General Calculator</h1>

            <p className="text-muted-foreground mt-2 text-sm">
                A versatile calculator for performing a wide range of calculations, from basic arithmetic to more
                complex mathematical operations.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <p>
                    This is a general-purpose calculator that can perform a variety of calculations. Just type in your
                    expression and watch the result update in real-time!
                </p>
            </section>

            <div className="mt-4">
                <GeneralCalculator />
            </div>

            <footer className="text-muted-foreground mt-4 text-xs">
                Note: This calculator runs advanced calculations through a library but should not replace professional
                advice. This utility runs locally in your browser and does not transmit the text to any server.
            </footer>
        </article>
    )
}
