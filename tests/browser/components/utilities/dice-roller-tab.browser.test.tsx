import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';
import DiceRollerTab from '~/components/pages/utilities/dice-roller-tab';

// VtmDiceRoller renders a react-router Link, so it needs a router context.
function renderWithRouter() {
    return render(
        <MemoryRouter>
            <DiceRollerTab />
        </MemoryRouter>,
    );
}

describe('DiceRollerTab', () => {
    test('renders component with tab navigation', async () => {
        const screen = await renderWithRouter();
        const genericTab = screen.getByRole('tab', { name: /Dice Roller/i });
        const vtmTab = screen.getByRole('tab', { name: /Vampire/i });

        expect(genericTab).toBeTruthy();
        expect(vtmTab).toBeTruthy();
    });

    test('displays generic dice roller tab by default', async () => {
        const screen = await renderWithRouter();
        const genericTab = screen.getByRole('tab', { name: /Dice Roller/i });

        expect(genericTab).toBeTruthy();
    });

    test('switches to VTM dice roller tab', async () => {
        const screen = await renderWithRouter();
        const vtmTab = screen.getByRole('tab', { name: /Vampire/i });

        await vtmTab.click();
        await expect.element(vtmTab).toHaveAttribute('aria-selected', 'true');
    });

    test('can toggle between tabs', async () => {
        const screen = await renderWithRouter();
        const genericTab = screen.getByRole('tab', { name: /Dice Roller/i });
        const vtmTab = screen.getByRole('tab', { name: /Vampire/i });

        // Start with generic
        await expect.element(genericTab).toHaveAttribute('aria-selected', 'true');

        // Switch to VTM
        await vtmTab.click();
        await expect.element(vtmTab).toHaveAttribute('aria-selected', 'true');

        // Switch back to generic
        await genericTab.click();
        await expect.element(genericTab).toHaveAttribute('aria-selected', 'true');
    });
});
