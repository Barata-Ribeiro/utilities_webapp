import { type ChangeEvent, useId, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Field, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';

export default function PercentOfCalc() {
    const [percentValue, setPercentValue] = useState('');
    const [ofValue, setOfValue] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const componentName = PercentOfCalc.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    const percentValueId = useId();
    const ofValueId = useId();
    const resultId = useId();

    function handleCalculation(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        if (!/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(value) && value !== '' && value !== '-') return;
        const normalized = value.replace(/,/g, '.');
        let num = Number.parseFloat(normalized);
        if (Number.isNaN(num)) num = 0;

        switch (name) {
            case 'percentValue': {
                setPercentValue(value);
                if (ofValue === '' || ofValue === '-') {
                    setResult(null);
                    return;
                }
                const ofNum = Number.parseFloat(ofValue.replace(/,/g, '.'));
                if (Number.isNaN(ofNum)) {
                    setResult(null);
                    return;
                }
                const res = (num / 100) * ofNum;
                setResult(res);
                break;
            }
            case 'ofValue': {
                setOfValue(value);
                if (percentValue === '' || percentValue === '-') {
                    setResult(null);
                    return;
                }
                const percentNum = Number.parseFloat(percentValue.replace(/,/g, '.'));
                if (Number.isNaN(percentNum)) {
                    setResult(null);
                    return;
                }
                const res = (percentNum / 100) * num;
                setResult(res);
                break;
            }
            default:
                break;
        }
    }

    function reset() {
        setPercentValue('');
        setOfValue('');
        setResult(null);
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>What is p% of X?</CardTitle>
                <CardDescription>Calculate the value of p percent of X.</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
                <Field data-invalid={percentValue === '-'}>
                    <FieldLabel htmlFor={percentValueId}>Percent (p%)</FieldLabel>
                    <Input
                        id={percentValueId}
                        name="percentValue"
                        placeholder="e.g. 20"
                        inputMode="decimal"
                        value={percentValue}
                        onChange={handleCalculation}
                        aria-label="Percent value"
                        aria-invalid={percentValue === '-' ? 'true' : undefined}
                        aria-describedby="percent-help"
                    />
                    <p id="percent-help" className="sr-only">
                        Enter the percent value without the percent sign, for example twenty should be 20.
                    </p>
                </Field>

                <Field data-invalid={ofValue === '-'}>
                    <FieldLabel htmlFor={ofValueId}>Of (X)</FieldLabel>
                    <Input
                        id={ofValueId}
                        name="ofValue"
                        inputMode="decimal"
                        placeholder="e.g. 50"
                        value={ofValue}
                        onChange={handleCalculation}
                        aria-label="Base value"
                        aria-invalid={ofValue === '-' ? 'true' : undefined}
                        aria-describedby="of-help"
                    />
                    <p id="of-help" className="sr-only">
                        Enter the base value to calculate the percent of.
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
                        defaultValue={result ?? ''}
                        readOnly
                    />
                </Field>

                <Button variant="outline" onClick={reset} aria-label="Reset calculator">
                    Reset
                </Button>
            </CardContent>

            <CardFooter className="mt-auto border-t pt-4">
                {result ? (
                    <p id={`${componentName}-formula`} className="text-sm font-medium text-muted-foreground">
                        {result} = ({ofValue.replace(/,/g, '.')} ⋅ {percentValue.replace(/,/g, '.')}) / 100
                    </p>
                ) : (
                    <p id={`${componentName}-formula`} className="text-sm font-medium text-muted-foreground">
                        y = (x ⋅ p) / 100
                    </p>
                )}
                <output className="sr-only" aria-live="polite" aria-atomic="true">
                    {result === null ? 'No result' : `Result is ${result}`}
                </output>
            </CardFooter>
        </Card>
    );
}
