"use client"

import ButtonClipboard from "@/components/button-clipboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"

const FormSchema = z.object({
    text: z.string("Text is required.").min(1, { error: "Text is required." }),
})

type FormSchemaType = z.infer<typeof FormSchema>

export default function Base64TextEncode() {
    const [result, setResult] = useState<string | null>(null)

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: { text: "" },
    })

    function onSubmit(data: FormSchemaType) {
        const { text } = data
        const encoder = new TextEncoder()
        const dataUint8Array = encoder.encode(text)
        const base64String = btoa(String.fromCodePoint(...dataUint8Array))
        setResult(base64String)
    }

    function resetForm() {
        form.reset()
        setResult(null)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Base64 Text Encode</CardTitle>
                <CardDescription>Encode text to Base64 format.</CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Text</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="max-h-32 resize-none font-mono"
                                            placeholder="e.g. Hello, World!"
                                            required
                                            aria-required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-rows-[auto_1fr] gap-2">
                            <Button type="submit" variant="default">
                                Encode
                            </Button>

                            <div className="grid gap-2 sm:grid-cols-2">
                                <Button type="reset" variant="ghost" onClick={resetForm} aria-label="Reset Form">
                                    Reset
                                </Button>

                                <ButtonClipboard size="default" variant="outline" content={result} />
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>

            <CardFooter className="w-full border-t pt-4">
                {result ? (
                    <div className="w-full space-y-1">
                        <p className="font-semibold">Partial Result:</p>
                        <pre className="bg-muted rounded p-2 font-mono text-sm break-all whitespace-pre-wrap">
                            {result.substring(0, 100) + (result.length > 100 ? "..." : "")}
                        </pre>
                        <div className="flex flex-wrap items-center-safe justify-between gap-2">
                            <p className="text-muted-foreground text-xs">
                                Use the &ldquo;Copy&rdquo; button for complete result.
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Total Characters: <strong>{result.replaceAll(/\n/g, "").length}</strong>
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">
                        Paste text and click &ldquo;Encode&rdquo; to get the result.
                    </p>
                )}
            </CardFooter>
        </Card>
    )
}
