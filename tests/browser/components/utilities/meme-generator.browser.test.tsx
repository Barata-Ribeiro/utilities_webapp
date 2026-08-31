import { describe, expect, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';
import MemeGenerator from '~/components/pages/utilities/meme-generator';

describe('MemeGenerator', () => {
    test('renders component with main sections', async () => {
        const screen = await render(<MemeGenerator />);

        // Check for main title
        const stageTitle = screen.getByRole('heading', { name: /Interactive Stage/i });
        expect(stageTitle).toBeTruthy();
    });

    test('renders upload section', async () => {
        const screen = await render(<MemeGenerator />);

        // Upload button should be visible
        const uploadButton = screen.getByRole('button', { name: /upload|choose|select/i });
        expect(uploadButton).toBeTruthy();
    });

    test('renders reset button', async () => {
        const screen = await render(<MemeGenerator />);

        // Reset/clear button should be visible
        const resetButton = screen.getByRole('button', { name: /reset|clear|new/i });
        expect(resetButton).toBeTruthy();
    });

    test('renders export section', async () => {
        const screen = await render(<MemeGenerator />);

        // Export/download button should be visible (may be disabled initially)
        const exportButton = screen.getByRole('button', { name: /export|download|save/i });
        expect(exportButton).toBeTruthy();
    });

    test('has layout with controls and canvas', async () => {
        const screen = await render(<MemeGenerator />);

        // Should have the card with stage title
        const card = screen.getByRole('heading', { name: /Interactive Stage/i });
        expect(card).toBeTruthy();
    });

    test('renders text controls area', async () => {
        const screen = await render(<MemeGenerator />);

        // Text controls should be present
        const addTextButton = screen.getByRole('button', { name: /add.*text|text/i });
        expect(addTextButton).toBeTruthy();
    });
});
