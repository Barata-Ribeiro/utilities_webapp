import ImageToBase64 from '@/components/programming/image-to-base64';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Image to Base64 Converter',
    description:
        'Quickly convert images to Base64 format online. Upload your image and get the Base64 encoded string for easy embedding in HTML, CSS, or JSON.',
    keywords: [
        'image to base64',
        'base64 converter',
        'image encoding',
        'online tool',
        'utilities',
        'programming',
        'data URI',
        'image upload',
    ],
    manifest: '/manifest.webmanifest',
};

export default function Page() {
    return (
        <article className="rounded-md bg-card p-6 shadow">
            <h1 className="font-serif text-xl">Image to Base64 Converter</h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Quickly convert images to Base64 format online. Upload your image and get the Base64 encoded string for
                easy embedding in HTML, CSS, or JSON.
            </p>

            <section className="mt-4">
                <h2 className="sr-only">How it works</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>
                        <strong>Upload Image</strong>: Select an image file from your device to convert.
                    </li>
                    <li>
                        <strong>Convert</strong>: The tool will process the image and generate a Base64 encoded string.
                    </li>
                    <li>
                        <strong>Copy & Use</strong>: Copy the Base64 string and use it in your HTML, CSS, or JSON as
                        needed.
                    </li>
                </ul>
            </section>

            <div className="my-8 flex flex-col items-center-safe gap-4 border-y py-8">
                <ImageToBase64 />
            </div>

            <footer className="text-xs text-muted-foreground">
                Tip: Large images may take longer to convert. For best results, use images under 1MB. This utility runs
                locally in your browser and does not transmit your images to any server.
            </footer>
        </article>
    );
}
