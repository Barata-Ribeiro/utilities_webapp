import { describe, expect, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';
import URLSlugGenerator from '~/components/pages/utilities/url-slug-generator';

describe('URLSlugGenerator', () => {
    test('renders component', async () => {
        const screen = await render(<URLSlugGenerator />);
        await expect.element(screen.getByLabelText('Text to Slugify')).toBeVisible();
    });

    test.each([['Hello World'], ['Test 123'], ['Special@Characters!']])('accepts text input "%s"', async (text) => {
        const screen = await render(<URLSlugGenerator />);
        const input = screen.getByPlaceholder('Enter text here');
        await input.fill(text);
        await expect.element(input).toHaveValue(text);
    });

    test('handles empty input', async () => {
        const screen = await render(<URLSlugGenerator />);
        const input = screen.getByPlaceholder('Enter text here');
        await input.fill('');
        await expect.element(input).toHaveValue('');
    });

    test('accepts radio option selection', async () => {
        const screen = await render(<URLSlugGenerator />);
        await expect.element(screen.getByRole('radio', { name: 'Dash (-)' })).toBeChecked();
    });
});
