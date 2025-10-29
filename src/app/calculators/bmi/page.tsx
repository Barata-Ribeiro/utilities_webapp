import Bmi from '@/components/calculators/bmi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'BMI Calculator',
    description: 'A simple BMI calculator to help you assess your body weight.',
    keywords: ['bmi', 'body mass index', 'health calculator', 'weight', 'calculator', 'utilities'],
    manifest: '/manifest.webmanifest',
};

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <h1 className="font-serif text-xl">BMI Calculator</h1>

            <p className="mt-2 text-sm text-muted-foreground">
                Calculate your Body Mass Index (BMI) to assess your body weight relative to your height. This tool helps
                you understand whether you&#39;re underweight, normal weight, overweight, or obese based on standard BMI
                categories.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>
                        <strong>Input your weight</strong>: Enter your weight in kilograms (kg) or pounds (lbs).
                    </li>
                    <li>
                        <strong>Input your height</strong>: Enter your height in centimeters (cm) or inches (in).
                    </li>
                    <li>
                        <strong>Calculate BMI</strong>: The calculator will compute your BMI using the formula: BMI =
                        weight (kg) / (height (m))² or BMI = 703 * weight (lbs) / (height (in))².
                    </li>
                    <li>
                        <strong>Interpret results</strong>: Based on your BMI value, you&#39;ll be categorized as
                        underweight, normal weight, overweight, or obese.
                    </li>
                </ul>
            </section>

            <div className="mt-4">
                <Bmi />
            </div>

            <footer className="mt-4 text-xs text-muted-foreground">
                Note: This calculator is for informational purposes only and should not replace professional medical
                advice.
            </footer>
        </article>
    );
}
