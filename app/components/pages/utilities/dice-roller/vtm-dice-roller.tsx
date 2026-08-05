import { zodResolver } from '@hookform/resolvers/zod';
import { type BaseSyntheticEvent, useCallback } from 'react';
import { Controller, type Resolver, useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { Button } from '~/components/ui/button';
import { ButtonGroup } from '~/components/ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import useIsMobile from '~/hooks/use-mobile';

const VtmDiceRollerSchema = z.object({
    regularDice: z.coerce.number().min(1).max(20).default(1),
    hungerDice: z.coerce.number().min(0).max(20).default(0),
    difficulty: z.coerce.number().min(2).max(10).default(6).optional(),
});

type VtmDiceRollerSchemaType = z.infer<typeof VtmDiceRollerSchema>;

export default function VtmDiceRoller() {
    const { isMobile } = useIsMobile();

    const form = useForm<VtmDiceRollerSchemaType>({
        resolver: zodResolver(VtmDiceRollerSchema) as Resolver<VtmDiceRollerSchemaType>,
        defaultValues: { regularDice: 1, hungerDice: 0, difficulty: 6 },
    });

    const onSubmitFn = useCallback(async (data: VtmDiceRollerSchemaType, event?: BaseSyntheticEvent) => {
        const { regularDice, hungerDice, difficulty } = data;
        const buttonClicked = (event?.nativeEvent as SubmitEvent | undefined)?.submitter?.id;

        if (buttonClicked === 'roll-dice') {
            console.log('Rolling dice with the following parameters:');
            console.log(`Total Dice: ${regularDice}`);
            console.log(`Hunger Dice: ${hungerDice}`);
            console.log(`Difficulty: ${difficulty}`);
        } else if (buttonClicked === 'rouse-check') {
            console.log('Performing a rouse check with the following parameters:');
            console.log(`Total Dice: ${regularDice}`);
            console.log(`Hunger Dice: ${hungerDice}`);
        }
    }, []);

    function reset() {
        form.reset();
    }

    return (
        <Card>
            <CardHeader className="border-b">
                <CardTitle>Vampire: The Masquerade (5th edition) Dice Roller</CardTitle>
                <CardDescription>Roll normal and hunger dice for Vampire: The Masquerade.</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmitFn)} className="flex flex-col gap-4">
                    <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <Controller
                            control={form.control}
                            name="regularDice"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="relative">
                                    <FieldLabel htmlFor={field.name}>Total Dice</FieldLabel>
                                    <Input
                                        type="number"
                                        id={field.name}
                                        min={1}
                                        max={20}
                                        step={1}
                                        inputMode="decimal"
                                        placeholder="e.g. 5"
                                        aria-invalid={!!form.formState.errors.regularDice}
                                        {...field}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            className="absolute rounded-md bg-red-100 px-2 py-1 max-sm:-bottom-6 sm:-top-8"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="hungerDice"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="relative">
                                    <FieldLabel htmlFor={field.name}>Hunger Dice</FieldLabel>
                                    <Input
                                        type="number"
                                        id={field.name}
                                        min={0}
                                        max={20}
                                        step={1}
                                        inputMode="decimal"
                                        placeholder="e.g. 3"
                                        aria-invalid={!!form.formState.errors.hungerDice}
                                        {...field}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            className="absolute rounded-md bg-red-100 px-2 py-1 max-sm:-bottom-6 sm:-top-8"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="difficulty"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="relative">
                                    <FieldLabel htmlFor={field.name}>Difficulty</FieldLabel>
                                    <Input
                                        type="number"
                                        id={field.name}
                                        min={1}
                                        max={10}
                                        step={1}
                                        inputMode="decimal"
                                        placeholder="e.g. 5"

                                        aria-invalid={!!form.formState.errors.difficulty}
                                        {...field}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            className="absolute rounded-md bg-red-100 px-2 py-1 max-sm:-bottom-6 sm:-top-8"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <ButtonGroup className="w-full" orientation={isMobile ? 'vertical' : 'horizontal'}>
                        <Button type="submit" id="roll-dice" className="flex-1 max-md:min-h-8">
                            Roll Dice
                        </Button>
                        <Button type="submit" id="rouse-check" variant="secondary" className="flex-1 max-md:min-h-8">
                            Rouse Check
                        </Button>
                        <Button type="button" variant="destructive" className="flex-1 max-md:min-h-8" onClick={reset}>
                            Reset
                        </Button>
                    </ButtonGroup>
                </form>
            </CardContent>
        </Card>
    );
}
