import { ArrowRight } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '~/components/ui/button';
import { ButtonGroup } from '~/components/ui/button-group';

export default function PWABadge() {
    const period = 60 * 60 * 1000; // 1 hour

    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
            if (period <= 0) return;
            if (r?.active?.state === 'activated') {
                registerPeriodicSync(period, swUrl, r);
            } else if (r?.installing) {
                r.installing.addEventListener('statechange', (e) => {
                    const sw = e.target as ServiceWorker;
                    if (sw.state === 'activated') registerPeriodicSync(period, swUrl, r);
                });
            }
        },
    });

    function close() {
        setOfflineReady(false);
        setNeedRefresh(false);
    }

    return (
        <div className="relative container mx-auto py-24 lg:py-32">
            {(offlineReady || needRefresh) && (
                <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-primary px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4">
                    <p className="text-sm leading-6 text-primary-foreground">
                        <strong className="font-semibold">
                            {needRefresh ? 'New content available!' : 'App ready to work offline!'}
                        </strong>
                        <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        {offlineReady ? (
                            <span id="toast-message">
                                App is ready to work offline. Close this notification to keep using the app.
                            </span>
                        ) : (
                            <span id="toast-message">New content available, click on reload button to update.</span>
                        )}
                    </p>
                    <ButtonGroup>
                        {needRefresh && (
                            <Button size="sm" variant="secondary" onClick={() => updateServiceWorker(true)}>
                                Reload <ArrowRight aria-hidden className="size-4" />
                            </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={close}>
                            Close
                        </Button>
                    </ButtonGroup>
                </div>
            )}
        </div>
    );
}

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(period: number, swUrl: string, r: ServiceWorkerRegistration) {
    if (period <= 0) return;

    setInterval(async () => {
        if ('onLine' in navigator && !navigator.onLine) return;

        const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
                cache: 'no-store',
                'cache-control': 'no-cache',
            },
        });

        if (resp?.status === 200) await r.update();
    }, period);
}
