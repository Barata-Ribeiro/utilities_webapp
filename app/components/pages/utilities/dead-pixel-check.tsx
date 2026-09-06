import { MaximizeIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/ui/button';

const COLORS = ['#FFFFFF', '#000000', '#ff0000', '#00ff00', '#0000ff'] as const;

export default function DeadPixelCheck() {
    const startRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const screenRef = useRef<HTMLButtonElement>(null);
    const [colorIndex, setColorIndex] = useState(0);

    function exitFullscreen() {
        if (document.fullscreenElement === screenRef.current && document.fullscreenElement) {
            void document.exitFullscreen().catch(() => {
                // The browser may already be leaving full-screen mode after Esc.
            });
        }
    }

    function stopTest() {
        exitFullscreen();
        dialogRef.current?.close();
    }

    useEffect(() => {
        const dialog = dialogRef.current;
        const screen = screenRef.current;
        let wasFullscreen = false;
        function onFullscreenChange() {
            if (document.fullscreenElement === screen) {
                wasFullscreen = true;
            } else if (wasFullscreen) {
                wasFullscreen = false;
                dialog?.close();
                // Exiting native fullscreen can reset focus after the modal has already closed.
                startRef.current?.focus();
            }
        }

        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenChange);
            if (screen && document.fullscreenElement === screen) {
                void document.exitFullscreen().catch(() => {});
            }
            dialog?.close();
        };
    }, []);

    async function startTest() {
        const dialog = dialogRef.current;
        const screen = screenRef.current;
        if (!dialog || !screen || dialog.open) return;

        setColorIndex(0);
        // A native modal keeps focus inside the test and covers the app even if fullscreen is unavailable.
        dialog.showModal();
        screen.focus();
        try {
            // Request the inner surface: browsers do not allow fullscreen on a dialog itself.
            await screen.requestFullscreen({ navigationUI: 'hide' });
            if (!dialog.open && document.fullscreenElement === screen) exitFullscreen();
        } catch {
            // Keep the viewport-filling test open so the user can use F11 as instructed.
        }
    }

    return (
        <>
            <Button ref={startRef} type="button" onClick={startTest}>
                <MaximizeIcon data-icon="inline-start" aria-hidden />
                Start test
            </Button>
            <dialog
                ref={dialogRef}
                className="dead-pixel-test"
                aria-label="Dead-pixel check"
                onCancel={(event) => {
                    event.preventDefault();
                    stopTest();
                }}
                onClose={exitFullscreen}
            >
                <button
                    ref={screenRef}
                    type="button"
                    className="dead-pixel-test-surface"
                    style={{ backgroundColor: COLORS[colorIndex] }}
                    aria-label="Next test color. Press Escape to stop the test."
                    onClick={() => setColorIndex((index) => (index + 1) % COLORS.length)}
                    onContextMenu={(event) => event.preventDefault()}
                    onKeyDown={(event) => {
                        if (event.code === 'Space') {
                            event.preventDefault();
                            if (!event.repeat) setColorIndex((index) => (index + 1) % COLORS.length);
                        } else if (event.key === 'Escape') {
                            event.preventDefault();
                            stopTest();
                        }
                    }}
                />
            </dialog>
        </>
    );
}
