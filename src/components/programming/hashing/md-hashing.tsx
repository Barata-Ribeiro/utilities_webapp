"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { md4, md5 } from "hash-wasm"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"

const FormSchema = z.object({
    text: z.string("Text is required.").min(1, "Text is required."),
})

type FormSchemaType = z.infer<typeof FormSchema>

const initialShaState = {
    MD4: "",
    MD5: "",
}

export default function MdHashing() {
    const [result, setResult] = useState(initialShaState)

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: { text: "" },
    })

    async function onSubmit(data: FormSchemaType) {
        const { text } = data
        const buffer = new TextEncoder().encode(text)

        const hashes = await Promise.all([md4(buffer), md5(buffer)])

        const entries = Object.keys(initialShaState).map((k, i) => [k, hashes[i]])

        setResult(Object.fromEntries(entries) as typeof initialShaState)
    }

    function resetForm() {
        form.reset()
        setResult(initialShaState)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>MD Hashing</CardTitle>
                <CardDescription>Generate MD4 and MD5 hashes for your text input.</CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Text to Hash</FormLabel>
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

                        <div className="inline-flex gap-x-2">
                            <Button type="submit" variant="default">
                                Hash
                            </Button>
                            <Button type="reset" variant="secondary" onClick={resetForm}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>

            <CardFooter className="grid border-t pt-4">
                {Object.values(result).some(value => value) ? (
                    <div className="space-y-4">
                        {Object.entries(result).map(([algo, hash]) => (
                            <div key={algo} className="space-y-1">
                                <p className="font-semibold">{algo}:</p>
                                <pre className="bg-muted rounded p-2 font-mono text-sm break-all whitespace-pre-wrap">
                                    {hash}
                                </pre>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">No hashed results yet.</p>
                )}
            </CardFooter>
        </Card>
    )
}
