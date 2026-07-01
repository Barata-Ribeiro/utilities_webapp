import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Length from '~/components/pages/converters/length';

describe('Length', () => {
    describe('rendering', () => {
        test('shows all unit labels', async () => {
            const screen = await render(<Length />);
            for (const label of [
                'Kilometers (km)',
                'Meters (m)',
                'Centimeters (cm)',
                'Millimeters (mm)',
                'Miles (mi)',
                'Yards (yd)',
                'Inches (in)',
                'Feet (ft)',
                'Nautical Miles (nmi)',
            ]) {
                await expect.element(screen.getByLabelText(label)).toBeInTheDocument();
            }
        });
    });

    describe('conversion', () => {
        test.each([
            ['1', 'Kilometers (km)', 'Meters (m)', '1000'],
            ['1000', 'Meters (m)', 'Kilometers (km)', '1'],
            ['1', 'Meters (m)', 'Centimeters (cm)', '100'],
            ['100', 'Centimeters (cm)', 'Meters (m)', '1'],
            ['1', 'Meters (m)', 'Millimeters (mm)', '1000'],
            ['1', 'Miles (mi)', 'Meters (m)', '1609.34'],
        ])('%s %s → %s %s', async (value, inputLabel, outputLabel, expected) => {
            const screen = await render(<Length />);
            await screen.getByLabelText(inputLabel).fill(value);
            await expect.element(screen.getByLabelText(outputLabel)).toHaveValue(expected);
        });
    });

    describe('invalid input', () => {
        test('ignores letters', async () => {
            const screen = await render(<Length />);
            const input = screen.getByLabelText('Meters (m)');
            await input.fill('xyz');
            await expect.element(input).toHaveValue('');
        });
    });

    describe('clearing', () => {
        test('clearing the active field clears all others', async () => {
            const screen = await render(<Length />);
            await screen.getByLabelText('Kilometers (km)').fill('1');
            await screen.getByLabelText('Kilometers (km)').fill('');
            await expect.element(screen.getByLabelText('Meters (m)')).toHaveValue('');
        });
    });
});
