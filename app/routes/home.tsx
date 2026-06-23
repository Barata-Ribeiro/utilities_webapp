import { Link, NavLink } from 'react-router';
import ChuckNorrisJokesClient from '~/components/home/chucknorris-jokes-client';
import SystemInfoClient from '~/components/home/systeminfo-client';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export default function Home() {
    return (
        <article className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <section className="flex flex-col gap-4 md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle data-testid="home-title" className="font-serif text-2xl">
                            Welcome to my Utilities Web App
                        </CardTitle>
                        <CardDescription data-testid="home-description">
                            Quick handy tools to speed up everyday tasks.
                        </CardDescription>
                    </CardHeader>

                    <CardContent data-testid="home-buttons" className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" asChild>
                            <NavLink to="/utilities/character-counter">Char. Counter</NavLink>
                        </Button>
                        <Button variant="outline" asChild>
                            <NavLink to="/utilities/password-generator">Pass. Generator</NavLink>
                        </Button>
                        <Button variant="outline" asChild>
                            <NavLink to="/utilities/lorem-ipsum">Lorem Ipsum Generator</NavLink>
                        </Button>
                    </CardContent>
                </Card>

                {/* System info is a client component */}
                <SystemInfoClient />

                <Card>
                    <CardHeader>
                        <CardTitle data-testid="home-about-title" className="font-serif text-lg">
                            About
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p data-testid="home-about-description" className="text-sm text-muted-foreground">
                            This app groups small utilities and converters in a single, fast interface. Use the sidebar
                            to navigate through available tools.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <aside className="flex flex-col gap-4">
                <ChuckNorrisJokesClient />

                <Card>
                    <CardHeader>
                        <CardTitle data-testid="home-quick-links-title" className="font-serif text-lg">
                            Quick Links
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul data-testid="home-quick-links" className="flex flex-col gap-2">
                            <li>
                                <Button variant="link" asChild>
                                    <NavLink to="/about">About this project</NavLink>
                                </Button>
                            </li>
                            <li>
                                <Button variant="link" asChild>
                                    <Link
                                        to="https://github.com/Barata-Ribeiro/utilities_webapp/issues"
                                        target="_blank"
                                        rel="noopener noreferrer external"
                                    >
                                        Report an issue
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </aside>
        </article>
    );
}
