'use client';
import './globals.css';
import LanguageSwitcher from '../../components/LanguageSwitcher/page';
import { ReactNode, useEffect } from 'react';
import { useStore } from '@/store/store';
import DayNightToggler from '@/components/DayNightToggler/page';
import { use } from 'react'; 

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>; 
};

export default function LocaleLayout({ children, params }: Props) {
  const resolvedParams = use(params); 
  const mode = useStore((state) => state.mode);

  useEffect(() => {
    console.log("mode:", mode);
  }, [mode]);

  return (
    <html lang={resolvedParams.locale}>
      <body className={mode === true ? 'bg-[var(--dark)] text-[var(--light)]' : ''}>
        <LanguageSwitcher currentLocale={resolvedParams.locale} />
        <DayNightToggler />
        <main>{children}</main>
      </body>
    </html>
  );
}
