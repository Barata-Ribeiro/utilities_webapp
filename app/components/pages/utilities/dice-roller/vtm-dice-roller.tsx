import { Checkbox } from '@base-ui/react/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import { floor } from 'mathjs';
import { type BaseSyntheticEvent, Fragment, useCallback, useState, useTransition } from 'react';
import { Controller, type Resolver, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod/v4';
import VtmAlert from '~/components/pages/utilities/dice-roller/vtm-alert';
import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
} from '~/components/reui/number-field';
import {
    ActionBar,
    ActionBarClose,
    ActionBarGroup,
    ActionBarItem,
    ActionBarSelection,
    ActionBarSeparator,
} from '~/components/ui/action-bar';
import { Button } from '~/components/ui/button';
import { ButtonGroup } from '~/components/ui/button-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import useIsMobile from '~/hooks/use-mobile';
import { rollDie } from '~/lib/dice-roller.utils';
import { cn } from '~/lib/utils';

// Dice import
import hungerDieBestialFailure from '~/assets/dice/vtm/Dice_Hunger_BestialFailure.png';
import hungerDieFailure from '~/assets/dice/vtm/Dice_Hunger_Failure.png';
import hungerDieMessyCritical from '~/assets/dice/vtm/Dice_Hunger_MessyCritical.png';
import hungerDieSuccess from '~/assets/dice/vtm/Dice_Hunger_Success.png';
import regularDieCritical from '~/assets/dice/vtm/Dice_Regular_Critical.png';
import regularDieFailure from '~/assets/dice/vtm/Dice_Regular_Failure.png';
import regularDieSuccess from '~/assets/dice/vtm/Dice_Regular_Success.png';

type DieResult = {
    id: string;
    result: number;
};

type DiceRollData = {
    regularDiceRoll: DieResult[];
    hungerDiceRoll: DieResult[];
    difficulty: number | undefined;
};

const VtmDiceRollerSchema = z.object({
    regularDice: z.coerce.number().min(1).max(10).default(1),
    hungerDice: z.coerce.number().min(0).max(5).default(0),
    difficulty: z.coerce.number().min(1).max(10).default(3).optional(),
});

type VtmDiceRollerSchemaType = z.infer<typeof VtmDiceRollerSchema>;

