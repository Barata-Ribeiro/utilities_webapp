import { MoveRightIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Calculators",
    description: "A variety of calculators including GCF, LCM, BMI, Dates, and more.",
    keywords: [
        "calculators",
        "math calculators",
        "GCF calculator",
        "LCM calculator",
        "BMI calculator",
        "date calculator",
        "percentage calculator",
    ],
    manifest: "/manifest.webmanifest",
}

const calculators = [
    {
        title: "BMI",
        href: "/calculators/bmi",
        description: "Calculate your Body Mass Index (BMI) based on weight and height.",
    },
    {
        title: "Date Calculator",
        href: "/calculators/dates",
        description: "Calculate the difference between two dates or add/subtract days from a specific date.",
    },
    {
        title: "GCF & LCM",
        href: "/calculators/gcf-and-lcm",
        description: "Find the Greatest Common Factor (GCF) and Least Common Multiple (LCM) of two or more numbers.",
    },
    {
        title: "General Calculator",
        href: "/calculators/general",
        description: "A simple general-purpose calculator for basic arithmetic operations.",
    },
    {
        title: "Percentage Calculator",
        href: "/calculators/percentage",
        description: "Calculate percentages, percentage increases/decreases, and find the whole from a part.",
    },
    {
        title: "Rule of Three",
        href: "/calculators/rule-of-three",
        description: "Solve proportion problems using the Rule of Three method.",
    },
]

export default function Page() {
    return (
        <article className="bg-card rounded-md p-6 shadow">
            <header>
                <h1 className="font-serif text-2xl">Calculators</h1>
                <p className="text-muted-foreground mt-2 text-sm">
                    A variety of calculators including GCF, LCM, BMI, Dates, and more.
                </p>
            </header>

            <nav aria-label="Calculators menu" className="mt-6">
                <h2 className="sr-only">Available calculators</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {calculators.map((calc, idx) => {
                        const descId = `calc-desc-${idx}`

                        return (
                            <Link
                                key={calc.href}
                                href={calc.href}
                                aria-describedby={descId}
                                className="bg-background focus:ring-ring block overflow-hidden rounded-md p-4 transition-shadow duration-150 hover:shadow-md focus:ring-2 focus:outline-none">
                                <h3 className="text-lg font-medium">{calc.title}</h3>
                                <p id={descId} className="text-muted-foreground mt-2 text-sm">
                                    {calc.description}
                                </p>
                                <div className="text-primary mt-3 inline-flex items-center gap-x-2 text-xs">
                                    Open <MoveRightIcon aria-hidden size={16} />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </nav>

            <footer className="text-muted-foreground mt-6 text-xs">
                Tip: All calculators run locally in your browser and do not transmit your data to any server.
            </footer>
        </article>
    )
}
