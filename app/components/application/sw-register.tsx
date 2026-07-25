import { useIsMounted } from '~/hooks/use-is-mounted';
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect';

const SW_URL = '/sw.js';

export function SwRegister(): null {
    const isMounted = useIsMounted();

    useIsomorphicLayoutEffect(() => {
        let retryRegistered = false;

        function handleNewWorkerStateChange(event: Event) {
            const sw = event.target as ServiceWorker | null;
            const state = sw?.state;
            if (state === 'installed') {
                navigator.serviceWorker.getRegistration('/').then((r) => {
                    if (r?.waiting) r.waiting.postMessage({ type: 'SKIP_WAITING' });
                });
            }

            if (state === 'redundant' && !retryRegistered) {
                retryRegistered = true;
                setTimeout(() => {
                    if (isMounted()) {
                        navigator.serviceWorker
                            .register(SW_URL, { scope: '/' })
                            .catch((e) => console.error('[SW] retry register failed: ', e));
                    }
                }, 200);
            }
        }

        async function tryRegister() {
            if (
                typeof navigator === 'undefined' ||
                !('serviceWorker' in navigator) ||
                typeof navigator.serviceWorker.register !== 'function'
            ) {
                console.info('[SW] serviceWorker API not available; skipping registration');
                return;
            }

            const hostname = globalThis.window.location.hostname;
            const isLocalhost =
                hostname === 'localhost' ||
                hostname === '127.0.0.1' ||
                hostname === '::1' ||
                hostname.startsWith('192.');
            if (globalThis.window.location.protocol !== 'https:' && !isLocalhost) {
                console.info('[SW] insecure origin and not localhost; skipping service worker registration');
                return;
            }

            try {
                const resp = await fetch(SW_URL, { method: 'HEAD' });
                if (!resp.ok) {
                    console.info('[SW] ' + SW_URL + ' not found (status ' + resp.status + '), skipping registration');
                    return;
                }
            } catch (err) {
                console.info('[SW] could not fetch ' + SW_URL + ', skipping registration: ', err);
                return;
            }

            try {
                const reg = await navigator.serviceWorker.register(SW_URL, { scope: '/' });

                if (!isMounted()) return;

                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    if (!newWorker) return;
                    newWorker.addEventListener('statechange', handleNewWorkerStateChange);
                });

                if (reg.installing) reg.installing.addEventListener('statechange', handleNewWorkerStateChange);

                reg.update().catch((e) => console.error('[SW] update check failed: ', e));

                await navigator.serviceWorker.ready;

                console.log('[SW] service worker registered with scope: ', reg.scope);
            } catch (err) {
                console.error('[SW] registration failed: ', err);
            }
        }

        void tryRegister();

        return () => {
            navigator.serviceWorker.getRegistration(SW_URL).then((reg) => {
                if (reg?.installing) reg.installing.removeEventListener('statechange', handleNewWorkerStateChange);
                if (reg?.waiting) reg.waiting.removeEventListener('statechange', handleNewWorkerStateChange);
                if (reg?.active) reg.active.removeEventListener('statechange', handleNewWorkerStateChange);
            });
        };
    }, [isMounted]);

    return null;
}
