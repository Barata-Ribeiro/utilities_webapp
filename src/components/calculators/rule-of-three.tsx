'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { z } from 'zod/v4';

const RuleOfThreeSchema = z.object({
    a: z.coerce.number('Value must be a number.').nonnegative(),
    b: z.coerce.number('Value must be a number.').nonnegative(),
    c: z.coerce.number('Value must be a number.').nonnegative(),
});

type FormValues = z.infer<typeof RuleOfThreeSchema>;

export default function RuleOfThree() {
    const [result, setResult] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(RuleOfThreeSchema) as Resolver<FormValues>,
        defaultValues: { a: 0, b: 0, c: 0 },
    });

    const onFormSubmit = (data: z.infer<typeof RuleOfThreeSchema>) => {
        const { a, b, c } = data;

        if (
            Object.values(data).some(
                (value) => value === null || value === undefined || Number.isNaN(value) || value <= 0,
            )
        ) {
            alert('Please fill in all fields with valid numbers.');
            return;
        }

        const d = (b * c) / a;
        setResult(d.toFixed(2));
    };

    return (
        <div className="mx-auto grid max-w-lg">
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="flex w-full flex-col">
                <FieldGroup className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
                    <Controller
                        control={form.control}
                        name="a"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="relative">
                                <Input
                                    type="text"
                                    placeholder="Value A"
                                    inputMode="decimal"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    {...field}
                                />
                                {fieldState.error && (
                                    <FieldError
                                        className="absolute rounded-md bg-red-100 px-2 py-1 max-sm:bottom-8 max-sm:left-1 sm:top-8 sm:left-0.5"
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                    <span className="rounded-md bg-accent px-6 text-center text-accent-foreground">is to</span>
                    <Controller
                        control={form.control}
                        name="b"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="relative">
                                <Input
                                    type="text"
                                    placeholder="Value B"
                                    inputMode="decimal"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    {...field}
                                />
                                {fieldState.error && (
                                    <FieldError
                                        className="absolute rounded-md bg-red-100 px-2 py-1 max-sm:bottom-8 max-sm:left-1 sm:top-8 sm:left-0.5"
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <p className="text-center text-4xl capitalize max-sm:my-4">as</p>
                <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
                    <Controller
                        control={form.control}
                        name="c"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="relative">
                                <Input
                                    type="text"
                                    placeholder="Value C"
                                    inputMode="decimal"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    {...field}
                                />
                                {fieldState.error && (
                                    <FieldError
                                        className="absolute rounded-md bg-red-100 px-2 py-1 max-sm:bottom-8 max-sm:left-1 sm:top-8 sm:left-0.5"
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                    <span className="rounded-md bg-accent px-6 text-center text-accent-foreground">is to</span>
                    <Input type="text" value={result ?? ''} placeholder="Result" readOnly />
                </div>

                <div className="mx-auto mt-6 inline-flex items-center gap-x-2">
                    <Button type="submit" aria-label="Calculate Rule of Three">
                        Calculate
                    </Button>
                    <Button
                        variant="secondary"
                        type="button"
                        aria-label="Reset form"
                        onClick={() => {
                            form.reset();
                            setResult(null);
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    );
}
