'use client'
import useTranslation from "@/hooks/useTranslation";

export default function Home() {
    const { t } = useTranslation()
  return (
    <div>{t('homeTitle')}</div>
  );
}
