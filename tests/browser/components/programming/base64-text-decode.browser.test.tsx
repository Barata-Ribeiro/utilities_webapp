import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Base64TextDecode from '~/components/pages/programming/base64-text-handlers/base64-text-decode';

describe('Base64TextDecode', () => {
    describe('validation', () => {
        test('shows error when submitting empty input', async () => {
            const screen = await render(<Base64TextDecode />);
            await screen.getByRole('button', { name: /decode/i }).click();
            await expect.element(screen.getByRole('alert')).toBeInTheDocument();
        });

        test('shows error for invalid base64', async () => {
            const screen = await render(<Base64TextDecode />);
            await screen.getByLabelText('Text').fill('not-valid-base64!!!');
            await screen.getByRole('button', { name: /decode/i }).click();
            await expect.element(screen.getByRole('alert')).toHaveTextContent('not valid Base64');
        });
    });

    describe('decoding', () => {
        test.each([
            ['SGVsbG8=', 'Hello'],
            ['SGVsbG8sIFdvcmxkIQ==', 'Hello, World!'],
            ['dGVzdA==', 'test'],
            ['MTIz', '123'],
        ])('decodes "%s" to "%s"', async (input, expected) => {
            const screen = await render(<Base64TextDecode />);
            await screen.getByLabelText('Text').fill(input);
            await screen.getByRole('button', { name: /decode/i }).click();
            await expect.element(screen.getByText(expected)).toBeInTheDocument();
        });

        test('shows partial result section after decoding', async () => {
            const screen = await render(<Base64TextDecode />);
            await screen.getByLabelText('Text').fill('SGVsbG8=');
            await screen.getByRole('button', { name: /decode/i }).click();
            await expect.element(screen.getByText(/partial result/i)).toBeInTheDocument();
        });
    });

    describe('reset', () => {
        test('clears result after reset', async () => {
            const screen = await render(<Base64TextDecode />);
            await screen.getByLabelText('Text').fill('SGVsbG8=');
            await screen.getByRole('button', { name: /decode/i }).click();
            await expect.element(screen.getByText('Hello')).toBeInTheDocument();
            await screen.getByRole('button', { name: /reset/i }).click();
            await expect.element(screen.getByText(/paste base64/i)).toBeInTheDocument();
        });
    });
});
