import { MoveRightIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Converters',
    description: 'A variety of unit converters including length, temperature, weight, and more.',
    keywords: [
        'converters',
        'unit conversion',
        'length converter',
        'temperature converter',
        'weight converter',
        'byte converter',
        'time converter',
        'speed converter',
    ],
    manifest: '/manifest.webmanifest',
};

const converters = [
    {
        title: 'Byte Converter',
        href: '/converters/bytes',
        description: 'Convert between different data storage units (bytes, KB, MB, GB, TB, etc.) easily.',
    },
    {
        title: 'Length Converter',
        href: '/converters/length',
        description: 'Convert between various length units (meters, kilometers, miles, feet, inches, etc.).',
    },
    {
        title: 'Mass Converter',
        href: '/converters/mass',
        description: 'Convert between different mass units (grams, kilograms, pounds, ounces, etc.).',
    },
    {
        title: 'Speed Converter',
        href: '/converters/speed',
        description:
            'Convert between various speed units (meters per second, kilometers per hour, miles per hour, etc.).',
    },
    {
        title: 'Temperature Converter',
        href: '/converters/temperature',
        description: 'Convert between temperature scales (Celsius, Fahrenheit, Kelvin) quickly and easily.',
    },
    {
        title: 'Time Converter',
        href: '/converters/time',
        description: 'Convert between different time units (seconds, minutes, hours, days, weeks, etc.).',
    },
];

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <header>
                <h1 className="font-serif text-2xl">Converters</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    A variety of unit converters including length, temperature, weight, and more.
                </p>
            </header>

            <nav aria-label="Unit Converter menu" className="mt-6">
                <h2 className="sr-only">Available unit converters</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {converters.map((uc, idx) => {
                        const descId = `uc-desc-${idx}`;

                        return (
                            <Link
                                key={uc.href}
                                href={uc.href}
                                aria-describedby={descId}
                                className="block overflow-hidden rounded-md bg-background p-4 transition-shadow duration-150 hover:shadow-md focus:ring-2 focus:ring-ring focus:outline-none"
                            >
                                <h3 className="text-lg font-medium">{uc.title}</h3>
                                <p id={descId} className="mt-2 text-sm text-muted-foreground">
                                    {uc.description}
                                </p>
                                <div className="mt-3 inline-flex items-center gap-x-2 text-xs text-primary">
                                    Open <MoveRightIcon aria-hidden size={16} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <footer className="mt-6 text-xs text-muted-foreground">
                Tip: All converters run locally in your browser and do not transmit your data to any server.
            </footer>
        </article>
    );
}
