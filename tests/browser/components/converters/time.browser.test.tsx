import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Time from '~/components/pages/converters/time';

describe('Time', () => {
    describe('rendering', () => {
        test('shows all unit labels', async () => {
            const screen = await render(<Time />);
            for (const label of [
                'Seconds (s)',
                'Minutes (min)',
                'Hours (h)',
                'Days (d)',
                'Weeks (wk)',
                'Months (mo)',
                'Years (yr)',
            ]) {
                await expect.element(screen.getByLabelText(label)).toBeInTheDocument();
            }
        });
    });

    describe('conversion', () => {
        test.each([
            ['1', 'Minutes (min)', 'Seconds (s)', '60'],
            ['60', 'Seconds (s)', 'Minutes (min)', '1'],
            ['1', 'Hours (h)', 'Minutes (min)', '60'],
            ['24', 'Hours (h)', 'Days (d)', '1'],
            ['1', 'Days (d)', 'Hours (h)', '24'],
            ['7', 'Days (d)', 'Weeks (wk)', '1'],
            ['1', 'Years (yr)', 'Days (d)', '365.25'],
        ])('%s %s → %s %s', async (value, inputLabel, outputLabel, expected) => {
            const screen = await render(<Time />);
            await screen.getByLabelText(inputLabel).fill(value);
            await expect.element(screen.getByLabelText(outputLabel)).toHaveValue(expected);
        });
    });

    describe('invalid input', () => {
        test('ignores letters', async () => {
            const screen = await render(<Time />);
            const input = screen.getByLabelText('Seconds (s)');
            await input.fill('abc');
            await expect.element(input).toHaveValue('');
        });
    });

    describe('clearing', () => {
        test('clearing the active field clears all others', async () => {
            const screen = await render(<Time />);
            await screen.getByLabelText('Minutes (min)').fill('1');
            await screen.getByLabelText('Minutes (min)').fill('');
            await expect.element(screen.getByLabelText('Seconds (s)')).toHaveValue('');
        });
    });
});
