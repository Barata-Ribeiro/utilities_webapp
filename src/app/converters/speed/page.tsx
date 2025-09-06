import Speed from "@/components/converters/speed"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Speed Converter",
    description:
        "Convert speeds between kilometers per hour, miles per hour, meters per second, and more. Ideal for travel, sports, and everyday use.",
    keywords: ["speed converter", "km/h", "mph", "m/s", "convert speed", "units", "utilities"],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Speed Converter</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Convert speeds between kilometers per hour, miles per hour, meters per second, and more. Ideal for
                travel, sports, and everyday use.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Kilometers per hour (km/h)</strong>: A metric unit of speed commonly used worldwide,
                        especially for road traffic.
                    </li>
                    <li>
                        <strong>Miles per hour (mph)</strong>: An imperial unit of speed primarily used in the United
                        States and the UK for road traffic.
                    </li>
                    <li>
                        <strong>Meters per second (m/s)</strong>: The SI unit of speed, often used in scientific
                        contexts and athletics.
                    </li>
                    <li>
                        <strong>Feet per second (ft/s)</strong>: An imperial unit of speed sometimes used in the US for
                        various applications.
                    </li>
                    <li>
                        <strong>Knots (kn)</strong>: A nautical unit of speed equal to one nautical mile per hour,
                        commonly used in maritime and aviation contexts.
                    </li>
                    <li>
                        <strong>Mach (Ma)</strong>: A dimensionless unit representing the ratio of an object&#39;s speed
                        to the speed of sound in the surrounding medium, often used in aviation and aerospace.
                    </li>
                </ul>
            </section>

            <div className="my-8 border-y py-8">
                <Speed />
            </div>

            <footer className="text-muted-foreground text-xs">
                Tip: Use the speed converter to quickly switch between different speed units. This tool is perfect for
                converting speeds when planning trips, tracking athletic performance, or understanding vehicle speeds in
                various contexts. This utility runs locally in your browser and does not transmit any data to a server.
            </footer>
        </article>
    )
}
