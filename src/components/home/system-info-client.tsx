'use client';

import getIp from '@/actions/get-ip';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState, useTransition } from 'react';

export default function SystemInfoClient() {
    const [isPending, startTransition] = useTransition();
    const [ipAddress, setIpAddress] = useState<string | null>(null);
    const [browser, setBrowser] = useState<string | null>(null);
    const [operatingSystem, setOperatingSystem] = useState<string | null>(null);

    useEffect(() => {
        const browserList = [
            { name: 'Microsoft Edge (Chromium Based)', regex: /edg\//i },
            { name: 'Microsoft Edge', regex: /edge/i },
            { name: 'Opera', regex: /opr/i, condition: () => 'opr' in window },
            { name: 'Chrome', regex: /chrome/i, condition: () => 'chrome' in window },
            { name: 'MS IE', regex: /trident/i },
            { name: 'Mozilla Firefox', regex: /firefox/i },
            { name: 'Safari', regex: /safari/i },
        ];

        const osList = [
            { name: 'Windows NT', regex: /Windows NT/i },
            { name: 'Mac', regex: /Mac OS X/i },
            { name: 'Linux', regex: /Linux/i },
            { name: 'Android', regex: /Android/i },
            { name: 'iOS', regex: /(iPhone|iPad|iPod)/i },
            { name: 'UNIX', regex: /X11/i },
        ];

        startTransition(() => {
            getIp()
                .then((ip) => setIpAddress(ip))
                .catch((error) => console.error('Error fetching IP address: ', error));

            const agent = navigator.userAgent.toLowerCase();

            browserList.some((browser) => {
                if (browser.regex.test(agent) && (!browser.condition || browser.condition())) {
                    setBrowser(browser.name);
                    return true;
                }
                return false;
            });

            osList.some((os) => {
                if (os.regex.test(agent)) {
                    setOperatingSystem(os.name);
                    return true;
                }
                return false;
            });
        });
    }, []);

    return (
        <div aria-busy={isPending} className="rounded-md bg-card p-6 shadow">
            <h2 className="font-serif text-lg">System Info</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-md border p-3">
                    <h3 className="text-xs font-medium text-muted-foreground">IP Address</h3>
                    <div className="mt-1 text-sm">
                        {isPending && ipAddress === null ? <Skeleton className="h-5 w-28" /> : <span>{ipAddress}</span>}
                    </div>
                </div>
                <div className="rounded-md border p-3">
                    <h3 className="text-xs font-medium text-muted-foreground">Browser</h3>
                    <div className="mt-1 text-sm">
                        {isPending && browser === null ? <Skeleton className="h-5 w-40" /> : <span>{browser}</span>}
                    </div>
                </div>
                <div className="rounded-md border p-3">
                    <h3 className="text-xs font-medium text-muted-foreground">Operating System</h3>
                    <div className="mt-1 text-sm">
                        {isPending && operatingSystem === null ? (
                            <Skeleton className="h-5 w-36" />
                        ) : (
                            <span>{operatingSystem}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
