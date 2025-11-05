'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type ChangeEvent, useId, useState } from 'react';

enum Action {
    INCREASE = 'increase',
    DECREASE = 'decrease',
}

export default function ValueIncreaseDecreasePercent() {
    const [value, setValue] = useState('');
    const [percentChange, setPercentChange] = useState('');
    const [action, setAction] = useState<Action>(Action.INCREASE);
    const [result, setResult] = useState<number | null>(null);

    const componentName = ValueIncreaseDecreasePercent.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    const valueId = useId();
    const percentChangeId = useId();
    const actionId = useId();
    const resultId = useId();

    function handleCalculation(event: ChangeEvent<HTMLInputElement>) {
        const { name, value: raw } = event.target;

        if (!/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(raw) && raw !== '' && raw !== '-') return;
        const normalized = raw.replace(/,/g, '.');
        let inputNum = Number.parseFloat(normalized);
        if (Number.isNaN(inputNum)) inputNum = 0;

        switch (name) {
            case 'value': {
                setValue(raw);
                if (percentChange === '' || percentChange === '-') {
                    setResult(null);
                    return;
                }
                const percentNum = Number.parseFloat(percentChange.replace(/,/g, '.'));
                if (Number.isNaN(percentNum)) {
                    setResult(null);
                    return;
                }
                const res =
                    action === Action.INCREASE ? inputNum * (1 + percentNum / 100) : inputNum * (1 - percentNum / 100);
                setResult(Number(res.toFixed(2)));
                break;
            }
            case 'percentChange': {
                setPercentChange(raw);
                if (raw === '' || raw === '-') {
                    setResult(null);
                    return;
                }
                const percentNum = Number.parseFloat(raw.replace(/,/g, '.'));
                if (Number.isNaN(percentNum)) {
                    setResult(null);
                    return;
                }
                const valueNum = Number.parseFloat(value.replace(/,/g, '.'));
                if (Number.isNaN(valueNum)) {
                    setResult(null);
                    return;
                }
                const res =
                    action === Action.INCREASE ? valueNum * (1 + percentNum / 100) : valueNum * (1 - percentNum / 100);
                setResult(Number(res.toFixed(2)));
                break;
            }
            default:
                break;
        }
    }

    function handleActionChange(newAction: Action) {
        setAction(newAction);
        if (value === '' || value === '-' || percentChange === '' || percentChange === '-') {
            setResult(null);
            return;
        }
        const valueNum = Number.parseFloat(value.replace(/,/g, '.'));
        const percentNum = Number.parseFloat(percentChange.replace(/,/g, '.'));
        if (Number.isNaN(valueNum) || Number.isNaN(percentNum)) {
            setResult(null);
            return;
        }
        const res =
            newAction === Action.INCREASE ? valueNum * (1 + percentNum / 100) : valueNum * (1 - percentNum / 100);
        setResult(Number(res.toFixed(2)));
    }

    function reset() {
        setValue('');
        setPercentChange('');
        setAction(Action.INCREASE);
        setResult(null);
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>What is x increased/decreased by p%?</CardTitle>
                <CardDescription>Find out the increased/decreased value of p% of x.</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                        <Label htmlFor={valueId}>Value (X)</Label>
                        <Input
                            id={valueId}
                            name="value"
                            inputMode="decimal"
                            placeholder="e.g. 50"
                            aria-invalid={value === '-' ? 'true' : undefined}
                            aria-describedby="value-help"
                            value={value}
                            aria-label="Initial value"
                            onChange={handleCalculation}
                        />
                        <p id="value-help" className="sr-only">
                            Enter the initial value you want to increase or decrease.
                        </p>
                    </div>
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
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={percentChangeId}>p% of what?</Label>
                    <Input
                        id={percentChangeId}
                        name="percentChange"
                        inputMode="decimal"
                        placeholder="e.g. 70"
                        aria-invalid={percentChange === '-' ? 'true' : undefined}
                        aria-describedby="of-help"
                        value={percentChange}
                        aria-label="Percent change"
                        onChange={handleCalculation}
                    />
                    <p id="of-help" className="sr-only">
                        Enter the value which represents the percentage change without the percent sign, for example
                        seventy should be 70.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={resultId}>Result (Y)</Label>
                    <Input
                        id={resultId}
                        name="result"
                        placeholder="Result"
                        aria-readonly="true"
                        aria-label="Calculation result"
                        aria-describedby={`${componentName}-formula`}
                        className="font-bold"
                        value={result === null ? '' : String(Number(result.toFixed(2)))}
                        readOnly
                    />
                </div>

                <Button variant="outline" onClick={reset} aria-label="Reset calculator">
                    Reset
                </Button>
            </CardContent>

            <CardFooter className="border-t pt-4">
                {result === null ? (
                    <p id={`${componentName}-formula`} className="text-sm font-medium text-muted-foreground">
                        y = ± x (100 + p) / 100
                    </p>
                ) : (
                    <p id={`${componentName}-formula`} className="text-sm font-medium text-muted-foreground">
                        {result} = ({value.replace(/,/g, '.')} ⋅ (100 {action === Action.INCREASE ? '+' : '-'}{' '}
                        {percentChange.replace(/,/g, '.')})) / 100
                    </p>
                )}
                <output className="sr-only" aria-live="polite" aria-atomic="true">
                    {result === null ? 'No result' : `Result is ${result}`}
                </output>
            </CardFooter>
        </Card>
    );
}
