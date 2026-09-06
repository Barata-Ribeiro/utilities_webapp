import { afterEach, describe, expect, test, vi } from 'vite-plus/test';
import { userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';
import DeadPixelCheck from '~/components/pages/utilities/dead-pixel-check';

afterEach(() => vi.restoreAllMocks());

describe('DeadPixelCheck', () => {
    test('cycles all five colors with left clicks and wraps back to white', async () => {
        vi.spyOn(Element.prototype, 'requestFullscreen').mockRejectedValue(new Error('Fullscreen denied'));
        const screen = await render(<DeadPixelCheck />);
        await screen.getByRole('button', { name: 'Start test' }).click();
        const surface = screen.getByRole('button', { name: /Next test color/ });
        await expect.element(surface).toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)' });
        for (const color of [
            'rgb(0, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(0, 255, 0)',
            'rgb(0, 0, 255)',
            'rgb(255, 255, 255)',
        ]) {
            await surface.click();
            await expect.element(surface).toHaveStyle({ backgroundColor: color });
        }
        const bounds = surface.element().getBoundingClientRect();
        expect(bounds.x).toBe(0);
        expect(bounds.y).toBe(0);
        expect(bounds.width).toBe(window.innerWidth);
        expect(bounds.height).toBe(window.innerHeight);
        await userEvent.keyboard('{Escape}');
        await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
    });

    test('advances once per Space press, ignores right clicks, and restores focus on Escape', async () => {
        vi.spyOn(Element.prototype, 'requestFullscreen').mockRejectedValue(new Error('Fullscreen denied'));
        const screen = await render(<DeadPixelCheck />);
        const start = screen.getByRole('button', { name: 'Start test' });
        await start.click();
        const surface = screen.getByRole('button', { name: /Next test color/ });
        await userEvent.keyboard(' ');
        await expect.element(surface).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)' });
        surface.element().dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', repeat: true, bubbles: true }));
        await surface.click({ button: 'right' });
        await expect.element(surface).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)' });
        await userEvent.keyboard('{Escape}');
        await expect.element(start).toHaveFocus();
        await start.click();
        await expect.element(surface).toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)' });
        await userEvent.keyboard('{Escape}');
    });

    test('requests fullscreen on the test surface and stops when the browser exits fullscreen', async () => {
        let fullscreenElement: Element | null = null;
        vi.spyOn(document, 'fullscreenElement', 'get').mockImplementation(() => fullscreenElement);
        const screen = await render(<DeadPixelCheck />);
        const request = vi.spyOn(Element.prototype, 'requestFullscreen').mockImplementation(() => {
            fullscreenElement = screen.getByRole('button', { name: /Next test color/ }).element();
            document.dispatchEvent(new Event('fullscreenchange'));
            return Promise.resolve();
        });
        await screen.getByRole('button', { name: 'Start test' }).click();
        expect(request).toHaveBeenCalledWith({ navigationUI: 'hide' });
        expect(request.mock.contexts[0]).toBe(fullscreenElement);
        expect(fullscreenElement).toBe(screen.getByRole('button', { name: /Next test color/ }).element());
        fullscreenElement = null;
        document.dispatchEvent(new Event('fullscreenchange'));
        await expect.element(screen.getByRole('button', { name: 'Start test' })).toHaveFocus();
        await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
    });

    test('works without the Fullscreen API and closes on Escape', async () => {
        vi.spyOn(Element.prototype, 'requestFullscreen');
        Object.defineProperty(Element.prototype, 'requestFullscreen', { configurable: true, value: undefined });
        const screen = await render(<DeadPixelCheck />);
        await screen.getByRole('button', { name: 'Start test' }).click();
        await expect.element(screen.getByRole('dialog')).toBeVisible();
        await userEvent.keyboard('{Escape}');
        await expect.element(screen.getByRole('button', { name: 'Start test' })).toHaveFocus();
    });
});
