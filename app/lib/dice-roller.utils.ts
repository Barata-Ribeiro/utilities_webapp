import { floor, random } from 'mathjs';
import type { DiceRollGroup, DiceRollResult } from '~/types/dice';

type DiceSpecification = {
    label: string;
    sides: number;
    count: number;
};

function rollDie(sides: number): number {
    if (sides < 1) {
        throw new Error('Number of sides must be at least 1.');
    }

    return floor(random(1, sides + 1));
}

function rollDiceGroup(sides: number, count: number): DiceRollGroup {
    const rolls: number[] = Array.from({ length: count }, () => rollDie(sides));
    const total: number = rolls.reduce((sum, roll) => sum + roll, 0);

    return {
        label: `${count}d${sides}`,
        sides,
        count,
        rolls,
        total,
    };
}

function buildDiceRollGroups(dice: DiceSpecification[], modifier: number): DiceRollResult {
    const groups: DiceRollGroup[] = dice
        .filter((die) => die.count > 0)
        .map((die) => rollDiceGroup(die.sides, die.count));
    const subtotal: number = groups.reduce((sum, group) => sum + group.total, 0);
    const notationParts: string[] = groups.map((group) => `${group.count}${group.label}`);

    if (modifier !== 0) {
        notationParts.push(modifier > 0 ? `+${modifier}` : `${modifier}`);
    }

    return {
        notation: notationParts.join(' '),
        modifier,
        total: subtotal + modifier,
        groups,
    };
}

export { buildDiceRollGroups, rollDiceGroup, rollDie };
