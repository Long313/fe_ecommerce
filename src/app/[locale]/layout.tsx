import './globals.css';
import LanguageSwitcher from '../../components/LanguageSwitcher';

// type Props = {
//   children: ReactNode;
//   params: { locale: string };
// };

export default function LocaleLayout({
  children,
  params,
} : any) {
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
