'use client';

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

interface Crumb {
    href?: string;
    label: string;
}

function formatLabel(segment: string) {
    try {
        return decodeURIComponent(segment)
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());
    } catch {
        return segment;
    }
}

export default function Breadcrumbs({ items }: Readonly<{ items?: Crumb[] }>) {
    const pathname = usePathname();

    let crumbs: Crumb[] = items ?? [];

    if (!items) {
        const segments = (pathname ?? '/').split('/').filter(Boolean);

        if (segments.length === 0) {
            crumbs = [{ href: '/', label: 'Home' }];
        } else {
            crumbs = [{ href: '/', label: 'Home' }];
            let path = '';
            for (const seg of segments) {
                path += '/' + seg;
                crumbs.push({ href: path, label: formatLabel(seg) });
            }
        }
    }

    const maxVisible = 4;
    const showEllipsis = crumbs.length > maxVisible;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {showEllipsis ? (
                    <>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={crumbs[0].href ?? '#'}>{crumbs[0].label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />

                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbEllipsis />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />

                        {crumbs.slice(-2).map((c, i) => {
                            const isLast = i === 1;
                            return (
                                <Fragment key={c.label + i}>
                                    <BreadcrumbItem className={isLast ? '' : 'hidden md:block'}>
                                        {isLast ? (
                                            <BreadcrumbPage>{c.label}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={c.href ?? '#'}>{c.label}</BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                                </Fragment>
                            );
                        })}
                    </>
                ) : (
                    crumbs.map((c, idx) => {
                        const isLast = idx === crumbs.length - 1;
                        return (
                            <Fragment key={c.label + idx}>
                                <BreadcrumbItem className={isLast ? '' : 'hidden md:block'}>
                                    {isLast ? (
                                        <BreadcrumbPage>{c.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={c.href ?? '#'}>{c.label}</BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                            </Fragment>
                        );
                    })
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
