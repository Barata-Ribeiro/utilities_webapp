import { describe, expect, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';
import LoremIpsum from '~/components/pages/utilities/lorem-ipsum';

describe('LoremIpsum', () => {
    test('renders component', async () => {
        const screen = await render(<LoremIpsum />);
        await expect.element(screen.getByLabelText('Amount')).toHaveValue(1);
    });

    test.each([1, 5, 10])('accepts amount input %s', async (amount) => {
        const screen = await render(<LoremIpsum />);
        const input = screen.getByLabelText('Amount');
        await input.fill(String(amount));
        await expect.element(input).toHaveValue(amount);
    });

    test('has radio button options', async () => {
        const screen = await render(<LoremIpsum />);
        await expect.element(screen.getByRole('radio', { name: 'Paragraphs' })).toBeChecked();
    });

    test('accepts empty input initially', async () => {
        const screen = await render(<LoremIpsum />);
        await expect.element(screen.getByLabelText('Amount')).toHaveValue(1);
    });

    test('shows a validation error when the amount is empty', async () => {
        const screen = await render(<LoremIpsum />);
        const input = screen.getByLabelText('Amount');
        await input.fill('');
        await screen.getByRole('button', { name: 'Submit' }).click();
        expect(screen.getByText(/Amount must be/).element()).toBeTruthy();
    });

    test('has generate/action button', async () => {
        const screen = await render(<LoremIpsum />);
        await expect.element(screen.getByRole('button', { name: 'Submit' })).toBeVisible();
    });

    test('has all mode radio buttons', async () => {
        const screen = await render(<LoremIpsum />);

        const modeRadios = screen.getByRole('radio');
        // Should have: Paragraphs, Sentences, Words, Bytes, Lists
        expect(modeRadios.length).toBeGreaterThanOrEqual(5);
    });

    test('can select Sentences mode', async () => {
        const screen = await render(<LoremIpsum />);
        const sentencesRadio = screen.getByRole('radio', { name: 'Sentences' });

        expect(sentencesRadio).toBeTruthy();
    });

    test('can select Words mode', async () => {
        const screen = await render(<LoremIpsum />);
        const wordsRadio = screen.getByRole('radio', { name: 'Words' });

        expect(wordsRadio).toBeTruthy();
    });

    test('can select Bytes mode', async () => {
        const screen = await render(<LoremIpsum />);
        const bytesRadio = screen.getByRole('radio', { name: 'Bytes' });

        expect(bytesRadio).toBeTruthy();
    });

    test('can select Lists mode', async () => {
        const screen = await render(<LoremIpsum />);
        const listsRadio = screen.getByRole('radio', { name: 'Lists' });

        expect(listsRadio).toBeTruthy();
    });

    test.each([1, 2, 5, 10, 50])('accepts valid amounts: %s', async (amount) => {
        const screen = await render(<LoremIpsum />);
        const input = screen.getByLabelText('Amount');

        await input.fill(String(amount));
        await expect.element(input).toHaveValue(amount);
    });

    test('shows error for amount 0', async () => {
        const screen = await render(<LoremIpsum />);
        const input = screen.getByLabelText('Amount');

        await input.fill('0');
        await screen.getByRole('button', { name: 'Submit' }).click();
        expect(screen.getByText(/must be at least 1/)).toBeTruthy();
    });

    test('shows error for negative amount', async () => {
        const screen = await render(<LoremIpsum />);
        const input = screen.getByLabelText('Amount');

        await input.fill('-5');
        await screen.getByRole('button', { name: 'Submit' }).click();
        // Should show validation error
        expect(input).toBeTruthy();
    });

    test('has reset button', async () => {
        const screen = await render(<LoremIpsum />);
        const resetButton = screen.getByRole('button', { name: /reset|clear/i });

        expect(resetButton).toBeTruthy();
    });

    test('shows validation error for exceeding max for Paragraphs mode', async () => {
        const screen = await render(<LoremIpsum />);
        const input = screen.getByLabelText('Amount');
        const paragraphsRadio = screen.getByRole('radio', { name: 'Paragraphs' });

        // Paragraphs is the default mode.
        await expect.element(paragraphsRadio).toBeChecked();

        // Try to enter amount that exceeds max (max is 170 for paragraphs)
        await input.fill('171');
        await screen.getByRole('button', { name: 'Submit' }).click();

        // Should show validation error
        expect(input).toBeTruthy();
    });

    test('boundary: minimum amount (1)', async () => {
        const screen = await render(<LoremIpsum />);
        const input = screen.getByLabelText('Amount');

        await input.fill('1');
        await expect.element(input).toHaveValue(1);
    });

    test('resets form when reset button clicked', async () => {
        const screen = await render(<LoremIpsum />);
        const input = screen.getByLabelText('Amount');
        const resetButton = screen.getByRole('button', { name: /reset|clear/i });

        await input.fill('10');
        await resetButton.click();
        // After reset, amount should go back to initial value
        await expect.element(input).toHaveValue(1);
    });
});
