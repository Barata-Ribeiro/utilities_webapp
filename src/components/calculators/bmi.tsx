'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeAlertIcon, BadgeCheckIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod/v4';

const BmiSchema = z.object({
    weight: z.coerce
        .number('Weight must be a number.')
        .min(1, { message: 'Weight must be at least 1 kg.' })
        .max(500, { message: 'Weight must be at most 500 kg.' }),
    height: z.coerce
        .number('Height must be a number.')
        .min(30, { message: 'Height must be at least 30 cm.' })
        .max(300, { message: 'Height must be at most 300 cm.' }),
});

type BmiSchemaType = z.infer<typeof BmiSchema>;

interface BmiResult {
    bmi: number | null;
    height: number | null;
    weight: number | null;
}

function getProgressBarValue(bmi: number) {
    if (bmi < 16) return 0;
    else if (bmi >= 16 && bmi < 18.5) return ((bmi - 16) / 2.5) * 25;
    else if (bmi >= 18.5 && bmi < 25) return 25 + ((bmi - 18.5) / 6.5) * 25;
    else if (bmi >= 25 && bmi < 30) return 50 + ((bmi - 25) / 5) * 25;
    else if (bmi >= 30 && bmi < 40) return 75 + ((bmi - 30) / 10) * 25;
    else return 100;
}

function getBmiCategory(bmi: number) {
    if (bmi < 16) return 'Severely Underweight';
    else if (bmi >= 16 && bmi < 18.5) return 'Underweight';
    else if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
    else if (bmi >= 25 && bmi <= 39.9) return 'Overweight';
    else return 'Obese';
}

export default function Bmi() {
    const [bmi, setBmi] = useState<BmiResult>({ bmi: null, height: null, weight: null });

    const form = useForm<BmiSchemaType>({
        resolver: zodResolver(BmiSchema) as Resolver<BmiSchemaType>,
        defaultValues: { weight: 0, height: 0 },
    });

    function onFormSubmit(data: BmiSchemaType) {
        const heightInMeters = data.height / 100;
        const calculatedBmi = data.weight / (heightInMeters * heightInMeters);
        setBmi({ bmi: Number.parseFloat(calculatedBmi.toFixed(2)), height: data.height, weight: data.weight });
    }

    const badgeStyle = {
        'Severely Underweight': cn`bg-red-500 text-white dark:bg-red-700`,
        Underweight: cn`bg-yellow-500 text-black dark:bg-yellow-200`,
        'Normal weight': cn`bg-green-500 text-white dark:bg-green-700`,
        Overweight: cn`bg-yellow-500 text-black dark:bg-yellow-200`,
        Obese: cn`bg-red-500 text-white dark:bg-red-700`,
    };

    return (
        <div className="mx-auto grid max-w-4xl">
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4">
                <FieldGroup className="grid gap-4 sm:grid-cols-2" aria-label="BMI inputs">
                    <Controller
                        control={form.control}
                        name="height"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className="text-xs" htmlFor="height">
                                    Height
                                </FieldLabel>
                                <Input
                                    id="height"
                                    type="text"
                                    placeholder="e.g. 170"
                                    inputMode="decimal"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    {...field}
                                />
                                {fieldState.error ? (
                                    <FieldError errors={[fieldState.error]} />
                                ) : (
                                    <FieldDescription className="text-xs">
                                        Enter your height in centimeters (cm).
                                    </FieldDescription>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="weight"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className="text-xs" htmlFor="weight">
                                    Weight
                                </FieldLabel>
                                <Input
                                    id="weight"
                                    type="text"
                                    placeholder="e.g. 65"
                                    inputMode="decimal"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    {...field}
                                />
                                {fieldState.error ? (
                                    <FieldError errors={[fieldState.error]} />
                                ) : (
                                    <FieldDescription className="text-xs">
                                        Enter your weight in kilograms (kg).
                                    </FieldDescription>
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                <div className="mx-auto inline-flex items-center gap-x-2">
                    <Button type="submit" aria-label="Calculate BMI">
                        Calculate
                    </Button>
                    <Button
                        variant="secondary"
                        type="button"
                        aria-label="Reset BMI form"
                        onClick={() => {
                            form.reset();
                            setBmi({ bmi: null, height: null, weight: null });
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </form>

            {bmi.bmi && (
                <Card className="mx-auto mt-4 w-full max-w-md" aria-labelledby="bmi-card-title">
                    <CardHeader>
                        <CardTitle id="bmi-card-title">BMI</CardTitle>
                        <CardDescription>Body Mass Index</CardDescription>
                    </CardHeader>

                    <CardContent className="grid space-y-6">
                        <p className="text-center text-4xl font-bold" aria-live="polite" aria-atomic="true">
                            {bmi.bmi}
                        </p>

                        <Badge
                            variant="secondary"
                            className={twMerge('mx-auto select-none', badgeStyle[getBmiCategory(bmi.bmi)])}
                        >
                            {getBmiCategory(bmi.bmi) === 'Normal weight' ? (
                                <BadgeCheckIcon aria-hidden />
                            ) : (
                                <BadgeAlertIcon aria-hidden />
                            )}
                            {getBmiCategory(bmi.bmi)}
                        </Badge>

                        <div className="grid gap-1.5">
                            <Progress
                                value={getProgressBarValue(bmi.bmi)}
                                aria-label="BMI progress"
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={getProgressBarValue(bmi.bmi)}
                            />
                            <small className="inline-flex w-full justify-between text-xs text-muted-foreground">
                                <span>16</span>
                                <span>18.5</span>
                                <span>25</span>
                                <span>30</span>
                                <span>40</span>
                            </small>
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                        <p>Weight: {bmi.weight} kg</p>
                        <p>Height: {bmi.height} cm</p>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
