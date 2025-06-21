'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const locales = ['vi', 'en']

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname()

  return (
    <div className="flex gap-4">
      {locales.map((locale) => {
        const newPath = pathname.replace(/^\/(vi|en)/, `/${locale}`)
        return (
          <Link
            key={locale}
            href={newPath}
            className={locale === currentLocale ? 'font-bold underline' : ''}
          >
            {locale.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
