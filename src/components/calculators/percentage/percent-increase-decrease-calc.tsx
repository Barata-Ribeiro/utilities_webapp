'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type ChangeEvent, useId, useState } from 'react';

enum Action {
    INCREASE = 'Increase',
    DECREASE = 'Decrease',
}

export default function PercentIncreaseDecreaseCalc() {
    const [initialValue, setInitialValue] = useState('');
    const [finalValue, setFinalValue] = useState('');
    const [action, setAction] = useState<Action>(Action.INCREASE);
    const [result, setResult] = useState<number | null>(null);

    const componentName = PercentIncreaseDecreaseCalc.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    const initialValueId = useId();
    const finalValueId = useId();
    const actionId = useId();
    const resultId = useId();

    function reset() {
        setInitialValue('');
        setFinalValue('');
        setAction(Action.INCREASE);
        setResult(null);
    }

    function handleCalculation(event: ChangeEvent<HTMLInputElement>) {
        const { name, value: raw } = event.target;

        if (!/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(raw) && raw !== '' && raw !== '-') return;
        const normalized = raw.replace(/,/g, '.');
        let inputNum = parseFloat(normalized);
        if (isNaN(inputNum)) inputNum = 0;

        switch (name) {
            case 'initialValue': {
                setInitialValue(raw);
                if (finalValue === '' || finalValue === '-') {
                    setResult(null);
                    return;
                }
                const finalNum = parseFloat(finalValue.replace(/,/g, '.'));
                if (isNaN(finalNum) || inputNum === 0) {
                    setResult(null);
                    return;
                }
                const base = (100 * (finalNum - inputNum)) / Math.abs(inputNum);
                const res = action === Action.DECREASE ? -base : base;
                setResult(res);
                break;
            }
            case 'finalValue': {
                setFinalValue(raw);
                if (initialValue === '' || initialValue === '-') {
                    setResult(null);
                    return;
                }
                const initialNum = parseFloat(initialValue.replace(/,/g, '.'));
                if (isNaN(initialNum) || initialNum === 0) {
                    setResult(null);
                    return;
                }
                const base = (100 * (inputNum - initialNum)) / Math.abs(initialNum);
                const res = action === Action.DECREASE ? -base : base;
                setResult(res);
                break;
            }
            default:
                break;
        }
    }

    function handleActionChange(newAction: Action) {
        setAction(newAction);
        if (initialValue === '' || initialValue === '-' || finalValue === '' || finalValue === '-') {
            setResult(null);
            return;
        }
        const initialNum = parseFloat(initialValue.replace(/,/g, '.'));
        const finalNum = parseFloat(finalValue.replace(/,/g, '.'));
        if (isNaN(initialNum) || isNaN(finalNum) || initialNum === 0) {
            setResult(null);
            return;
        }
        const base = (100 * (finalNum - initialNum)) / Math.abs(initialNum);
        const res = newAction === Action.DECREASE ? -base : base;
        setResult(res);
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Percentage Increase/Decrease</CardTitle>
                <CardDescription>Calculate the percentage increase or decrease between two values.</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor={initialValueId}>Initial Value</Label>
                        <Input
                            id={initialValueId}
                            name="initialValue"
                            inputMode="decimal"
                            placeholder="e.g. 80"
                            aria-invalid={initialValue === '-' ? 'true' : undefined}
                            aria-describedby="initial-value-help"
                            value={initialValue}
                            aria-label="Initial value"
                            onChange={handleCalculation}
                        />
                        <p id="initial-value-help" className="sr-only">
                            Enter the initial value.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor={finalValueId}>Final Value</Label>
                        <Input
                            id={finalValueId}
                            name="finalValue"
                            inputMode="decimal"
                            placeholder="e.g. 20"
                            aria-invalid={finalValue === '-' ? 'true' : undefined}
                            aria-describedby="final-value-help"
                            value={finalValue}
                            aria-label="Final value"
                            onChange={handleCalculation}
                        />
                        <p id="final-value-help" className="sr-only">
                            Enter the final value.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex sm:flex-row">
                    <div className="grid gap-2">
                        <Label htmlFor={actionId}>Action</Label>
                        <Select
                            name="action"
                            value={action}
                            onValueChange={(val) => handleActionChange(val as Action)}
                            aria-label="Select action"
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Increase/Decrease" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="inline-flex items-center gap-x-2" value={Action.INCREASE}>
                                    Increase
                                </SelectItem>
                                <SelectItem className="inline-flex items-center gap-x-2" value={Action.DECREASE}>
                                    Decrease
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid w-full gap-2">
                        <Label htmlFor={resultId}>{action} (%)</Label>
                        <Input
                            id={resultId}
                            name="result"
                            placeholder="Result"
                            aria-readonly="true"
                            aria-label="Calculation result"
                            aria-describedby={`${componentName}-formula`}
                            className="font-bold"
                            value={result !== null ? String(Number(result.toFixed(2))) : ''}
                            readOnly
                        />
                    </div>
                </div>

                <Button variant="outline" onClick={reset} aria-label="Reset calculator">
                    Reset
                </Button>
            </CardContent>

            <CardFooter className="border-t pt-4">
                {result === null ? (
                    <p id={`${componentName}-formula`} className="text-sm font-medium text-muted-foreground">
                        p = 100 ⋅ (Vf ± Vi) / |Vi|
                    </p>
                ) : (
                    <p id={`${componentName}-formula`} className="grid w-full gap-1">
                        <span className="text-sm font-medium text-muted-foreground">
                            {result} = 100 ⋅ ({finalValue.replace(/,/g, '.')} {action === Action.INCREASE ? '+' : '-'}{' '}
                            {initialValue.replace(/,/g, '.')}) / |{initialValue.replace(/,/g, '.')}|
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                            {finalValue.replace(/,/g, '.')} is a{' '}
                            <strong>
                                {result}% {action}
                            </strong>{' '}
                            from {initialValue.replace(/,/g, '.')}.
                        </span>
                    </p>
                )}
                <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                    {result !== null ? `Result is ${result}` : 'No result'}
                </div>
            </CardFooter>
        </Card>
    );
}
