import { memo } from 'react';
import { cn } from '~/lib/utils';

type Props = {
    sides: number;
    isThreeDigits: boolean;
};

const DiceText = memo(({ sides, isThreeDigits }: Readonly<Props>) => {
    return (
        <span
            id={`die-${sides}-number`}
            aria-hidden
            className={cn(
                isThreeDigits ? 'text-3xl' : 'text-4xl',
                'pointer-events-none absolute inset-0 flex items-center justify-center bg-linear-to-b/oklch from-orange-50 to-orange-200 bg-clip-text font-heading leading-none font-bold text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] select-none',
            )}
        >
            {sides}
        </span>
    );
});

export default DiceText;
