import type { Metadata } from "next"
import { site } from "@/config/site"
import { isValidLocale, type Locale } from "@/config/i18n"
import HeroSection from "@/components/home/HeroSection"
import TrustBar from "@/components/home/TrustBar"
import ProductsSection from "@/components/home/ProductsSection"
import SectorsSection from "@/components/home/SectorsSection"
import AboutTeaser from "@/components/home/AboutTeaser"
import HowItWorks from "@/components/home/HowItWorks"
import CtaBanner from "@/components/home/CtaBanner"
import ContactTeaser from "@/components/home/ContactTeaser"

export const metadata: Metadata = {
  title: { absolute: site.name },
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : "tr"

  return (
    <>
      <HeroSection locale={safeLocale} />
      <TrustBar />
      <ProductsSection locale={safeLocale} />
      <SectorsSection />
      <AboutTeaser locale={safeLocale} />
      <HowItWorks />
      <CtaBanner locale={safeLocale} />
      <ContactTeaser />
    </>
  )
}
