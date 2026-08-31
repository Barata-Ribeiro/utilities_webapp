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
});
