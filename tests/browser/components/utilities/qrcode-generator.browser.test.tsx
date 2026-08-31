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
});
