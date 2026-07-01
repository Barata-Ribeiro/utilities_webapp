import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import ShaHashing from '~/components/pages/programming/hashing/sha-hashing';

describe('ShaHashing', () => {
    describe('validation', () => {
        test('shows error when submitting empty text', async () => {
            const screen = await render(<ShaHashing />);
            const form = screen.container.querySelector('form');
            expect(form).not.toBeNull();
            form?.setAttribute('novalidate', '');
            await screen.getByRole('button', { name: /^hash$/i }).click();
            await expect.element(screen.getByRole('alert')).toHaveTextContent('Text is required.');
        });

        test('shows placeholder message before any hashing', async () => {
            const screen = await render(<ShaHashing />);
            await expect.element(screen.getByText(/no hashed results yet/i)).toBeInTheDocument();
        });
    });

    describe('hashing', () => {
        test.each([
            ['SHA-256', 'hello', '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'],
            ['SHA-1', 'hello', 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d'],
            [
                'SHA-512',
                'hello',
                '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043',
            ],
        ])('produces correct %s hash for "hello"', async (algorithm, input, expected) => {
            const screen = await render(<ShaHashing />);
            await screen.getByLabelText('Text to Hash').fill(input);
            await screen.getByRole('button', { name: /^hash$/i }).click();
            await expect.element(screen.getByText(expected)).toBeInTheDocument();
        });

        test('populates all SHA algorithm results', async () => {
            const screen = await render(<ShaHashing />);
            await screen.getByLabelText('Text to Hash').fill('hello');
            await screen.getByRole('button', { name: /^hash$/i }).click();
            for (const algo of [
                'SHA-1:',
                'SHA-224:',
                'SHA-256:',
                'SHA-384:',
                'SHA-512:',
                'SHA3-224:',
                'SHA3-256:',
                'SHA3-384:',
                'SHA3-512:',
            ]) {
                await expect.element(screen.getByText(algo)).toBeInTheDocument();
            }
        });
    });

    describe('reset', () => {
        test('clears results and form', async () => {
            const screen = await render(<ShaHashing />);
            await screen.getByLabelText('Text to Hash').fill('hello');
            await screen.getByRole('button', { name: /^hash$/i }).click();
            await expect.element(screen.getByText('SHA-256:')).toBeInTheDocument();
            await screen.getByRole('button', { name: /reset/i }).click();
            await expect.element(screen.getByText(/no hashed results yet/i)).toBeInTheDocument();
        });
    });
});
