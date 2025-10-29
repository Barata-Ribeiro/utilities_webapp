'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import QRCode from 'qrcode';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

const FormSchema = z.object({
    url: z.url({ protocol: /^https$/, hostname: z.regexes.domain }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function QRCodeGenerator() {
    const { theme } = useTheme();
    const [qrCode, setQRCode] = useState<string | null>(null);

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: { url: '' },
    });

    function onSubmit(data: FormSchemaType) {
        const { url } = data;

        QRCode.toDataURL(url, {
            width: 800,
            margin: 2,
            color: {
                dark: theme === 'dark' ? '#fafafa' : '#050505',
                light: theme === 'dark' ? '#050505' : '#fafafa',
            },
        })
            .then((dataUrl) => setQRCode(dataUrl))
            .catch((err) => {
                console.error(err);
                setQRCode(null);
            });
    }

    function reset() {
        form.reset();
        setQRCode(null);
    }

    return (
        <Fragment>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto mb-6 w-full max-w-lg space-y-6 border-b pb-6"
                >
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="https://example.com"
                                        aria-invalid={!!form.formState.errors.url}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Button type="submit" variant="default">
                            Generate
                        </Button>
                        <Button type="reset" variant="ghost" onClick={reset} aria-label="Reset Form">
                            Reset
                        </Button>
                    </div>
                </form>
            </Form>

            {qrCode && (
                <div className="mx-auto mt-6 grid w-full max-w-lg gap-4">
                    <Image src={qrCode} alt="QrCode" width={800} height={800} priority />
                    <Button variant="secondary" aria-label="Download QRCode image" asChild>
                        <a href={qrCode} download="qrcode.png">
                            Download
                        </a>
                    </Button>
                </div>
            )}
        </Fragment>
    );
}
