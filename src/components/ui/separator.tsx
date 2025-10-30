'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';
import { type ComponentProps } from 'react';

function Separator({
    className,
    orientation = 'horizontal',
    decorative = true,
    ...props
}: Readonly<ComponentProps<typeof SeparatorPrimitive.Root>>) {
    return (
        <SeparatorPrimitive.Root
            data-slot="separator"
            decorative={decorative}
            orientation={orientation}
            className={cn(
                'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
                className,
            )}
            {...props}
        />
    );
}

export { Separator };
