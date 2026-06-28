import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import MdHashing from '~/components/pages/programming/hashing/md-hashing';

describe('MdHashing', () => {
    describe('validation', () => {
        test('shows error when submitting empty text', async () => {
            const screen = await render(<MdHashing />);
            await screen.getByRole('button', { name: /^hash$/i }).click();
            await expect.element(screen.getByRole('alert')).toHaveTextContent('Text is required.');
        });

        test('shows placeholder message before any hashing', async () => {
            const screen = await render(<MdHashing />);
            await expect.element(screen.getByText(/no hashed results yet/i)).toBeInTheDocument();
        });
    });

    describe('hashing', () => {
        test.each([
            ['MD5', 'hello', '5d41402abc4b2a76b9719d911017c592'],
            ['MD4', 'hello', '866437cb7a794bce2b727acc0362ee27'],
        ])('produces correct %s hash for "hello"', async (algorithm, input, expected) => {
            const screen = await render(<MdHashing />);
            await screen.getByLabelText('Text to Hash').fill(input);
            await screen.getByRole('button', { name: /^hash$/i }).click();
            await expect.element(screen.getByText(expected)).toBeInTheDocument();
        });

        test('populates both MD4 and MD5 results', async () => {
            const screen = await render(<MdHashing />);
            await screen.getByLabelText('Text to Hash').fill('hello');
            await screen.getByRole('button', { name: /^hash$/i }).click();
            await expect.element(screen.getByText('MD4:')).toBeInTheDocument();
            await expect.element(screen.getByText('MD5:')).toBeInTheDocument();
        });
    });

    describe('reset', () => {
        test('clears results and form', async () => {
            const screen = await render(<MdHashing />);
            await screen.getByLabelText('Text to Hash').fill('hello');
            await screen.getByRole('button', { name: /^hash$/i }).click();
            await expect.element(screen.getByText('MD5:')).toBeInTheDocument();
            await screen.getByRole('button', { name: /reset/i }).click();
            await expect.element(screen.getByText(/no hashed results yet/i)).toBeInTheDocument();
        });
    });
});
