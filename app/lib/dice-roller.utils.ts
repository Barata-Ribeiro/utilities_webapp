import { floor, random } from 'mathjs';

function rollDie(sides: number): number {
    if (sides < 1) {
        throw new Error('Number of sides must be at least 1.');
    }

    return floor(random(1, sides + 1));
}

export { rollDie };
