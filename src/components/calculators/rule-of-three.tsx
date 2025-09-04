"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Resolver, useForm } from "react-hook-form"
import { z } from "zod/v4"

const RuleOfThreeSchema = z.object({
    a: z.coerce.number("Value must be a number.").nonnegative(),
    b: z.coerce.number("Value must be a number.").nonnegative(),
    c: z.coerce.number("Value must be a number.").nonnegative(),
})

type FormValues = z.infer<typeof RuleOfThreeSchema>

export default function RuleOfThree() {
    const [result, setResult] = useState<string | null>(null)

    const form = useForm<FormValues>({
        resolver: zodResolver(RuleOfThreeSchema) as Resolver<FormValues>,
        defaultValues: { a: 0, b: 0, c: 0 },
    })

    const onFormSubmit = (data: z.infer<typeof RuleOfThreeSchema>) => {
        const { a, b, c } = data

        if (Object.values(data).some(value => value === null || value === undefined || isNaN(value) || value <= 0)) {
            alert("Please fill in all fields with valid numbers.")
            return
        }

        const d = (b * c) / a
        setResult(d.toFixed(2))
    }

    return (
        <div className="mx-auto grid max-w-lg">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="flex w-full flex-col">
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="a"
                            render={({ field }) => {
                                const fieldError = form.formState.errors[field.name]
                                const descId = `${field.name}-desc`
                                const errId = `${field.name}-error`
                                const describedBy = fieldError ? descId + " " + errId : descId

                                return (
                                    <FormItem className="relative">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Value A"
                                                inputMode="decimal"
                                                autoComplete="off"
                                                aria-describedby={describedBy}
                                                aria-invalid={!!fieldError}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage
                                            className="absolute rounded-md bg-red-100 px-2 py-1 max-sm:bottom-8 max-sm:left-1 sm:top-8 sm:left-0.5"
                                            id={errId}
                                        />
                                    </FormItem>
                                )
                            }}
                        />
                        <span className="bg-accent text-accent-foreground rounded-md px-6 text-center">is to</span>
                        <FormField
                            control={form.control}
                            name="b"
                            render={({ field }) => {
                                const fieldError = form.formState.errors[field.name]
                                const descId = `${field.name}-desc`
                                const errId = `${field.name}-error`
                                const describedBy = fieldError ? descId + " " + errId : descId

                                return (
                                    <FormItem className="relative">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Value B"
                                                inputMode="decimal"
                                                autoComplete="off"
                                                aria-describedby={describedBy}
                                                aria-invalid={!!fieldError}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage
                                            className="absolute top-8 rounded-md bg-red-100 px-2 py-1 max-sm:left-1 sm:left-0.5"
                                            id={errId}
                                        />
                                    </FormItem>
                                )
                            }}
                        />
                    </div>
                    <p className="text-center text-4xl capitalize max-sm:my-4">as</p>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="c"
                            render={({ field }) => {
                                const fieldError = form.formState.errors[field.name]
                                const descId = `${field.name}-desc`
                                const errId = `${field.name}-error`
                                const describedBy = fieldError ? descId + " " + errId : descId

                                return (
                                    <FormItem className="relative">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Value A"
                                                inputMode="decimal"
                                                autoComplete="off"
                                                aria-describedby={describedBy}
                                                aria-invalid={!!fieldError}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage
                                            className="absolute rounded-md bg-red-100 px-2 py-1 max-sm:bottom-8 max-sm:left-1 sm:top-8 sm:left-0.5"
                                            id={errId}
                                        />
                                    </FormItem>
                                )
                            }}
                        />
                        <span className="bg-accent text-accent-foreground rounded-md px-6 text-center">is to</span>
                        <Input type="text" value={result ?? ""} placeholder="Result" readOnly />
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
                                form.reset()
                                setResult(null)
                            }}>
                            Reset
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
