import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Bmi from '~/components/pages/calculators/bmi';

describe('Bmi', () => {
    describe('onFormSubmit validation', () => {
        test('shows required boundary errors for empty submit', async () => {
            const screen = await render(<Bmi />);
            await screen.getByRole('button', { name: /calculate bmi/i }).click();

            const heightError = await screen.getByText('Height must be at least 30 cm.');
            const weightError = await screen.getByText('Weight must be at least 1 kg.');

            expect(heightError.element().textContent).toMatchInlineSnapshot('"Height must be at least 30 cm."');
            expect(weightError.element().textContent).toMatchInlineSnapshot('"Weight must be at least 1 kg."');
        });

        test.each([
            ['29', '70', 'Height must be at least 30 cm.'],
            ['301', '70', 'Height must be at most 300 cm.'],
            ['170', '0', 'Weight must be at least 1 kg.'],
            ['170', '501', 'Weight must be at most 500 kg.'],
        ])('shows error for edge input height=%s weight=%s', async (height, weight, expectedError) => {
            const screen = await render(<Bmi />);
            await screen.getByLabelText('Height').fill(height);
            await screen.getByLabelText('Weight').fill(weight);
            await screen.getByRole('button', { name: /calculate bmi/i }).click();

            const error = await screen.getByText(expectedError);
            expect(error.element().textContent).toBe(expectedError);
        });
    });

    describe('onFormSubmit success', () => {
        test.each([
            ['170', '65', '22.49', 'Normal weight'],
            ['30', '1', '11.11', 'Severely Underweight'],
            ['300', '500', '55.56', 'Obese'],
        ])('calculates bmi for height=%s and weight=%s', async (height, weight, bmi, category) => {
            const screen = await render(<Bmi />);
            await screen.getByLabelText('Height').fill(height);
            await screen.getByLabelText('Weight').fill(weight);
            await screen.getByRole('button', { name: /calculate bmi/i }).click();

            await expect.element(screen.getByText(bmi)).toBeInTheDocument();
            await expect.element(screen.getByText(category)).toBeInTheDocument();
        });
    });

    describe('reset behavior', () => {
        test('clears result card', async () => {
            const screen = await render(<Bmi />);
            await screen.getByLabelText('Height').fill('170');
            await screen.getByLabelText('Weight').fill('65');
            await screen.getByRole('button', { name: /calculate bmi/i }).click();
            await expect.element(screen.getByText('Body Mass Index')).toBeInTheDocument();

            await screen.getByRole('button', { name: /reset bmi form/i }).click();
            await expect.element(screen.getByText('Body Mass Index')).not.toBeInTheDocument();
        });
    });
});
