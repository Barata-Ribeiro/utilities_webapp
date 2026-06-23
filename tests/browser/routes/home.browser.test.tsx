import { createRoutesStub } from 'react-router';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Home from '~/routes/home';

test('renders home page basic elements', async () => {
    const Stub = createRoutesStub([{ path: '/', Component: Home }]);

    const screen = await render(<Stub initialEntries={['/']} />);

    // Title and description
    await expect.element(screen.getByTestId('home-title')).toHaveTextContent('Welcome to my Utilities Web App');
    await expect
        .element(screen.getByTestId('home-description'))
        .toHaveTextContent('Quick handy tools to speed up everyday tasks.');

    // Buttons and links
    const buttons = screen.getByTestId('home-buttons').element().querySelectorAll('a');
    const expectedButtons = [
        { text: 'Char. Counter', href: '/utilities/character-counter' },
        { text: 'Pass. Generator', href: '/utilities/password-generator' },
        { text: 'Lorem Ipsum Generator', href: '/utilities/lorem-ipsum' },
    ];
    for (const { text, href } of expectedButtons) {
        const button = Array.from(buttons).find((a) => a.textContent === text);
        if (!button) {
            throw new Error(`Button with text "${text}" not found`);
        }
        expect(button).toBeDefined();
        expect(button).toHaveTextContent(text);
        expect(button).toHaveAttribute('href', href);
    }

    // About section
    await expect.element(screen.getByTestId('home-about-title')).toHaveTextContent('About');
    await expect
        .element(screen.getByTestId('home-about-description'))
        .toHaveTextContent(
            'This app groups small utilities and converters in a single, fast interface. Use the sidebar to navigate through available tools.',
        );

    // Quick Links
    await expect.element(screen.getByTestId('home-quick-links-title')).toHaveTextContent('Quick Links');
    const quickLinks = screen.getByTestId('home-quick-links').element().querySelectorAll('a');
    const expectedLinks = [
        { text: 'About this project', href: '/about' },
        { text: 'Report an issue', href: 'https://github.com/Barata-Ribeiro/utilities_webapp/issues' },
    ];

    for (const { text, href } of expectedLinks) {
        const link = Array.from(quickLinks).find((a) => a.textContent === text);
        if (!link) {
            throw new Error(`Link with text "${text}" not found`);
        }

        expect(link).toBeDefined();
        expect(link).toHaveTextContent(text);
        expect(link).toHaveAttribute('href', href);
    }
});
