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
    // const { setAccessToken } = useStore();
    // useEffect(() => {
    //     const getCookie = (name: string): string | null => {
    //         if (typeof document === 'undefined') return null;
    //         const value = `; ${document.cookie}`;
    //         const parts = value.split(`; ${name}=`);
    //         if (parts.length === 2) {
    //             const tokenPart = parts.pop();
    //             if (tokenPart) {
    //                 return tokenPart.split(';').shift() ?? null;
    //             }
    //         }
    //         return null;
    //     };

    //     const accessToken = getCookie('access_token');
    //     if (accessToken) {
    //         console.log('AccessToken', accessToken);
    //         setAccessToken(accessToken);
    //     }
    // }, [setAccessToken]);
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