export default function VtmDiceRoller() {
    const [currentRoll, setCurrentRoll] = useState<DiceRollData>({
        regularDiceRoll: [],
        hungerDiceRoll: [],
        difficulty: undefined,
    });
    const [selectedRegularDice, setSelectedRegularDice] = useState<Set<string>>(new Set());
    const [isPending, startTransition] = useTransition();
    const { isMobile } = useIsMobile();

    const form = useForm<VtmDiceRollerSchemaType>({
        resolver: zodResolver(VtmDiceRollerSchema) as Resolver<VtmDiceRollerSchemaType>,
        defaultValues: { regularDice: 1, hungerDice: 0, difficulty: 3 },
    });

    function rollDice(regularDice: number, hungerDice: number, difficulty: number | undefined, isRouseCheck: boolean) {
        if (hungerDice > regularDice && !isRouseCheck) {
            alert('Hunger dice cannot exceed total dice.');
            return;
        }

        if (difficulty && (difficulty < 1 || difficulty > 10) && !isRouseCheck) {
            alert('Difficulty must be between 1 and 10.');
            return;
        }

        if ((regularDice < 1 || regularDice > 10) && !isRouseCheck) {
            alert('Regular dice must be between 1 and 10.');
            return;
        }

        if (hungerDice < 0 || hungerDice > 5) {
            alert('Hunger dice must be between 0 and 5.');
            return;
        }

        if (difficulty && !isRouseCheck) {
            const totalAvailableDice = regularDice + hungerDice;
            const maximumPotentialSuccesses = totalAvailableDice * 2;

            if (maximumPotentialSuccesses < difficulty) {
                alert('Not enough dice to potentially meet the difficulty.');
                return;
            }
        }

        setCurrentRoll({ regularDiceRoll: [], hungerDiceRoll: [], difficulty });

        for (let i = 0; i < regularDice; i++) {
            const roll = rollDie(10);
            const id = crypto.randomUUID();
            setCurrentRoll((prev) => ({ ...prev, regularDiceRoll: [...prev.regularDiceRoll, { id, result: roll }] }));
        }

        for (let i = 0; i < hungerDice; i++) {
            const roll = rollDie(10);
            const id = crypto.randomUUID();
            setCurrentRoll((prev) => ({ ...prev, hungerDiceRoll: [...prev.hungerDiceRoll, { id, result: roll }] }));
        }

        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    const onSubmitFn = useCallback(
        (data: VtmDiceRollerSchemaType, event?: BaseSyntheticEvent) => {
            startTransition(async () => {
                const { regularDice, hungerDice, difficulty } = data;
                const buttonClicked = (event?.nativeEvent as SubmitEvent | undefined)?.submitter?.id;

                switch (buttonClicked) {
                    case 'roll-dice':
                        rollDice(regularDice, hungerDice, difficulty, false);
                        break;
                    case 'rouse-check':
                        rollDice(0, 1, 1, true);
                        break;
                    default:
                        throw new Error('Something went wrong. Please try again.');
                }
            });
        },
        [startTransition],
    );

    function calculateResults(
        regularDiceRoll: DieResult[],
        hungerDiceRoll: DieResult[],
        difficulty: number | undefined,
    ) {
        let successCount = 0;
        let criticalCount = 0;
        let messyCriticalCount = 0;
        let bestialFailureCount = 0;

        // Process regular dice rolls
        for (const { result } of regularDiceRoll) {
            if (result >= 6 && result < 10) {
                successCount++;
            } else if (result === 10) {
                criticalCount++;
                successCount += 2; // Each critical counts as two successes
            }
        }

        for (const { result } of hungerDiceRoll) {
            if (result >= 6 && result < 10) {
                successCount++;
            } else if (result === 10) {
                messyCriticalCount++;
                successCount += 2; // Each messy critical counts as two successes
            } else if (result === 1) {
                bestialFailureCount++;
            }
        }

        // Adjust critical successes
        const totalCriticals = criticalCount + messyCriticalCount;
        const criticalPairs = floor(totalCriticals / 2);
        successCount += criticalPairs * 2; // Each pair of criticals counts as two successes

        const hasCritical = criticalPairs >= 1;
        const hasMessyCritical = hasCritical && messyCriticalCount > 0;

        // Determine the outcome
        let outcome: string;
        let outcomeClassName: string;

        const isRouseCheck = regularDiceRoll.length === 0 && hungerDiceRoll.length === 1 && difficulty === 1;

        if (isRouseCheck) {
            if (successCount >= 1) {
                outcome = 'Rouse Check Success';
                outcomeClassName = cn('bg-green-100 text-green-800');
            } else {
                outcome = 'Rouse Check Failure (Increase Hunger by 1)';
                outcomeClassName = cn('bg-red-100 text-red-800');
                if (bestialFailureCount > 0) {
                    outcome += ' and Bestial Failure (Compulsion Check)';
                    outcomeClassName = cn('bg-red-100 text-red-800');
                }
            }

            return { outcome, outcomeClassName };
        }

        if (difficulty !== undefined) {
            if (successCount >= difficulty) {
                if (hasMessyCritical) {
                    outcome = `Messy Critical Success (${successCount}/${difficulty})`;
                    outcomeClassName = cn('bg-yellow-100 text-yellow-800');
                } else if (hasCritical) {
                    outcome = `Critical Success (${successCount}/${difficulty})`;
                    outcomeClassName = cn('bg-green-100 text-green-800');
                } else if (bestialFailureCount > 0) {
                    outcome = `Success (Bestial Compulsion Possible) (${successCount}/${difficulty})`;
                    outcomeClassName = cn('bg-yellow-100 text-yellow-800');
                } else {
                    outcome = `Success (${successCount}/${difficulty})`;
                    outcomeClassName = cn('bg-green-100 text-green-800');
                }
            } else if (bestialFailureCount > 0) {
                outcome = `Bestial Failure (${successCount}/${difficulty})`;
                outcomeClassName = cn('bg-red-100 text-red-800');
            } else {
                outcome = `Failure (${successCount}/${difficulty})`;
                outcomeClassName = cn('bg-red-100 text-red-800');
            }
        } else {
            outcome = `Successes: ${successCount}`;
            outcomeClassName = cn('bg-green-100 text-green-800');
            if (hasMessyCritical) {
                outcome += `\n Messy Critical Possible`;
            } else if (hasCritical) {
                outcome += `\n Critical Possible`;
            }
        }

        return { outcome, outcomeClassName };
    }

    function reset() {
        form.reset();
        setCurrentRoll({ regularDiceRoll: [], hungerDiceRoll: [], difficulty: undefined });
    }

    // Willpower reroll fns
    const onItemSelect = useCallback((die: DieResult, checked: boolean) => {
        setSelectedRegularDice((prev) => {
            const next = new Set(prev);

            if (checked) {
                if (!next.has(die.id) && next.size >= 3) {
                    alert('You can only reroll up to 3 regular dice at a time.');
                    return prev;
                }

                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }

                next.add(die.id);
            } else {
                next.delete(die.id);
            }

            return next;
        });
    }, []);

    const onOpenChange = useCallback((open: boolean) => {
        if (!open) {
            setSelectedRegularDice(new Set());
        }
    }, []);

    const onClearSelection = useCallback(() => {
        setSelectedRegularDice(new Set());

        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    }, []);

    const onWillpowerReroll = useCallback(() => {
        if (selectedRegularDice.size === 0) {
            alert('No dice selected for reroll.');
            return;
        }

        const newRegularDiceRoll = currentRoll.regularDiceRoll.map((die) => {
            if (selectedRegularDice.has(die.id)) {
                const newRoll = rollDie(10);
                return { id: die.id, result: newRoll };
            }
            return die;
        });

        setCurrentRoll((prev) => ({ ...prev, regularDiceRoll: newRegularDiceRoll }));

        setSelectedRegularDice(new Set());

        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }, [currentRoll.regularDiceRoll, selectedRegularDice]);

    const hasRolledDice = currentRoll.regularDiceRoll.length > 0 || currentRoll.hungerDiceRoll.length > 0;

    return (
        <Fragment>
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
                                        <NumberField
                                            id={field.name}
                                            min={1}
                                            max={10}
                                            step={1}
                                            value={field.value}
                                            onValueChange={(value) => field.onChange(value)}
                                        >
                                            <NumberFieldGroup aria-invalid={!!form.formState.errors.difficulty}>
                                                <NumberFieldDecrement />
                                                <NumberFieldInput />
                                                <NumberFieldIncrement />
                                            </NumberFieldGroup>
                                        </NumberField>
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
                            <Button
                                type="submit"
                                id="rouse-check"
                                variant="secondary"
                                className="flex-1 max-md:min-h-8"
                            >
                                Rouse Check
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                className="flex-1 max-md:min-h-8"
                                onClick={reset}
                            >
                                Reset
                            </Button>
                        </ButtonGroup>
                    </form>

                    <div className="rounded-md border border-dashed p-4">
                        {hasRolledDice &&
                            (() => {
                                const { outcome, outcomeClassName } = calculateResults(
                                    currentRoll.regularDiceRoll,
                                    currentRoll.hungerDiceRoll,
                                    currentRoll.difficulty,
                                );

                                return (
                                    <div
                                        className={cn(
                                            '-mx-4 -mt-4 mb-4 rounded-t-md p-2 text-center',
                                            outcomeClassName,
                                        )}
                                    >
                                        <strong>{outcome}</strong>
                                    </div>
                                );
                            })()}
                        {hasRolledDice ? (
                            <div className="flex w-full flex-col items-center justify-center gap-2">
                                <div className="flex flex-wrap items-center gap-2 select-none">
                                    {currentRoll.regularDiceRoll.map(({ result, id }) => {
                                        switch (true) {
                                            case result < 6:
                                                return (
                                                    <Checkbox.Root
                                                        key={id}
                                                        className="transition-all duration-100 ease-in-out hover:scale-105 data-checked:scale-110 data-checked:drop-shadow-lg data-checked:drop-shadow-yellow-400"
                                                        checked={selectedRegularDice.has(id)}
                                                        onCheckedChange={(checked) =>
                                                            onItemSelect({ id, result }, checked as boolean)
                                                        }
                                                    >
                                                        <img
                                                            src={regularDieFailure}
                                                            alt={`Regular Die Roll: ${result}`}
                                                            title="Failure"
                                                            className="h-12 italic"
                                                        />
                                                    </Checkbox.Root>
                                                );
                                            case result >= 6 && result < 10:
                                                return (
                                                    <Checkbox.Root
                                                        key={id}
                                                        className="transition-all duration-100 ease-in-out hover:scale-105 data-checked:scale-110 data-checked:drop-shadow-lg data-checked:drop-shadow-yellow-400"
                                                        checked={selectedRegularDice.has(id)}
                                                        onCheckedChange={(checked) =>
                                                            onItemSelect({ id, result }, checked as boolean)
                                                        }
                                                    >
                                                        <img
                                                            src={regularDieSuccess}
                                                            alt={`Regular Die Roll: ${result}`}
                                                            title="Success"
                                                            className="h-12 italic"
                                                        />
                                                    </Checkbox.Root>
                                                );
                                            case result === 10:
                                                return (
                                                    <Checkbox.Root
                                                        key={id}
                                                        className="transition-all duration-100 ease-in-out hover:scale-105 data-checked:scale-110 data-checked:drop-shadow-lg data-checked:drop-shadow-yellow-400"
                                                        checked={selectedRegularDice.has(id)}
                                                        onCheckedChange={(checked) =>
                                                            onItemSelect({ id, result }, checked as boolean)
                                                        }
                                                    >
                                                        <img
                                                            src={regularDieCritical}
                                                            alt={`Regular Die Roll: ${result}`}
                                                            title="Critical Success"
                                                            className="drop-orange-yellow-400 h-12 italic drop-shadow-lg"
                                                        />
                                                    </Checkbox.Root>
                                                );
                                            default:
                                                return null;
                                        }
                                    })}
                                    {currentRoll.hungerDiceRoll.map(({ id, result }) => {
                                        switch (true) {
                                            case result > 1 && result < 6:
                                                return (
                                                    <img
                                                        key={id}
                                                        src={hungerDieFailure}
                                                        alt={`Hunger Die Roll: ${result}`}
                                                        title="Failure"
                                                        className="h-12 italic"
                                                    />
                                                );
                                            case result >= 6 && result < 10:
                                                return (
                                                    <img
                                                        key={id}
                                                        src={hungerDieSuccess}
                                                        alt={`Hunger Die Roll: ${result}`}
                                                        title="Success"
                                                        className="h-12 italic"
                                                    />
                                                );
                                            case result === 10:
                                                return (
                                                    <img
                                                        key={id}
                                                        src={hungerDieMessyCritical}
                                                        alt={`Hunger Die Roll: ${result}`}
                                                        title="Messy Critical Success"
                                                        className="h-12 italic drop-shadow-lg drop-shadow-red-400"
                                                    />
                                                );
                                            case result === 1:
                                                return (
                                                    <img
                                                        key={id}
                                                        src={hungerDieBestialFailure}
                                                        alt={`Hunger Die Roll: ${result}`}
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

            <ActionBar
                orientation={isMobile ? 'vertical' : 'horizontal'}
                open={selectedRegularDice.size > 0}
                onOpenChange={onOpenChange}
            >
                <ActionBarSelection
                    className="w-full justify-around truncate"
                    title={`${selectedRegularDice.size} selected`}
                >
                    {selectedRegularDice.size} selected
                    <ActionBarSeparator />
                    <ActionBarClose>
                        <XIcon aria-hidden />
                    </ActionBarClose>
                </ActionBarSelection>
                <ActionBarSeparator orientation={isMobile ? 'vertical' : 'horizontal'} />
                <ActionBarGroup>
                    <ActionBarItem
                        variant="default"
                        onSelect={onWillpowerReroll}
                        disabled={selectedRegularDice.size === 0}
                    >
                        Willpower Reroll
                    </ActionBarItem>
                    <ActionBarItem
                        variant="destructive"
                        onSelect={onClearSelection}
                        disabled={selectedRegularDice.size === 0}
                    >
                        Cancel
                    </ActionBarItem>
                </ActionBarGroup>
            </ActionBar>
        </Fragment>
    );
}
