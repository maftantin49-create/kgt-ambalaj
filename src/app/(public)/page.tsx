import type { Metadata } from "next"
import { site } from "@/config/site"
import HeroSection from "@/components/home/HeroSection"
import TrustBar from "@/components/home/TrustBar"
import ProductsSection from "@/components/home/ProductsSection"
import SectorsSection from "@/components/home/SectorsSection"
import AboutTeaser from "@/components/home/AboutTeaser"
import HowItWorks from "@/components/home/HowItWorks"
import CtaBanner from "@/components/home/CtaBanner"
import ContactTeaser from "@/components/home/ContactTeaser"

export const metadata: Metadata = {
  // { absolute } template'i bypass eder — "KGT Ambalaj — KGT Ambalaj" yazmaz.
  title: { absolute: site.name },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductsSection />
      <SectorsSection />
      <AboutTeaser />
      <HowItWorks />
      <CtaBanner />
      <ContactTeaser />
    </>
  )
}
