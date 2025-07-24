'use client';

import { EN, ENGLISH, locales, VIETNAMESE } from '@/constants';
import { Select } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiGlobe } from 'react-icons/ci';

const { Option } = Select;

interface LanguageSwitcherProps {
  currentLocale?: string;
  color?: string;
}

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { currentLocale, color } = props;
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !pathname) return null;

  const currentPathLocale = pathname.split('/')[1];
  const pathWithoutLocale = pathname.replace(/^\/(vi|en)/, '');

  const handleChange = (value: string) => {
    const newPath = `/${value}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="p-[4px] pl-[8px] bg-[#fff] border border-[#C4C4C4] flex items-center text-[14px] relative z-10 rounded-[4px]">
      <CiGlobe size={16} color={color ? '#fff' : '#000'} />
      <div className="min-w-[120px]">
        <Select
          value={currentPathLocale}
          onChange={handleChange}
          size="small"
          className="w-full h-[36px] text-center"
          variant="borderless"
        >
          {locales.map((locale) => {
            const label = locale === EN ? ENGLISH : VIETNAMESE;
            return (
              <Option key={locale} value={locale} className="w-full">
                {label}
              </Option>
            );
          })}
        </Select>
      </div>
    </div>
  );
}
