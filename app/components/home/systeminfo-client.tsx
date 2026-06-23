import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect';
import { IpResponse } from '~/types/ip-response';

async function getIpAddress(signal: AbortSignal): Promise<string> {
    const res = await fetch('https://api.ipify.org?format=json', { signal, cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch IP address');
    const data: IpResponse = await res.json();
    return data.ip;
}

export default function SystemInfoClient() {
    const [isPending, startTransition] = useTransition();
    const [ipAddress, setIpAddress] = useState<string | null>(null);
    const [browser, setBrowser] = useState<string | null>(null);
    const [operatingSystem, setOperatingSystem] = useState<string | null>(null);

    useIsomorphicLayoutEffect(() => {
        const agent = navigator.userAgent.toLowerCase();

        const browserName = /edg\//i.test(agent)
            ? 'Microsoft Edge (Chromium Based)'
            : /edge/i.test(agent)
              ? 'Microsoft Edge'
              : /opr/i.test(agent)
                ? 'Opera'
                : /chrome/i.test(agent) && !/edg\//i.test(agent) && !/opr/i.test(agent) && !/vivaldi/i.test(agent)
                  ? 'Chrome'
                  : /trident/i.test(agent)
                    ? 'MS IE'
                    : /firefox/i.test(agent)
                      ? 'Mozilla Firefox'
                      : /safari/i.test(agent) && !/chrome/i.test(agent) && !/crios/i.test(agent)
                        ? 'Safari'
                        : 'Unknown browser';

        const osList = [
            { name: 'Windows NT', regex: /Windows NT/i },
            { name: 'Mac', regex: /Mac OS X/i },
            { name: 'Linux', regex: /Linux/i },
            { name: 'Android', regex: /Android/i },
            { name: 'iOS', regex: /(iPhone|iPad|iPod)/i },
            { name: 'UNIX', regex: /X11/i },
        ];

        const controller = new AbortController();

        startTransition(() => {
            getIpAddress(controller.signal)
                .then((ip) => setIpAddress(ip))
                .catch((error) => {
                    if (error instanceof Error && error.name === 'AbortError') {
                        return;
                    }

                    console.error('Error fetching IP address: ', error);
                });

            const agent = navigator.userAgent.toLowerCase();

            setBrowser(browserName);

            osList.some((os) => {
                if (os.regex.test(agent)) {
                    setOperatingSystem(os.name);
                    return true;
                }
                return false;
            });
        });

        return () => controller.abort();
    }, []);

    return (
        <Card aria-busy={isPending} data-testid="system-info-card">
            <CardHeader>
                <CardTitle data-testid="system-info-title" className="font-serif text-lg">
                    System Info
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-md border p-3">
                        <h3 className="text-xs font-medium text-muted-foreground">IP Address</h3>
                        <div className="mt-1 text-sm">
                            {isPending && ipAddress === null ? (
                                <Skeleton className="h-5 w-28" />
                            ) : (
                                <span data-testid="system-info-ip">{ipAddress}</span>
                            )}
                        </div>
                    </div>
                    <div className="rounded-md border p-3">
                        <h3 className="text-xs font-medium text-muted-foreground">Browser</h3>
                        <div className="mt-1 text-sm">
                            {isPending && browser === null ? (
                                <Skeleton className="h-5 w-40" />
                            ) : (
                                <span data-testid="system-info-browser">{browser}</span>
                            )}
                        </div>
                    </div>
                    <div className="rounded-md border p-3">
                        <h3 className="text-xs font-medium text-muted-foreground">Operating System</h3>
                        <div className="mt-1 text-sm">
                            {isPending && operatingSystem === null ? (
                                <Skeleton className="h-5 w-36" />
                            ) : (
                                <span data-testid="system-info-os">{operatingSystem}</span>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
