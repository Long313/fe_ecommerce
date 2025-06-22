'use client'

import Link from 'next/link'
import useTranslation from '../../../hooks/useTranslation';
import { useParams } from 'next/navigation'

export default function NotFound() {
  const { t } = useTranslation()
  const { locale } = useParams() as { locale: string }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl mb-6">{t('notFoundMessage')}</p>
      <Link href={`/${locale}`} className="text-blue-600 underline">
        {t('goHome')}
      </Link>
    </div>
  )
}
