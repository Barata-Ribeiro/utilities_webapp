"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { BadgeAlertIcon, BadgeCheckIcon } from "lucide-react"
import { useState } from "react"
import { Resolver, useForm } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { z } from "zod/v4"

const BmiSchema = z.object({
    weight: z.coerce
        .number("Weight must be a number.")
        .min(1, { message: "Weight must be at least 1 kg." })
        .max(500, { message: "Weight must be at most 500 kg." }),
    height: z.coerce
        .number("Height must be a number.")
        .min(30, { message: "Height must be at least 30 cm." })
        .max(300, { message: "Height must be at most 300 cm." }),
})

type BmiSchemaType = z.infer<typeof BmiSchema>

interface BmiResult {
    bmi: number | null
    height: number | null
    weight: number | null
}

export default function Bmi() {
    const [bmi, setBmi] = useState<BmiResult>({ bmi: null, height: null, weight: null })

    const form = useForm<BmiSchemaType>({
        resolver: zodResolver(BmiSchema) as Resolver<BmiSchemaType>,
        defaultValues: { weight: 0, height: 0 },
    })

    function onFormSubmit(data: BmiSchemaType) {
        const heightInMeters = data.height / 100
        const calculatedBmi = data.weight / (heightInMeters * heightInMeters)
        setBmi({ bmi: parseFloat(calculatedBmi.toFixed(2)), height: data.height, weight: data.weight })
    }

    function getProgressBarValue(bmi: number) {
        if (bmi < 16) return 0
        else if (bmi >= 16 && bmi < 18.5) return ((bmi - 16.0) / 2.5) * 25
        else if (bmi >= 18.5 && bmi < 25) return 25 + ((bmi - 18.5) / 6.5) * 25
        else if (bmi >= 25 && bmi < 30) return 50 + ((bmi - 25.0) / 5) * 25
        else if (bmi >= 30 && bmi < 40) return 75 + ((bmi - 30.0) / 10) * 25
        else return 100
    }

    function getBmiCategory(bmi: number) {
        if (bmi < 16) return "Severely Underweight"
        else if (bmi >= 16 && bmi < 18.5) return "Underweight"
        else if (bmi >= 18.5 && bmi <= 24.9) return "Normal weight"
        else if (bmi >= 25 && bmi <= 39.9) return "Overweight"
        else return "Obese"
    }

    const badgeStyle = {
        "Severely Underweight": cn`bg-red-500 text-white dark:bg-red-700`,
        Underweight: cn`bg-yellow-500 text-black dark:bg-yellow-200`,
        "Normal weight": cn`bg-green-500 text-white dark:bg-green-700`,
        Overweight: cn`bg-yellow-500 text-black dark:bg-yellow-200`,
        Obese: cn`bg-red-500 text-white dark:bg-red-700`,
    }

    return (
        <div className="mx-auto grid max-w-4xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4">
                    <fieldset className="grid gap-4 sm:grid-cols-2" aria-label="BMI inputs">
                        <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => {
                                const fieldError = form.formState.errors[field.name]
                                const descId = `${field.name}-desc`
                                const errId = `${field.name}-error`
                                const describedBy = fieldError ? descId + " " + errId : descId

                                return (
                                    <FormItem>
                                        <FormLabel className="text-xs" htmlFor={field.name}>
                                            Height
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="e.g. 170"
                                                inputMode="decimal"
                                                autoComplete="off"
                                                aria-describedby={describedBy}
                                                aria-invalid={!!fieldError}
                                                {...field}
                                            />
                                        </FormControl>
                                        {!fieldError && (
                                            <FormDescription id={descId} className="text-xs">
                                                Enter your height in centimeters (cm).
                                            </FormDescription>
                                        )}
                                        <FormMessage id={errId} />
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => {
                                const fieldError = form.formState.errors[field.name]
                                const descId = `${field.name}-desc`
                                const errId = `${field.name}-error`
                                const describedBy = fieldError ? descId + " " + errId : descId

                                return (
                                    <FormItem>
                                        <FormLabel className="text-xs" htmlFor={field.name}>
                                            Weight
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="e.g. 65"
                                                inputMode="decimal"
                                                autoComplete="off"
                                                aria-describedby={describedBy}
                                                aria-invalid={!!fieldError}
                                                {...field}
                                            />
                                        </FormControl>
                                        {!fieldError && (
                                            <FormDescription id={descId} className="text-xs">
                                                Enter your weight in kilograms (kg).
                                            </FormDescription>
                                        )}
                                        <FormMessage id={errId} />
                                    </FormItem>
                                )
                            }}
                        />
                    </fieldset>

                    <div className="mx-auto inline-flex items-center gap-x-2">
                        <Button type="submit" aria-label="Calculate BMI">
                            Calculate
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            aria-label="Reset BMI form"
                            onClick={() => {
                                form.reset()
                                setBmi({ bmi: null, height: null, weight: null })
                            }}>
                            Reset
                        </Button>
                    </div>
                </form>
            </Form>

            {bmi.bmi && (
                <Card className="mx-auto mt-4 w-full max-w-md" role="region" aria-labelledby="bmi-card-title">
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
                            className={twMerge("mx-auto select-none", badgeStyle[getBmiCategory(bmi.bmi)])}>
                            {getBmiCategory(bmi.bmi) === "Normal weight" ? (
                                <BadgeCheckIcon aria-hidden />
                            ) : (
                                <BadgeAlertIcon aria-hidden />
                            )}
                            {getBmiCategory(bmi.bmi)}
                        </Badge>

                        <div className="grid gap-1.5">
                            <Progress
                                value={getProgressBarValue(bmi.bmi)}
                                role="progressbar"
                                aria-label="BMI progress"
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={getProgressBarValue(bmi.bmi)}
                            />
                            <small className="text-muted-foreground inline-flex w-full justify-between text-xs">
                                <span>16</span>
                                <span>18.5</span>
                                <span>25</span>
                                <span>30</span>
                                <span>40</span>
                            </small>
                        </div>
                    </CardContent>

                    <CardFooter className="text-muted-foreground flex items-center justify-between text-xs">
                        <p>Weight: {bmi.weight} kg</p>
                        <p>Height: {bmi.height} cm</p>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}
