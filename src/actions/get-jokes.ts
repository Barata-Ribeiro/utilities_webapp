"use server"

export interface Joke {
    categories: string[]
    created_at: string
    icon_url: string
    id: string
    updated_at: string
    url: string
    value: string
}

export default async function getJokes() {
    const categories = ["dev", "movie", "political"]
    const jokes: Joke[] = []

    for (const category of categories) {
        const res = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`, {
            next: { revalidate: 1800 },
        })
        if (!res.ok) throw new Error(`Failed to fetch joke for category: ${category}`)
        const joke: Joke = await res.json()
        jokes.push(joke)
    }

    return jokes
}
