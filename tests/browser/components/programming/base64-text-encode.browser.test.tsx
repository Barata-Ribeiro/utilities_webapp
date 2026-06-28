import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Base64TextEncode from '~/components/pages/programming/base64-text-handlers/base64-text-encode';

describe('Base64TextEncode', () => {
    describe('validation', () => {
        test('shows error when submitting empty text', async () => {
            const screen = await render(<Base64TextEncode />);
            await screen.getByRole('button', { name: /encode/i }).click();
            await expect.element(screen.getByRole('alert')).toHaveTextContent('Text is required.');
        });
    });

    describe('encoding', () => {
        test.each([
            ['Hello', 'SGVsbG8='],
            ['Hello, World!', 'SGVsbG8sIFdvcmxkIQ=='],
            ['test', 'dGVzdA=='],
            ['123', 'MTIz'],
        ])('encodes "%s" to "%s"', async (input, expected) => {
            const screen = await render(<Base64TextEncode />);
            await screen.getByLabelText('Text').fill(input);
            await screen.getByRole('button', { name: /encode/i }).click();
            await expect.element(screen.getByText(expected)).toBeInTheDocument();
        });

        test('shows result section after encoding', async () => {
            const screen = await render(<Base64TextEncode />);
            await screen.getByLabelText('Text').fill('hello');
            await screen.getByRole('button', { name: /encode/i }).click();
            await expect.element(screen.getByText(/partial result/i)).toBeInTheDocument();
        });

        test('shows character count', async () => {
            const screen = await render(<Base64TextEncode />);
            await screen.getByLabelText('Text').fill('Hello');
            await screen.getByRole('button', { name: /encode/i }).click();
            // "SGVsbG8=" is 8 characters
            await expect.element(screen.getByText(/8/)).toBeInTheDocument();
        });
    });

    describe('reset', () => {
        test('clears form and result', async () => {
            const screen = await render(<Base64TextEncode />);
            await screen.getByLabelText('Text').fill('Hello');
            await screen.getByRole('button', { name: /encode/i }).click();
            await expect.element(screen.getByText('SGVsbG8=')).toBeInTheDocument();
            await screen.getByRole('button', { name: /reset/i }).click();
            await expect.element(screen.getByText(/paste text/i)).toBeInTheDocument();
        });
    });
});
