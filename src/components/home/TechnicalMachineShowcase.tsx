import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { localePaths, type Locale } from "@/config/i18n"

export default function TechnicalMachineShowcase({ locale }: { locale: Locale }) {
  const isTr = locale === "tr"
  const p = localePaths[locale]

  const eyebrow = isTr ? "TEKNİK BAKIŞ" : "TECHNICAL OVERVIEW"
  const heading = isTr ? "Makineyi Yakından İnceleyin" : "Take a Closer Look at the Machine"
  const description = isTr
    ? "Sarma, dilimleme ve yeniden sarım sistemlerinin temel bileşenlerini yakından inceleyin."
    : "Explore the core components of rewinding, slitting, and re-winding systems up close."
  const ctaLabel = isTr ? "Ürünleri İncele" : "Explore Products"
  const imgAlt = isTr
    ? "KGT Ambalaj teknik makine komponent diyagramı — temel sarma sistemi bileşenleri"
    : "KGT Ambalaj technical machine component diagram — core rewinding system components"

  return (
    <section
      aria-labelledby="technical-showcase-heading"
      style={{
        background: "#0C111A",
        borderTop: "2px solid var(--color-border)",
        borderBottom: "2px solid var(--color-border)",
      }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 lg:pt-16 pb-8 lg:pb-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-5 h-[2px] shrink-0"
              style={{ background: "var(--color-accent)" }}
              aria-hidden="true"
            />
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--color-accent)" }}
            >
              {eyebrow}
            </p>
          </div>
          <h2
            id="technical-showcase-heading"
            className="font-black leading-tight tracking-tight"
            style={{ color: "#FFFFFF", fontSize: "clamp(22px, 2.8vw, 38px)" }}
          >
            {heading}
          </h2>
          <p
            className="mt-3 text-[14px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.58)" }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Image — full-bleed, mobile scroll at min 680px */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: "max(100%, 680px)" }}>
          <Image
            src="/images/kgt/technical-machine-showcase.png"
            alt={imgAlt}
            width={1672}
            height={941}
            className="w-full h-auto block"
            sizes="(max-width: 680px) 680px, 100vw"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-10 flex justify-end">
        <Link
          href={p.products}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--color-accent-dark)" }}
        >
          {ctaLabel}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
