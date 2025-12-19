'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, CircleMinusIcon, CirclePlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { z } from 'zod/v4';

const DateAddSubtractSchema = z.object({
    date: z.date('A valid date is required.'),
    action: z.enum(['add', 'subtract'], { error: 'Select a valid action.' }),
    days: z.coerce.number().min(0, 'Days must be 0 or greater.').optional(),
    weeks: z.coerce.number().min(0, 'Weeks must be 0 or greater.').optional(),
    months: z.coerce.number().min(0, 'Months must be 0 or greater.').optional(),
    years: z.coerce.number().min(0, 'Years must be 0 or greater.').optional(),
});

type DateAddSubtractType = z.infer<typeof DateAddSubtractSchema>;

const initialState = (Object.keys(DateAddSubtractSchema.shape) as (keyof DateAddSubtractType)[]).reduce(
    (acc, key) => {
        acc[key] = undefined;
        return acc;
    },
    {} as Record<keyof DateAddSubtractType, string | number | undefined>,
);

export default function DateAddSubtract() {
    const [oldDate, setOldDate] = useState<string | null>(null);
    const [result, setResult] = useState(initialState);

    const form = useForm<DateAddSubtractType>({
        resolver: zodResolver(DateAddSubtractSchema) as Resolver<DateAddSubtractType>,
    });

    function onSubmit(data: DateAddSubtractType) {
        const { action, date, days = 0, weeks = 0, months = 0, years = 0 } = data;

        const newDate = new Date(date);

        if (action === 'add') {
            newDate.setDate(newDate.getDate() + days + weeks * 7);
            newDate.setMonth(newDate.getMonth() + months);
            newDate.setFullYear(newDate.getFullYear() + years);
        } else if (action === 'subtract') {
            newDate.setDate(newDate.getDate() - days - weeks * 7);
            newDate.setMonth(newDate.getMonth() - months);
            newDate.setFullYear(newDate.getFullYear() - years);
        }

        setOldDate(format(date, 'PPP'));

        setResult({
            date: format(newDate, 'PPP'),
            action,
            days,
            weeks,
            months,
            years,
        });
    }

    function resetForm() {
        form.reset();
        setResult(initialState);
        setOldDate(null);
    }

    const inputs = Object.keys(DateAddSubtractSchema.shape).filter((k) => !['action', 'date'].includes(k));

    function formatOffset(res: typeof result) {
        const parts: string[] = [];

        const days = Number(res.days);
        const weeks = Number(res.weeks);
        const months = Number(res.months);
        const years = Number(res.years);

        if (years) parts.push(`${years} year${years > 1 ? 's' : ''}`);
        if (months) parts.push(`${months} month${months > 1 ? 's' : ''}`);
        if (weeks) parts.push(`${weeks} week${weeks > 1 ? 's' : ''}`);
        if (days) parts.push(`${days} day${days > 1 ? 's' : ''}`);

        if (parts.length === 0) return null;
        if (parts.length === 1) return parts[0];
        if (parts.length === 2) return parts.join(' and ');

        const last = parts[parts.length - 1] ?? '';
        return parts.slice(0, -1).join(', ') + ', and ' + last;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Date Add/Subtract</CardTitle>
                <CardDescription>Add or subtract days, weeks, months, or years from a given date.</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Controller
                            control={form.control}
                            name="date"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="flex flex-col">
                                    <FieldLabel htmlFor="calendar">Select a Date</FieldLabel>
                                    <Popover>
                                        <PopoverTrigger id="calendar" asChild>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'pl-3 text-left font-normal max-sm:max-w-[240px] sm:w-full',
                                                    !field.value && 'text-muted-foreground',
                                                )}
                                            >
                                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date < new Date('1900-01-01')}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="action"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor="action">Action</FieldLabel>
                                    </FieldContent>

                                    <Select name={field.name} onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger id="action" aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder="Add/Subtract" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            <SelectItem className="inline-flex items-center gap-x-2" value="add">
                                                <CirclePlusIcon aria-hidden size={16} /> Add
                                            </SelectItem>
                                            <SelectItem className="inline-flex items-center gap-x-2" value="subtract">
                                                <CircleMinusIcon aria-hidden size={16} /> Subtract
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {inputs.map((input) => (
                            <Controller
                                control={form.control}
                                key={input}
                                name={input as keyof Omit<DateAddSubtractType, 'action' | 'date'>}
                                render={({ field, fieldState }) => {
                                    const isInvalid = !!form.formState.errors[input as keyof DateAddSubtractType];
                                    const randomPlaceholder = Math.floor(Math.random() * 100).toString();

                                    const { value, ...rest } = field;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={`input-${input}`} className="text-xs capitalize">
                                                {input}
                                            </FieldLabel>
                                            <Input
                                                id={`input-${input}`}
                                                type="text"
                                                placeholder={`e.g. ${randomPlaceholder}`}
                                                inputMode="decimal"
                                                autoComplete="off"
                                                aria-invalid={isInvalid}
                                                value={value ?? ''}
                                                {...rest}
                                            />
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    );
                                }}
                            />
                        ))}
                    </FieldGroup>

                    <div className="inline-flex items-center gap-x-2">
                        <Button type="submit" aria-label="Calculate Date Add/Subtract">
                            Calculate
                        </Button>
                        <Button variant="secondary" type="button" aria-label="Reset form" onClick={resetForm}>
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>

            <CardFooter className="w-full border-t pt-4">
                {result.date && oldDate ? (
                    <div className="grid flex-1 grid-cols-1 items-end gap-4 sm:grid-cols-3">
                        <div className="grid w-full text-center sm:w-max sm:text-left">
                            <div className="text-xs text-muted-foreground">From</div>
                            <div className="text-sm font-medium">{oldDate}</div>
                        </div>

                        <div className="grid justify-self-center-safe text-center sm:mt-0">
                            <div className="bg-muted/10 text-sm text-muted-foreground">
                                <div className="flex items-center justify-center-safe gap-x-2">
                                    {result.action === 'add' ? (
                                        <CirclePlusIcon aria-hidden size={14} />
                                    ) : (
                                        <CircleMinusIcon aria-hidden size={14} />
                                    )}
                                    <span className="font-medium capitalize">{`${result.action}ed`}</span>
                                </div>

                                <span className="text-xs text-balance text-muted-foreground">
                                    {formatOffset(result)}
                                </span>
                            </div>
                        </div>

                        <div className="grid text-center sm:w-max sm:justify-self-end-safe sm:text-right">
                            <div className="text-xs text-muted-foreground">Result</div>
                            <div className="text-sm font-semibold text-primary">{result.date}</div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full text-center">
                        <p className="mb-2 text-sm text-muted-foreground">
                            Enter a date and select an action to see the result.
                        </p>
                        <p className="text-xs text-muted-foreground/80">
                            Note: Dates before January 1, 1900 are not supported.
                        </p>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
