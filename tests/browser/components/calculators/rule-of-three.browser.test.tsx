import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import RuleOfThree from '~/components/pages/calculators/rule-of-three';

describe('RuleOfThree', () => {
    describe('onFormSubmit validation', () => {
        test.each([
            ['a', 'abc', '4', '3'],
            ['b', '2', 'abc', '3'],
            ['c', '2', '4', 'abc'],
        ])('shows number validation for invalid %s input', async (_field, a, b, c) => {
            const screen = await render(<RuleOfThree />);

            await screen.getByPlaceholder('Value A').fill(a);
            await screen.getByPlaceholder('Value B').fill(b);
            await screen.getByPlaceholder('Value C').fill(c);
            await screen.getByRole('button', { name: /calculate rule of three/i }).click();

            const error = await screen.getByText('Value must be a number.');
            expect(error.element().textContent).toMatchInlineSnapshot('"Value must be a number."');
        });

        test.each([
            ['0', '4', '3'],
            ['2', '0', '3'],
            ['2', '4', '0'],
            ['', '4', '3'],
        ])('keeps result empty for invalid boundary values a=%s b=%s c=%s', async (a, b, c) => {
            const screen = await render(<RuleOfThree />);

            await screen.getByPlaceholder('Value A').fill(a);
            await screen.getByPlaceholder('Value B').fill(b);
            await screen.getByPlaceholder('Value C').fill(c);
            await screen.getByRole('button', { name: /calculate rule of three/i }).click();

            await expect.element(screen.getByPlaceholder('Result')).toHaveValue('');
        });
    });

    describe('onFormSubmit success', () => {
        test.each([
            ['2', '4', '3', '6.00'],
            ['1.5', '3', '10', '20.00'],
            ['10', '25', '40', '100.00'],
        ])('returns proportional result for a=%s b=%s c=%s', async (a, b, c, expected) => {
            const screen = await render(<RuleOfThree />);

            await screen.getByPlaceholder('Value A').fill(a);
            await screen.getByPlaceholder('Value B').fill(b);
            await screen.getByPlaceholder('Value C').fill(c);
            await screen.getByRole('button', { name: /calculate rule of three/i }).click();

            await expect.element(screen.getByPlaceholder('Result')).toHaveValue(expected);
        });
    });

    describe('reset behavior', () => {
        test('clears input and result values', async () => {
            const screen = await render(<RuleOfThree />);

            await screen.getByPlaceholder('Value A').fill('2');
            await screen.getByPlaceholder('Value B').fill('4');
            await screen.getByPlaceholder('Value C').fill('3');
            await screen.getByRole('button', { name: /calculate rule of three/i }).click();
            await expect.element(screen.getByPlaceholder('Result')).toHaveValue('6.00');

            await screen.getByRole('button', { name: /reset form/i }).click();
            await expect.element(screen.getByPlaceholder('Value A')).toHaveValue('0');
            await expect.element(screen.getByPlaceholder('Value B')).toHaveValue('0');
            await expect.element(screen.getByPlaceholder('Value C')).toHaveValue('0');
            await expect.element(screen.getByPlaceholder('Result')).toHaveValue('');
        });
    });
});
