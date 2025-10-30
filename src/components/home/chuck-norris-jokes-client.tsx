'use client';

import getJokes, { Joke } from '@/actions/get-jokes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
        <Card aria-busy={isPending}>
            <CardHeader>
                <CardTitle className="font-serif text-lg">Chuck Norris Jokes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
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
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="button" variant="secondary" disabled={isPending} onClick={fetchJokes}>
                    {isPending ? 'Refreshing...' : 'Refresh'}
                </Button>
            </CardFooter>
        </Card>
    );
}
