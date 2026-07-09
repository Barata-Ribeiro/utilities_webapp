import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Gcf from '~/components/pages/calculators/gcm-and-lcf/gcm';
import Lcm from '~/components/pages/calculators/gcm-and-lcf/lcm';

describe('Gcf', () => {
    describe('onSubmit validation', () => {
        test('shows numeric validation errors', async () => {
            const screen = await render(<Gcf />);
            await screen.getByPlaceholder('Input 1').fill('abc');
            await screen.getByRole('button', { name: /calculate gcf/i }).click();

            const error = await screen.getByText('Input must be a number.');
            expect(error.element().textContent).toMatchInlineSnapshot('"Input must be a number."');
        });

        test('shows refine error when all values are zero', async () => {
            const screen = await render(<Gcf />);
            for (let i = 1; i <= 6; i += 1) {
                await screen.getByPlaceholder(`Input ${i}`).fill('0');
            }
            await screen.getByRole('button', { name: /calculate gcf/i }).click();

            const error = await screen.getByText('At least one positive integer is required.');
            expect(error.element().textContent).toMatchInlineSnapshot('"At least one positive integer is required."');
        });
    });

    describe('onSubmit success', () => {
        test.each([
            [['12', '18'], '6'],
            [['8', '12', '20'], '4'],
            [['7', '14', '21', '28'], '7'],
        ])('computes gcf for %j', async (values, expected) => {
            const screen = await render(<Gcf />);

            for (let i = 0; i < values.length; i += 1) {
                await screen.getByPlaceholder(`Input ${i + 1}`).fill(values[i]!);
            }
            await screen.getByRole('button', { name: /calculate gcf/i }).click();

            await expect.element(screen.getByText(`GCF: ${expected}`)).toBeInTheDocument();
        });
    });

    describe('resetForm', () => {
        test('restores initial state', async () => {
            const screen = await render(<Gcf />);
            await screen.getByPlaceholder('Input 1').fill('12');
            await screen.getByPlaceholder('Input 2').fill('18');
            await screen.getByRole('button', { name: /calculate gcf/i }).click();
            await expect.element(screen.getByText('GCF: 6')).toBeInTheDocument();

            await screen.getByRole('button', { name: /reset form/i }).click();
            await expect
                .element(screen.getByText('Enter values and click Calculate to see the GCF.'))
                .toBeInTheDocument();
        });
    });
});

describe('Lcm', () => {
    describe('onSubmit validation', () => {
        test('shows numeric validation errors', async () => {
            const screen = await render(<Lcm />);
            await screen.getByPlaceholder('Input 1').fill('abc');
            await screen.getByRole('button', { name: /calculate lcm/i }).click();

            const error = await screen.getByText('Input must be a number.');
            expect(error.element().textContent).toMatchInlineSnapshot('"Input must be a number."');
        });

        test('shows refine error when all values are zero', async () => {
            const screen = await render(<Lcm />);
            for (let i = 1; i <= 6; i += 1) {
                await screen.getByPlaceholder(`Input ${i}`).fill('0');
            }
            await screen.getByRole('button', { name: /calculate lcm/i }).click();

            const error = await screen.getByText('At least one positive integer is required.');
            expect(error.element().textContent).toMatchInlineSnapshot('"At least one positive integer is required."');
        });
    });

    describe('onSubmit success', () => {
        test.each([
            [['12', '18'], '36'],
            [['8', '12', '20'], '120'],
            [['7', '14', '21', '28'], '84'],
        ])('computes lcm for %j', async (values, expected) => {
            const screen = await render(<Lcm />);

            for (let i = 0; i < values.length; i += 1) {
                await screen.getByPlaceholder(`Input ${i + 1}`).fill(values[i]!);
            }
            await screen.getByRole('button', { name: /calculate lcm/i }).click();

            await expect.element(screen.getByText(`LCM: ${expected}`)).toBeInTheDocument();
        });
    });

    describe('resetForm', () => {
        test('restores initial state', async () => {
            const screen = await render(<Lcm />);
            await screen.getByPlaceholder('Input 1').fill('12');
            await screen.getByPlaceholder('Input 2').fill('18');
            await screen.getByRole('button', { name: /calculate lcm/i }).click();
            await expect.element(screen.getByText('LCM: 36')).toBeInTheDocument();

            await screen.getByRole('button', { name: /reset form/i }).click();
            await expect
                .element(screen.getByText('Enter values and click Calculate to see the LCM.'))
                .toBeInTheDocument();
        });
    });
});
