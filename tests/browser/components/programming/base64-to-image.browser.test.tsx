import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Base64ToImage from '~/components/pages/programming/base64-to-image';

// Minimal 1x1 transparent PNG as a plain base64 string
const PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

function renderWithRouter() {
    return render(
        <MemoryRouter>
            <Base64ToImage />
        </MemoryRouter>,
    );
}

describe('Base64ToImage', () => {
    describe('rendering', () => {
        test('shows base64 input, format selector, and action buttons', async () => {
            const screen = await renderWithRouter();
            await expect.element(screen.getByLabelText('Base64 String')).toBeInTheDocument();
            await expect.element(screen.getByRole('button', { name: /parse/i })).toBeInTheDocument();
            await expect.element(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
        });

        test('shows placeholder message before parsing', async () => {
            const screen = await renderWithRouter();
            await expect.element(screen.getByText(/image preview will appear here/i)).toBeInTheDocument();
        });
    });

    describe('validation', () => {
        test('shows error when submitting empty base64', async () => {
            const screen = await renderWithRouter();
            await screen.getByRole('button', { name: /parse/i }).click();
            await expect.element(screen.getByRole('alert')).toBeInTheDocument();
        });

        test('shows error for invalid base64 string', async () => {
            const screen = await renderWithRouter();
            await screen.getByLabelText('Base64 String').fill('not-valid-base64!!!');
            await screen.getByRole('button', { name: /parse/i }).click();
            await expect.element(screen.getByRole('alert')).toHaveTextContent('not valid Base64');
        });
    });

    describe('parsing', () => {
        test('shows image preview for valid base64', async () => {
            const screen = await renderWithRouter();
            await screen.getByLabelText('Base64 String').fill(PNG_BASE64);
            await screen.getByRole('button', { name: /parse/i }).click();
            await expect.element(screen.getByRole('img', { name: /preview/i })).toBeInTheDocument();
        });

        test('enables the download button after parsing', async () => {
            const screen = await renderWithRouter();
            await screen.getByLabelText('Base64 String').fill(PNG_BASE64);
            await screen.getByRole('button', { name: /parse/i }).click();
            await expect.element(screen.getByRole('link', { name: /download/i })).toBeInTheDocument();
        });

        test('accepts data-url prefixed base64', async () => {
            const screen = await renderWithRouter();
            const dataUrl = `data:image/png;base64,${PNG_BASE64}`;
            await screen.getByLabelText('Base64 String').fill(dataUrl);
            await screen.getByRole('button', { name: /parse/i }).click();
            await expect.element(screen.getByRole('img', { name: /preview/i })).toBeInTheDocument();
        });
    });

    describe('reset', () => {
        test('clears preview and form after reset', async () => {
            const screen = await renderWithRouter();
            await screen.getByLabelText('Base64 String').fill(PNG_BASE64);
            await screen.getByRole('button', { name: /parse/i }).click();
            await expect.element(screen.getByRole('img', { name: /preview/i })).toBeInTheDocument();
            await screen.getByRole('button', { name: /reset/i }).click();
            await expect.element(screen.getByText(/image preview will appear here/i)).toBeInTheDocument();
        });
    });
});
