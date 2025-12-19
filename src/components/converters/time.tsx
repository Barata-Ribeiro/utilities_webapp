'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ChangeEvent, useState } from 'react';

export default function Time() {
    const [times, setTimes] = useState({
        nanosecond: '',
        microsecond: '',
        millisecond: '',
        second: '',
        minute: '',
        hour: '',
        day: '',
        week: '',
        month: '',
        year: '',
        decade: '',
        century: '',
    });

    const factors = {
        nanosecond: [
            1,
            1e-3,
            1e-6,
            1e-9,
            1 / 6e10,
            1 / 3.6e12,
            1 / 8.64e13,
            1 / 6.048e14,
            1 / 2.628e15,
            1 / 3.154e16,
            1 / 3.154e17,
            1 / 3.154e18,
        ],
        microsecond: [
            1e3,
            1,
            1e-3,
            1e-6,
            1 / 6e7,
            1 / 3.6e9,
            1 / 8.64e10,
            1 / 6.048e11,
            1 / 2.628e12,
            1 / 3.154e13,
            1 / 3.154e14,
            1 / 3.154e15,
        ],
        millisecond: [
            1e6,
            1e3,
            1,
            1e-3,
            1 / 60000,
            1 / 3.6e6,
            1 / 8.64e7,
            1 / 6.048e8,
            1 / 2.628e9,
            1 / 3.154e10,
            1 / 3.154e11,
            1 / 3.154e12,
        ],
        second: [
            1e9,
            1e6,
            1e3,
            1,
            1 / 60,
            1 / 3600,
            1 / 86400,
            1 / 604800,
            1 / 2.628e6,
            1 / 3.154e7,
            1 / 3.154e8,
            1 / 3.154e9,
        ],
        minute: [6e10, 6e7, 60000, 60, 1, 1 / 60, 1 / 1440, 1 / 10080, 1 / 43800, 1 / 525600, 1 / 5.256e6, 1 / 5.256e7],
        hour: [3.6e12, 3.6e9, 3.6e6, 3600, 60, 1, 1 / 24, 1 / 168, 1 / 730, 1 / 8760, 1 / 87600, 1 / 876000],
        day: [8.64e13, 8.64e10, 8.64e7, 86400, 1440, 24, 1, 1 / 7, 1 / 30.44, 1 / 365.25, 1 / 3652.5, 1 / 36525],
        week: [6.048e14, 6.048e11, 6.048e8, 604800, 10080, 168, 7, 1, 1 / 4.348, 1 / 52.178, 1 / 521.78, 1 / 5217.8],
        month: [2.628e15, 2.628e12, 2.628e9, 2.628e6, 43800, 730, 30.44, 4.348, 1, 1 / 12, 1 / 120, 1 / 1200],
        year: [3.154e16, 3.154e13, 3.154e10, 3.154e7, 525600, 8760, 365.25, 52.178, 12, 1, 1 / 10, 1 / 100],
        decade: [3.154e17, 3.154e14, 3.154e11, 3.154e8, 5.256e6, 87600, 3652.5, 521.78, 120, 10, 1, 1 / 10],
        century: [3.154e18, 3.154e15, 3.154e12, 3.154e9, 5.256e7, 876000, 36525, 5217.8, 1200, 100, 10, 1],
    };

    function handleChange(event: ChangeEvent<HTMLInputElement>, unit: keyof typeof times) {
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

        const unitIndex = Object.keys(times).indexOf(unit);
        if (unitIndex === -1) return; // Safety check

        const newTimes: Record<string, string> = {};

        for (const [index, key] of Object.keys(times).entries()) {
            if (key === unit) newTimes[key] = value;
            else {
                const factor = factors[unit][index];
                newTimes[key] = isValueEmpty ? '' : fmt(num * factor);
            }
        }

        setTimes((prev) => ({
            ...prev,
            ...newTimes,
        }));
    }

    const labels = {
        nanosecond: 'Nanoseconds (ns)',
        microsecond: 'Microseconds (µs)',
        millisecond: 'Milliseconds (ms)',
        second: 'Seconds (s)',
        minute: 'Minutes (min)',
        hour: 'Hours (h)',
        day: 'Days (d)',
        week: 'Weeks (wk)',
        month: 'Months (mo)',
        year: 'Years (yr)',
        decade: 'Decades (dec)',
        century: 'Centuries (cen)',
    };

    return (
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 last:row-span-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.keys(times).map((unit) => (
                <div className="space-y-4" key={unit}>
                    <Label htmlFor={unit}>{labels[unit as keyof typeof labels]}</Label>
                    <Input
                        type="text"
                        id={unit}
                        name={unit}
                        value={times[unit as keyof typeof times]}
                        onChange={(e) => handleChange(e, unit as keyof typeof times)}
                        placeholder="0"
                        inputMode="decimal"
                        autoComplete="off"
                    />
                </div>
            ))}
        </div>
    );
}
