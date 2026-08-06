import { InfoIcon, PlayIcon, RefreshCwIcon } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useState, useTransition } from 'react';
import DiceRollCounterBadge from '~/components/pages/utilities/dice-roller/helpers/dice-roll-counter.badge';
import DiceText from '~/components/pages/utilities/dice-roller/helpers/dice-text';
import { Button } from '~/components/ui/button';
import { ButtonGroup } from '~/components/ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '~/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
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

    function handleReset() {
        setSelectedDice([]);
        setModifier(0);
        setDiceRollResult(null);
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

    return (
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
                                <TooltipTrigger asChild>
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
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{die.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </ButtonGroup>

                <div className="flex flex-col items-center gap-2 sm:flex-row">
                    <InputGroup className="max-w-40 flex-1">
                        <Popover>
                            <PopoverTrigger asChild>
                                <InputGroupAddon>
                                    <InputGroupButton variant="secondary" size="icon-xs" className="rounded-full p-1!">
                                        <InfoIcon aria-hidden />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="flex flex-col gap-1 rounded-xl text-sm">
                                <p className="font-medium">Modifiers</p>
                                <p>
                                    Use these modifiers to adjust your dice rolls. You can add or subtract values as
                                    needed. Check your game rules for more details.
                                </p>
                            </PopoverContent>
                        </Popover>
                        <InputGroupAddon className="pl-1.5 text-muted-foreground">Mod.</InputGroupAddon>
                        <InputGroupInput
                            id="modifier-input"
                            name="modifier-input"
                            aria-label="Modifier input"
                            type="number"
                            inputMode="numeric"
                            value={modifier}
                            step={1}
                            onChange={(e) => setModifier(Number(e.target.value))}
                        />
                    </InputGroup>

                    <Separator orientation={isMobile ? 'horizontal' : 'vertical'} />

                    <ButtonGroup>
                        <Button disabled={selectedDice.length === 0 || isPending} onClick={handleDiceRoll}>
                            <PlayIcon aria-hidden /> Roll!
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleReset}
                            disabled={selectedDice.length === 0 || isPending}
                        >
                            <RefreshCwIcon aria-hidden /> Reset
                        </Button>
                    </ButtonGroup>
                </div>

                {displayResults && diceRollResult && (
                    <div className="flex w-full flex-col gap-2">
                        <pre>{JSON.stringify(diceRollResult, null, 2)}</pre>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
