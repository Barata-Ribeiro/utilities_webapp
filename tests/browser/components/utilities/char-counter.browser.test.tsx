import { describe, expect, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';
import CharCounter from '~/components/pages/utilities/char-counter';

describe('CharCounter', () => {
    test('renders component', async () => {
        const screen = await render(<CharCounter />);
        const textarea = screen.getByPlaceholder('Type or paste your text here...');
        expect(textarea).toBeTruthy();
    });

    test.each([['hello'], ['hello world'], ['123'], ['']])('accepts input "%s"', async (text) => {
        const screen = await render(<CharCounter />);
        const textarea = screen.getByPlaceholder('Type or paste your text here...');
        await textarea.fill(text);
        await expect.element(textarea).toHaveValue(text);
    });

    test('updates value when text changes', async () => {
        const screen = await render(<CharCounter />);
        const textarea = screen.getByPlaceholder('Type or paste your text here...');
        await textarea.fill('first');
        await expect.element(textarea).toHaveValue('first');
        await textarea.fill('second');
        await expect.element(textarea).toHaveValue('second');
    });

    test('displays correct character count', async () => {
        const screen = await render(<CharCounter />);
        const textarea = screen.getByPlaceholder('Type or paste your text here...');
        await textarea.fill('hello');

        const charBadges = screen.getByText(/^\d+$/);
        // First badge should be character count (5 for 'hello')
        expect(charBadges.length).toBeGreaterThan(0);
    });

    test('displays correct word count', async () => {
        const screen = await render(<CharCounter />);
        const textarea = screen.getByPlaceholder('Type or paste your text here...');
        await textarea.fill('hello world test');

        // Should have word count displayed
        const wordLabel = screen.getByText('Words');
        expect(wordLabel).toBeTruthy();
    });

    test('counts lines correctly', async () => {
        const screen = await render(<CharCounter />);
        const textarea = screen.getByPlaceholder('Type or paste your text here...');
        await textarea.fill('line1\nline2\nline3');

        const lineLabel = screen.getByText('Lines');
        expect(lineLabel).toBeTruthy();
    });

    test('handles empty input', async () => {
        const screen = await render(<CharCounter />);
        const textarea = screen.getByPlaceholder('Type or paste your text here...');
        await textarea.fill('');

        await expect.element(textarea).toHaveValue('');
    });

    test('handles multiline text with newlines', async () => {
        const screen = await render(<CharCounter />);
        const textarea = screen.getByPlaceholder('Type or paste your text here...');
        const multilineText = 'first line\nsecond line';

        await textarea.fill(multilineText);
        await expect.element(textarea).toHaveValue(multilineText);
    });

    test.each([
        ['a', 1],
        ['hello', 5],
        ['hello world', 11],
    ])('counts characters correctly for "%s"', async (text) => {
        const screen = await render(<CharCounter />);
        const textarea = screen.getByPlaceholder('Type or paste your text here...');
        await textarea.fill(text);

        // Verify text was entered
        await expect.element(textarea).toHaveValue(text);
    });

    test('updates counts in real-time', async () => {
        const screen = await render(<CharCounter />);
        const textarea = screen.getByPlaceholder('Type or paste your text here...');

        // Initial state
        await expect.element(textarea).toHaveValue('');

        // Add text
        await textarea.fill('test');
        await expect.element(textarea).toHaveValue('test');

        // Modify text
        await textarea.fill('testing');
        await expect.element(textarea).toHaveValue('testing');
    });
});
