"use client"

import ButtonClipboard from "@/components/button-clipboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Resolver, useForm } from "react-hook-form"
import { z } from "zod/v4"

const FormSchema = z.object({
    base64: z.preprocess(
        val => (typeof val === "string" ? val.replace(/^data:(image\/[a-zA-Z]+);base64,/, "") : val),
        z.base64("The provided value is not valid Base64.").min(1, "Base64 string is required."),
    ),
})

type FormSchemaType = z.infer<typeof FormSchema>

export default function Base64TextDecode() {
    const [result, setResult] = useState<string | null>(null)

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema) as Resolver<FormSchemaType>,
        defaultValues: { base64: "" },
    })

    function onSubmit(data: FormSchemaType) {
        const { base64 } = data
        setResult(atob(base64))
    }

    function resetForm() {
        form.reset()
        setResult(null)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Base64 Text Decode</CardTitle>
                <CardDescription>Decode Base64 formatted text.</CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="base64"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Text</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="max-h-32 resize-none font-mono"
                                            placeholder="iVBORw0KGgoAAAANSUhEUgAA..."
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
                                Decode
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
                            {result.substring(0, 250) + (result.length > 250 ? "..." : "")}
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
                        Paste Base64 formatted text and click &ldquo;Decode&rdquo; to get the result.
                    </p>
                )}
            </CardFooter>
        </Card>
    )
}
