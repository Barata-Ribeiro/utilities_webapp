'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { z } from 'zod/v4';

const FormSchema = z.object({
    base64: z.preprocess(
        (val) => (typeof val === 'string' ? val.replace(/^data:(image\/[a-zA-Z]+);base64,/, '') : val),
        z.base64('The provided value is not valid Base64.').min(1, 'Base64 string is required.'),
    ),
    fileName: z.preprocess(
        (val) => (typeof val === 'string' ? val.trim() : val),
        z.union([z.string().regex(/^[^.]*$/, { error: 'Do not include a file extension.' }), z.undefined()]),
    ),
    downloadFormat: z.enum(['png', 'jpeg', 'webp']).default('png'),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function Base64ToImage() {
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('image');

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema) as Resolver<FormSchemaType>,
        defaultValues: { base64: '', fileName: '', downloadFormat: 'png' },
    });

    function onSubmit(data: FormSchemaType) {
        const { base64, fileName, downloadFormat } = data;
        const mimeTypeRegex = /^data:(image\/[a-zA-Z]+);base64,/;

        const mimeTypeMatch = new RegExp(mimeTypeRegex).exec(data.base64);
        const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : `image/${downloadFormat}`;

        const imageSrc = `data:${mimeType};base64,${base64}`;
        setPreview(imageSrc);
        setResult(imageSrc);
        setFileName((prev) => (fileName && fileName.trim() !== '' ? fileName : prev) ?? 'image');
    }

    function reset() {
        form.reset();
        setPreview(null);
        setResult(null);
        setFileName('image');
    }

    return (
        <Fragment>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-6 border-b pb-4">
                <Controller
                    control={form.control}
                    name="base64"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="base64-string">Base64 String</FieldLabel>
                            <Textarea
                                id="base64-string"
                                className="max-h-32 resize-none font-mono"
                                placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
                                aria-invalid={fieldState.invalid}
                                required
                                aria-required
                                {...field}
                            />
                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <FieldGroup className="flex flex-col items-start gap-4 sm:flex-row">
                    <Controller
                        control={form.control}
                        name="downloadFormat"
                        render={({ field, fieldState }) => (
                            <Field orientation="vertical" data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldLabel htmlFor="download-format">Download Format</FieldLabel>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </FieldContent>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="download-format" aria-invalid={fieldState.invalid}>
                                        <SelectValue placeholder="Image Format" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        {['png', 'jpeg', 'webp'].map((format) => (
                                            <SelectItem key={format} value={format}>
                                                {format.toUpperCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="fileName"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="fileName">File Name (optional)</FieldLabel>
                                <Input
                                    id="fileName"
                                    className="max-h-9 font-mono"
                                    placeholder="e.g. image"
                                    aria-invalid={fieldState.invalid}
                                    {...field}
                                />
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </FieldGroup>

                <div className="grid grid-rows-[auto_1fr] gap-2">
                    <Button type="submit" variant="default">
                        Parse
                    </Button>

                    <div className="grid gap-2 sm:grid-cols-2">
                        <Button type="reset" variant="ghost" onClick={reset} aria-label="Reset Form">
                            Reset
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            aria-label="Download Image"
                            disabled={!result}
                            asChild={!!result}
                        >
                            <Link href={result ?? ''} download={fileName}>
                                Download
                            </Link>
                        </Button>
                    </div>
                </div>
            </form>

            {preview ? (
                <div className="relative min-h-96 w-full max-w-2xl rounded-lg select-none">
                    <div className="absolute top-2 right-2 z-10 rounded-md bg-muted px-2 py-1 text-xs font-medium">
                        Preview
                    </div>

                    <Image
                        src={preview}
                        alt="Preview"
                        placeholder="blur"
                        blurDataURL={preview}
                        className="rounded-lg object-cover"
                        quality={50}
                        fill
                    />
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">Image preview will appear here.</p>
            )}
        </Fragment>
    );
}
