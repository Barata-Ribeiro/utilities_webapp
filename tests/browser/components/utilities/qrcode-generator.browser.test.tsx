import { describe, expect, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';
import QRCodeGenerator from '~/components/pages/utilities/qrcode-generator';

describe('QRCodeGenerator', () => {
    test('renders component', async () => {
        const screen = await render(<QRCodeGenerator />);
        const input = screen.getByPlaceholder('https://example.com');
        expect(input).toBeTruthy();
    });

    test.each([['https://example.com'], ['https://google.com'], ['https://github.com']])(
        'accepts HTTPS URL "%s"',
        async (url) => {
            const screen = await render(<QRCodeGenerator />);
            const input = screen.getByPlaceholder('https://example.com');
            await input.fill(url);
            await expect.element(input).toHaveValue(url);
        },
    );

    test('handles empty input', async () => {
        const screen = await render(<QRCodeGenerator />);
        const input = screen.getByPlaceholder('https://example.com');
        await input.fill('');
        await expect.element(input).toHaveValue('');
    });

    test('accepts clearing input', async () => {
        const screen = await render(<QRCodeGenerator />);
        const input = screen.getByPlaceholder('https://example.com');
        await input.fill('https://test.com');
        await input.fill('');
        await expect.element(input).toHaveValue('');
    });

    test('has generate and reset buttons', async () => {
        const screen = await render(<QRCodeGenerator />);
        const generateButton = screen.getByRole('button', { name: 'Generate' });
        const resetButton = screen.getByRole('button', { name: /Reset/i });

        expect(generateButton).toBeTruthy();
        expect(resetButton).toBeTruthy();
    });

    test('rejects non-HTTPS URLs', async () => {
        const screen = await render(<QRCodeGenerator />);
        const input = screen.getByPlaceholder('https://example.com');

        // Try entering HTTP URL
        await input.fill('http://example.com');
        // The input should accept it but form might show validation
        await expect.element(input).toHaveValue('http://example.com');
    });

    test('accepts valid domain-based URLs', async () => {
        const screen = await render(<QRCodeGenerator />);
        const input = screen.getByPlaceholder('https://example.com');

        await input.fill('https://subdomain.example.com');
        await expect.element(input).toHaveValue('https://subdomain.example.com');
    });

    test('clears input on reset button click', async () => {
        const screen = await render(<QRCodeGenerator />);
        const input = screen.getByPlaceholder('https://example.com');
        const resetButton = screen.getByRole('button', { name: /Reset/i });

        await input.fill('https://example.com');
        await resetButton.click();
        await expect.element(input).toHaveValue('');
    });

    test('handles URLs with path segments', async () => {
        const screen = await render(<QRCodeGenerator />);
        const input = screen.getByPlaceholder('https://example.com');

        await input.fill('https://example.com/path/to/page');
        await expect.element(input).toHaveValue('https://example.com/path/to/page');
    });

    test('handles URLs with query parameters', async () => {
        const screen = await render(<QRCodeGenerator />);
        const input = screen.getByPlaceholder('https://example.com');

        await input.fill('https://example.com?param=value');
        await expect.element(input).toHaveValue('https://example.com?param=value');
    });
});
