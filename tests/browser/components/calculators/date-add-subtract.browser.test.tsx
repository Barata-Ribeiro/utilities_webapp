import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import DateAddSubtract from '~/components/pages/calculators/date/date-add-subtract';

// Radix Popover renders the calendar in a portal on document.body —
// we query document.body directly and use vi.waitFor to handle async opening/closing.
async function openCalendarAndPickDay(triggerId = 'calendar', index = 0) {
    document.getElementById(triggerId)!.click();

    await vi.waitFor(() => {
        if (!document.body.querySelector('[role="grid"]')) throw new Error('calendar not open');
    });

    const buttons = Array.from(
        document.body.querySelectorAll<HTMLButtonElement>('[role="grid"] button:not([disabled])'),
    );
    buttons[index]!.click();

    // Dismiss the popover with Escape (Radix listens on document)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));

    await vi.waitFor(() => {
        if (document.body.querySelector('[role="grid"]')) throw new Error('calendar still open');
    });
}

// Radix Select content is also a portal.
async function selectAction(action: 'Add' | 'Subtract') {
    document.getElementById('action')!.click();

    await vi.waitFor(() => {
        if (!document.body.querySelector('[role="option"]')) throw new Error('options not visible');
    });

    const option = Array.from(document.body.querySelectorAll<HTMLElement>('[role="option"]')).find((el) =>
        el.textContent?.includes(action),
    );
    option!.click();
}

describe('DateAddSubtract', () => {
    describe('onSubmit validation', () => {
        test('shows required errors for empty submit', async () => {
            const screen = await render(<DateAddSubtract />);
            await screen.getByRole('button', { name: /calculate date add\/subtract/i }).click();

            const dateError = await screen.getByText('A valid date is required.');
            const actionError = await screen.getByText('Select a valid action.');

            expect(dateError.element().textContent).toMatchInlineSnapshot('"A valid date is required."');
            expect(actionError.element().textContent).toMatchInlineSnapshot('"Select a valid action."');
        });

        // Boundary errors are independent of date/action — we just fill the bad unit value
        // and submit; date + action errors also appear but we assert on the unit error only.
        test.each([
            ['days', '-1', 'Days must be 0 or greater.'],
            ['weeks', '-2', 'Weeks must be 0 or greater.'],
            ['months', '-3', 'Months must be 0 or greater.'],
            ['years', '-4', 'Years must be 0 or greater.'],
        ])('shows boundary error for %s=%s', async (unit, value, expectedError) => {
            const screen = await render(<DateAddSubtract />);

            await screen.getByLabelText(unit).fill(value);
            await screen.getByRole('button', { name: /calculate date add\/subtract/i }).click();

            const error = await screen.getByText(expectedError);
            expect(error.element().textContent).toBe(expectedError);
        });
    });

    describe('onSubmit success', () => {
        test.each([
            ['add', 'days', '10', 'added', '10 days'],
            ['subtract', 'weeks', '2', 'subtracted', '2 weeks'],
        ])('result shown for action=%s %s=%s', async (action, unit, amount, actionLabel, offsetLabel) => {
            const screen = await render(<DateAddSubtract />);

            await openCalendarAndPickDay();
            await selectAction(action === 'add' ? 'Add' : 'Subtract');

            await screen.getByLabelText(unit).fill(amount);
            await screen.getByRole('button', { name: /calculate date add\/subtract/i }).click();

            // Empty-state message disappears once a result is rendered
            await expect
                .element(screen.getByText('Enter a date and select an action to see the result.'))
                .not.toBeInTheDocument();
            await expect.element(screen.getByText(new RegExp(actionLabel, 'i'))).toBeInTheDocument();
            await expect.element(screen.getByText(offsetLabel)).toBeInTheDocument();
        });
    });

    describe('resetForm', () => {
        test('returns to empty-state message', async () => {
            const screen = await render(<DateAddSubtract />);

            await openCalendarAndPickDay();
            await selectAction('Add');
            await screen.getByLabelText('days').fill('1');
            await screen.getByRole('button', { name: /calculate date add\/subtract/i }).click();
            // Confirm result section is showing before reset
            await expect.element(screen.getByText(new RegExp('added', 'i'))).toBeInTheDocument();

            await screen.getByRole('button', { name: /reset form/i }).click();
            await expect
                .element(screen.getByText('Enter a date and select an action to see the result.'))
                .toBeInTheDocument();
        });
    });
});
