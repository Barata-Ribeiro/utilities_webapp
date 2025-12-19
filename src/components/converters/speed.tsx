'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ChangeEvent, useState } from 'react';

export default function Speed() {
    const [speeds, setSpeeds] = useState({
        kilometerPerHour: '',
        milePerHour: '',
        meterPerSecond: '',
        footPerSecond: '',
        knots: '',
        mach: '',
    });

    const factors = {
        kilometerPerHour: [1, 1 / 1.609, 1 / 3.6, 1 / 1.097, 1 / 1.852, 1 / 1225.0584],
        milePerHour: [1.609, 1, 1 / 2.237, 1.467, 1 / 1.151, 1 / 761.2068],
        meterPerSecond: [3.6, 2.237, 1, 3.281, 1.944, 1 / 340.294],
        footPerSecond: [1.097, 1 / 1.467, 1 / 3.281, 1, 1 / 1.688, 1 / 1116.4387],
        knots: [1.852, 1.151, 1 / 1.944, 1.688, 1, 1 / 661.47],
        mach: [1225.0584, 761.2068, 340.294, 1116.4387, 661.47, 1],
    };

    function handleChange(event: ChangeEvent<HTMLInputElement>, unit: keyof typeof speeds) {
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

        const unitIndex = Object.keys(speeds).indexOf(unit);
        if (unitIndex === -1) return; // Safety check

        const newSpeeds: Record<string, string> = {};

        for (const [index, key] of Object.keys(speeds).entries()) {
            if (key === unit) newSpeeds[key] = value;
            else {
                const factor = factors[unit][index];
                newSpeeds[key] = isValueEmpty ? '' : fmt(num * factor);
            }
        }

        setSpeeds((prev) => ({
            ...prev,
            ...newSpeeds,
        }));
    }

    const labels = {
        kilometerPerHour: 'Kilometers per hour (km/h)',
        milePerHour: 'Miles per hour (mph)',
        meterPerSecond: 'Meters per second (m/s)',
        footPerSecond: 'Feet per second (ft/s)',
        knots: 'Knots (kn)',
        mach: 'Mach (Ma)',
    };

    return (
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 last:row-span-full sm:grid-cols-2 md:grid-cols-3">
            {Object.keys(speeds).map((unit) => (
                <div className="space-y-4" key={unit}>
                    <Label htmlFor={unit}>{labels[unit as keyof typeof labels]}</Label>
                    <Input
                        type="text"
                        id={unit}
                        name={unit}
                        value={speeds[unit as keyof typeof speeds]}
                        onChange={(e) => handleChange(e, unit as keyof typeof speeds)}
                        placeholder="0"
                        inputMode="decimal"
                        autoComplete="off"
                    />
                </div>
            ))}
        </div>
    );
}
