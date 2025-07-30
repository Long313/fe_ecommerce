'use client';
import { useStore } from '@/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from "next-auth/react";
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import Header from '../Header/page';
import SearchBar from '../SearchBar/page';
const Footer = dynamic(() => import('@/components/Footer/page'), { ssr: false });

export default function LayoutWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [queryClient] = useState(() => new QueryClient());
    const locale = pathname?.split('/')[1];
    const isHome = pathname === `/${locale}` || pathname.startsWith(`/${locale}/user`) || pathname.startsWith(`/${locale}/products`);
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
