'use client';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '../Header/page';
import dynamic from 'next/dynamic';
const Footer = dynamic(() => import('@/components/Footer/page'), { ssr: false });

export default function LayoutWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [queryClient] = useState(() => new QueryClient());
    const locale = pathname?.split('/')[1];
    const isHome = pathname === `/${locale}` || pathname === `/${locale}/products`;
    console.log("isHome", isHome);
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {isHome && <Header />}
                {children}
                {isHome && <Footer />}
            </QueryClientProvider>
        </SessionProvider>
    );
}
