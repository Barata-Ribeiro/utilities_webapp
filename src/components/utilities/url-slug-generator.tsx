"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { Resolver, useForm } from "react-hook-form"
import { z } from "zod/v4"

const SlugifySchema = z.object({
    text: z.string("Text is required").min(1, "Text is required"),
    separator: z
        .enum(["-", "_"], {
            error: "Separator must be either '-' or '_'.",
        })
        .default("-"),
    lowercase: z.boolean().default(true),
    removeSpecialChars: z.boolean().default(false),
    removeNumbers: z.boolean().default(false),
})

type SlugifyType = z.infer<typeof SlugifySchema>

const initialState = Object.freeze<SlugifyType>({
    text: "",
    separator: "-",
    lowercase: true,
    removeSpecialChars: false,
    removeNumbers: false,
})

function sort(obj: Record<string, string>) {
    return Object.keys(obj)
        .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
        .reduce(
            (acc, key) => {
                acc[key] = obj[key]
                return acc
            },
            {} as Record<string, string>,
        )
}

function cleanLocale(locales: Record<string, Record<string, string>>) {
    return Object.keys(locales).reduce(
        (all, locale) => {
            all[locale] = Object.keys(locales[locale])
                .filter(key => key !== "locale")
                .reduce(
                    (acc, key) => {
                        acc[key] = locales[locale][key]
                        return acc
                    },
                    {} as Record<string, string>,
                )
            return all
        },
        {} as Record<string, Record<string, string>>,
    )
}

export default function UrlSlugGenerator() {
    const [result, setResult] = useState<string | null>(null)
    const [browserLocale, setBrowserLocale] = useState("en")
    const savedCharMap = useRef<Record<string, string> | null>(null)
    const savedLocale = useRef<Record<string, Record<string, string>> | null>(null)

    const form = useForm<SlugifyType>({
        resolver: zodResolver(SlugifySchema) as Resolver<SlugifyType>,
        defaultValues: initialState,
    })

    const onSubmit = useCallback(
        async (data: SlugifyType) => {
            const { text, separator, lowercase, removeSpecialChars, removeNumbers } = data

            if (!savedCharMap.current || !savedLocale.current) {
                const [resCM, resLol] = await Promise.all([
                    fetch("/slug-settings/charmap.json"),
                    fetch("/slug-settings/locale.json"),
                ])

                if (!resCM.ok || !resLol.ok) {
                    alert("Failed to load slug settings.")
                    return
                }

                savedCharMap.current = await resCM.json()
                savedLocale.current = await resLol.json()
            }

            const charMap = sort(savedCharMap.current as Record<string, string>)
            const locales = cleanLocale(savedLocale.current as Record<string, Record<string, string>>)
            const locale = locales[browserLocale] ?? locales["en"]

            const reduced = text
                .normalize("NFKD")
                .split("")
                .reduce((result, char) => {
                    let append = locale[char]
                    append ??= charMap[char] ?? char

                    if (removeSpecialChars && /[^A-Za-z0-9\s]/g.test(append)) {
                        append = append.replace(/[^A-Za-z0-9\s]/g, "")
                    }

                    if (removeNumbers && /\d+/g.test(append)) {
                        append = append.replace(/\d+/g, "")
                    }

                    return result + append
                }, "")

            const afterSpecials = removeSpecialChars
                ? reduced.replace(/[^\p{L}\p{N}\s$*_+~.()'"!:\-@]+/gu, "")
                : reduced

            const slug = afterSpecials
                .replace(/\s+/g, separator)
                .replace(new RegExp(`\\${separator}+`, "g"), separator)
                .trim()

            setResult(lowercase ? slug.toLowerCase() : slug)
        },
        [browserLocale],
    )

    function reset() {
        form.reset()
        setResult(null)
    }

    const copyToClipboard = async () => {
        try {
            if (!result) return
            await navigator.clipboard.writeText(result)
        } catch {
            console.warn("Failed copying Result to clipboard")
        }
    }

    useEffect(() => {
        const nav = navigator.languages?.[0] ?? navigator.language ?? "en-US"
        setBrowserLocale(nav.toLowerCase().split("-")[0])
    }, [])

    return (
        <Fragment>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto mb-6 w-full max-w-lg space-y-6 border-b pb-6">
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Text to Slugify</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Enter text here"
                                        aria-invalid={!!form.formState.errors.text}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="separator"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Separator</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-wrap items-center gap-4">
                                        {["-", "_"].map(separator => (
                                            <FormItem key={separator} className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value={separator} />
                                                </FormControl>
                                                <FormLabel className="text-sm">
                                                    {separator === "-" ? "Dash (-)" : "Underscore (_)"}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-wrap gap-3">
                        <FormField
                            control={form.control}
                            name="lowercase"
                            render={({ field }) => (
                                <FormItem className="inline-flex items-center gap-x-2">
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel>To Lowercase?</FormLabel>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="removeSpecialChars"
                            render={({ field }) => (
                                <FormItem className="inline-flex items-center gap-x-2">
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel>No Special Characters?</FormLabel>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="removeNumbers"
                            render={({ field }) => (
                                <FormItem className="inline-flex items-center gap-x-2">
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel>No Numbers?</FormLabel>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-rows-[auto_1fr] gap-2">
                        <Button type="submit" variant="default">
                            Slugify
                        </Button>

                        <div className="grid gap-2 sm:grid-cols-2">
                            <Button type="reset" variant="ghost" onClick={reset} aria-label="Reset Form">
                                Reset
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                disabled={!result}
                                onClick={copyToClipboard}
                                aria-label="Copy Output">
                                Copy
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

            {result !== null && (
                <div className="bg-primary-foreground mx-auto grid size-full max-w-lg gap-2 rounded-md p-4">
                    <Label>Result</Label>
                    <Textarea className="bg-card max-h-36 resize-none" value={result} readOnly aria-readonly />
                </div>
            )}
        </Fragment>
    )
}
