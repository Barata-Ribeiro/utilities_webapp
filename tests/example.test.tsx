import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Home from '~/routes/home';

test('Math.sqrt works for perfect squares', () => {
    expect(Math.sqrt(4)).toBe(2);
    expect(Math.sqrt(144)).toBe(12);
    expect(Math.sqrt(0)).toBe(0);
});

test('home route renders project ready content', async () => {
    const screen = await render(<Home />);

    await expect.element(screen.getByRole('heading', { name: /Project ready!/i })).toBeTruthy();
    await expect
        .element(screen.getByText(/We(?:'|\u2019)ve already added the button component for you\./i))
        .toBeTruthy();
    await expect.element(screen.getByRole('button', { name: /^Button$/i })).toBeTruthy();
});
