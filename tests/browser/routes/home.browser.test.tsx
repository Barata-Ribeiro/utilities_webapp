import { createRoutesStub } from 'react-router';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import ChuckNorrisJokesClient from '~/components/home/chucknorris-jokes-client';
import SystemInfoClient from '~/components/home/systeminfo-client';
import Home from '~/routes/home';

const mockNavigator = {
    userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
} as Navigator;

afterEach(() => {
    vi.restoreAllMocks();
});

describe('Home route', () => {
    test('renders home page basic elements', async () => {
        const Stub = createRoutesStub([{ path: '/', Component: Home }]);
        const screen = await render(<Stub initialEntries={['/']} />);

        await expect.element(screen.getByTestId('home-title')).toHaveTextContent('Welcome to my Utilities Web App');
        await expect
            .element(screen.getByTestId('home-description'))
            .toHaveTextContent('Quick handy tools to speed up everyday tasks.');

        const buttons = screen.getByTestId('home-buttons').element().querySelectorAll('a');
        const expectedButtons = [
            { text: 'Char. Counter', href: '/utilities/character-counter' },
            { text: 'Pass. Generator', href: '/utilities/password-generator' },
            { text: 'Lorem Ipsum Generator', href: '/utilities/lorem-ipsum' },
        ];

        for (const { text, href } of expectedButtons) {
            const button = Array.from(buttons).find((a) => a.textContent === text);
            expect(button).toBeDefined();
            expect(button).toHaveTextContent(text);
            expect(button).toHaveAttribute('href', href);
        }

        await expect.element(screen.getByTestId('home-about-title')).toHaveTextContent('About');
        await expect
            .element(screen.getByTestId('home-about-description'))
            .toHaveTextContent(
                'This app groups small utilities and converters in a single, fast interface. Use the sidebar to navigate through available tools.',
            );

        const quickLinks = screen.getByTestId('home-quick-links').element().querySelectorAll('a');
        const expectedLinks = [
            { text: 'About this project', href: '/about' },
            { text: 'Report an issue', href: 'https://github.com/Barata-Ribeiro/utilities_webapp/issues' },
        ];

        for (const { text, href } of expectedLinks) {
            const link = Array.from(quickLinks).find((a) => a.textContent === text);
            expect(link).toBeDefined();
            expect(link).toHaveTextContent(text);
            expect(link).toHaveAttribute('href', href);
        }
    });
});

describe('SystemInfoClient', () => {
    test('renders system info card with IP and browser', async () => {
        const originalNavigator = globalThis.navigator;
        Object.defineProperty(globalThis, 'navigator', {
            value: mockNavigator,
            configurable: true,
        });

        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({ ip: '127.0.0.1' }),
                }),
            ),
        );

        const Stub = createRoutesStub([{ path: '/', Component: SystemInfoClient }]);
        const screen = await render(<Stub initialEntries={['/']} />);

        await expect.element(screen.getByTestId('system-info-card')).toBeDefined();
        await expect.element(screen.getByTestId('system-info-title')).toHaveTextContent('System Info');
        await expect.element(screen.getByTestId('system-info-ip')).toHaveTextContent('127.0.0.1');
        await expect.element(screen.getByTestId('system-info-browser')).toHaveTextContent('Chrome');
        await expect.element(screen.getByTestId('system-info-os')).toHaveTextContent('Windows');

        Object.defineProperty(globalThis, 'navigator', {
            value: originalNavigator,
            configurable: true,
        });
    });

    test('renders empty IP when fetch fails', async () => {
        vi.stubGlobal('navigator', mockNavigator);
        vi.stubGlobal(
            'fetch',
            vi.fn(() => Promise.resolve({ ok: false })),
        );

        const Stub = createRoutesStub([{ path: '/', Component: SystemInfoClient }]);
        const screen = await render(<Stub initialEntries={['/']} />);

        await expect.element(screen.getByTestId('system-info-ip')).toBeEmptyDOMElement();
    });
});

describe('ChuckNorrisJokesClient', () => {
    test('fetches three jokes and refreshes', async () => {
        const fetchSpy = vi.fn((url: RequestInfo) => {
            const category = new URL(url as string).searchParams.get('category') ?? 'dev';
            return Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        id: `joke-${category}`,
                        value: `This is a ${category} joke.`,
                        categories: [category],
                    }),
            });
        });

        vi.stubGlobal('fetch', fetchSpy);

        const Stub = createRoutesStub([{ path: '/', Component: ChuckNorrisJokesClient }]);
        const screen = await render(<Stub initialEntries={['/']} />);

        await expect
            .element(screen.getByTestId('chuck-norris-jokes-title'))
            .toHaveTextContent('Chuck Norris (rip) Jokes');
        await expect.poll(() => fetchSpy.mock.calls.length).toBe(3);

        const refreshButton = screen.getByText('Refresh');
        await refreshButton.click();
        await expect.poll(() => fetchSpy.mock.calls.length).toBe(6);
    });

    test('renders error alert when jokes fetch fails', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() => Promise.resolve({ ok: false })),
        );

        const Stub = createRoutesStub([{ path: '/', Component: ChuckNorrisJokesClient }]);
        const screen = await render(<Stub initialEntries={['/']} />);

        await expect.element(screen.getByRole('alert')).toHaveTextContent('Failed to load jokes. Please try again.');
    });
});
