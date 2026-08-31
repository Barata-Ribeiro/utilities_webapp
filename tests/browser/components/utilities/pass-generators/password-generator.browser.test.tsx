import { describe, expect, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';
import PasswordGenerator from '~/components/pages/utilities/pass-generators/password-generator';

describe('PasswordGenerator', () => {
    test('renders component', async () => {
        const screen = await render(<PasswordGenerator />);
        await expect.element(screen.getByText('Password Length: 8')).toBeVisible();
    });

    test('generates initial password', async () => {
        const screen = await render(<PasswordGenerator />);
        await expect.element(screen.getByRole('button', { name: 'Generate Password' })).toBeVisible();
    });

    test('renders its length control', async () => {
        const screen = await render(<PasswordGenerator />);
        await expect.element(screen.getByRole('slider')).toHaveAttribute('min', '8');
        await expect.element(screen.getByRole('slider')).toHaveAttribute('max', '128');
    });

    test('renders number and symbol options', async () => {
        const screen = await render(<PasswordGenerator />);
        await expect.element(screen.getByText('Has Numbers')).toBeVisible();
        await expect.element(screen.getByText('Has Symbols')).toBeVisible();
    });

    test('renders refresh action', async () => {
        const screen = await render(<PasswordGenerator />);
        await expect.element(screen.getByRole('button', { name: 'Generate Password' })).toBeVisible();
    });
});
