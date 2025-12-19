'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ChangeEvent, useState } from 'react';

export default function Length() {
    const [length, setLength] = useState({
        kilometer: '',
        meter: '',
        centimeter: '',
        millimeter: '',
        micrometer: '',
        nanometer: '',
        mile: '',
        yard: '',
        inch: '',
        foot: '',
        nauticalMile: '',
    });

    const factors = {
        kilometer: [1, 1e3, 1e5, 1e6, 1e9, 1e12, 1 / 1.609, 1094, 39370, 3281, 0.5399568],
        meter: [1e-3, 1, 1e2, 1e3, 1e6, 1e9, 1 / 1609.34, 1.094, 39.37, 3.281, 1 / 1852],
        centimeter: [1e-5, 1e-2, 1, 1e1, 1e4, 1e7, 1 / 160934, 1 / 91.44, 1 / 2.54, 1 / 30.48, 1 / 185200],
        millimeter: [1e-6, 1e-3, 1e-2, 1, 1e3, 1e6, 1 / 1.609e6, 1 / 914.4, 1 / 25.4, 1 / 304.8, 1 / 1.852e6],
        micrometer: [1e-9, 1e-6, 1e-4, 1e-3, 1, 1e3, 1 / 1.609e9, 1 / 9.144e5, 1 / 25400, 1 / 304800, 1 / 1.852e9],
        nanometer: [1e-12, 1e-9, 1e-7, 1e-6, 1e-3, 1, 1 / 1.609e12, 1 / 9.144e8, 1 / 2.54e7, 1 / 3.048e8, 1 / 1.852e12],
        mile: [1.609, 1609.34, 160934, 1.609e6, 1.609e9, 1.609e12, 1, 1760, 63360, 5280, 0.868976],
        yard: [1 / 1094, 0.9144, 91.44, 914.4, 9.144e5, 9.144e8, 1 / 1760, 1, 36, 3, 1 / 2025],
        inch: [1 / 39370, 1 / 39.37, 2.54, 25.4, 25400, 2.54e7, 1 / 63360, 1 / 36, 1, 1 / 12, 1 / 72913.386],
        foot: [1 / 3281, 0.3048, 30.48, 304.8, 304800, 3.048e8, 1 / 5280, 1 / 3, 12, 1, 1 / 6076.115],
        nauticalMile: [1 / 0.5399568, 1852, 185200, 1.852e6, 1.852e9, 1.852e12, 1.151, 2025, 72913.386, 6076.115, 1],
    } as const;

    function handleChange(event: ChangeEvent<HTMLInputElement>, unit: keyof typeof length) {
        const value = event.target.value;
        if (!/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(value) && value !== '' && value !== '-') return;

        const usesComma = value.includes(',');
        const normalized = value.replace(/,/g, '.');

        let num = Number.parseFloat(normalized);
        if (Number.isNaN(num)) num = 0;

        const isValueEmpty = value === '' || value === '-';

        const fmt = (n: number) => {
            const out = n.toFixed(6).replace(/\.?0+$/, '');
            return usesComma ? out.replace('.', ',') : out;
        };

        const unitIndex = Object.keys(length).indexOf(unit);
        if (unitIndex === -1) return; // Safety check

        const newLengths: Record<string, string> = {};

        for (const [index, key] of Object.keys(length).entries()) {
            if (key === unit) newLengths[key] = value;
            else {
                const factor = factors[unit][index];
                newLengths[key] = isValueEmpty ? '' : fmt(num * factor);
            }
        }

        setLength((prev) => ({
            ...prev,
            ...newLengths,
        }));
    }

    const labels = {
        kilometer: 'Kilometers (km)',
        meter: 'Meters (m)',
        centimeter: 'Centimeters (cm)',
        millimeter: 'Millimeters (mm)',
        micrometer: 'Micrometers (µm)',
        nanometer: 'Nanometers (nm)',
        mile: 'Miles (mi)',
        yard: 'Yards (yd)',
        inch: 'Inches (in)',
        foot: 'Feet (ft)',
        nauticalMile: 'Nautical Miles (nmi)',
    };

    return (
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 last:row-span-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Object.keys(length).map((unit) => (
                <div className="space-y-4 max-md:last:col-span-full lg:last:col-span-full" key={unit}>
                    <Label htmlFor={unit}>{labels[unit as keyof typeof labels]}</Label>
                    <Input
                        type="text"
                        id={unit}
                        name={unit}
                        value={length[unit as keyof typeof length]}
                        onChange={(e) => handleChange(e, unit as keyof typeof length)}
                        placeholder="0"
                        inputMode="decimal"
                        autoComplete="off"
                    />
                </div>
            ))}
        </div>
    );
}
