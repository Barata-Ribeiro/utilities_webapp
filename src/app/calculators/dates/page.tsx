import DateTab from "@/components/calculators/date-tab"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Date Calculator — Difference & Add/Subtract",
    description:
        "Calculate differences between two dates or add/subtract days, weeks, months, and years from a specific date. Includes time-of-day support and multiple output formats.",
    keywords: [
        "date calculator",
        "date difference",
        "add days",
        "subtract days",
        "date math",
        "timezones",
        "utilities",
    ],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <header>
                <h1 className="font-serif text-xl">Date Calculator</h1>
                <p className="text-muted-foreground mt-2 text-sm">
                    Use the tabs below to switch between calculating the difference between two dates or
                    adding/subtractting an offset (days, weeks, months, years) to a given date. Both tools support
                    selecting a time of day and provide human-friendly results along with alternative unit breakdowns.
                </p>
            </header>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Date Difference</strong>: Pick a start and end date (including time) to compute the
                        exact duration between them. Results are shown in seconds, minutes, hours, days, weeks, months,
                        and years, plus a human-readable breakdown.
                    </li>
                    <li>
                        <strong>Date Add/Subtract</strong>: Choose a base date and add or subtract days, weeks, months,
                        or years. The tool displays the resulting date and a summary of the applied offset.
                    </li>
                    <li>
                        <strong>Time precision</strong>: Both calculators support time-of-day selection so you can
                        compute precise durations that include hours, minutes and seconds.
                    </li>
                </ul>
            </section>

            <div className="mt-4">
                <DateTab />
            </div>

            <footer className="text-muted-foreground mt-4 text-xs">
                Note: This calculator is for informational purposes only. Date handling may vary across timezones and
                edge cases (leap seconds, DST transitions) — verify critical dates with authoritative sources when
                needed.
            </footer>
        </article>
    )
}
