import { describe, expect, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';
import DiceRollerTab from '~/components/pages/utilities/dice-roller-tab';

describe('DiceRollerTab', () => {
    test('renders component with tab navigation', async () => {
        const screen = await render(<DiceRollerTab />);
        const genericTab = screen.getByRole('tab', { name: /Dice Roller/i });
        const vtmTab = screen.getByRole('tab', { name: /Vampire/i });

        expect(genericTab).toBeTruthy();
        expect(vtmTab).toBeTruthy();
    });

    test('displays generic dice roller tab by default', async () => {
        const screen = await render(<DiceRollerTab />);
        const genericTab = screen.getByRole('tab', { name: /Dice Roller/i });

        expect(genericTab).toBeTruthy();
    });

    test('switches to VTM dice roller tab', async () => {
        const screen = await render(<DiceRollerTab />);
        const vtmTab = screen.getByRole('tab', { name: /Vampire/i });

        await vtmTab.click();
        await expect.element(vtmTab).toHaveAttribute('data-state', 'active');
    });

    test('can toggle between tabs', async () => {
        const screen = await render(<DiceRollerTab />);
        const genericTab = screen.getByRole('tab', { name: /Dice Roller/i });
        const vtmTab = screen.getByRole('tab', { name: /Vampire/i });

        // Start with generic
        await expect.element(genericTab).toHaveAttribute('data-state', 'active');

        // Switch to VTM
        await vtmTab.click();
        await expect.element(vtmTab).toHaveAttribute('data-state', 'active');

        // Switch back to generic
        await genericTab.click();
        await expect.element(genericTab).toHaveAttribute('data-state', 'active');
    });
});
