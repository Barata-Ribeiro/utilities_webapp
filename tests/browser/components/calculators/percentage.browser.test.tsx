import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import IsPercentOfWhatCalc from '~/components/pages/calculators/percentage/is-percent-of-what-calc';
import IsWhatPercentOfCalc from '~/components/pages/calculators/percentage/is-what-percent-of-calc';
import PercentIncreaseDecreaseCalc from '~/components/pages/calculators/percentage/percent-increase-decrease-calc';
import PercentOfCalc from '~/components/pages/calculators/percentage/percent-of-calc';
import ValueIncreaseDecreasePercent from '~/components/pages/calculators/percentage/value-increase-decrease-percent';

describe('PercentOfCalc', () => {
    describe('handleCalculation', () => {
        test.each([
            ['20', '50', '10 = (50 ⋅ 20) / 100'],
            ['12.5', '80', '10 = (80 ⋅ 12.5) / 100'],
            ['0', '50', 'y = (x ⋅ p) / 100'],
        ])('calculates p=%s of x=%s', async (percent, value, expectedFormula) => {
            const screen = await render(<PercentOfCalc />);
            await screen.getByLabelText('Percent value').fill(percent);
            await screen.getByLabelText('Base value').fill(value);

            await expect.element(screen.getByText(expectedFormula)).toBeInTheDocument();
        });

        test.each(['abc', '!@#'])('ignores invalid percent input "%s"', async (invalid) => {
            const screen = await render(<PercentOfCalc />);
            const input = screen.getByLabelText('Percent value');
            await input.fill(invalid);
            await expect.element(input).toHaveValue('');
        });
    });
});

describe('IsWhatPercentOfCalc', () => {
    describe('handleCalculation', () => {
        test.each([
            ['60', '10', '600 = (60 ⋅ 100) / 10'],
            ['7.5', '15', '50 = (7.5 ⋅ 100) / 15'],
            ['0', '10', 'p = (x ⋅ 100) / y'],
        ])('calculates x=%s against y=%s', async (x, y, expectedFormula) => {
            const screen = await render(<IsWhatPercentOfCalc />);
            await screen.getByLabelText('Percent value').fill(x);
            await screen.getByLabelText('Base value').fill(y);

            await expect.element(screen.getByText(expectedFormula)).toBeInTheDocument();
        });

        test('handles division by zero by not producing a result', async () => {
            const screen = await render(<IsWhatPercentOfCalc />);
            await screen.getByLabelText('Percent value').fill('10');
            await screen.getByLabelText('Base value').fill('0');

            await expect.element(screen.getByText('p = (x ⋅ 100) / y')).toBeInTheDocument();
        });
    });
});

describe('IsPercentOfWhatCalc', () => {
    describe('handleCalculation', () => {
        test.each([
            ['50', '30', '166.67 = (50 ⋅ 100) / 30'],
            ['20', '80', '25 = (20 ⋅ 100) / 80'],
        ])('calculates x=%s with p=%s', async (x, p, expectedFormula) => {
            const screen = await render(<IsPercentOfWhatCalc />);
            await screen.getByRole('textbox', { name: /^Value$/ }).fill(x);
            await screen.getByLabelText('Percent of value').fill(p);

            await expect.element(screen.getByText(expectedFormula)).toBeInTheDocument();
        });

        test('returns no result for invalid denominator', async () => {
            const screen = await render(<IsPercentOfWhatCalc />);
            await screen.getByRole('textbox', { name: /^Value$/ }).fill('20');
            await screen.getByLabelText('Percent of value').fill('0');

            await expect.element(screen.getByText('y = (x ⋅ 100) / p')).toBeInTheDocument();
        });
    });
});

describe('ValueIncreaseDecreasePercent', () => {
    describe('handleCalculation', () => {
        test.each([
            ['50', '10', '55 = (50 ⋅ (100 + 10)) / 100'],
            ['100', '20', '120 = (100 ⋅ (100 + 20)) / 100'],
        ])('calculates increase for x=%s and p=%s', async (x, p, expectedFormula) => {
            const screen = await render(<ValueIncreaseDecreasePercent />);
            await screen.getByLabelText('Initial value').fill(x);
            await screen.getByLabelText('Percent change').fill(p);

            await expect.element(screen.getByText(expectedFormula)).toBeInTheDocument();
        });

        test('resets calculator state', async () => {
            const screen = await render(<ValueIncreaseDecreasePercent />);
            await screen.getByLabelText('Initial value').fill('50');
            await screen.getByLabelText('Percent change').fill('10');
            await screen.getByRole('button', { name: /reset calculator/i }).click();

            await expect.element(screen.getByLabelText('Initial value')).toHaveValue('');
            await expect.element(screen.getByLabelText('Percent change')).toHaveValue('');
        });
    });
});

describe('PercentIncreaseDecreaseCalc', () => {
    describe('handleCalculation', () => {
        test.each([
            ['80', '100', '25 = 100 ⋅ (100 + 80) / |80|'],
            ['100', '80', '-20 = 100 ⋅ (80 + 100) / |100|'],
        ])('calculates percent change for vi=%s and vf=%s', async (initial, final, expectedFormula) => {
            const screen = await render(<PercentIncreaseDecreaseCalc />);
            await screen.getByLabelText('Initial value').fill(initial);
            await screen.getByLabelText('Final value').fill(final);

            await expect.element(screen.getByText(expectedFormula)).toBeInTheDocument();
        });

        test('ignores non numeric characters', async () => {
            const screen = await render(<PercentIncreaseDecreaseCalc />);
            const input = screen.getByLabelText('Initial value');
            await input.fill('abc');
            await expect.element(input).toHaveValue('');
        });
    });
});
