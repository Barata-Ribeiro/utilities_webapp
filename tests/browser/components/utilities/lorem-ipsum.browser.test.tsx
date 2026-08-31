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
});
