import Temperature from "@/components/converters/temperature"
import type { Metadata } from "next"
export const metadata: Metadata = {
    title: "Temperature Converter",
    description: "A simple temperature converter utility. Convert between Celsius, Fahrenheit, and Kelvin.",
    keywords: ["temperature converter", "celsius", "fahrenheit", "kelvin", "convert temperature", "units", "utilities"],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Temperature Converter</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Easily convert temperatures between Celsius, Fahrenheit, and Kelvin. Perfect for cooking, science, and
                everyday use.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Celsius (°C)</strong>: The metric unit of temperature, commonly used worldwide.
                    </li>
                    <li>
                        <strong>Fahrenheit (°F)</strong>: The imperial unit of temperature, primarily used in the United
                        States.
                    </li>
                    <li>
                        <strong>Kelvin (K)</strong>: The SI unit of temperature, used in scientific contexts.
                    </li>
                </ul>
            </section>

            <div className="my-8 border-y py-8">
                <Temperature />
            </div>

            <footer className="text-muted-foreground text-xs">
                Tip: Use this tool to quickly convert temperatures for recipes, weather reports, or scientific data.
                This utility runs locally in your browser and does not transmit any data to a server.
            </footer>
        </article>
    )
}
