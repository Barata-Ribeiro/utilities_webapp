'use client';

import getJokes, { Joke } from '@/actions/get-jokes';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState, useTransition } from 'react';

export default function ChuckNorrisJokesClient() {
    const [isPending, startTransition] = useTransition();
    const [jokes, setJokes] = useState<Joke[] | null>(null);

    function fetchJokes() {
        startTransition(() =>
            getJokes()
                .then((fetchedJokes) => setJokes(fetchedJokes))
                .catch((error) => console.error('Error fetching jokes: ', error)),
        );
    }

    useEffect(() => fetchJokes(), []);

    return (
        <div aria-busy={isPending} className="rounded-md bg-card p-6 shadow">
            <h2 className="font-serif text-lg">Chuck Norris Jokes</h2>
            <div className="mt-3 flex flex-col gap-3">
                {isPending || jokes === null ? (
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>
                ) : (
                    jokes.map((j) => (
                        <article key={j.id} className="rounded-md border p-3">
                            <p className="text-sm">{j.value}</p>
                            <div className="mt-2 text-xs text-muted-foreground">
                                Category: {j.categories.join(', ') || 'uncategorized'}
                            </div>
                        </article>
                    ))
                )}
            </div>
            <div className="mt-4 flex justify-end">
                <Button variant="secondary" disabled={isPending} onClick={fetchJokes}>
                    {isPending ? 'Refreshing...' : 'Refresh'}
                </Button>
            </div>
        </div>
    );
}
