import { useState, useTransition, type ReactNode } from 'react';
import ContentError from '~/components/home/content-error';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect';
import type { Joke } from '~/types/jokes';

async function getJokes(signal: AbortSignal): Promise<Joke[]> {
    const categories = ['dev', 'movie', 'political'] as const;

    const fetchJoke = async (category: string): Promise<Joke> => {
        const res = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`, {
            signal,
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(`Failed to load Chuck Norris jokes for category ${category} (${res.status})`);
        }

        return (await res.json()) as Joke;
    };

    return await Promise.all(categories.map((category) => fetchJoke(category)));
}

export default function ChuckNorrisJokesClient() {
    const [isPending, startTransition] = useTransition();
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [error, setError] = useState<string | null>(null);

    function fetchJokes() {
        setError(null);
        const controller = new AbortController();

        startTransition(() => {
            getJokes(controller.signal)
                .then(setJokes)
                .catch((err) => {
                    if (err.name !== 'AbortError') {
                        console.error(err);
                        setError('Failed to load jokes. Please try again.');
                    }
                });
        });

        return () => controller.abort();
    }

    useIsomorphicLayoutEffect(() => fetchJokes(), []);

    return (
        <Card aria-busy={isPending}>
            <CardHeader>
                <CardTitle className="font-serif text-lg">
                    Chuck Norris{' '}
                    <span className="align-super text-[0.62rem] leading-none text-muted-foreground">(rip)</span> Jokes
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {error ? <ContentError message={error} /> : renderJokeContent(isPending, jokes)}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="button" variant="secondary" disabled={isPending} onClick={fetchJokes}>
                    {isPending ? 'Refreshing...' : 'Refresh'}
                </Button>
            </CardFooter>
        </Card>
    );
}

function renderJokeContent(isPending: boolean, jokes: Joke[]): ReactNode {
    if (isPending || jokes.length === 0) {
        return (
            <div className="space-y-2">
                {[1, 2, 3].map((el, i) => (
                    <Skeleton key={`skeleton-${i}-${el}`} className="h-5 w-full" />
                ))}
            </div>
        );
    }

    return jokes.map((j) => (
        <article key={j.id} className="rounded-md border bg-muted/50 p-3 hover:bg-muted">
            <p className="text-sm">{j.value}</p>
            <div className="mt-2 text-xs text-muted-foreground">
                Category: {j.categories.join(', ') || 'uncategorized'}
            </div>
        </article>
    ));
}
