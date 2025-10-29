'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ChangeEvent, useState } from 'react';

export default function Mass() {
    const [masses, setMasses] = useState({
        tonne: '',
        kilogram: '',
        gram: '',
        milligram: '',
        microgram: '',
        ukTon: '',
        usTon: '',
        pound: '',
        ounce: '',
        stone: '',
    });

    const factors = {
        tonne: [1, 1e3, 1e6, 1e9, 1e12, 0.984207, 1.10231, 2204.623, 35273.96, 157.4730444],
        kilogram: [1e-3, 1, 1e3, 1e6, 1e9, 0.000984207, 0.00110231, 2.204623, 35.27396, 0.1574730444],
        gram: [1e-6, 1e-3, 1, 1e3, 1e6, 9.8421e-7, 1.1023e-6, 0.002204623, 0.03527396, 0.0001574730444],
        milligram: [1e-9, 1e-6, 1e-3, 1, 1e3, 9.8421e-10, 1.1023e-9, 2.2046e-6, 3.5274e-5, 1.574730444e-7],
        microgram: [1e-12, 1e-9, 1e-6, 1e-3, 1, 9.8421e-13, 1.1023e-12, 2.2046e-9, 3.5274e-8, 1.574730444e-10],
        ukTon: [1.016, 1016, 1.016e6, 1.016e9, 1.016e12, 1, 1.12, 2240, 35840, 160],
        usTon: [0.907185, 907.185, 907185, 9.07185e8, 9.07185e11, 0.8928571, 1, 2000, 32000, 142.857],
        pound: [0.000453592, 0.453592, 453.592, 453592, 4.536e8, 0.0004464286, 0.0005, 1, 16, 0.0714285714],
        ounce: [2.83495e-5, 0.0283495, 28.3495, 28349.5, 2.83495e7, 2.79018e-5, 3.125e-5, 0.0625, 1, 0.004464285714],
        stone: [0.00635029318, 6.35029318, 6350.29318, 6.35029318e6, 6.35029318e9, 0.00625, 0.007, 14, 224, 1],
    };

    function handleChange(event: ChangeEvent<HTMLInputElement>, unit: keyof typeof masses) {
        const value = event.target.value;
        if (!/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(value) && value !== '' && value !== '-') return;

        const usesComma = value.includes(',');
        const normalized = value.replace(/,/g, '.');

        let num = parseFloat(normalized);
        if (isNaN(num)) num = 0;

        const isValueEmpty = value === '' || value === '-';

        const fmt = (n: number) => {
            const out = n.toFixed(6).replace(/\.?0+$/, '');
            return usesComma ? out.replace('.', ',') : out;
        };

        const unitIndex = Object.keys(masses).indexOf(unit);
        if (unitIndex === -1) return; // Safety check

        const newMasses: Record<string, string> = {};

        Object.keys(masses).forEach((key, index) => {
            if (key === unit) newMasses[key] = value;
            else {
                const factor = factors[unit][index];
                newMasses[key] = isValueEmpty ? '' : fmt(num * factor);
            }
        });

        setMasses((prev) => ({
            ...prev,
            ...newMasses,
        }));
    }

    return (
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 last:row-span-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Object.keys(masses).map((unit) => (
                <div className="space-y-4" key={unit}>
                    <Label htmlFor={unit}>
                        {(() => {
                            switch (unit) {
                                case 'tonne':
                                    return 'Tonnes (t)';
                                case 'kilogram':
                                    return 'Kilograms (kg)';
                                case 'gram':
                                    return 'Grams (g)';
                                case 'milligram':
                                    return 'Milligrams (mg)';
                                case 'microgram':
                                    return 'Micrograms (µg)';
                                case 'ukTon':
                                    return 'UK Tons (long tons)';
                                case 'usTon':
                                    return 'US Tons (short tons)';
                                case 'pound':
                                    return 'Pounds (lb)';
                                case 'ounce':
                                    return 'Ounces (oz)';
                                case 'stone':
                                    return 'Stones (st)';
                                default:
                                    return unit;
                            }
                        })()}
                    </Label>
                    <Input
                        type="text"
                        id={unit}
                        name={unit}
                        value={masses[unit as keyof typeof masses]}
                        onChange={(e) => handleChange(e, unit as keyof typeof masses)}
                        placeholder="0"
                        inputMode="decimal"
                        autoComplete="off"
                    />
                </div>
            ))}
        </div>
    );
}
