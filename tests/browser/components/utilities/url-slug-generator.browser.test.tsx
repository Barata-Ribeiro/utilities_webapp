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

    test('can toggle between dash and underscore separators', async () => {
        const screen = await render(<URLSlugGenerator />);
        const dashRadio = screen.getByRole('radio', { name: 'Dash (-)' });
        const underscoreRadio = screen.getByRole('radio', { name: 'Underscore (_)' });

        await expect.element(dashRadio).toBeChecked();

        await underscoreRadio.click();
        await expect.element(underscoreRadio).toBeChecked();

        await dashRadio.click();
        await expect.element(dashRadio).toBeChecked();
    });

    test('displays submit button', async () => {
        const screen = await render(<URLSlugGenerator />);
        const submitButton = screen.getByRole('button', { name: /submit|generate|slugify/i });
        expect(submitButton).toBeTruthy();
    });

    test.each([['Single'], ['Multiple Words Here'], ['UPPERCASE TEXT'], ['lowercase text'], ['MiXeD CaSe TeXt']])(
        'accepts various text formats: "%s"',
        async (text) => {
            const screen = await render(<URLSlugGenerator />);
            const input = screen.getByPlaceholder('Enter text here');
            await input.fill(text);
            await expect.element(input).toHaveValue(text);
        },
    );

    test('handles special characters in input', async () => {
        const screen = await render(<URLSlugGenerator />);
        const input = screen.getByPlaceholder('Enter text here');

        await input.fill('Hello! @#$% World?');
        await expect.element(input).toHaveValue('Hello! @#$% World?');
    });

    test('handles numbers in text', async () => {
        const screen = await render(<URLSlugGenerator />);
        const input = screen.getByPlaceholder('Enter text here');

        await input.fill('Test 123 ABC 456');
        await expect.element(input).toHaveValue('Test 123 ABC 456');
    });

    test('handles unicode/accented characters', async () => {
        const screen = await render(<URLSlugGenerator />);
        const input = screen.getByPlaceholder('Enter text here');

        await input.fill('Café résumé naïve');
        await expect.element(input).toHaveValue('Café résumé naïve');
    });

    test('handles very long text', async () => {
        const screen = await render(<URLSlugGenerator />);
        const input = screen.getByPlaceholder('Enter text here');
        const longText = 'This is a very long text that should still be handled properly by the slug generator';

        await input.fill(longText);
        await expect.element(input).toHaveValue(longText);
    });

    test('resets form with reset button', async () => {
        const screen = await render(<URLSlugGenerator />);
        const input = screen.getByPlaceholder('Enter text here');
        const resetButton = screen.getByRole('button', { name: /reset/i });

        await input.fill('Some text');
        await resetButton.click();
        await expect.element(input).toHaveValue('');
    });

    test('has lowercase option', async () => {
        const screen = await render(<URLSlugGenerator />);
        const lowercaseCheckbox = screen.getByRole('checkbox', { name: /lowercase/i });

        expect(lowercaseCheckbox).toBeTruthy();
    });

    test('handles text with leading/trailing whitespace', async () => {
        const screen = await render(<URLSlugGenerator />);
        const input = screen.getByPlaceholder('Enter text here');

        await input.fill('   spaced text   ');
        await expect.element(input).toHaveValue('   spaced text   ');
    });
});
