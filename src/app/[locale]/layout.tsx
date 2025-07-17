'use client';
import './globals.css';
// import LanguageSwitcher from '../../components/LanguageSwitcher/page';
import { ReactNode, useState } from 'react';
// import { useStore } from '@/store/store';
// import DayNightToggler from '@/compoOnents/DayNightToggler/page';
// import { use } from 'react'; 
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/Header/page';
import { usePathname } from 'next/navigation';
type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default function LocaleLayout({ children, params }: Props) { // { children, params }: Props
  // const resolvedParams = use(params); 
  // const mode = useStore((state) => state.mode);
  console.log(params)
  // useEffect(() => {
  //   console.log("mode:", mode);
  // }, [mode]);
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const locale = pathname?.split('/')[1];

  const isHome = pathname === `/${locale}`;
  return (
    // <html lang={resolvedParams.locale}>
    //   <body className={mode === true ? 'bg-[var(--dark)] text-[var(--light)]' : ''}>
    //     <LanguageSwitcher currentLocale={resolvedParams.locale} />
    //     <DayNightToggler />
    //     <main>{children}</main>
    //   </body>
    // </html>
    <html>
      <body>
        <main className="text-[var(--text-color-main)] w-full max-w-[var(--width-screen)] h-screen mx-auto">
          <SessionProvider><QueryClientProvider client={queryClient}>
            {isHome && <Header />}
            {children}
          </QueryClientProvider></SessionProvider>
        </main>
      </body>
    </html>
  );
}
