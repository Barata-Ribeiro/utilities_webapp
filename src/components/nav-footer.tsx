'use client';

import { SidebarMenu, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { CodeXmlIcon } from 'lucide-react';
import Link from 'next/link';
import { Activity } from 'react';

export function NavFooter() {
    const { state, isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem className="mx-auto grid">
                <Activity mode={state === 'expanded' || isMobile ? 'visible' : 'hidden'}>
                    <span aria-hidden className="text-center">
                        &copy; {new Date().getFullYear()}
                    </span>
                </Activity>

                <Link
                    href="https://barataribeiro.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isMobile && state === 'collapsed' ? -1 : 0}
                    title="barata </> ribeiro"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    aria-label="Visit my portfolio website"
                >
                    {state === 'collapsed' && !isMobile ? (
                        <CodeXmlIcon aria-hidden />
                    ) : (
                        <span className="inline-flex items-center gap-x-1 font-medium">
                            barata<span>&lt;/&gt;</span>ribeiro
                        </span>
                    )}
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
