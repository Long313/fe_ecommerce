// app/[locale]/layout.tsx
import './globals.css';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params;

  return (
    <html lang={resolvedParams.locale}>
      <body>
        <header className="p-4 border-b mb-6">
          <LanguageSwitcher currentLocale={resolvedParams.locale} />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
