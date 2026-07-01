import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Temperature from '~/components/pages/converters/temperature';

describe('Temperature', () => {
    describe('rendering', () => {
        test('shows fahrenheit, celsius, and kelvin inputs', async () => {
            const screen = await render(<Temperature />);
            await expect.element(screen.getByPlaceholder('32')).toBeInTheDocument();
            await expect.element(screen.getByPlaceholder('0')).toBeInTheDocument();
            await expect.element(screen.getByPlaceholder('273.15')).toBeInTheDocument();
        });
    });

    describe('from Fahrenheit', () => {
        test.each([
            ['32', '0.00', '273.15'],
            ['212', '100.00', '373.15'],
            ['0', '-17.78', '255.37'],
        ])('%s°F → %s°C, %sK', async (f, expectedC, expectedK) => {
            const screen = await render(<Temperature />);
            await screen.getByPlaceholder('32').fill(f);
            await expect.element(screen.getByPlaceholder('0')).toHaveValue(expectedC);
            await expect.element(screen.getByPlaceholder('273.15')).toHaveValue(expectedK);
        });
    });

    describe('from Celsius', () => {
        test.each([
            ['0', '32.00', '273.15'],
            ['100', '212.00', '373.15'],
            ['-40', '-40.00', '233.15'],
        ])('%s°C → %s°F, %sK', async (c, expectedF, expectedK) => {
            const screen = await render(<Temperature />);
            await screen.getByPlaceholder('0').fill(c);
            await expect.element(screen.getByPlaceholder('32')).toHaveValue(expectedF);
            await expect.element(screen.getByPlaceholder('273.15')).toHaveValue(expectedK);
        });
    });

    describe('from Kelvin', () => {
        test.each([
            ['273.15', '32.00', '0.00'],
            ['373.15', '212.00', '100.00'],
            ['0', '-459.67', '-273.15'],
        ])('%sK → %s°F, %s°C', async (k, expectedF, expectedC) => {
            const screen = await render(<Temperature />);
            await screen.getByPlaceholder('273.15').fill(k);
            await expect.element(screen.getByPlaceholder('32')).toHaveValue(expectedF);
            await expect.element(screen.getByPlaceholder('0')).toHaveValue(expectedC);
        });
    });

    describe('invalid input', () => {
        test('ignores letters', async () => {
            const screen = await render(<Temperature />);
            const input = screen.getByPlaceholder('32');
            await input.fill('abc');
            await expect.element(input).toHaveValue('');
        });
    });

    describe('clearing', () => {
        test('clearing a field clears the others', async () => {
            const screen = await render(<Temperature />);
            await screen.getByPlaceholder('32').fill('212');
            await screen.getByPlaceholder('32').fill('');
            await expect.element(screen.getByPlaceholder('0')).toHaveValue('');
            await expect.element(screen.getByPlaceholder('273.15')).toHaveValue('');
        });
    });
});
