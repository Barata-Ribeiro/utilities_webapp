import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About",
    description:
        "Utilities is an open-source collection of small, focused web tools — calculators, converters and handy utilities — built with Next.js and Tailwind CSS to be fast, accessible and easy to use.",
    keywords: ["utilities", "converters", "calculators", "next.js", "tailwindcss", "open source", "web tools"],
    authors: [{ name: "João Mendes Jorge Barata Ribeiro", url: "https://github.com/Barata-Ribeiro" }],
    openGraph: {
        title: "Utilities — Small web tools & converters",
        description:
            "A curated collection of simple, useful web-based calculators and converters built for quick tasks and demonstrations of Next.js + Tailwind.",
        url: "https://github.com/Barata-Ribeiro/utilities_webapp",
        siteName: "Utilities",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Utilities — Small web tools & converters",
        description:
            "A curated collection of simple, useful web-based calculators and converters built for quick tasks and demonstrations of Next.js + Tailwind.",
    },
    manifest: "/manifest.webmanifest",
}

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <h1 className="font-serif text-xl">About Utilities</h1>

            <p className="text-muted-foreground mt-4 text-sm">
                Utilities Web App is an open-source collection of focused web tools — calculators, converters and small
                utilities — created to help with everyday tasks and to serve as an example site built with Next.js and
                Tailwind CSS.
            </p>

            <section className="mt-4 text-sm">
                <h2 className="font-medium">What you will find</h2>
                <ul className="mt-2 list-inside list-disc">
                    <li>Simple calculators (BMI, percentage, date utilities, rule-of-three and more).</li>
                    <li>Unit converters (length, mass, temperature, speed and time).</li>
                    <li>Small utilities like a character counter, password generator and roman numeral converter.</li>
                </ul>
            </section>

            <section className="mt-4 text-sm">
                <h2 className="font-medium">Built with</h2>
                <p className="mt-2">Next.js, React, Tailwind CSS and a small set of accessible UI components.</p>
            </section>

            <section className="mt-4 text-sm">
                <h2 className="font-medium">Contributing</h2>
                <p className="mt-2">
                    This project is open-source. Bugs, suggestions or pull requests are welcome — see the repository on
                    GitHub to contribute. You can open issues or propose fixes via the project issue tracker.
                </p>
            </section>

            <section className="mt-4 text-sm">
                <h2 className="font-medium">License & contact</h2>
                <p className="mt-2">
                    Released under the GPL-3.0-only license. For questions or contact, reach out via the project
                    repository.
                </p>
            </section>
        </article>
    )
}
