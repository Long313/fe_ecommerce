'use client';

import { EN, ENGLISH, locales, VIETNAMESE } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { CiGlobe } from "react-icons/ci";
import { useEffect, useState } from 'react';

export default function LanguageSwitcher({ currentLocale, color }: { currentLocale?: string, color?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true); // Đảm bảo render chỉ sau khi component mount (client-side)
  }, []);

  if (!mounted || !pathname) return null; // ⚠️ Không render gì trong lần render đầu SSR

  const currentPathLocale = pathname.split('/')[1]; // "vi" | "en"
  const pathWithoutLocale = pathname.replace(/^\/(vi|en)/, '');

  const handleRouter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    const newPath = `/${selectedLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className='flex items-center text-[14px]'>
      {color ? <CiGlobe size={16} color="#fff" /> : <CiGlobe size={16} />}
      <select onChange={handleRouter} value={currentPathLocale} className={``}>
        {locales.map((locale) => {
          const label = locale === EN ? ENGLISH : VIETNAMESE;
          return (
            <option key={locale} value={locale} className={`text-center ${color ? "text-[#373737]" : ""}`}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
