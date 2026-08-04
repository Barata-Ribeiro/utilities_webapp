import { Meta } from '~/components/application/meta';
import DiceRollerTab from '~/components/pages/utilities/dice-roller-tab';
import { Metadata } from '~/types/metadata';

export const METADATA: Metadata = {
    title: 'Dice Roller',
    description:
        'A simple, accessible dice roller utility. Roll any number of dice with a viable number of sides, and get the results instantly.',
    keywords: ['dice roller', 'dice', 'random number generator', 'utilities', 'dungeons and dragons', 'tabletop games'],
};

export default function Page() {
    return (
        <>
            <Meta {...METADATA} />
            <article className="rounded-md bg-card p-6 shadow">
                <h1 className="font-serif text-xl">Dice Roller</h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Roll any number of dice with a viable number of sides, and get the results instantly. Useful for
                    tabletop games, role-playing games, or any situation where you need a random number.
                </p>

                <section className="mt-4">
                    <h2 className="sr-only">How it works</h2>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        <li>
                            <strong>Regular Dice:</strong> Select the number of dice and which type of dice to roll (d4,
                            d6, d8, d10, d12, d20, or d100).
                        </li>
                        <li>
                            <strong>Vampire - The Masquerade:</strong> Roll a pool of ten-sided dice and count the
                            number of successes based on the game's rules.
                        </li>
                        <li>
                            <strong>Result:</strong> The total of all dice rolled will be displayed instantly.
                        </li>
                    </ul>
                </section>

                <div className="mt-4">
                    <DiceRollerTab />
                </div>

                <footer className="mt-4 text-xs text-muted-foreground">
                    Tip: This utility runs locally in your browser and does not transmit the results to any server.
                </footer>
            </article>
        </>
    );
}
