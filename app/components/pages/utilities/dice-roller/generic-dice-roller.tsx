import { useState } from 'react';
import DiceText from '~/components/pages/utilities/dice-roller/helpers/dice-text';
import { ButtonGroup } from '~/components/ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { DICE } from '~/lib/consts';

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
                                    backgroundFill="var(--primary)"
                                    shadowStrokeColor="var(--sidebar-primary)"
                                    aria-hidden
                                    className="h-14"
                                />

                                <DiceText sides={die.sides} isThreeDigits={isThreeDigits} />
                            </button>
                        );
                    })}
                </ButtonGroup>
            </CardContent>
        </Card>
    );
}
