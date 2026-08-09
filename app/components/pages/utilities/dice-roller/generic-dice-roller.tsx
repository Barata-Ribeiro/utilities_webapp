import { PlayIcon, RefreshCwIcon } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Fragment, useState, useTransition } from 'react';
import DiceRollCounterBadge from '~/components/pages/utilities/dice-roller/helpers/dice-roll-counter.badge';
import DiceText from '~/components/pages/utilities/dice-roller/helpers/dice-text';
import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
    NumberFieldScrubArea,
} from '~/components/reui/number-field';
import { Button } from '~/components/ui/button';
import { ButtonGroup } from '~/components/ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Dialog, DialogContent, DialogHeader } from '~/components/ui/dialog';
import { InputGroup, InputGroupAddon } from '~/components/ui/input-group';
import { Separator } from '~/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import useIsMobile from '~/hooks/use-mobile';
import { DICE } from '~/lib/consts';
import { buildDiceRollGroups } from '~/lib/dice-roller.utils';
import { DiceRollResult } from '~/types/dice';

type SelectedDie = {
    sides: number;
    timesToRoll: number;
};

function formatGroupSummary(roll: DiceRollResult): string {
    return roll.groups.map((group) => `${group.label}: ${group.total}`).join(' | ');
}

export default function GenericDiceRoller() {
    const { isMobile } = useIsMobile();

    const [isPending, startTransition] = useTransition();
    const [selectedDice, setSelectedDice] = useState<SelectedDie[]>([]);
    const [modifier, setModifier] = useState(0);
    const [diceRollResult, setDiceRollResult] = useState<DiceRollResult | null>(null);
    const [displayResults, setDisplayResults] = useState(false);

    function increaseDiceCount(
        die: (typeof DICE)[number],
        event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    ): void {
        event.preventDefault();

        setSelectedDice((prevSelectedDice) => {
            const existingDie = prevSelectedDice.some((d) => d.sides === die.sides);

            if (existingDie) {
                return prevSelectedDice.map((d) =>
                    d.sides === die.sides ? { ...d, timesToRoll: d.timesToRoll + 1 } : d,
                );
            }

            return [...prevSelectedDice, { sides: die.sides, timesToRoll: 1 }];
        });
    }

    function handleDiceRoll() {
        if (selectedDice.length === 0) {
            return;
        }

        startTransition(() => {
            const diceRollConfig = selectedDice.map((die) => ({
                label: DICE.find((d) => d.sides === die.sides)?.label || `${die.sides}-sided`,
                sides: die.sides,
                count: die.timesToRoll,
            }));

            const builtResult = buildDiceRollGroups(diceRollConfig, modifier);

            setDiceRollResult(builtResult);
            setDisplayResults(true);
        });
    }

    function handleReset() {
        setSelectedDice([]);
        setModifier(0);
        setDiceRollResult(null);
        setDisplayResults(false);
    }

    const shouldDisplayResults = displayResults && diceRollResult;
    const displayModifier = modifier > 0 ? `+${modifier}` : modifier;

    return (
        <Fragment>
            <Card>
                <CardHeader className="border-b">
                    <CardTitle>Generic Dice Roller</CardTitle>
                    <CardDescription>
                        Roll common dice with this roller; choose any number and add modifiers. Results are clear and
                        concise for easy reading.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4">
                    <ButtonGroup className="flex-wrap gap-2">
                        {DICE.map((die) => {
                            const rollCount = selectedDice.find((d) => d.sides === die.sides)?.timesToRoll;
                            const isThreeDigits = String(die.sides).length >= 3;
                            const rollInstruction = `Roll a ${die.sides}-sided die`;

                            return (
                                <Tooltip key={die.label}>
                                    <TooltipTrigger
                                        render={
                                            <button
                                                key={die.sides}
                                                type="button"
                                                aria-label={rollInstruction}
                                                title={rollInstruction}
                                                className="relative transition-transform duration-100 ease-in-out hover:scale-110 hover:drop-shadow-lg focus-visible:scale-110 focus-visible:drop-shadow-lg active:scale-95 active:drop-shadow-sm"
                                                onClick={(e) => increaseDiceCount(die, e)}
                                            >
                                                <die.vector
                                                    backgroundFill="var(--primary)"
                                                    shadowStrokeColor="var(--sidebar-primary)"
                                                    aria-hidden
                                                    className="h-14"
                                                />

                                                {rollCount && <DiceRollCounterBadge count={rollCount} />}

                                                <DiceText sides={die.sides} isThreeDigits={isThreeDigits} />
                                            </button>
                                        }
                                    />
                                    <TooltipContent>
                                        <p>{die.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </ButtonGroup>

                    <div className="flex flex-col items-center gap-2 md:flex-row">
                        <NumberField
                            id="modifier-input"
                            name="modifier-input"
                            aria-label="Modifier input"
                            className="flex-1 focus-within:rounded-md focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 focus-within:ring-offset-0 focus-within:has-aria-invalid:border-destructive focus-within:has-aria-invalid:ring-destructive/20 md:max-w-44"
                            min={-100}
                            max={100}
                            smallStep={1}
                            largeStep={5}
                            value={modifier}
                            onValueChange={(value) => setModifier(Number(value))}
                        >
                            <InputGroup className="w-full flex-1">
                                <InputGroupAddon>
                                    <NumberFieldScrubArea label="Mod." labelClassName="font-sans" />
                                </InputGroupAddon>
                                <NumberFieldGroup className="ml-2 border-none focus-within:ring-0 focus-within:ring-offset-0">
                                    <NumberFieldInput className="min-w-12 md:text-left" />
                                    <NumberFieldDecrement aria-label="Decrement" className="rounded-none!" />
                                    <NumberFieldIncrement aria-label="Increment" />
                                </NumberFieldGroup>
                            </InputGroup>
                        </NumberField>

                        <Separator orientation={isMobile ? 'horizontal' : 'vertical'} />

                        <ButtonGroup className="w-full">
                            <Button
                                className="flex-1"
                                disabled={selectedDice.length === 0 || isPending}
                                onClick={handleDiceRoll}
                            >
                                <PlayIcon aria-hidden /> Roll!
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={handleReset}
                                disabled={selectedDice.length === 0 || isPending}
                            >
                                <RefreshCwIcon aria-hidden /> Reset
                            </Button>
                        </ButtonGroup>
                    </div>
                </CardContent>
            </Card>

            {shouldDisplayResults && (
                <Dialog open={displayResults} onOpenChange={handleReset} aria-label="Dice Roll Results">
                    <DialogContent>
                        <DialogHeader className="border-b font-heading text-2xl">Results</DialogHeader>

                        <div className="flex flex-col items-center gap-3">
                            <p className="text-5xl leading-none font-black tabular-nums">{diceRollResult.total}</p>
                            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                                {formatGroupSummary(diceRollResult)} {modifier !== 0 && `(${displayModifier} mod.)`}
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </Fragment>
    );
}
