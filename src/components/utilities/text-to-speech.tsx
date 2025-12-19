'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod/v4';

const TextToSpeechSchema = z.object({
    text: z
        .string()
        .min(10, 'Text must be at least 10 characters long.')
        .max(5000, 'Text exceeds maximum length of 5000 characters.'),
    rate: z.number().min(0.5).max(2).default(1).optional(),
    pitch: z.number().min(0).max(2).default(1).optional(),
    voice: z.number().min(0).optional(),
});

type TextToSpeechType = z.infer<typeof TextToSpeechSchema>;

export default function TextToSpeech() {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        if (typeof globalThis === 'undefined') return;

        const s = globalThis.speechSynthesis;
        if (!s) return;

        const loadVoices = () => {
            const v = s.getVoices() ?? [];
            setVoices(v);
        };

        loadVoices();

        // In some browsers the voices are not ready on page load
        const handler = () => loadVoices();
        s.addEventListener?.('voiceschanged', handler);

        return () => s.removeEventListener?.('voiceschanged', handler);
    }, []);

    const form = useForm<TextToSpeechType>({
        resolver: zodResolver(TextToSpeechSchema),
        defaultValues: { text: '', rate: 1, pitch: 1, voice: undefined },
    });

    function onsubmit(data: TextToSpeechType) {
        const s = globalThis.speechSynthesis;
        if (!s) return;

        s.cancel?.();

        const utter = new SpeechSynthesisUtterance(data.text);
        utter.rate = data.rate ?? 1;
        utter.pitch = data.pitch ?? 1;

        if (data.voice !== undefined && data.voice !== null) {
            const idx = Number(data.voice);

            if (!Number.isNaN(idx) && voices[idx]) utter.voice = voices[idx];
        }

        s.speak?.(utter);
    }

    function reset() {
        form.reset();
        const s = globalThis.speechSynthesis;
        s?.cancel?.();
    }

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className="mx-auto mb-6 w-full max-w-lg space-y-6 border-b pb-6">
            <Controller
                name="text"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="text">Text</FieldLabel>
                        <Textarea
                            id="text"
                            maxLength={5000}
                            placeholder='e.g. "Hello, how are you today?"'
                            aria-invalid={fieldState.invalid}
                            {...field}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                name="rate"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field orientation="vertical" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="rate">Rate</FieldLabel>

                        <div className="flex items-center gap-4">
                            <Slider
                                value={[field.value ?? 1]}
                                onValueChange={([value]) => field.onChange(value)}
                                min={0.5}
                                max={2}
                                step={0.1}
                            />
                            <Badge aria-live="polite" className="w-12 tabular-nums select-none">
                                {(Math.round((field.value ?? 1) * 10) / 10).toFixed(1)}
                            </Badge>
                        </div>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                name="pitch"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field orientation="vertical" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="pitch">Pitch</FieldLabel>

                        <div className="flex items-center gap-4">
                            <Slider
                                id="pitch"
                                value={[field.value ?? 1]}
                                onValueChange={([value]) => field.onChange(value)}
                                min={0}
                                max={2}
                                step={0.1}
                            />
                            <Badge aria-live="polite" className="w-12 tabular-nums select-none">
                                {(Math.round((field.value ?? 1) * 10) / 10).toFixed(1)}
                            </Badge>
                        </div>

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="voice"
                render={({ field, fieldState }) => (
                    <Field orientation="responsive" data-invalid={fieldState.invalid}>
                        <FieldContent>
                            <FieldLabel htmlFor="voice">Voice</FieldLabel>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </FieldContent>

                        <Select
                            value={field.value === undefined ? undefined : String(field.value)}
                            onValueChange={(val) => field.onChange(val === undefined ? undefined : Number(val))}
                            defaultValue={undefined}
                        >
                            <SelectTrigger id="voice" className="w-full" aria-invalid={fieldState.invalid}>
                                <SelectValue placeholder="Select a voice..." />
                            </SelectTrigger>
                            <SelectContent>
                                {voices.length > 0 ? (
                                    voices.map((voice, idx) => (
                                        <SelectItem key={`voice-${idx}-${voice.name}`} value={String(idx)}>
                                            {voice.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value={String(0)}>Default</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </Field>
                )}
            />

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                <Button type="submit">Play</Button>
                <Button type="reset" variant="ghost" onClick={reset} aria-label="Reset Form">
                    Reset
                </Button>
            </div>
        </form>
    );
}
