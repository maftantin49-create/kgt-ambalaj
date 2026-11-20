import type { Metadata } from "next"
import { isValidLocale, type Locale } from "@/config/i18n"
import { buildAlternates } from "@/lib/seo"
import ScrollMachineHero from "@/components/home/ScrollMachineHero"
import MachineBannerSlitting from "@/components/home/MachineBannerSlitting"
import TrustBar from "@/components/home/TrustBar"
import ProductsSection from "@/components/home/ProductsSection"
import AnimatedMachineShowcase from "@/components/home/AnimatedMachineShowcase"
import SectorsSection from "@/components/home/SectorsSection"
import AboutTeaser from "@/components/home/AboutTeaser"
import HowItWorks from "@/components/home/HowItWorks"
import CtaBanner from "@/components/home/CtaBanner"
import ContactTeaser from "@/components/home/ContactTeaser"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : "tr"
  const isTr = safeLocale === "tr"
  return {
    title: {
      absolute: isTr
        ? "KGT Ambalaj | Streç Film ve Alüminyum Folyo Sarma Makineleri"
        : "KGT Ambalaj | Stretch Film and Aluminium Foil Rewinding Machines",
    },
    description: isTr
      ? "KGT Ambalaj, endüstriyel streç film sarma, alüminyum folyo sarma ve kağıt dilimleme makineleri tasarlar ve üretir."
      : "KGT Ambalaj designs and manufactures industrial stretch film rewinding, aluminium foil rewinding, and paper slitting machines.",
    alternates: buildAlternates(safeLocale, "/tr", "/en"),
  }
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
      <ScrollMachineHero locale={safeLocale} />
      <MachineBannerSlitting locale={safeLocale} />
      <TrustBar locale={safeLocale} />
      <ProductsSection locale={safeLocale} />
      <AnimatedMachineShowcase locale={safeLocale} />
      <SectorsSection locale={safeLocale} />
      <AboutTeaser locale={safeLocale} />
      <HowItWorks locale={safeLocale} />
      <CtaBanner locale={safeLocale} />
      <ContactTeaser locale={safeLocale} />
    </>
  )
}
