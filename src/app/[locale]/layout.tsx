'use client';
import './globals.css';
import LanguageSwitcher from '../../components/LanguageSwitcher/page';
import { ReactNode, useEffect } from 'react';
import { useStore } from '@/store/store';
import DayNightToggler from '@/components/DayNightToggler/page';
import { use } from 'react'; // import use to unwrap promises

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>; // params is now a Promise
};

export default function LocaleLayout({ children, params }: Props) {
  const resolvedParams = use(params); // unwrap params using use()
  const mode = useStore((state) => state.mode);

  useEffect(() => {
    console.log("mode:", mode);
  }, [mode]);

  return (
    <html lang={resolvedParams.locale}>
      <body className={mode === true ? 'bg-[var(--dark)] text-[var(--light)]' : ''}>
      {/* <body className="bg-dark"> */}
        <LanguageSwitcher currentLocale={resolvedParams.locale} />
        <DayNightToggler />
        <main>{children}</main>
      </body>
    </html>
  );
}
