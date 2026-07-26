import { AlertCircleIcon } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Meta } from '~/components/application/meta';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Skeleton } from '~/components/ui/skeleton';
import { useIsMounted } from '~/hooks/use-is-mounted';
import { Metadata } from '~/types/metadata';

const MemeGenerator = lazy(() => import('~/components/pages/utilities/meme-generator'));

export const METADATA: Metadata = {
    title: 'Meme Generator',
    description:
        'Create your own memes with our easy-to-use Meme Generator. Customize text, fonts, and styles to make your memes stand out.',
    keywords: ['meme generator', 'create memes', 'custom memes', 'funny images', 'text on images', 'utilities'],
};

export default function Page() {
    const isMounted = useIsMounted();

    return (
        <>
            <Meta {...METADATA} />
            <article className="rounded-md bg-card p-6 shadow">
                <h1 className="font-serif text-xl">Meme Generator</h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Create your own memes with our easy-to-use Meme Generator. Customize text, fonts, and styles to make
                    your memes stand out.
                </p>

                <section className="mt-4">
                    <h2 className="sr-only">How it works</h2>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        <li>
                            <strong>Upload an Image</strong>: Start by uploading your own image.
                        </li>
                        <li>
                            <strong>Add Text</strong>: Customize the text on your meme with different fonts and styles.
                        </li>
                        <li>
                            <strong>Download</strong>: Once you&apos;re happy with your meme, download it to share with
                            friends.
                        </li>
                    </ul>
                </section>

                <div className="mt-4 w-full">
                    {isMounted() ? (
                        <Suspense
                            fallback={
                                <Skeleton
                                    role="status"
                                    aria-busy="true"
                                    aria-label="Loading meme editor"
                                    className="aspect-video max-h-96 w-full"
                                />
                            }
                        >
                            <MemeGenerator />
                        </Suspense>
                    ) : (
                        <Alert variant="destructive" className="mx-auto max-w-md">
                            <AlertCircleIcon aria-hidden />
                            <AlertTitle>Warning!</AlertTitle>
                            <AlertDescription>
                                The interactive editor loads in the browser after hydration.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                <footer className="mt-4 text-xs text-muted-foreground">
                    Tip: Use the Meme Generator to create fun and personalized memes. This utility runs locally in your
                    browser and does not transmit any data to a server.
                </footer>
            </article>
        </>
    );
}
