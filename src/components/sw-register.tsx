'use client';

import { useEffect } from 'react';

export function SwRegister(): null {
    useEffect(() => {
        let mounted = true;
        let retryRegistered = false;

        function handleNewWorkerStateChange(event: Event) {
            const sw = event.target as ServiceWorker | null;
            const state = sw?.state;
            if (state === 'installed') {
                navigator.serviceWorker.getRegistration('/serwist/sw.js').then((r) => {
                    if (r?.waiting) r.waiting.postMessage({ type: 'SKIP_WAITING' });
                });
            }

            if (state === 'redundant' && !retryRegistered) {
                retryRegistered = true;
                setTimeout(() => {
                    if (mounted) {
                        navigator.serviceWorker
                            .register('/serwist/sw.js', { scope: '/' })
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
                const resp = await fetch('/serwist/sw.js', { method: 'HEAD' });
                if (!resp.ok) {
                    console.info('[SW] /serwist/sw.js not found (status ' + resp.status + '), skipping registration');
                    return;
                }
            } catch (err) {
                console.info('[SW] could not fetch /serwist/sw.js, skipping registration: ', err);
                return;
            }

            try {
                const reg = await navigator.serviceWorker.register('/serwist/sw.js', { scope: '/' });

                if (!mounted) return;

                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    if (!newWorker) return;
                    newWorker.addEventListener('statechange', handleNewWorkerStateChange);
                });

                if (reg.installing) reg.installing.addEventListener('statechange', handleNewWorkerStateChange);

                reg.update().catch((e) => console.error('[SW] update check failed: ', e));

                const ready = await navigator.serviceWorker.ready;

                console.log('[SW] ready: ', ready);
            } catch (err) {
                console.error('[SW] registration failed: ', err);
            }
        }

        void tryRegister();

        return () => {
            mounted = false;
        };
    }, []);

    return null;
}
