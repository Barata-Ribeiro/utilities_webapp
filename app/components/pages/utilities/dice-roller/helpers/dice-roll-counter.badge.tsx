import { cn } from '~/lib/utils';

export default function DiceRollCounterBadge({ count }: Readonly<{ count: number }>) {
    const badgeClasses = cn(
        'absolute -top-2 -right-2 z-1',
        'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
        'bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
        'rounded-full px-1',
    );

    return <span className={badgeClasses}>{count}</span>;
}
