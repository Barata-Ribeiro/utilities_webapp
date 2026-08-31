import { describe, expect, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';
import RomanConverter from '~/components/pages/utilities/roman-converter';

describe('RomanConverter', () => {
    test('renders component', async () => {
        const screen = await render(<RomanConverter />);
        await expect.element(screen.getByLabelText('Roman numeral')).toBeVisible();
        await expect.element(screen.getByLabelText('Number')).toBeVisible();
    });

    test.each([['I'], ['V'], ['X'], ['XLII']])('accepts Roman numeral input "%s"', async (roman) => {
        const screen = await render(<RomanConverter />);
        const input = screen.getByLabelText('Roman numeral');
        await input.fill(roman);
        await expect.element(input).toHaveValue(roman);
    });

    test.each([['1'], ['10'], ['42']])('accepts numeric input "%s"', async (num) => {
        const screen = await render(<RomanConverter />);
        const input = screen.getByLabelText('Number');
        await input.fill(num);
        await expect.element(input).toHaveValue(Number(num));
    });

    test('clears Roman input', async () => {
        const screen = await render(<RomanConverter />);
        const input = screen.getByLabelText('Roman numeral');
        await input.fill('X');
        await input.fill('');
        await expect.element(input).toHaveValue('');
    });
});
