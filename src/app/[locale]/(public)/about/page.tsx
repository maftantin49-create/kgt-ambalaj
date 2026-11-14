import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, ChevronRight } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import { getAboutData } from "@/data/index"
import { localePaths, isValidLocale, type Locale } from "@/config/i18n"
import { buildAlternates } from "@/lib/seo"

export function generateStaticParams() {
  return [{ locale: "en" }]
}

export function generateMetadata(): Metadata {
  return {
    title: "About Us",
    description:
      "About KGT Ambalaj: design and manufacture of industrial packaging machinery — stretch film rewinding, aluminium foil rewinding, and paper slitting equipment.",
    alternates: buildAlternates("en", "/tr/hakkimizda", "/en/about"),
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale) || locale !== "en") notFound()
  const p = localePaths[locale as Locale]
  const about = getAboutData(locale as Locale)

  return (
    <>
      <section style={{ background: "var(--color-surface)", borderBottom: "2px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <nav aria-label="Page location" className="flex items-center gap-1.5 mb-6">
            <Link href={p.home} className="text-[12px] transition-opacity hover:opacity-75" style={{ color: "var(--color-muted)" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <span className="text-[12px] font-semibold" style={{ color: "var(--color-text)" }}>About Us</span>
          </nav>
          <div className="max-w-2xl flex flex-col gap-4">
            <h1 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              {about.heroHeading}
            </h1>
            <p className="text-[15px] leading-relaxed max-w-xl" style={{ color: "var(--color-muted)" }}>
              {about.heroIntro}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-intro-heading" style={{ background: "var(--background)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <SectionHeader eyebrow={about.intro.eyebrow} heading={about.intro.heading} headingId="about-intro-heading" />
              {about.intro.paragraphs.length > 0 && (
                <div className="flex flex-col gap-4 max-w-lg">
                  {about.intro.paragraphs.map((para, i) => (
                    <p key={i} className="text-[15px] leading-[1.75]" style={{ color: "var(--color-muted)" }}>{para}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="relative rounded-sm overflow-hidden w-full" style={{ aspectRatio: "4/3" }}>
              {about.intro.image ? (
                <Image src={about.intro.image} alt="KGT Ambalaj production line" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="absolute inset-0" style={{ background: "var(--color-surface)" }} />
              )}
            </div>
          </div>
        </div>
      </section>

      {about.valuesSection.items.length > 0 && (
        <section aria-labelledby="values-heading" style={{ background: "var(--color-surface)", borderBottom: "2px solid var(--color-border)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-10">
              <SectionHeader eyebrow={about.valuesSection.eyebrow} heading={about.valuesSection.heading} headingId="values-heading" description={about.valuesSection.description} />
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
              style={{ background: "var(--color-border)" }}
            >
              {about.valuesSection.items.map(({ title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-3 p-7"
                  style={{ background: "var(--color-surface)" }}
                >
                  <div className="w-5 h-px" style={{ background: "var(--color-accent-dark)" }} aria-hidden="true" />
                  <h3 className="font-bold text-[15px] leading-snug" style={{ color: "var(--color-text)" }}>{title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="production-heading" style={{ background: "var(--background)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-sm overflow-hidden w-full order-2 lg:order-1" style={{ aspectRatio: "4/3" }}>
              {about.production.image ? (
                <Image src={about.production.image} alt="KGT Ambalaj rewinding machinery workshop" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="absolute inset-0" style={{ background: "var(--color-surface)" }} />
              )}
            </div>
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <SectionHeader eyebrow={about.production.eyebrow} heading={about.production.heading} headingId="production-heading" />
              {about.production.paragraphs.length > 0 && (
                <div className="flex flex-col gap-4 max-w-lg">
                  {about.production.paragraphs.map((para, i) => (
                    <p key={i} className="text-[15px] leading-[1.75]" style={{ color: "var(--color-muted)" }}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Contact prompt" style={{ background: "#EEF1F4", borderTop: "2px solid var(--color-border)", borderBottom: "2px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-xl flex flex-col gap-5">
            <h2 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(22px, 2.8vw, 38px)" }}>
              {about.ctaHeading}
            </h2>
            {about.ctaBody && (
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>{about.ctaBody}</p>
            )}
            <Link href={p.contact} className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-semibold text-white transition-opacity hover:opacity-90 self-start" style={{ background: "var(--color-accent-dark)" }}>
              Get in Touch
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
