import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { DateDifference } from '~/components/pages/calculators/date/date-difference';

// Radix Popover renders the calendar in a portal on document.body —
// we query document.body directly and use vi.waitFor to handle async opening/closing.
async function openCalendarAndPickDay(triggerId: string, index = 0) {
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

describe('DateDifference', () => {
    describe('onSubmit validation', () => {
        // Both startDate and endDate are required; both fields show the same error.
        test('shows required error on both date fields for empty submit', async () => {
            const screen = await render(<DateDifference />);
            await screen.getByRole('button', { name: /calculate difference/i }).click();

            // Wait for errors to appear, then verify count and message.
            await vi.waitFor(() => {
                const alerts = screen.container.querySelectorAll('[role="alert"]');
                if (alerts.length < 1) throw new Error('no alerts yet');
            });

            const alerts = screen.container.querySelectorAll('[role="alert"]');
            expect(alerts.length).toBe(2);
            expect(alerts[0]?.textContent).toMatchInlineSnapshot('"A valid date is required."');
        });
    });

    describe('onSubmit success', () => {
        test.each([
            ['start-before-end', 0, 1],
            ['start-after-end', 1, 0],
        ])('shows duration summary when %s', async (_label, startIdx, endIdx) => {
            const screen = await render(<DateDifference />);

            await openCalendarAndPickDay('calendar-startDate', startIdx);
            await openCalendarAndPickDay('calendar-endDate', endIdx);
            await screen.getByRole('button', { name: /calculate difference/i }).click();

            await expect.element(screen.getByText(/Result:/i)).toBeInTheDocument();
            await expect.element(screen.getByText('Alternative time units')).toBeInTheDocument();
            await expect.element(screen.getByText(/can be converted to one of these units/i)).toBeInTheDocument();
        });

        test('shows zero duration for same day selected twice', async () => {
            const screen = await render(<DateDifference />);

            // Pick the same calendar day for both fields — difference must be 0.
            await openCalendarAndPickDay('calendar-startDate', 0);
            await openCalendarAndPickDay('calendar-endDate', 0);
            await screen.getByRole('button', { name: /calculate difference/i }).click();

            await expect.element(screen.getByText('Result: 0 hours, 0 minutes and 0 seconds')).toBeInTheDocument();
            // Verify the alt-units list renders the exact 0-second entry.
            const secondsItem = Array.from(screen.container.querySelectorAll('li')).find(
                (el) => el.textContent === '0 seconds',
            );
            expect(secondsItem).not.toBeUndefined();
        });
    });

    describe('resetForm', () => {
        test('returns to no-result state', async () => {
            const screen = await render(<DateDifference />);

            await openCalendarAndPickDay('calendar-startDate', 0);
            await openCalendarAndPickDay('calendar-endDate', 1);
            await screen.getByRole('button', { name: /calculate difference/i }).click();
            await expect.element(screen.getByText(/Result:/i)).toBeInTheDocument();

            await screen.getByRole('button', { name: /reset form/i }).click();
            await expect
                .element(screen.getByText(/No result yet\. Pick a start and end date, then press/i))
                .toBeInTheDocument();
        });
    });
});
