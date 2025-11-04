'use client';

import ButtonClipboard from '@/components/button-clipboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useCallback, useEffect, useState } from 'react';

function generateRandomPin(size: number) {
    const bytes = new Uint8Array(size);

    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') crypto.getRandomValues(bytes);
    else for (let i = 0; i < size; i++) bytes[i] = Math.floor(Math.random() * 256);

    return Array.from(bytes)
        .map((b) => String(b % 10))
        .join('');
}

export default function PinGenerator() {
    const [pinSize, setPinSize] = useState(3);
    const [pin, setPin] = useState(() => generateRandomPin(3));

    const generatePin = useCallback((size: number) => setPin(generateRandomPin(size)), []);

    useEffect(() => {
        const id = setTimeout(() => generatePin(pinSize), 5);
        return () => clearTimeout(id);
    }, [generatePin, pinSize]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Pin Generator</CardTitle>
                <CardDescription>Generate secure PINs for enhanced security.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex flex-col items-center rounded-md border p-4">
                    <div className="font-mono text-2xl tracking-widest">{pin ?? '•••'}</div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="pin-size" className="text-sm font-medium">
                        PIN Length: {pinSize}
                    </label>
                    <Slider
                        id="pin-size"
                        value={[pinSize]}
                        onValueChange={(value) => setPinSize(value[0])}
                        min={3}
                        max={12}
                        step={1}
                    />
                </div>
            </CardContent>

            <CardFooter className="flex w-full items-center justify-between gap-2">
                <Button type="button" onClick={() => generatePin(pinSize)} aria-label="Generate PIN">
                    Refresh
                </Button>

                <ButtonClipboard size="default" variant="outline" content={pin} />
            </CardFooter>
        </Card>
    );
}
