import { useState } from 'react';
import { ButtonGroup } from '~/components/ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { DICE } from '~/lib/consts';
import { cn } from '~/lib/utils';

type SelectedDie = {
    sides: number;
    timesToRoll: number;
};

export default function GenericDiceRoller() {
    const [selectedDice, setSelectedDice] = useState<SelectedDie[]>([]);

    return (
        <Card>
            <CardHeader className="border-b">
                <CardTitle>Generic Dice Roller</CardTitle>
                <CardDescription>
                    Roll common dice with this roller; choose any number and add modifiers. Results are clear and
                    concise for easy reading.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ButtonGroup className="mx-auto flex-wrap gap-2">
                    {DICE.map((die) => {
                        const rollCount = selectedDice.find((d) => d.sides === die.sides)?.timesToRoll;
                        const isThreeDigits = String(die.sides).length >= 3;

                        return (
                            <button
                                key={die.sides}
                                type="button"
                                aria-label={`Roll a ${die.sides}-sided die`}
                                title={`Roll a ${die.sides}-sided die`}
                                className="relative transition-transform duration-100 ease-in-out hover:scale-110 hover:drop-shadow-lg focus:scale-110 focus:drop-shadow-lg"
                            >
                                <die.vector
                                    backgroundFill="oklch(0.553 0.195 38.402)"
                                    shadowStrokeColor="oklch(0.705 0.213 47.604)"
                                    aria-hidden
                                    className="h-14"
                                />

                                <span
                                    id={`die-${die.sides}-number`}
                                    aria-hidden
                                    className={cn(
                                        isThreeDigits ? 'text-3xl' : 'text-4xl',
                                        'pointer-events-none absolute inset-0 flex items-center justify-center bg-linear-to-b/oklch from-orange-50 to-orange-200 bg-clip-text font-heading leading-none font-bold text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]',
                                    )}
                                >
                                    {die.sides}
                                </span>
                            </button>
                        );
                    })}
                </ButtonGroup>
            </CardContent>
        </Card>
    );
}
