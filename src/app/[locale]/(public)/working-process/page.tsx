import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import HowItWorks from "@/components/home/HowItWorks"
import { localePaths, isValidLocale, type Locale } from "@/config/i18n"
import { buildAlternates } from "@/lib/seo"

export function generateStaticParams() {
  return [{ locale: "en" }]
}

export function generateMetadata(): Metadata {
  return {
    title: "Working Process",
    description:
      "KGT Ambalaj working process: from sharing your requirements to technical assessment, proposal, and production delivery.",
    alternates: buildAlternates("en", "/tr/calisma-surecimiz", "/en/working-process"),
  }
}

export default async function WorkingProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale) || locale !== "en") notFound()
  const p = localePaths[locale as Locale]

  return (
    <>
      {/* Page header */}
      <section
        style={{
          background: "var(--color-surface)",
          borderBottom: "2px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <nav aria-label="Page breadcrumb" className="flex items-center gap-1.5 mb-6">
            <Link
              href={p.home}
              className="text-[12px] transition-opacity hover:opacity-75"
              style={{ color: "var(--color-muted)" }}
            >
              Home
            </Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <span className="text-[12px] font-semibold" style={{ color: "var(--color-text)" }}>
              Working Process
            </span>
          </nav>
          <div className="max-w-2xl flex flex-col gap-4">
            <h1
              className="font-black leading-tight tracking-tight"
              style={{ color: "var(--color-text)", fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Working Process
            </h1>
            <p
              className="text-[15px] leading-relaxed max-w-xl"
              style={{ color: "var(--color-muted)" }}
            >
              A clear process from requirement to delivery: technical assessment, custom proposal and production plan.
            </p>
          </div>
        </div>
      </section>

      <HowItWorks locale="en" />

      {/* CTA */}
      <section aria-label="Contact call to action" style={{ background: "#EEF1F4", borderTop: "2px solid var(--color-border)", borderBottom: "2px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-xl flex flex-col gap-5">
            <h2
              className="font-black leading-tight tracking-tight"
              style={{ color: "var(--color-text)", fontSize: "clamp(22px, 2.8vw, 38px)" }}
            >
              Start Your Project
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Share your machine requirements and we will prepare a custom technical assessment and quote.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={p.contact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--color-accent-dark)" }}
              >
                Get in Touch
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href={p.products}
                className="inline-flex items-center px-6 py-3 rounded-md text-[14px] font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--color-muted)", border: "1px solid var(--color-border)" }}
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
