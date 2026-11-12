import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import PageTransition from "@/components/layout/PageTransition"
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

  const skipLabel = safeLocale === "tr" ? "Ana içeriğe geç" : "Skip to main content"

  return (
    <>
      <a href="#main-content" className="skip-to-main">{skipLabel}</a>
      <Header locale={safeLocale} />
      <main id="main-content" className="flex-1 overflow-x-hidden">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer locale={safeLocale} />
    </>
  )
}
