import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import ImageToBase64 from '~/components/pages/programming/image-to-base64';

async function uploadFile(screen: Awaited<ReturnType<typeof render>>, file: File) {
    const input = screen.container.querySelector('input[type="file"]') as HTMLInputElement | null;
    if (!input) throw new Error('File input not found.');

    const transfer = new DataTransfer();
    transfer.items.add(file);

    Object.defineProperty(input, 'files', {
        value: transfer.files,
        configurable: true,
    });

    input.dispatchEvent(new Event('change', { bubbles: true }));
}

// Use a file larger than the component minSize (1024 bytes)
const PNG_BYTES = new Uint8Array(2048);

describe('ImageToBase64', () => {
    describe('rendering', () => {
        test('shows the dropzone upload button', async () => {
            const screen = await render(<ImageToBase64 />);
            await expect.element(screen.getByRole('button', { name: /upload a file/i })).toBeInTheDocument();
        });

        test('shows no error or result initially', async () => {
            const screen = await render(<ImageToBase64 />);
            expect(screen.container.querySelector('[role="alert"]')).toBeNull();
        });
    });

    describe('file drop', () => {
        test('shows error for non-image file type', async () => {
            const screen = await render(<ImageToBase64 />);
            const textFile = new File(['hello'], 'hello.txt', { type: 'text/plain' });
            await uploadFile(screen, textFile);

            await expect.element(screen.getByRole('alert')).toBeInTheDocument();
        });

        test('converts a valid PNG to base64 and shows output options', async () => {
            const screen = await render(<ImageToBase64 />);
            const imageFile = new File([PNG_BYTES], 'pixel.png', { type: 'image/png' });
            await uploadFile(screen, imageFile);

            await expect.element(screen.getByText(/raw base64/i)).toBeInTheDocument();
            await expect.element(screen.getByText(/data url/i)).toBeInTheDocument();
        });

        test('shows image preview after dropping a valid PNG', async () => {
            const screen = await render(<ImageToBase64 />);
            const imageFile = new File([PNG_BYTES], 'pixel.png', { type: 'image/png' });
            await uploadFile(screen, imageFile);

            await expect.element(screen.getByRole('img', { name: /preview/i })).toBeInTheDocument();
        });

        test('shows file metadata after valid drop', async () => {
            const screen = await render(<ImageToBase64 />);
            const imageFile = new File([PNG_BYTES], 'pixel.png', { type: 'image/png' });
            await uploadFile(screen, imageFile);

            await expect.element(screen.getByText('image/png')).toBeInTheDocument();
        });
    });
});
