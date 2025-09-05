"use client"

import { useEffect } from "react"

export function SwRegister(): null {
    useEffect(() => {
        let mounted = true
        let retryRegistered = false

        function handleNewWorkerStateChange(event: Event) {
            const sw = event.target as ServiceWorker | null
            const state = sw?.state
            if (state === "installed") {
                navigator.serviceWorker.getRegistration("/sw.js").then(r => {
                    if (r?.waiting) r.waiting.postMessage({ type: "SKIP_WAITING" })
                })
            }

            if (state === "redundant" && !retryRegistered) {
                retryRegistered = true
                setTimeout(() => {
                    if (mounted) {
                        navigator.serviceWorker
                            .register("/sw.js", { scope: "/" })
                            .catch(e => console.error("[SW] retry register failed: ", e))
                    }
                }, 200)
            }
        }

        async function register() {
            try {
                const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" })

                if (!mounted) return

                reg.addEventListener("updatefound", () => {
                    const newWorker = reg.installing
                    if (!newWorker) return
                    newWorker.addEventListener("statechange", handleNewWorkerStateChange)
                })

                // If there's an installing worker already (first install), attach listener
                if (reg.installing) reg.installing.addEventListener("statechange", handleNewWorkerStateChange)

                // Force an update attempt (useful after you add missing files)
                reg.update().catch(e => console.error("[SW] update check failed: ", e))

                const ready = await navigator.serviceWorker.ready

                console.log("[SW] ready: ", ready)
            } catch (err) {
                console.error("[SW] registration failed: ", err)
            }
        }

        void register()

        return () => {
            mounted = false
        }
    }, [])

    return null
}
