import PercentageTab from "@/components/calculators/percentage-tab"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Percentage Calculator",
    description:
        "A calculator for computing percentages, percentage increases, percentage decreases, and percentage differences.",
    keywords: [
        "percentage calculator",
        "percentage increase",
        "percentage decrease",
        "percentage difference",
        "math calculator",
        "percentage",
        "calculator",
        "math",
        "compute",
        "utilities",
    ],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Percentage Calculators</h1>

            <p className="text-muted-foreground mt-2 text-sm">TODO: Add description</p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                TODO: Add list of calculators
            </section>

            <div className="mt-4 flex flex-col items-center justify-center-safe">
                <PercentageTab />
            </div>

            <footer className="text-muted-foreground mt-4 text-xs">TODO: Add footer note</footer>
        </article>
    )
}
