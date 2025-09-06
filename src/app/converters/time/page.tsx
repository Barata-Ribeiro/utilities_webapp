import Time from "@/components/converters/time"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Time Converter",
    description:
        "Convert time units such as seconds, minutes, hours, days, weeks, months, and years. Useful for scheduling, planning, and everyday calculations.",
    keywords: ["time converter", "time units", "seconds", "minutes", "hours", "convert time", "utilities"],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Time Converter</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Convert time units such as seconds, minutes, hours, days, weeks, months, and years. Useful for
                scheduling, planning, and everyday calculations.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Nanoseconds (ns)</strong>: A unit of time equal to one billionth of a second, commonly
                        used in scientific and technical contexts.
                    </li>
                    <li>
                        <strong>Microseconds (µs)</strong>: A unit of time equal to one millionth of a second, often
                        used in computing and high-speed measurements.
                    </li>
                    <li>
                        <strong>Milliseconds (ms)</strong>: A unit of time equal to one thousandth of a second,
                        frequently used in everyday contexts such as measuring response times and durations.
                    </li>
                    <li>
                        <strong>Seconds (s)</strong>: The base unit of time in the International System of Units (SI),
                        commonly used for short durations.
                    </li>
                    <li>
                        <strong>Minutes (min)</strong>: A unit of time equal to 60 seconds, often used for everyday
                        activities and scheduling.
                    </li>
                    <li>
                        <strong>Hours (h)</strong>: A unit of time equal to 60 minutes or 3600 seconds, widely used in
                        daily life and work schedules.
                    </li>
                    <li>
                        <strong>Days (d)</strong>: A unit of time equal to 24 hours, commonly used to measure longer
                        periods such as events or deadlines.
                    </li>
                    <li>
                        <strong>Weeks (wk)</strong>: A unit of time equal to 7 days, often used for planning and
                        organizing activities over a longer period.
                    </li>
                    <li>
                        <strong>Months (mo)</strong>: A unit of time based on the lunar cycle, typically ranging from 28
                        to 31 days, used in calendars and for scheduling.
                    </li>
                    <li>
                        <strong>Years (yr)</strong>: A unit of time equal to 12 months or approximately 365.25 days,
                        used for measuring long-term periods such as age, anniversaries, and historical events.
                    </li>
                    <li>
                        <strong>Decades (dec)</strong>: A unit of time equal to 10 years, often used in historical and
                        scientific contexts.
                    </li>
                    <li>
                        <strong>Centuries (cen)</strong>: A unit of time equal to 100 years, commonly used in historical
                        contexts to describe long periods.
                    </li>
                </ul>
            </section>

            <div className="my-8 border-y py-8">
                <Time />
            </div>

            <footer className="text-muted-foreground text-xs">
                Tip: Use the time converter to quickly switch between different time units. This tool is perfect for
                converting durations when scheduling events, planning projects, or managing daily activities. This
                utility runs locally in your browser and does not transmit any data to a server.
            </footer>
        </article>
    )
}
