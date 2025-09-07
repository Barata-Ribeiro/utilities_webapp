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

            <p className="text-muted-foreground mt-2 text-sm">
                A collection of small, focused percentage tools to help with common percent-related problems — compute
                p% of a value, determine what percent one number is of another, find the value when given a percent,
                apply percentage increases or decreases, and calculate percentage change between two values.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>What is p% of X?</strong>: Calculate the numeric value that corresponds to p percent of
                        a given base value.
                    </li>
                    <li>
                        <strong>X is what percent of Y?</strong>: Determine the percentage that X represents of Y.
                    </li>
                    <li>
                        <strong>X is p% of what?</strong>: Find the unknown base value when given a value and its
                        percentage.
                    </li>
                    <li>
                        <strong>Increase/Decrease by p%</strong>: Apply a percentage increase or decrease to a value and
                        get the resulting value.
                    </li>
                    <li>
                        <strong>Percentage Increase/Decrease between two values</strong>: Compute the percentage change
                        from an initial value to a final value (positive for increase, negative for decrease).
                    </li>
                </ul>
            </section>

            <div className="mt-4 flex flex-col items-center justify-center-safe">
                <PercentageTab />
            </div>

            <footer className="text-muted-foreground mt-4 text-xs">
                All calculations are performed locally in your browser. Use dot (.) or comma (,) as decimal separators —
                results are normalized and shown with sensible precision. This tool is for convenience and educational
                use; verify critical results with authoritative sources when necessary.
            </footer>
        </article>
    )
}
