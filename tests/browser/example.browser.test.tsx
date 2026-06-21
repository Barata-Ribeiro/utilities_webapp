import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Example from '~/components/example';

test('renders Example component', async () => {
    const screen = await render(<Example />);

    await expect.element(screen.getByTestId('example-component')).toBeInTheDocument();
    await expect.element(screen.getByRole('heading', { name: /example component/i })).toBeInTheDocument();
    await expect.element(screen.getByText(/this is an example component./i)).toBeInTheDocument();
});
