// File: app/[locale]/layout.tsx

import './globals.css';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import type { ReactNode } from 'react';

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body>
        <header className="p-4 border-b mb-6">
          <LanguageSwitcher currentLocale={params.locale} />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
