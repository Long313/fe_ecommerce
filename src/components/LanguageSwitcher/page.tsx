'use client'

import { usePathname, useRouter } from 'next/navigation'
import { EN, VIETNAMESE, ENGLISH, locales } from '@/constants';
import Image from 'next/image';
import globe_icon from '../../images/globe_icon.svg'

export default function LanguageSwitcher({ currentLocale }: { currentLocale?: string }) {
  const router = useRouter();
  const pathname = usePathname();
 
  const handleRouter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPath = event.target.value;
    router.push(selectedPath);
  };

  return (
    <div className='flex items-center text-[14px]'>
      <Image src={globe_icon} alt="globe_icon" width={16} height={16}/>
      <select onChange={handleRouter} value={pathname}>
        {locales.map((locale) => {
          const newPath = pathname.replace(/^\/(vi|en)/, `/${locale}`);
          const label = locale === EN ? ENGLISH : VIETNAMESE;
          return (
            <option key={locale} value={newPath}>
              {label}           
            </option>
          );
        })}
      </select>
    </div>
  );
}
