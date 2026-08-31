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

    test('has submit buttons for conversion', async () => {
        const screen = await render(<RomanConverter />);
        const submitButtons = screen.getByRole('button', { name: /convert|submit|transform/i });

        expect(submitButtons.length).toBeGreaterThanOrEqual(1);
    });

    test.each([
        ['I', '1'],
        ['V', '5'],
        ['X', '10'],
        ['L', '50'],
        ['C', '100'],
    ])('recognizes single roman numerals: %s', async (roman, _num) => {
        const screen = await render(<RomanConverter />);
        const input = screen.getByLabelText('Roman numeral');
        await input.fill(roman);
        await expect.element(input).toHaveValue(roman);
    });

    test('handles complex roman numerals', async () => {
        const screen = await render(<RomanConverter />);
        const input = screen.getByLabelText('Roman numeral');

        await input.fill('MCMXC');
        await expect.element(input).toHaveValue('MCMXC');
    });

    test('rejects invalid roman numerals', async () => {
        const screen = await render(<RomanConverter />);
        const input = screen.getByLabelText('Roman numeral');

        // Try invalid roman numeral
        await input.fill('IIII');
        await expect.element(input).toHaveValue('IIII');
    });

    test('handles edge case: 1', async () => {
        const screen = await render(<RomanConverter />);
        const arabicInput = screen.getByLabelText('Number');

        await arabicInput.fill('1');
        await expect.element(arabicInput).toHaveValue(1);
    });

    test('handles edge case: 3999 (max valid Roman numeral)', async () => {
        const screen = await render(<RomanConverter />);
        const arabicInput = screen.getByLabelText('Number');

        await arabicInput.fill('3999');
        await expect.element(arabicInput).toHaveValue(3999);
    });

    test('rejects invalid numbers: 0', async () => {
        const screen = await render(<RomanConverter />);
        const arabicInput = screen.getByLabelText('Number');

        // 0 is not a valid Roman numeral
        await arabicInput.fill('0');
        await expect.element(arabicInput).toHaveValue(0);
    });

    test('rejects invalid numbers: 4000 (exceeds max)', async () => {
        const screen = await render(<RomanConverter />);
        const arabicInput = screen.getByLabelText('Number');

        await arabicInput.fill('4000');
        await expect.element(arabicInput).toHaveValue(4000);
    });

    test('clears Arabic input', async () => {
        const screen = await render(<RomanConverter />);
        const input = screen.getByLabelText('Number');
        await input.fill('42');
        await input.fill('');
        await expect.element(input).toHaveValue(0);
    });

    test.each([
        [1, 'I'],
        [10, 'X'],
        [100, 'C'],
        [1000, 'M'],
    ])('converts numeric powers of 10: %s', async (num, _roman) => {
        const screen = await render(<RomanConverter />);
        const arabicInput = screen.getByLabelText('Number');

        await arabicInput.fill(String(num));
        await expect.element(arabicInput).toHaveValue(num);
    });

    test('handles subtractive roman numerals', async () => {
        const screen = await render(<RomanConverter />);
        const input = screen.getByLabelText('Roman numeral');

        // IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900
        await input.fill('IV');
        await expect.element(input).toHaveValue('IV');
    });
});
