interface DiceRollGroup {
    label: string;
    sides: number;
    count: number;
    rolls: number[];
    total: number;
}

interface DiceRollResult {
    notation: string;
    modifier: number;
    total: number;
    groups: DiceRollGroup[];
}

export type { DiceRollGroup, DiceRollResult };
