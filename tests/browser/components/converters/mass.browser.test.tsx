import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Mass from '~/components/pages/converters/mass';

describe('Mass', () => {
    describe('rendering', () => {
        test('shows all unit labels', async () => {
            const screen = await render(<Mass />);
            for (const label of [
                'Tonnes (t)',
                'Kilograms (kg)',
                'Grams (g)',
                'Milligrams (mg)',
                'Pounds (lb)',
                'Ounces (oz)',
                'Stones (st)',
            ]) {
                await expect.element(screen.getByLabelText(label)).toBeInTheDocument();
            }
        });
    });

    describe('conversion', () => {
        test.each([
            ['1', 'Kilograms (kg)', 'Grams (g)', '1000'],
            ['1000', 'Grams (g)', 'Kilograms (kg)', '1'],
            ['1', 'Tonnes (t)', 'Kilograms (kg)', '1000'],
            ['1', 'Kilograms (kg)', 'Pounds (lb)', '2.204623'],
            ['1', 'Pounds (lb)', 'Grams (g)', '453.592'],
            ['1', 'Kilograms (kg)', 'Ounces (oz)', '35.27396'],
        ])('%s %s → %s %s', async (value, inputLabel, outputLabel, expected) => {
            const screen = await render(<Mass />);
            await screen.getByLabelText(inputLabel).fill(value);
            await expect.element(screen.getByLabelText(outputLabel)).toHaveValue(expected);
        });
    });

    describe('invalid input', () => {
        test('ignores letters', async () => {
            const screen = await render(<Mass />);
            const input = screen.getByLabelText('Kilograms (kg)');
            await input.fill('abc');
            await expect.element(input).toHaveValue('');
        });
    });

    describe('clearing', () => {
        test('clearing the active field clears all others', async () => {
            const screen = await render(<Mass />);
            await screen.getByLabelText('Kilograms (kg)').fill('1');
            await screen.getByLabelText('Kilograms (kg)').fill('');
            await expect.element(screen.getByLabelText('Grams (g)')).toHaveValue('');
        });
    });
});
