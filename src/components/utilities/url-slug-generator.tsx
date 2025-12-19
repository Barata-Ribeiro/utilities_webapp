'use client';

import ButtonClipboard from '@/components/button-clipboard';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { z } from 'zod/v4';

const SlugifySchema = z.object({
    text: z.string('Text is required').min(1, 'Text is required'),
    separator: z
        .enum(['-', '_'], {
            error: "Separator must be either '-' or '_'.",
        })
        .default('-'),
    lowercase: z.boolean().default(true),
    removeSpecialChars: z.boolean().default(false),
    removeNumbers: z.boolean().default(false),
});

type SlugifyType = z.infer<typeof SlugifySchema>;

const initialState = Object.freeze<SlugifyType>({
    text: '',
    separator: '-',
    lowercase: true,
    removeSpecialChars: false,
    removeNumbers: false,
});

function sort(obj: Record<string, string>) {
    return Object.keys(obj)
        .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
        .reduce(
            (acc, key) => {
                acc[key] = obj[key];
                return acc;
            },
            {} as Record<string, string>,
        );
}

function cleanLocale(locales: Record<string, Record<string, string>>) {
    return Object.keys(locales).reduce(
        (all, locale) => {
            all[locale] = Object.keys(locales[locale])
                .filter((key) => key !== 'locale')
                .reduce(
                    (acc, key) => {
                        acc[key] = locales[locale][key];
                        return acc;
                    },
                    {} as Record<string, string>,
                );
            return all;
        },
        {} as Record<string, Record<string, string>>,
    );
}

export default function UrlSlugGenerator() {
    const [result, setResult] = useState<string | null>(null);
    const [browserLocale, setBrowserLocale] = useState('en');
    const savedCharMap = useRef<Record<string, string> | null>(null);
    const savedLocale = useRef<Record<string, Record<string, string>> | null>(null);

    const form = useForm<SlugifyType>({
        resolver: zodResolver(SlugifySchema) as Resolver<SlugifyType>,
        defaultValues: initialState,
    });

    const onSubmit = useCallback(
        async (data: SlugifyType) => {
            const { text, separator, lowercase, removeSpecialChars, removeNumbers } = data;

            console.log(data);

            if (!savedCharMap.current || !savedLocale.current) {
                const [resCM, resLol] = await Promise.all([
                    fetch('/slug-settings/charmap.json'),
                    fetch('/slug-settings/locale.json'),
                ]);

                if (!resCM.ok || !resLol.ok) {
                    alert('Failed to load slug settings.');
                    return;
                }

                savedCharMap.current = await resCM.json();
                savedLocale.current = await resLol.json();
            }

            const charMap = sort(savedCharMap.current as Record<string, string>);
            const locales = cleanLocale(savedLocale.current as Record<string, Record<string, string>>);
            const locale = locales[browserLocale] ?? locales['en'] ?? {};

            const reduced = text
                .normalize('NFKD')
                .split('')
                .reduce((result, char) => {
                    let append = locale[char];
                    append ??= charMap[char] ?? char;

                    if (removeSpecialChars && /[^A-Za-z0-9\s]/g.test(append)) {
                        append = append.replaceAll(/[^A-Za-z0-9\s]/g, '');
                    }

                    if (removeNumbers && /\d+/g.test(append)) {
                        append = append.replaceAll(/\d+/g, '');
                    }

                    return result + append;
                }, '');

            const afterSpecials = removeSpecialChars
                ? reduced.replaceAll(/[^\p{L}\p{N}\s$*_+~.()'"!:\-@]+/gu, '')
                : reduced;

            const slug = afterSpecials
                .replaceAll(/\s+/g, separator)
                .replaceAll(new RegExp(`\\${separator}+`, 'g'), separator)
                .trim();

            setResult(lowercase ? slug.toLowerCase() : slug);
        },
        [browserLocale],
    );

    function reset() {
        form.reset();
        setResult(null);
    }

    useEffect(() => {
        const nav = navigator.languages?.[0] ?? navigator.language ?? 'en-US';
        setBrowserLocale(nav.toLowerCase().split('-')[0]);
    }, []);

    return (
        <Fragment>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto mb-6 w-full max-w-lg space-y-6 border-b pb-6"
            >
                <Controller
                    control={form.control}
                    name="text"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="text-to-slugify">Text to Slugify</FieldLabel>
                            <Input
                                id="text-to-slugify"
                                type="text"
                                autoComplete="off"
                                placeholder="Enter text here"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />

                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="separator"
                    render={({ field, fieldState }) => (
                        <FieldSet data-invalid={fieldState.invalid}>
                            <FieldLegend>Separator</FieldLegend>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                aria-invalid={fieldState.invalid}
                                className="flex flex-wrap items-center gap-4"
                            >
                                {['-', '_'].map((separator) => (
                                    <FieldLabel key={separator} htmlFor={`type-${separator}`}>
                                        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                                            <RadioGroupItem
                                                value={separator}
                                                id={`type-${separator}`}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <FieldContent>
                                                <FieldTitle className="text-sm">
                                                    {separator === '-' ? 'Dash (-)' : 'Underscore (_)'}
                                                </FieldTitle>
                                            </FieldContent>
                                        </Field>
                                    </FieldLabel>
                                ))}
                            </RadioGroup>

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </FieldSet>
                    )}
                />

                <FieldGroup className="flex flex-row flex-wrap gap-3">
                    <Controller
                        control={form.control}
                        name="lowercase"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} orientation="horizontal" className="w-fit">
                                <Switch
                                    id="lowercase"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldContent>
                                    <FieldLabel htmlFor="lowercase">To Lowercase?</FieldLabel>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="removeSpecialChars"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} orientation="horizontal" className="w-fit">
                                <Switch
                                    id="removeSpecialChars"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                <FieldContent>
                                    <FieldLabel htmlFor="removeSpecialChars">No Special Characters?</FieldLabel>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="removeNumbers"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} orientation="horizontal" className="w-fit">
                                <Switch
                                    id="removeNumbers"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldContent>
                                    <FieldLabel htmlFor="removeNumbers">No Numbers?</FieldLabel>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </FieldContent>
                            </Field>
                        )}
                    />
                </FieldGroup>

                <div className="grid grid-rows-[auto_1fr] gap-2">
                    <Button type="submit" variant="default">
                        Slugify
                    </Button>

                    <div className="grid gap-2 sm:grid-cols-2">
                        <Button type="reset" variant="ghost" onClick={reset} aria-label="Reset Form">
                            Reset
                        </Button>

                        <ButtonClipboard size="default" variant="outline" content={result} />
                    </div>
                </div>
            </form>

            {result !== null && (
                <div className="mx-auto grid size-full max-w-lg gap-2 rounded-md bg-primary-foreground p-4">
                    <Label>Result</Label>
                    <Textarea className="max-h-36 resize-none bg-card" value={result} readOnly aria-readonly />
                </div>
            )}
        </Fragment>
    );
}
