import { type ChangeEvent, useId, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

const Action = {
    INCREASE: 'increase',
    DECREASE: 'decrease',
} as const;

type Action = (typeof Action)[keyof typeof Action];

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
                <FieldGroup>
                    <Field data-invalid={value === '-'}>
                        <FieldLabel htmlFor={valueId}>Value (X)</FieldLabel>
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
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={actionId}>Action</FieldLabel>
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
                    </Field>
                </FieldGroup>
                <Field data-invalid={percentChange === '-'}>
                    <FieldLabel htmlFor={percentChangeId}>p% of what?</FieldLabel>
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
                </Field>

                <Field>
                    <FieldLabel htmlFor={resultId}>Result (Y)</FieldLabel>
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
                </Field>

                <Button variant="outline" onClick={reset} aria-label="Reset calculator">
                    Reset
                </Button>
            </CardContent>

            <CardFooter className="mt-auto border-t pt-4">
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
