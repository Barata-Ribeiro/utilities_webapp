import { test as baseTest, describe, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import GeneralCalculator from '~/components/pages/calculators/general-calculator';

const test = baseTest.extend<{ db: Storage }>({
    db: async ({}, use) => {
        localStorage.clear();
        await use(localStorage);
        localStorage.clear();
    },
});

describe('GeneralCalculator', () => {
    describe('handleCalculation validation', () => {
        baseTest.each([['abc'], ['(1 + 2'], ['2 ++ 2']])(
            'returns placeholder output for invalid expression "%s"',
            async (expression) => {
                const screen = await render(<GeneralCalculator />);

                await screen.getByPlaceholder('Calculate here...').fill(expression);

                const output = screen.container.querySelector('#result');
                expect(output?.textContent).toContain('---');
                expect(output?.textContent).toContain('0');
            },
        );
    });

    describe('handleCalculation success', () => {
        baseTest.each([
            ['1 + 1', ['2'], '2'],
            ['1 + 1\n2 * 3', ['2', '6'], '8'],
            ['1 / 3', ['0.333'], '0.333'],
            ['2^3\n(10 - 4)', ['8', '6'], '14'],
        ])('evaluates expression lines "%s"', async (expression, expectedLines, expectedTotal) => {
            const screen = await render(<GeneralCalculator />);

            await screen.getByPlaceholder('Calculate here...').fill(expression);

            const output = screen.container.querySelector('#result');
            for (const value of expectedLines) {
                expect(output?.textContent).toContain(value);
            }
            expect(output?.textContent).toContain(expectedTotal);
        });
    });

    describe('error handling', () => {
        baseTest('keeps valid line results while invalid lines fail gracefully', async () => {
            const screen = await render(<GeneralCalculator />);

            await screen.getByPlaceholder('Calculate here...').fill('10 + 5\nfoo\n9 / 3');

            const output = screen.container.querySelector('#result');
            expect(output?.textContent).toContain('15');
            expect(output?.textContent).toContain('3');
            expect(output?.textContent).toContain('---');
            expect(output?.textContent).toContain('18');
        });

        test('persists the current expression to storage fixture', async ({ db }) => {
            const screen = await render(<GeneralCalculator />);

            await screen.getByPlaceholder('Calculate here...').fill('8 + 2');
            expect(db.getItem('calculator')).toBe('8 + 2');
        });
    });
});
