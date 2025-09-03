import RuleOfThree from "@/components/calculators/rule-of-three"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Rule of Three",
    description: "A simple Rule of Three calculator to help you solve proportions.",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Rule of Three Calculator</h1>

            <p className="text-muted-foreground mt-2 text-sm">
                Calculate the fourth term in a proportion using the Rule of Three. This tool helps you find an unknown
                value when you know three other values that are in proportion.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Input the first term (A)</strong>: Enter the first known value in the proportion.
                    </li>
                    <li>
                        <strong>Input the second term (B)</strong>: Enter the second known value in the proportion.
                    </li>
                    <li>
                        <strong>Input the third term (C)</strong>: Enter the third known value in the proportion.
                    </li>
                    <li>
                        <strong>Calculate the fourth term (D)</strong>: The calculator will compute the unknown value
                        using the formula: D = (B * C) / A.
                    </li>
                </ul>
            </section>

            <div className="mt-4">
                <RuleOfThree />
            </div>

            <footer className="text-muted-foreground mt-4 text-xs">
                Note: This calculator is for informational purposes only and should not replace professional advice.
                This utility runs locally in your browser and does not transmit the text to any server.
            </footer>
        </article>
    )
}
