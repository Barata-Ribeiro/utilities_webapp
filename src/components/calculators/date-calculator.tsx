"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInMonths,
    differenceInSeconds,
    differenceInWeeks,
    differenceInYears,
    format,
} from "date-fns"
import { enUS } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"

const DateSchema = z.object({
    startDate: z.date("Date is required."),
    endDate: z.date("Date is required."),
})

interface InitialDates {
    startDate: Date | null
    endDate: Date | null
}

interface Result {
    seconds: number | null
    minutes: number | null
    hours: number | null
    days: number | null
    weeks: number | null
    months: number | null
    years: number | null
}

export function DateCalculator() {
    const [initialDates, setInitialDates] = useState<InitialDates>({
        startDate: null,
        endDate: null,
    })

    const [result, setResult] = useState<Result>({
        seconds: null,
        minutes: null,
        hours: null,
        days: null,
        weeks: null,
        months: null,
        years: null,
    })

    const form = useForm<z.infer<typeof DateSchema>>({
        resolver: zodResolver(DateSchema),
    })

    function onSubmit(data: z.infer<typeof DateSchema>) {
        setInitialDates({
            startDate: data.startDate,
            endDate: data.endDate,
        })

        const seconds = Math.abs(differenceInSeconds(data.endDate, data.startDate))
        const minutes = Math.abs(differenceInMinutes(data.endDate, data.startDate))
        const hours = Math.abs(differenceInHours(data.endDate, data.startDate))
        const days = Math.abs(differenceInDays(data.endDate, data.startDate))
        const weeks = Math.abs(differenceInWeeks(data.endDate, data.startDate))
        const months = Math.abs(differenceInMonths(data.endDate, data.startDate))
        const years = Math.abs(differenceInYears(data.endDate, data.startDate))

        setResult({
            seconds,
            minutes,
            hours,
            days,
            weeks,
            months,
            years,
        })
    }

    const { formattedFrom, formattedTo, humanResult, humanResultComma } = useMemo(() => {
        let formattedFrom: string | null = null
        let formattedTo: string | null = null
        let humanResult: string | null = null
        let humanResultComma: string | null = null

        if (!initialDates.startDate || !initialDates.endDate) {
            return { formattedFrom, formattedTo, humanResult, humanResultComma }
        }

        const s = initialDates.startDate
        const e = initialDates.endDate

        const from = format(s, "EEEE, d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: enUS })
        const to = format(e, "EEEE, d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: enUS })
        formattedFrom = from.charAt(0).toUpperCase() + from.slice(1)
        formattedTo = to.charAt(0).toUpperCase() + to.slice(1)

        if (result.seconds != null) {
            const totalSeconds = result.seconds

            const days = result.days ?? 0
            const hoursTotal = result.hours ?? 0
            const minutesTotal = result.minutes ?? 0

            const hours = Math.max(0, hoursTotal - days * 24)
            const minutes = Math.max(0, minutesTotal - hoursTotal * 60)
            const seconds = Math.max(0, totalSeconds - minutesTotal * 60)

            const totalHours = days * 24 + hours
            humanResult = `${totalHours} hours, ${minutes} minutes and ${seconds} seconds`
            humanResultComma = `${totalHours} hours, ${minutes} minutes, ${seconds} seconds`
        }

        return { formattedFrom, formattedTo, humanResult, humanResultComma }
    }, [initialDates, result])

    const altResults = useMemo(() => {
        if (result.seconds == null) return null

        const totalSeconds = result.seconds
        const minutesFloor = Math.floor(totalSeconds / 60)
        const hoursFloor = Math.floor(totalSeconds / 3600)

        const year = initialDates.startDate ? initialDates.startDate.getFullYear() : new Date().getFullYear()
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
        const secondsInYear = (isLeap ? 366 : 365) * 24 * 60 * 60

        const percentOfYear = (totalSeconds / secondsInYear) * 100
        const percentOfDay = (totalSeconds / (24 * 60 * 60)) * 100

        const fmt = (n: number) => n.toFixed(2).replace(".", ",")

        return {
            secondsExact: `${totalSeconds} seconds`,
            minutesFloor: `${minutesFloor} minutes (rounded down)`,
            hoursFloor: `${hoursFloor} hours (rounded down)`,
            percentOfYear: `${fmt(percentOfYear)}% of ${year}`,
            percentOfDay: `${fmt(percentOfDay)}% of a 24 hour day`,
        }
    }, [result, initialDates])

    return (
        <div className="mx-auto max-w-7xl">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2">
                    {Object.keys(DateSchema.shape).map(key => (
                        <FormField
                            key={key}
                            control={form.control}
                            name={key as keyof z.infer<typeof DateSchema>}
                            render={({ field }) => (
                                <FormItem className="flex w-full max-w-sm flex-col max-md:items-center">
                                    <FormLabel>{key === "startDate" ? "Start Date" : "End Date"}</FormLabel>
                                    <div className="flex flex-wrap items-center gap-2 max-md:justify-center">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full max-w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground",
                                                        )}>
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon
                                                            aria-hidden
                                                            className="ml-auto size-4 opacity-50"
                                                        />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={date => {
                                                        if (!date) return
                                                        const hours = field.value ? field.value.getHours() : 0
                                                        const minutes = field.value ? field.value.getMinutes() : 0
                                                        const seconds = field.value ? field.value.getSeconds() : 0
                                                        date.setHours(hours, minutes, seconds, 0)
                                                        field.onChange(date)
                                                    }}
                                                    disabled={date => date < new Date("1900-01-01")}
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FormControl>
                                            <Input
                                                type="time"
                                                step="2"
                                                className="w-max"
                                                value={field.value ? format(field.value, "HH:mm:ss") : ""}
                                                onChange={e => {
                                                    const val = e.target.value
                                                    const baseDate = field.value
                                                        ? new Date(field.value)
                                                        : new Date(new Date().setHours(0, 0, 0, 0))

                                                    if (!val) {
                                                        baseDate.setHours(0, 0, 0, 0)
                                                        field.onChange(baseDate)
                                                        return
                                                    }

                                                    const parts = val.split(":")
                                                    const hours = Number(parts[0])
                                                    const minutes = Number(parts[1])
                                                    const seconds = Number(parts[2] ?? 0)
                                                    baseDate.setHours(
                                                        Number.isFinite(hours) ? hours : 0,
                                                        Number.isFinite(minutes) ? minutes : 0,
                                                        Number.isFinite(seconds) ? seconds : 0,
                                                        0,
                                                    )
                                                    field.onChange(baseDate)
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <div className="col-span-full inline-flex items-center gap-x-2">
                        <Button type="submit" aria-label="Calculate difference">
                            Calculate
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            aria-label="Reset form"
                            onClick={() => {
                                form.reset()
                                setResult({
                                    seconds: null,
                                    minutes: null,
                                    hours: null,
                                    days: null,
                                    weeks: null,
                                    months: null,
                                    years: null,
                                })
                                setInitialDates({
                                    startDate: null,
                                    endDate: null,
                                })
                            }}>
                            Reset
                        </Button>
                    </div>
                </form>
            </Form>

            {/* Result */}
            {formattedFrom && altResults && formattedTo && (
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="w-full">
                        <p className="text-muted-foreground mb-1 text-xs">
                            From:{" "}
                            <time dateTime={initialDates.startDate?.toISOString()} className="font-medium">
                                {formattedFrom}
                            </time>
                        </p>
                        <p className="text-muted-foreground mb-3 text-xs">
                            To:{" "}
                            <time dateTime={initialDates.endDate?.toISOString()} className="font-medium">
                                {formattedTo}
                            </time>
                        </p>

                        <p className="text-xl font-semibold">Result: {humanResult}</p>
                        <p className="mt-1">The duration is {humanResult}</p>
                        <p className="mt-2 italic">Or {humanResultComma}</p>
                    </div>

                    {/* Alternative time units column */}
                    <div className="w-full">
                        <p className="font-semibold">Alternative time units</p>
                        <p className="mt-2 text-sm">{humanResult} can be converted to one of these units:</p>

                        <ul className="mt-3 list-inside list-disc text-sm">
                            <li>{altResults.secondsExact}</li>
                            <li>{altResults.minutesFloor}</li>
                            <li>{altResults.hoursFloor}</li>
                            <li>{altResults.percentOfYear}</li>
                            <li>{altResults.percentOfDay}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
