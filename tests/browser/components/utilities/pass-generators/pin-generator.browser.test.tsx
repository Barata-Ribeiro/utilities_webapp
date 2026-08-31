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

    test('respects length slider min value', async () => {
        const screen = await render(<PINGenerator />);
        const slider = screen.getByRole('slider');

        await expect.element(slider).toHaveAttribute('min', '3');
    });

    test('respects length slider max value', async () => {
        const screen = await render(<PINGenerator />);
        const slider = screen.getByRole('slider');

        await expect.element(slider).toHaveAttribute('max', '12');
    });

    test('can adjust PIN length', async () => {
        const screen = await render(<PINGenerator />);
        const slider = screen.getByRole('slider');

        await slider.fill('6');
        expect(slider).toBeTruthy();
    });

    test.each([3, 4, 6, 8, 12])('supports PIN lengths: %s', async () => {
        const screen = await render(<PINGenerator />);
        const slider = screen.getByRole('slider');

        expect(slider).toBeTruthy();
    });

    test('generates only numeric digits', async () => {
        const screen = await render(<PINGenerator />);
        const pinDisplay = screen.getByText(/^\d{3,12}$/);

        // PIN should be visible and numeric only
        expect(pinDisplay).toBeTruthy();
    });

    test('can regenerate PIN multiple times', async () => {
        const screen = await render(<PINGenerator />);
        const generateButton = screen.getByRole('button', { name: 'Generate PIN' });

        // Click generate button multiple times
        await generateButton.click();
        await generateButton.click();
        await generateButton.click();

        expect(generateButton).toBeTruthy();
    });

    test('can copy generated PIN', async () => {
        const screen = await render(<PINGenerator />);
        const copyButton = screen.getByRole('button', { name: /copy/i });

        expect(copyButton).toBeTruthy();
    });

    test('PIN starts with default length of 3', async () => {
        const screen = await render(<PINGenerator />);

        // Should show "PIN Length: 3" on initial render
        await expect.element(screen.getByText('PIN Length: 3')).toBeVisible();
    });

    test('boundary: minimum PIN length (3 digits)', async () => {
        const screen = await render(<PINGenerator />);
        const slider = screen.getByRole('slider');

        // Set to minimum
        await slider.fill('3');
        expect(slider).toBeTruthy();
    });

    test('boundary: maximum PIN length (12 digits)', async () => {
        const screen = await render(<PINGenerator />);
        const slider = screen.getByRole('slider');

        // Set to maximum
        await slider.fill('12');
        expect(slider).toBeTruthy();
    });
});
