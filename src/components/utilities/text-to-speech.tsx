'use client';

import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onsubmit)}
                className="mx-auto mb-6 w-full max-w-lg space-y-6 border-b pb-6"
            >
                <FormField
                    name="text"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Textarea
                                    maxLength={5000}
                                    placeholder='e.g. "Hello, how are you today?"'
                                    aria-invalid={!!form.formState.errors.text}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="rate"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rate</FormLabel>
                            <FormControl>
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
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="pitch"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pitch</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <Slider
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
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value === undefined ? undefined : String(field.value)}
                                    onValueChange={(val) => field.onChange(val === undefined ? undefined : Number(val))}
                                    defaultValue={undefined}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a voice..." />
                                        </SelectTrigger>
                                    </FormControl>
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
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                    <Button type="submit">Play</Button>
                    <Button type="reset" variant="ghost" onClick={reset} aria-label="Reset Form">
                        Reset
                    </Button>
                </div>
            </form>
        </Form>
    );
}
