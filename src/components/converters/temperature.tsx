'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, useState } from 'react';

export default function Temperature() {
    const [temp, setTemp] = useState({
        fahrenheit: '',
        celsius: '',
        kelvin: '',
    });

    const factors = {
        fahrenheit: {
            celsius: (value: number) => (value - 32) * (5 / 9),
            kelvin: (value: number) => (value - 32) * (5 / 9) + 273.15,
        },
        celsius: {
            fahrenheit: (value: number) => value * (9 / 5) + 32,
            kelvin: (value: number) => value + 273.15,
        },
        kelvin: {
            fahrenheit: (value: number) => (value - 273.15) * (9 / 5) + 32,
            celsius: (value: number) => value - 273.15,
        },
    } as const;

    function handleChange(event: ChangeEvent<HTMLInputElement>, scale: 'fahrenheit' | 'celsius' | 'kelvin') {
        const value = event.target.value;
        if (!/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(value) && value !== '' && value !== '-') return;

        const usesComma = value.includes(',');
        const normalized = value.replace(/,/g, '.');

        let num = Number.parseFloat(normalized);
        if (Number.isNaN(num)) num = 0;

        const isValueEmpty = value === '' || value === '-';

        const fmt = (n: number) => {
            const out = n.toFixed(2);
            return usesComma ? out.replace('.', ',') : out;
        };

        switch (scale) {
            case 'fahrenheit':
                setTemp((prev) => ({
                    ...prev,
                    fahrenheit: value,
                    celsius: isValueEmpty ? '' : fmt(factors.fahrenheit.celsius(num)),
                    kelvin: isValueEmpty ? '' : fmt(factors.fahrenheit.kelvin(num)),
                }));
                break;
            case 'celsius':
                setTemp((prev) => ({
                    ...prev,
                    celsius: value,
                    fahrenheit: isValueEmpty ? '' : fmt(factors.celsius.fahrenheit(num)),
                    kelvin: isValueEmpty ? '' : fmt(factors.celsius.kelvin(num)),
                }));
                break;
            case 'kelvin':
                setTemp((prev) => ({
                    ...prev,
                    kelvin: value,
                    fahrenheit: isValueEmpty ? '' : fmt(factors.kelvin.fahrenheit(num)),
                    celsius: isValueEmpty ? '' : fmt(factors.kelvin.celsius(num)),
                }));
                break;
        }
    }

    return (
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-4">
                <Label>Fahrenheit (ºF)</Label>
                <Input
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="32"
                    value={temp.fahrenheit}
                    onChange={(e) => handleChange(e, 'fahrenheit')}
                />
            </div>

            <div className="space-y-4">
                <Label>Celsius (ºC)</Label>
                <Input
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="0"
                    value={temp.celsius}
                    onChange={(e) => handleChange(e, 'celsius')}
                />
            </div>

            <div className="space-y-4">
                <Label>Kelvin (K)</Label>
                <Input
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="273.15"
                    value={temp.kelvin}
                    onChange={(e) => handleChange(e, 'kelvin')}
                />
            </div>
        </div>
    );
}
