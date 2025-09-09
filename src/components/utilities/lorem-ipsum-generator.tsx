"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { floor, random } from "mathjs"
import { Fragment, useCallback, useRef, useState } from "react"
import { Resolver, useForm } from "react-hook-form"
import { z } from "zod/v4"

const START_SENTENCE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

type Mode = "paragraphs" | "sentences" | "words" | "bytes" | "lists"

const LoremIpsumSchema = z
    .object({
        mode: z.enum(["paragraphs", "sentences", "words", "bytes", "lists"], { error: "You must select a mode." }),
        amount: z.coerce.number("Amount must be a number.").min(1, { message: "Amount must be at least 1." }),
    })
    .refine(
        data => {
            const maxByMode: Record<Mode, number> = {
                paragraphs: 170,
                sentences: 1000,
                words: 14769,
                bytes: 100000,
                lists: 500,
            }
            const max = maxByMode[data.mode as Mode] ?? 1000
            return data.amount <= max
        },
        { message: "Amount exceeds maximum for selected mode.", path: ["amount"] },
    )

type LoremIpsumSchemaType = z.infer<typeof LoremIpsumSchema>

function capitalizeFirstLetter(str: string) {
    if (!str || str.length === 0) return ""
    return str[0].toUpperCase() + str.slice(1)
}

function maybeAddComma(words: string[], index: number) {
    return index > 0 && index < words.length - 1 && random() < 0.15 ? "," : ""
}

function makeSentence(
    startingWordIndex: number,
    nWords: number,
    pool: string[],
): { sentence: string; nextIndex: number } {
    const words: string[] = []
    const currentIndex = startingWordIndex
    for (let i = 0; i < nWords; i++) {
        const word = pool[(currentIndex + i) % pool.length]
        const comma = maybeAddComma(pool, i)
        words.push(word + comma)
    }
    let sentence = words.join(" ")
    sentence = sentence.replace(/\s,/g, ",") // Remove space before commas
    sentence = capitalizeFirstLetter(sentence)
    sentence = sentence.replace(/,+$/, "") // Remove trailing commas

    if (!/[.!?]$/.test(sentence)) sentence += "." // Ensure sentence ends with a period

    return { sentence, nextIndex: (currentIndex + nWords) % pool.length }
}

