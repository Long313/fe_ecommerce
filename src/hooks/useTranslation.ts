'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function useTranslation() {
  const { locale } = useParams() as { locale: string }
  const [t, setT] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const res = await fetch(`/locales/${locale}/common.json`)
        const json = await res.json()
        setT(json)
      } catch (err) {
        console.error('Translation load error:', err)
      }
    }

    fetchTranslation()
  }, [locale])

  return {
    t: (key: string) => t[key] || key,
    locale,
  }
}
