import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Bytes from '~/components/pages/converters/bytes';

describe('Bytes', () => {
    describe('rendering', () => {
        test('shows all unit labels', async () => {
            const screen = await render(<Bytes />);
            for (const label of [
                'Bytes (B)',
                'Kilobytes (KB)',
                'Megabytes (MB)',
                'Gigabytes (GB)',
                'Terabytes (TB)',
                'Petabytes (PB)',
            ]) {
                await expect.element(screen.getByLabelText(label)).toBeInTheDocument();
            }
        });

        test('inputs start empty', async () => {
            const screen = await render(<Bytes />);
            await expect.element(screen.getByLabelText('Bytes (B)')).toHaveValue('');
        });
    });

    describe('conversion', () => {
        test.each([
            ['1000', 'Bytes (B)', 'Kilobytes (KB)', '1'],
            ['1', 'Kilobytes (KB)', 'Bytes (B)', '1000'],
            ['1', 'Megabytes (MB)', 'Kilobytes (KB)', '1000'],
            ['1', 'Gigabytes (GB)', 'Megabytes (MB)', '1000'],
            ['1', 'Terabytes (TB)', 'Gigabytes (GB)', '1000'],
            ['1', 'Petabytes (PB)', 'Terabytes (TB)', '1000'],
            ['0.5', 'Kilobytes (KB)', 'Bytes (B)', '500'],
        ])('%s %s → %s %s', async (value, inputLabel, outputLabel, expected) => {
            const screen = await render(<Bytes />);
            await screen.getByLabelText(inputLabel).fill(value);
            await expect.element(screen.getByLabelText(outputLabel)).toHaveValue(expected);
        });

        test('comma decimal separator converts correctly', async () => {
            const screen = await render(<Bytes />);
            await screen.getByLabelText('Kilobytes (KB)').fill('1,5');
            await expect.element(screen.getByLabelText('Bytes (B)')).toHaveValue('1500');
        });
    });

    describe('invalid input', () => {
        test('ignores letters', async () => {
            const screen = await render(<Bytes />);
            const input = screen.getByLabelText('Bytes (B)');
            await input.fill('abc');
            await expect.element(input).toHaveValue('');
        });

        test('ignores special characters', async () => {
            const screen = await render(<Bytes />);
            const input = screen.getByLabelText('Kilobytes (KB)');
            await input.fill('!@#');
            await expect.element(input).toHaveValue('');
        });
    });

    describe('clearing', () => {
        test('clearing the active field clears all others', async () => {
            const screen = await render(<Bytes />);
            await screen.getByLabelText('Bytes (B)').fill('1000');
            await screen.getByLabelText('Bytes (B)').fill('');
            await expect.element(screen.getByLabelText('Kilobytes (KB)')).toHaveValue('');
            await expect.element(screen.getByLabelText('Megabytes (MB)')).toHaveValue('');
        });
    });
});
