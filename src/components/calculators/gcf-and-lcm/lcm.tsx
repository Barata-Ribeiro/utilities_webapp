'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { lcm } from 'mathjs';
import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod/v4';

const LCMSchema = z
    .object({
        input1: z.coerce.number('Input must be a number.'),
        input2: z.coerce.number('Input must be a number.'),
        input3: z.coerce.number('Input must be a number.'),
        input4: z.coerce.number('Input must be a number.'),
        input5: z.coerce.number('Input must be a number.'),
        input6: z.coerce.number('Input must be a number.'),
    })
    .refine(
        (data) => {
            const inputs = [data.input1, data.input2, data.input3, data.input4, data.input5, data.input6];
            return inputs.some((num) => !isNaN(num) && num > 0);
        },
        {
            path: ['input1'],
            error: 'At least one positive integer is required.',
        },
    );

type LCMInput = z.infer<typeof LCMSchema>;

export default function Lcm() {
    const [result, setResult] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const form = useForm<LCMInput>({
        resolver: zodResolver(LCMSchema) as Resolver<LCMInput>,
        defaultValues: { input1: 12, input2: 9, input3: 0, input4: 0, input5: 0, input6: 0 },
    });

    function onSubmit(data: LCMInput) {
        const { input1, input2, input3, input4, input5, input6 } = data;
        const inputs = [input1, input2, input3, input4, input5, input6].filter((num) => !isNaN(num) && num > 0);

        if (inputs.length === 0) {
            setMessage('Please enter at least one positive integer.');
            setResult(null);
            return;
        }

        const lcmResult = inputs.reduce((acc, val) => lcm(acc, val), 1);

        setResult(lcmResult);
        setMessage(`The LCM of (${inputs.join(', ')}) is ${lcmResult}.`);
    }

    function resetForm() {
        form.reset();
        setResult(null);
        setMessage(null);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Least Common Multiple (LCM) Calculator</CardTitle>
                <CardDescription>Calculate the Least Common Multiple of up to 6 numbers.</CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(6,auto)]">
                            {Object.keys(LCMSchema.shape).map((key, index) => (
                                <FormField
                                    key={key}
                                    control={form.control}
                                    name={key as keyof LCMInput}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder={`Input ${index + 1}`}
                                                    inputMode="decimal"
                                                    autoComplete="off"
                                                    aria-invalid={!!form.formState.errors[field.name]}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="col-span-full" />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        <div className="space-x-2">
                            <Button type="submit" aria-label="Calculate LCM">
                                Calculate
                            </Button>
                            <Button variant="secondary" type="button" aria-label="Reset form" onClick={resetForm}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>

            <CardFooter className="grid gap-2 border-t pt-4">
                {result && message && (
                    <>
                        <p className="text-lg">LCM: {result}</p>
                        <p className="text-sm text-muted-foreground">{message}</p>
                    </>
                )}
                {(!result || !message) && (
                    <p className="text-center text-sm text-muted-foreground">
                        Enter values and click <strong>Calculate</strong> to see the LCM.
                    </p>
                )}
            </CardFooter>
        </Card>
    );
}