export default function LoremIpsumGenerator() {
    const [output, setOutput] = useState<string>("")
    const [rawOutput, setRawOutput] = useState<string>("")
    const savedIpsum = useRef<string[] | null>(null)

    const form = useForm<LoremIpsumSchemaType>({
        resolver: zodResolver(LoremIpsumSchema) as Resolver<LoremIpsumSchemaType>,
        defaultValues: { mode: "paragraphs", amount: 1 },
    })

    const onSubmit = useCallback(async (data: LoremIpsumSchemaType) => {
        const { mode, amount } = data

        if (!savedIpsum.current) {
            const res = await fetch("/ipsum.json")
            if (!res.ok) {
                alert("Failed to fetch word list")
                return
            }
            savedIpsum.current = await res.json()
        }

        const pool = savedIpsum.current!
        switch (mode) {
            case "paragraphs": {
                const paragraphs: string[] = []
                const rawParagraphs: string[] = []
                let wordIndex = 0
                for (let p = 0; p < amount; p++) {
                    const sentencesCount = 5 + floor(random() * 10) // 5-14 sentences
                    const sentences: string[] = []
                    for (let s = 0; s < sentencesCount; s++) {
                        const len = 8 + floor(random() * 8) // 8-15 words
                        const { sentence, nextIndex } = makeSentence(wordIndex, len, pool)
                        sentences.push(sentence)
                        wordIndex = nextIndex
                    }
                    paragraphs.push(`<p>${sentences.join(" ")}</p>`)
                    rawParagraphs.push(sentences.join(" "))
                }
                setOutput(paragraphs.join("\n\n"))
                setRawOutput(rawParagraphs.join("\n\n"))
                break
            }
            case "sentences": {
                const sentences: string[] = []
                const rawSentences: string[] = []
                let wordIndex = 0
                for (let s = 0; s < amount; s++) {
                    const len = 8 + floor(random() * 8) // 8-15 words
                    const { sentence, nextIndex } = makeSentence(wordIndex, len, pool)
                    sentences.push(`<p>${sentence}</p>`)
                    rawSentences.push(sentence)
                    wordIndex = nextIndex
                }
                setOutput(sentences.join("\n\n"))
                setRawOutput(rawSentences.join("\n\n"))
                break
            }
            case "words": {
                const words: string[] = []
                if (amount <= pool.length) {
                    const poolCopy = pool.slice()
                    for (let i = poolCopy.length - 1; i > 0; i--) {
                        const j = floor(random() * (i + 1))
                        ;[poolCopy[i], poolCopy[j]] = [poolCopy[j], poolCopy[i]]
                    }
                    for (let w = 0; w < amount; w++) {
                        words.push(capitalizeFirstLetter(poolCopy[w]))
                    }
                } else {
                    for (let w = 0; w < amount; w++) {
                        const idx = floor(random() * pool.length)
                        words.push(capitalizeFirstLetter(pool[idx]))
                    }
                }
                setOutput(`<p>${words.join(" ")}</p>`)
                setRawOutput(words.join(" "))
                break
            }
            case "bytes": {
                let text = START_SENTENCE
                while (text.length < amount) {
                    const len = 8 + floor(random() * 8) // 8-15 words
                    const { sentence } = makeSentence(floor(random() * pool.length), len, pool)
                    text += " " + sentence
                }
                setOutput(`<p>${text.slice(0, amount)}</p>`)
                setRawOutput(text.slice(0, amount))
                break
            }
            case "lists": {
                const items: string[] = []
                const rawItems: string[] = []
                let wordIndex = 0
                for (let i = 0; i < amount; i++) {
                    const len = 4 + floor(random() * 6) // 4-9 words
                    const { sentence, nextIndex } = makeSentence(wordIndex, len, pool)
                    items.push(`<li>${sentence.replace(/\.$/, "")}</li>`) // Remove trailing period for list items
                    rawItems.push(`- ${sentence.replace(/\.$/, "")}`)
                    wordIndex = nextIndex
                }
                setOutput(`<ul>${items.join("\n")}</ul>`)
                setRawOutput(rawItems.join("\n"))
                break
            }
            default:
                setOutput("")
                setRawOutput("")
                break
        }
    }, [])

    function reset() {
        form.reset()
        setOutput("")
    }

    const copyToClipboard = async () => {
        try {
            if (!rawOutput) return
            await navigator.clipboard.writeText(rawOutput)
        } catch {
            console.warn("Failed copying Output to clipboard")
        }
    }

    return (
        <Fragment>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto mb-6 w-full max-w-lg space-y-6 border-b pb-6">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        step={1}
                                        autoComplete="off"
                                        inputMode="decimal"
                                        placeholder="e.g. 5"
                                        aria-invalid={!!form.formState.errors.amount}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Options</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-wrap items-center gap-4">
                                        {["paragraphs", "sentences", "words", "bytes", "lists"].map(option => (
                                            <FormItem key={option} className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value={option} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormDescription>
                                    Limits: Paragraphs (170), Sentences (1000), Words (14769), Bytes (100000), Lists
                                    (500).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-rows-[auto_1fr] gap-2">
                        <Button type="submit" variant="default">
                            Submit
                        </Button>

                        <div className="grid gap-2 sm:grid-cols-2">
                            <Button type="reset" variant="ghost" onClick={reset} aria-label="Reset Form">
                                Reset
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                disabled={rawOutput.length === 0 || output.length === 0}
                                onClick={copyToClipboard}
                                aria-label="Copy Output">
                                Copy
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

            {output.length > 0 && rawOutput.length > 0 ? (
                <section
                    className="prose md:prose-lg lg:prose-xl dark:prose-invert mx-auto max-h-96 overflow-auto rounded-md border p-4"
                    dangerouslySetInnerHTML={{ __html: output }}></section>
            ) : (
                <p className="text-muted-foreground text-center">Generate output above.</p>
            )}
        </Fragment>
    )
}
