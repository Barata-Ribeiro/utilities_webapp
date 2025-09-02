"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { MoveRightIcon } from "lucide-react"
import { useState } from "react"
import type { Resolver } from "react-hook-form"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"

const romanSchema = z.object({
    value: z.string().regex(/^(?=.)M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i, {
        message: "Invalid Roman numeral",
    }),
})

const arabicSchema = z.object({
    value: z.preprocess(
        val => {
            if (typeof val === "string") return parseInt(val, 10)
            return val
        },
        z
            .number()
            .min(1, { message: "Number must be at least 1" })
            .max(3999, { message: "Number must be at most 3999" }),
    ),
})

const ROMAN_NUMERALS = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
const ARABIC_NUMERALS = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]

export default function RomanConverter() {
    const [results, setResults] = useState<{ roman: number | null; arabic: string | null }>({
        roman: null,
        arabic: null,
    })

    const romanToArabicForm = useForm<z.infer<typeof romanSchema>>({
        resolver: zodResolver(romanSchema),
        defaultValues: { value: "" },
    })

    const arabicToRomanForm = useForm<z.infer<typeof arabicSchema>>({
        resolver: zodResolver(arabicSchema) as unknown as Resolver<z.infer<typeof arabicSchema>>,
        defaultValues: { value: 1 },
    })

    function onRomanFormSubmit(data: z.infer<typeof romanSchema>) {
        let i = 0
        let num = 0
        let roman = data.value.toUpperCase()

        while (roman.length > 0 && i < ROMAN_NUMERALS.length) {
            if (roman.startsWith(ROMAN_NUMERALS[i])) {
                num += ARABIC_NUMERALS[i]
                roman = roman.slice(ROMAN_NUMERALS[i].length)
                i = 0
            } else {
                i++
            }
        }

        setResults(prev => ({ ...prev, roman: num }))
    }

    function onArabicFormSubmit(data: z.infer<typeof arabicSchema>) {
        let num = data.value
        let roman = ""
        let i = 0

        while (num > 0 && i < ARABIC_NUMERALS.length) {
            if (num >= ARABIC_NUMERALS[i]) {
                roman += ROMAN_NUMERALS[i]
                num -= ARABIC_NUMERALS[i]
            } else {
                i++
            }
        }

        setResults(prev => ({ ...prev, arabic: roman }))
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Roman -> Arabic */}
            <div className="bg-muted/40 rounded-md p-4">
                <h3 className="inline-flex items-center gap-x-1 text-sm font-medium" aria-label="Roman to Arabic">
                    Roman <MoveRightIcon aria-hidden size={16} /> Arabic
                </h3>
                <Form {...romanToArabicForm}>
                    <form onSubmit={romanToArabicForm.handleSubmit(onRomanFormSubmit)} className="mt-3 space-y-3">
                        <FormField
                            control={romanToArabicForm.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Roman numeral</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. XIV" {...field} />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Enter a Roman numeral (uppercase or lowercase).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-2">
                            <Button type="submit">Convert</Button>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    romanToArabicForm.reset()
                                    setResults(prev => ({ ...prev, roman: null }))
                                }}>
                                Clear
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="mt-4">
                    <div className="bg-card rounded-md p-3">
                        <div className="text-muted-foreground text-xs">Result</div>
                        <div className="mt-1 text-lg font-semibold" aria-live="polite">
                            {results.roman ?? "—"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Arabic -> Roman */}
            <div className="bg-muted/40 rounded-md p-4">
                <h3 className="inline-flex items-center gap-x-1 text-sm font-medium" aria-label="Arabic to Roman">
                    Arabic <MoveRightIcon aria-hidden size={16} /> Roman
                </h3>
                <Form {...arabicToRomanForm}>
                    <form onSubmit={arabicToRomanForm.handleSubmit(onArabicFormSubmit)} className="mt-3 space-y-3">
                        <FormField
                            control={arabicToRomanForm.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={3999}
                                            value={field.value as unknown as number}
                                            onChange={e => {
                                                const v = e.target.value
                                                field.onChange(v === "" ? "" : Number(v))
                                            }}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        Enter an integer between 1 and 3999.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-2">
                            <Button type="submit">Convert</Button>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    arabicToRomanForm.reset()
                                    setResults(prev => ({ ...prev, arabic: null }))
                                }}>
                                Clear
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="mt-4">
                    <div className="bg-card rounded-md p-3">
                        <div className="text-muted-foreground text-xs">Result</div>
                        <div className="mt-1 text-lg font-semibold uppercase" aria-live="polite">
                            {results.arabic ?? "—"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
