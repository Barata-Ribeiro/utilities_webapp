import Mass from "@/components/converters/mass"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Mass Converter",
    description:
        "Easily convert masses between kilograms, pounds, and ounces. Perfect for cooking, shipping, and everyday use.",
    keywords: ["mass converter", "kilograms", "pounds", "ounces", "convert mass", "units", "utilities"],
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">Mass Converter</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Easily convert masses between kilograms, pounds, and ounces. Perfect for cooking, shipping, and everyday
                use.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>
                        <strong>Tonnes (t)</strong>: A metric unit of mass equal to 1,000 kilograms, often used for
                        measuring larger masses.
                    </li>
                    <li>
                        <strong>Kilograms (kg)</strong>: The metric unit of mass, commonly used worldwide.
                    </li>
                    <li>
                        <strong>Grams (g)</strong>: A metric unit of mass equal to one-thousandth of a kilogram,
                        commonly used for smaller measurements.
                    </li>
                    <li>
                        <strong>Milligrams (mg)</strong>: A metric unit of mass equal to one-millionth of a kilogram,
                        used for very precise measurements.
                    </li>
                    <li>
                        <strong>Micrograms (µg)</strong>: A metric unit of mass equal to one-billionth of a kilogram,
                        used for extremely small measurements.
                    </li>
                    <li>
                        <strong>UK ton (long ton)</strong>: A unit equal to 1,016 kilograms, used in the UK for large
                        masses.
                    </li>
                    <li>
                        <strong>US ton (short ton)</strong>: A unit equal to 907.185 kilograms, used in the US for large
                        masses.
                    </li>
                    <li>
                        <strong>Pounds (lb)</strong>: The imperial unit of mass, primarily used in the United States.
                    </li>
                    <li>
                        <strong>Ounces (oz)</strong>: A smaller imperial unit of mass, also used mainly in the United
                        States.
                    </li>
                    <li>
                        <strong>Stones (st)</strong>: An imperial unit of mass equal to 14 pounds, commonly used in the
                        UK for body weight.
                    </li>
                </ul>
            </section>

            <div className="my-8 border-y py-8">
                <Mass />
            </div>

            <footer className="text-muted-foreground text-xs">
                Tip: Use the mass converter to quickly switch between units when following recipes or calculating
                shipping weights. This utility runs locally in your browser and does not transmit any data to a server.
            </footer>
        </article>
    )
}
