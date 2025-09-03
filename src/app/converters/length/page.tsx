import Length from "@/components/converters/length"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Length Converter",
    description:
        "Easily convert lengths between meters, feet, and inches. Perfect for construction, travel, and everyday use.",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Length Converter</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Easily convert lengths between meters, feet, and inches. Perfect for construction, travel, and everyday
                use.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Meters (m)</strong>: The metric unit of length, commonly used worldwide.
                    </li>
                    <li>
                        <strong>Feet (ft)</strong>: The imperial unit of length, primarily used in the United States.
                    </li>
                    <li>
                        <strong>Inches (in)</strong>: A smaller imperial unit of length, also used mainly in the United
                        States.
                    </li>
                    <li>
                        <strong>Kilometers (km)</strong>: A metric unit of length equal to 1,000 meters, often used for
                        measuring longer distances.
                    </li>
                    <li>
                        <strong>Centimeters (cm)</strong>: A metric unit of length equal to one-hundredth of a meter,
                        commonly used for smaller measurements.
                    </li>
                    <li>
                        <strong>Millimeters (mm)</strong>: A metric unit of length equal to one-thousandth of a meter,
                        used for very precise measurements.
                    </li>
                    <li>
                        <strong>Miles (mi)</strong>: An imperial unit of length equal to 5,280 feet, commonly used for
                        measuring longer distances in the United States.
                    </li>
                    <li>
                        <strong>Yards (yd)</strong>: An imperial unit of length equal to 3 feet, often used in sports
                        and fabric measurements.
                    </li>
                    <li>
                        <strong>Nautical Miles (nmi)</strong>: A unit of length used in maritime and aviation contexts,
                        equal to 1.852 kilometers.
                    </li>
                </ul>
            </section>

            <div className="my-8 border-y py-8">
                <Length />
            </div>

            <footer className="text-muted-foreground text-xs">
                Tip: Use this tool to quickly convert lengths for construction projects, travel measurements, or
                everyday tasks. This utility runs locally in your browser and does not transmit any data to a server.
            </footer>
        </article>
    )
}
