import { useState } from 'react';
import { useEventListener } from '~/hooks/use-event-listener';

export default function AppGlobalEvents() {
    const [lastTouchEnd, setLastTouchEnd] = useState<number>(0);
    useEventListener('touchend', (event: Event) => {
        const now = Date.now();

        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }

        setLastTouchEnd(now);
    });

    return null;
}
