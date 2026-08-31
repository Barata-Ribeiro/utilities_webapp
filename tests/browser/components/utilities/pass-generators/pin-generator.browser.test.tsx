import { describe, expect, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';
import PINGenerator from '~/components/pages/utilities/pass-generators/pin-generator';

describe('PINGenerator', () => {
    test('renders component', async () => {
        const screen = await render(<PINGenerator />);
        await expect.element(screen.getByText('PIN Length: 3')).toBeVisible();
    });

    test('generates initial PIN', async () => {
        const screen = await render(<PINGenerator />);
        expect(screen.getByText(/^\d{3}$/).element()?.textContent).toMatch(/^\d{3}$/);
    });

    test('renders its length control', async () => {
        const screen = await render(<PINGenerator />);
        await expect.element(screen.getByRole('slider')).toHaveAttribute('min', '3');
        await expect.element(screen.getByRole('slider')).toHaveAttribute('max', '12');
    });

    test('renders refresh action', async () => {
        const screen = await render(<PINGenerator />);
        await expect.element(screen.getByRole('button', { name: 'Generate PIN' })).toBeVisible();
    });
});
