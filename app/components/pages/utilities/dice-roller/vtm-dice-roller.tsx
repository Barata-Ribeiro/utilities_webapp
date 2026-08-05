import { zodResolver } from '@hookform/resolvers/zod';
import { type BaseSyntheticEvent, useCallback, useState, useTransition } from 'react';
import { Controller, type Resolver, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod/v4';
import VtmAlert from '~/components/pages/utilities/dice-roller/vtm-alert';
import { Button } from '~/components/ui/button';
import { ButtonGroup } from '~/components/ui/button-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import useIsMobile from '~/hooks/use-mobile';
import { rollDie } from '~/lib/dice-roller.utils';

// Dice import
import hungerDieBestialFailure from '~/assets/dice/vtm/Dice_Hunger_BestialFailure.png';
import hungerDieFailure from '~/assets/dice/vtm/Dice_Hunger_Failure.png';
import hungerDieMessyCritical from '~/assets/dice/vtm/Dice_Hunger_MessyCritical.png';
import hungerDieSuccess from '~/assets/dice/vtm/Dice_Hunger_Success.png';
import regularDieCritical from '~/assets/dice/vtm/Dice_Regular_Critical.png';
import regularDieFailure from '~/assets/dice/vtm/Dice_Regular_Failure.png';
import regularDieSuccess from '~/assets/dice/vtm/Dice_Regular_Success.png';

type DiceRollData = {
    regularDiceRoll: number[];
    hungerDiceRoll: number[];
};

const VtmDiceRollerSchema = z.object({
    regularDice: z.coerce.number().min(1).max(10).default(1),
    hungerDice: z.coerce.number().min(0).max(5).default(0),
    difficulty: z.coerce.number().min(2).max(10).default(4).optional(),
});

type VtmDiceRollerSchemaType = z.infer<typeof VtmDiceRollerSchema>;

export default function VtmDiceRoller() {
    const [currentRoll, setCurrentRoll] = useState<DiceRollData>({ regularDiceRoll: [], hungerDiceRoll: [] });
    const [isPending, startTransition] = useTransition();
    const { isMobile } = useIsMobile();

    const form = useForm<VtmDiceRollerSchemaType>({
        resolver: zodResolver(VtmDiceRollerSchema) as Resolver<VtmDiceRollerSchemaType>,
        defaultValues: { regularDice: 1, hungerDice: 0, difficulty: 4 },
    });

    function rollDice(regularDice: number, hungerDice: number, difficulty: number | undefined) {
        if (hungerDice > regularDice) {
            alert('Hunger dice cannot exceed total dice.');
            return;
        }

        if (difficulty && (difficulty < 2 || difficulty > 10)) {
            alert('Difficulty must be between 2 and 10.');
            return;
        }

        if (regularDice < 1 || regularDice > 10) {
            alert('Total dice must be between 1 and 10.');
            return;
        }

        if (hungerDice < 0 || hungerDice > 5) {
            alert('Hunger dice must be between 0 and 5.');
            return;
        }

        setCurrentRoll({ regularDiceRoll: [], hungerDiceRoll: [] });

        for (let i = 0; i < regularDice; i++) {
            const roll = rollDie(10);
            setCurrentRoll((prev) => ({ ...prev, regularDiceRoll: [...prev.regularDiceRoll, roll] }));
        }

        for (let i = 0; i < hungerDice; i++) {
            const roll = rollDie(10);
            setCurrentRoll((prev) => ({ ...prev, hungerDiceRoll: [...prev.hungerDiceRoll, roll] }));
        }
    }

    const onSubmitFn = useCallback(
        (data: VtmDiceRollerSchemaType, event?: BaseSyntheticEvent) => {
            startTransition(async () => {
                const { regularDice, hungerDice, difficulty } = data;
                const buttonClicked = (event?.nativeEvent as SubmitEvent | undefined)?.submitter?.id;

                switch (buttonClicked) {
                    case 'roll-dice':
                        rollDice(regularDice, hungerDice, difficulty);
                        break;
                    case 'rouse-check':
                        console.log(
                            `Performing rouse check with ${regularDice} regular dice and ${hungerDice} hunger dice.`,
                        );
                        break;
                    default:
                        throw new Error('Something went wrong. Please try again.');
                }
            });
        },
        [startTransition],
    );

    function reset() {
        form.reset();
        setCurrentRoll({ regularDiceRoll: [], hungerDiceRoll: [] });
    }

    return (
        <Card>
            <CardHeader className="border-b">
                <CardTitle>Vampire: The Masquerade (5th edition) Dice Roller</CardTitle>
                <CardDescription>
                    Roll regular and hunger dice for Vampire: The Masquerade (5th edition) using this simple dice
                    roller.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <VtmAlert />

                <form
                    onSubmit={form.handleSubmit(onSubmitFn)}
                    className="flex flex-col gap-4 inert:grayscale-100"
                    inert={isPending ? true : undefined}
                >
                    <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <Controller
                            control={form.control}
                            name="regularDice"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="relative">
                                    <FieldLabel htmlFor={field.name}>Regular Dice</FieldLabel>
                                    <Input
                                        type="number"
                                        id={field.name}
                                        min={1}
                                        max={10}
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
                                        max={5}
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

                <div className="rounded-md border border-dashed p-4">
                    {currentRoll.regularDiceRoll.length > 0 || currentRoll.hungerDiceRoll.length > 0 ? (
                        <div className="flex w-full flex-col items-center justify-center gap-2">
                            <div className="flex flex-wrap items-center gap-2 select-none">
                                {currentRoll.regularDiceRoll.map((roll, index) => {
                                    switch (true) {
                                        case roll < 8:
                                            return (
                                                <img
                                                    key={`regular-dice-${index}-${roll}`}
                                                    src={regularDieFailure}
                                                    alt={`Regular Die Roll: ${roll}`}
                                                    title="Failure"
                                                    className="h-12 italic"
                                                />
                                            );
                                        case roll >= 8 && roll < 10:
                                            return (
                                                <img
                                                    key={`regular-dice-${index}-${roll}`}
                                                    src={regularDieSuccess}
                                                    alt={`Regular Die Roll: ${roll}`}
                                                    title="Success"
                                                    className="h-12 italic"
                                                />
                                            );
                                        case roll === 10:
                                            return (
                                                <img
                                                    key={`regular-dice-${index}-${roll}`}
                                                    src={regularDieCritical}
                                                    alt={`Regular Die Roll: ${roll}`}
                                                    title="Critical Success"
                                                    className="h-12 italic drop-shadow-lg drop-shadow-yellow-400"
                                                />
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                                {currentRoll.hungerDiceRoll.map((roll, index) => {
                                    switch (true) {
                                        case roll > 1 && roll < 8:
                                            return (
                                                <img
                                                    key={`hunger-dice-${index}-${roll}`}
                                                    src={hungerDieFailure}
                                                    alt={`Hunger Die Roll: ${roll}`}
                                                    title="Failure"
                                                    className="h-12 italic"
                                                />
                                            );
                                        case roll >= 8 && roll < 10:
                                            return (
                                                <img
                                                    key={`hunger-dice-${index}-${roll}`}
                                                    src={hungerDieSuccess}
                                                    alt={`Hunger Die Roll: ${roll}`}
                                                    title="Success"
                                                    className="h-12 italic"
                                                />
                                            );
                                        case roll === 10:
                                            return (
                                                <img
                                                    key={`hunger-dice-${index}-${roll}`}
                                                    src={hungerDieMessyCritical}
                                                    alt={`Hunger Die Roll: ${roll}`}
                                                    title="Messy Critical Success"
                                                    className="h-12 italic drop-shadow-lg drop-shadow-red-400"
                                                />
                                            );
                                        case roll === 1:
                                            return (
                                                <img
                                                    key={`hunger-dice-${index}-${roll}`}
                                                    src={hungerDieBestialFailure}
                                                    alt={`Hunger Die Roll: ${roll}`}
                                                    title="Bestial Failure"
                                                    className="h-12 italic drop-shadow-lg drop-shadow-red-400"
                                                />
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-sm text-muted-foreground">No dice rolled yet.</p>
                    )}
                </div>
            </CardContent>

            <CardFooter className="border-t text-sm text-muted-foreground">
                <p>
                    <strong>Disclaimer:</strong> Dice Images from the{' '}
                    <Link
                        to="https://www.storytellersvault.com/en/product/464430/5th-edition-art-pack-dark-pack-unbound-and-stv-only"
                        target="_blank"
                        rel="noopener noreferrer external"
                        className="underline"
                    >
                        5th Edition Art Pack
                    </Link>{' '}
                    from White Wolf.
                </p>
            </CardFooter>
        </Card>
    );
}
