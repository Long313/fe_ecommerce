// app/[locale]/layout.tsx
import LayoutWrapper from '@/components/LayoutWrapper';
import { ReactNode } from 'react';
import './globals.css'
export default function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <main className="min-h-screen flex flex-col text-[var(--text-color-main)] w-full max-w-[var(--width-screen)] h-screen mx-auto">
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </main>
      </body>
    </html>
  );
}
