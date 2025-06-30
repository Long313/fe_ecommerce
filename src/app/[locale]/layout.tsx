'use client';
import './globals.css';
// import LanguageSwitcher from '../../components/LanguageSwitcher/page';
import { ReactNode } from 'react';
// import { useStore } from '@/store/store';
// import DayNightToggler from '@/compoOnents/DayNightToggler/page';
// import { use } from 'react'; 

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
        <main className="text-[var(--text-color-main)] w-full h-screen">{children}</main>
      </body>
    </html>
  );
}
