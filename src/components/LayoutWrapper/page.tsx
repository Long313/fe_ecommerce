'use client';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '../Header/page';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/store';
import SearchBar from '../SearchBar/page';
const Footer = dynamic(() => import('@/components/Footer/page'), { ssr: false });

export default function LayoutWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [queryClient] = useState(() => new QueryClient());
    const locale = pathname?.split('/')[1];
    const isHome = pathname === `/${locale}` || pathname === `/${locale}/products`;
    const isSearch = useStore((state) => state.search);
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {isHome && <Header />}
                {isHome && isSearch && <SearchBar />}
                {children}
                {isHome && <Footer />}
            </QueryClientProvider>
        </SessionProvider>
    );
}
