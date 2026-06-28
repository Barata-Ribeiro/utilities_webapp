import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Speed from '~/components/pages/converters/speed';

describe('Speed', () => {
    describe('rendering', () => {
        test('shows all unit labels', async () => {
            const screen = await render(<Speed />);
            for (const label of [
                'Kilometers per hour (km/h)',
                'Miles per hour (mph)',
                'Meters per second (m/s)',
                'Feet per second (ft/s)',
                'Knots (kn)',
                'Mach (Ma)',
            ]) {
                await expect.element(screen.getByLabelText(label)).toBeInTheDocument();
            }
        });
    });

    describe('conversion', () => {
        test.each([
            ['3.6', 'Meters per second (m/s)', 'Kilometers per hour (km/h)', '12.96'],
            ['1', 'Kilometers per hour (km/h)', 'Meters per second (m/s)', '0.277778'],
            ['1', 'Miles per hour (mph)', 'Kilometers per hour (km/h)', '1.609'],
            ['1', 'Knots (kn)', 'Kilometers per hour (km/h)', '1.852'],
        ])('%s %s → %s %s', async (value, inputLabel, outputLabel, expected) => {
            const screen = await render(<Speed />);
            await screen.getByLabelText(inputLabel).fill(value);
            await expect.element(screen.getByLabelText(outputLabel)).toHaveValue(expected);
        });
    });

    describe('invalid input', () => {
        test('ignores letters', async () => {
            const screen = await render(<Speed />);
            const input = screen.getByLabelText('Kilometers per hour (km/h)');
            await input.fill('fast');
            await expect.element(input).toHaveValue('');
        });
    });

    describe('clearing', () => {
        test('clearing the active field clears all others', async () => {
            const screen = await render(<Speed />);
            await screen.getByLabelText('Kilometers per hour (km/h)').fill('100');
            await screen.getByLabelText('Kilometers per hour (km/h)').fill('');
            await expect.element(screen.getByLabelText('Miles per hour (mph)')).toHaveValue('');
        });
    });
});
