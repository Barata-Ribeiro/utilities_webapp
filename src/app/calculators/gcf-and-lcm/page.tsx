import GCFAndLCMCalcTab from '@/components/calculators/g-c-f-and-l-c-m-calc-tab';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GCF and LCM Calculator',
    description: 'Calculate the Greatest Common Factor (GCF) and Least Common Multiple (LCM) of two or more numbers.',
    keywords: ['gcf', 'lcm', 'greatest common factor', 'least common multiple', 'math calculator', 'utilities'],
    manifest: '/manifest.webmanifest',
};

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <h1 className="font-serif text-xl">GCF and LCM Calculator</h1>

            <p className="mt-2 text-sm text-muted-foreground">
                Calculate the Greatest Common Factor (GCF) and Least Common Multiple (LCM) of two or more numbers. This
                tool helps you find the largest number that divides two or more numbers without leaving a remainder
                (GCF) and the smallest number that is a multiple of two or more numbers (LCM).
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>
                        <strong>Input your numbers</strong>: Enter two or more positive integers separated by commas or
                        spaces.
                    </li>
                    <li>
                        <strong>Calculate GCF and LCM</strong>: The calculator will compute the GCF and LCM using prime
                        factorization or the Euclidean algorithm.
                    </li>
                    <li>
                        <strong>View results</strong>: The results will display the GCF and LCM of the entered numbers.
                    </li>
                </ul>
            </section>

            <div className="mt-4">
                <GCFAndLCMCalcTab />
            </div>

            <footer className="mt-4 text-xs text-muted-foreground">
                Note: This calculator is for educational purposes only and should not replace professional mathematical
                advice.
            </footer>
        </article>
    );
}
