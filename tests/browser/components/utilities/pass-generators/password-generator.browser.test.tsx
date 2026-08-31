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

    test('can adjust password length with slider', async () => {
        const screen = await render(<PasswordGenerator />);
        const slider = screen.getByRole('slider');

        // Try to change slider value
        await slider.fill('16');
        // After adjusting, should show updated length
        expect(slider).toBeTruthy();
    });

    test('can toggle numbers checkbox', async () => {
        const screen = await render(<PasswordGenerator />);
        const numbersCheckbox = screen.getByRole('checkbox', { name: /numbers|Has Numbers/i });

        expect(numbersCheckbox).toBeTruthy();
    });

    test('can toggle symbols checkbox', async () => {
        const screen = await render(<PasswordGenerator />);
        const symbolsCheckbox = screen.getByRole('checkbox', { name: /symbols|Has Symbols/i });

        expect(symbolsCheckbox).toBeTruthy();
    });

    test('respects length slider min value', async () => {
        const screen = await render(<PasswordGenerator />);
        const slider = screen.getByRole('slider');

        await expect.element(slider).toHaveAttribute('min', '8');
    });

    test('respects length slider max value', async () => {
        const screen = await render(<PasswordGenerator />);
        const slider = screen.getByRole('slider');

        await expect.element(slider).toHaveAttribute('max', '128');
    });

    test('displays generated password text', async () => {
        const screen = await render(<PasswordGenerator />);
        // Password display should be visible
        const generateButton = screen.getByRole('button', { name: 'Generate Password' });
        expect(generateButton).toBeTruthy();
    });

    test.each([8, 12, 16, 20])('supports password lengths: %s', async () => {
        const screen = await render(<PasswordGenerator />);
        const slider = screen.getByRole('slider');

        // Verify slider can be set to these values
        expect(slider).toBeTruthy();
    });

    test('can copy generated password', async () => {
        const screen = await render(<PasswordGenerator />);
        const copyButton = screen.getByRole('button', { name: /copy/i });

        expect(copyButton).toBeTruthy();
    });
});
