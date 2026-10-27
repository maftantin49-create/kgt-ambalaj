import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { isValidLocale, type Locale } from "@/config/i18n"

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : "tr"

  return (
    <>
      <Header locale={safeLocale} />
      <main className="flex-1">{children}</main>
      <Footer locale={safeLocale} />
    </>
  )
}
