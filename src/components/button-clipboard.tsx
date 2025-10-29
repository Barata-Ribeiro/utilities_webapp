'use client';

import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils';
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react';

interface ButtonClipboardProps {
    content: string | null;
    variant: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined;
    size: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
}

export default function ButtonClipboard({
    content,
    variant = 'outline',
    size = 'default',
}: Readonly<ButtonClipboardProps>) {
    const [copy, isCopied] = useCopyToClipboard();

    const extraStyles = cn`relative overflow-hidden`;

    return (
        <Button
            type="button"
            className={cn(isCopied && 'pointer-events-none', extraStyles)}
            size={size}
            variant={variant}
            disabled={!content}
            onClick={() => content && copy(content)}
            aria-label={isCopied ? 'Copied to clipboard' : 'Copy output to clipboard'}
        >
            <span
                aria-hidden={isCopied}
                className={cn(
                    'inline-flex translate-y-0 items-center-safe gap-x-2 opacity-100 transition',
                    isCopied && '-translate-y-[150%] opacity-0',
                )}
            >
                <ClipboardIcon aria-hidden size={16} />{' '}
                {size === 'icon' ? <span className="sr-only">Copy</span> : 'Copy'}
            </span>

            <span
                aria-hidden={!isCopied}
                className={cn(
                    'absolute inline-flex translate-y-[150%] items-center-safe gap-x-2 opacity-0 transition',
                    isCopied && 'translate-y-0 opacity-100',
                )}
            >
                <ClipboardCheckIcon aria-hidden size={16} />{' '}
                {size === 'icon' ? <span className="sr-only">Copied</span> : 'Copied'}
            </span>

            <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                {isCopied ? 'Copied' : 'Copy'}
            </span>
        </Button>
    );
}
