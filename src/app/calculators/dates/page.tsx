import { DateCalculator } from "@/components/calculators/date-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Date Calculator",
    description: "A simple date calculator to help you with date calculations.",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Date Calculator</h1>

            <p className="text-muted-foreground mt-2 text-sm">
                Calculate the difference between two dates or add/subtract days, weeks, months, or years to/from a
                specific date. This tool helps you manage your schedule and plan events effectively.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Input dates</strong>: Enter the start and end dates for calculating the difference, or a
                        specific date to which you want to add or subtract time.
                    </li>
                    <li>
                        <strong>Calculate</strong>: The calculator will compute the result based on your inputs and
                        selected operation.
                    </li>
                    <li>
                        <strong>View results</strong>: The result will show the difference in days, weeks, months, or
                        years, or the new date after adding/subtracting the specified time.
                    </li>
                </ul>
            </section>

            <div className="mt-4 space-y-4 divide-y">
                <div className="pb-2">TODO: Add Date calcular to add/subtract</div>
                <DateCalculator />
            </div>

            <footer className="text-muted-foreground mt-4 text-xs">
                Note: This calculator is for informational purposes only and should not replace professional advice.
            </footer>
        </article>
    )
}
