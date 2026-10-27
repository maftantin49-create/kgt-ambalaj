"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getAlternatePath, type Locale } from "@/config/i18n"

export default function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const alternatePath = getAlternatePath(pathname)
  const altLocale: Locale = locale === "tr" ? "en" : "tr"

  return (
    <div
      className="flex items-center gap-0.5 text-[12px] font-bold tracking-[0.08em]"
      aria-label="Dil seçimi"
    >
      <span style={{ color: "var(--color-text)" }}>
        {locale.toUpperCase()}
      </span>
      <span className="mx-1 opacity-30" aria-hidden="true">|</span>
      <Link
        href={alternatePath}
        aria-label={`Switch to ${altLocale === "en" ? "English" : "Türkçe"}`}
        className="transition-opacity hover:opacity-75"
        style={{ color: "var(--color-muted)" }}
      >
        {altLocale.toUpperCase()}
      </Link>
    </div>
  )
}
