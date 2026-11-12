import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, ChevronRight } from "lucide-react"
import { getProducts } from "@/data/index"
import { localePaths, isValidLocale, type Locale } from "@/config/i18n"
import { buildAlternates } from "@/lib/seo"
import { site } from "@/config/site"

export function generateStaticParams() {
  return [{ locale: "tr" }]
}

export function generateMetadata(): Metadata {
  return {
    title: "Ürünler",
    description:
      "KGT Ambalaj ürün kategorileri: streç film sarma, alüminyum folyo sarma, karton masura üretim hattı ve kağıt dilimleme makineleri.",
    alternates: buildAlternates("tr", "/tr/urunler", "/en/products"),
  }
}

export default async function UrunlerPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale) || locale !== "tr") notFound()
  const p = localePaths[locale as Locale]
  const categories = getProducts(locale as Locale)

  return (
    <>
      {/* Page header */}
      <section
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <nav aria-label="Sayfa konumu" className="flex items-center gap-1.5 mb-6">
            <Link
              href={p.home}
              className="text-[12px] transition-opacity hover:opacity-75"
              style={{ color: "var(--color-muted)" }}
            >
              Ana Sayfa
            </Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <span className="text-[12px] font-semibold" style={{ color: "var(--color-text)" }}>
              Ürünler
            </span>
          </nav>
          <div className="max-w-2xl flex flex-col gap-4">
            <h1
              className="font-black leading-tight tracking-tight"
              style={{ color: "var(--color-text)", fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Ürün Kategorilerimiz
            </h1>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
              KGT Ambalaj&apos;ın endüstriyel ambalaj makineleri — streç film sarmadan kağıt dilimleyicilere kadar tüm ürün gruplarını inceleyin.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial catalogue list */}
      <section
        aria-labelledby="products-list-heading"
        style={{ background: "var(--background)", borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <h2
            id="products-list-heading"
            className="font-black leading-tight tracking-tight mb-10 lg:mb-12"
            style={{ color: "var(--color-text)", fontSize: "clamp(20px, 2.2vw, 32px)" }}
          >
            Tüm Kategoriler
          </h2>

          <ol
            className="flex flex-col"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            {categories.map((cat, i) => (
              <li
                key={cat.id}
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <Link
                  href={p.product(cat.slug)}
                  className="group grid grid-cols-1 sm:grid-cols-[1fr_200px] lg:grid-cols-[1fr_280px] transition-colors hover:bg-[var(--color-surface)]"
                >
                  <div className="flex items-start gap-5 lg:gap-7 p-6 lg:p-8">
                    <span
                      className="font-black select-none shrink-0 leading-none tabular-nums"
                      style={{
                        fontSize: "clamp(28px, 3vw, 44px)",
                        color: "var(--color-border)",
                        letterSpacing: "-0.03em",
                      }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-2 flex-1 py-0.5">
                      <h3
                        className="font-bold text-[17px] lg:text-[19px] leading-snug"
                        style={{ color: "var(--color-text)" }}
                      >
                        {cat.name}
                      </h3>
                      <p
                        className="text-[13px] leading-relaxed"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {cat.shortDescription}
                      </p>
                      <span
                        className="inline-flex items-center gap-1 text-[12px] font-semibold mt-1"
                        style={{ color: "var(--color-accent)" }}
                      >
                        Detayları İncele
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-150 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>

                  <div
                    className="relative hidden sm:block overflow-hidden"
                    style={{
                      borderLeft: "1px solid var(--color-border)",
                      background: "var(--color-surface)",
                    }}
                  >
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 200px, 280px"
                      />
                    ) : (
                      <div className="absolute inset-0" style={{ background: "#ECECEA" }} />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Support */}
      <section
        style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 max-w-3xl mx-auto">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[15px]" style={{ color: "var(--color-text)" }}>
                Doğru ürünü bulmakta yardım ister misiniz?
              </p>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
                Teknik danışmanlık ve ürün seçimi için bizimle iletişime geçin.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              {site.phone && (
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold transition-colors"
                  style={{
                    color: "var(--color-text)",
                    background: "var(--background)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {site.phoneDisplay}
                </a>
              )}
              <Link
                href={p.contact}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--color-accent)" }}
              >
                Teklif Alın
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
