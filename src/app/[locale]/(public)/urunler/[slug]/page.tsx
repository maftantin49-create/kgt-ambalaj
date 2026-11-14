import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import ProductSectionNav, { type SectionNavItem } from "@/components/product/ProductSectionNav"
import { getProducts, getSectors } from "@/data/index"
import { localePaths, isValidLocale, type Locale } from "@/config/i18n"
import { trToEnSlug } from "@/config/slugs"
import { buildAlternates } from "@/lib/seo"

export function generateStaticParams() {
  return getProducts("tr").map((cat) => ({ locale: "tr", slug: cat.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getProducts("tr").find((c) => c.slug === slug)
  if (!category) return { title: "Ürün Bulunamadı" }
  const enSlug = trToEnSlug[slug] ?? slug
  return {
    title: category.name,
    description: category.shortDescription,
    alternates: buildAlternates("tr", `/tr/urunler/${slug}`, `/en/products/${enSlug}`),
  }
}

export default async function UrunDetayPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isValidLocale(locale) || locale !== "tr") notFound()

  const categories = getProducts(locale as Locale)
  const category   = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  const allSectors = getSectors("tr")
  const p          = localePaths[locale as Locale]

  const hasApplications   = (category.applications?.length  ?? 0) > 0
  const hasSpecs          = (category.specs?.length          ?? 0) > 0
  const hasModels         = (category.models?.length         ?? 0) > 0
  const hasGallery        = (category.gallery?.length        ?? 0) > 0
  const hasFaq            = (category.faq?.length            ?? 0) > 0
  const hasRelatedProducts = (category.relatedProducts?.length ?? 0) > 0
  const hasSectors        = (category.sectors?.length        ?? 0) > 0

  const relatedCategories = hasRelatedProducts
    ? (category.relatedProducts!
        .map((s) => categories.find((c) => c.slug === s))
        .filter(Boolean) as typeof categories)
    : []

  const categorySectors = hasSectors
    ? (category.sectors!
        .map((id) => allSectors.find((s) => s.id === id))
        .filter(Boolean) as typeof allSectors)
    : []

  const currentIndex = categories.findIndex((c) => c.slug === slug)
  const prevCategory = currentIndex > 0 ? categories[currentIndex - 1] : null
  const nextCategory = currentIndex < categories.length - 1 ? categories[currentIndex + 1] : null

  const sectionNavItems: SectionNavItem[] = [
    ...(category.overview     ? [{ id: "overview",         label: "Genel Bakış"       }] : []),
    ...(hasApplications       ? [{ id: "applications",     label: "Kullanım Alanları" }] : []),
    ...(hasSpecs              ? [{ id: "specs",            label: "Teknik Özellikler" }] : []),
    ...(hasModels             ? [{ id: "models",           label: "Modeller"          }] : []),
    ...(hasGallery            ? [{ id: "gallery",          label: "Galeri"            }] : []),
    ...(category.video        ? [{ id: "video",            label: "Video"             }] : []),
    ...(hasFaq                ? [{ id: "faq",              label: "SSS"               }] : []),
    ...(hasRelatedProducts    ? [{ id: "related-products", label: "İlgili Makineler"  }] : []),
  ]

  const SCROLL_MT: React.CSSProperties = { scrollMarginTop: "56px" }

  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────────────── */}
      <section
        aria-label={category.name}
        style={{ background: "var(--color-surface)", borderBottom: "2px solid var(--color-border)" }}
      >
        {/* Full-bleed grid: text sol / image sağ tam yükseklik */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,52%)]"
          style={{ minHeight: "580px" }}
        >
          {/* Metin sütunu */}
          <div
            className="flex flex-col justify-center gap-6 py-10 px-6 sm:px-8 lg:pr-10"
            style={{
              paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 2rem))",
              borderRight: "1px solid var(--color-border)",
            }}
          >
            {/* Breadcrumb */}
            <nav aria-label="Sayfa konumu" className="flex items-center gap-1.5">
              <Link
                href={p.home}
                className="text-[12px] transition-opacity hover:opacity-70"
                style={{ color: "var(--color-muted)" }}
              >
                Ana Sayfa
              </Link>
              <ChevronRight size={12} style={{ color: "var(--color-border)" }} aria-hidden="true" />
              <Link
                href={p.products}
                className="text-[12px] transition-opacity hover:opacity-70"
                style={{ color: "var(--color-muted)" }}
              >
                Ürünler
              </Link>
              <ChevronRight size={12} style={{ color: "var(--color-border)" }} aria-hidden="true" />
              <span className="text-[12px] font-semibold" style={{ color: "var(--color-text)" }}>
                {category.name}
              </span>
            </nav>

            {/* Büyük katalog numarası — watermark */}
            <div className="flex items-baseline gap-3 mt-2">
              <span
                className="font-black leading-none tabular-nums select-none"
                style={{
                  fontSize: "clamp(72px, 8vw, 120px)",
                  color: "rgba(28,100,133,0.08)",
                  letterSpacing: "-0.04em",
                }}
                aria-hidden="true"
              >
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span
                className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{ color: "var(--color-accent)" }}
              >
                / {String(categories.length).padStart(2, "0")}
              </span>
            </div>

            <h1
              className="font-black leading-tight tracking-tight"
              style={{ color: "var(--color-text)", fontSize: "clamp(28px, 3.8vw, 54px)" }}
            >
              {category.name}
            </h1>

            <p
              className="text-[15px] leading-relaxed"
              style={{ color: "var(--color-muted)", maxWidth: "44ch" }}
            >
              {category.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={p.contact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--color-accent-dark)" }}
              >
                Teklif Al
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href={p.products}
                className="inline-flex items-center gap-2 text-[13px] font-semibold transition-opacity hover:opacity-70"
                style={{ color: "var(--color-muted)" }}
              >
                <ArrowLeft size={13} aria-hidden="true" />
                Tüm Ürünler
              </Link>
            </div>
          </div>

          {/* Görsel sütunu — tam yükseklik, edge-to-edge */}
          <div
            className="relative overflow-hidden"
            style={{ minHeight: "360px", background: "var(--color-surface)" }}
          >
            {category.image && (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            )}
          </div>
        </div>
      </section>

      {/* ── 2. SECTION NAV ─────────────────────────────────────────────── */}
      {sectionNavItems.length > 0 && (
        <ProductSectionNav sections={sectionNavItems} locale="tr" />
      )}

      {/* ── 3. GENEL BAKIŞ ─────────────────────────────────────────────── */}
      {category.overview && (
        <section
          id="overview"
          aria-labelledby="overview-heading"
          style={{
            ...SCROLL_MT,
            background: "var(--background)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader eyebrow="Ürün" heading="Genel Bakış" headingId="overview-heading" />
            </div>
            <div className="max-w-3xl">
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {category.overview}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. KULLANIM ALANLARI ────────────────────────────────────────── */}
      {hasApplications && (
        <section
          id="applications"
          aria-labelledby="applications-heading"
          style={{
            ...SCROLL_MT,
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader eyebrow="Kullanım" heading="Kullanım Alanları" headingId="applications-heading" />
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
              {category.applications!.map((app) => (
                <li key={app} className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]"
                    style={{ background: "var(--color-accent)" }}
                    aria-hidden="true"
                  />
                  <span className="text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {app}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── 5. TEKNİK ÖZELLİKLER ───────────────────────────────────────── */}
      {hasSpecs && (
        <section
          id="specs"
          aria-labelledby="specs-heading"
          style={{
            ...SCROLL_MT,
            background: "var(--background)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader eyebrow="Teknik" heading="Teknik Özellikler" headingId="specs-heading" />
            </div>
            <div className="overflow-x-auto" style={{ border: "1px solid var(--color-border)", borderRadius: "6px" }}>
              <table className="w-full border-collapse">
                <tbody>
                  {category.specs!.map(({ label, value }, i) => (
                    <tr
                      key={label}
                      style={{
                        background: i % 2 === 0 ? "var(--color-surface)" : "var(--background)",
                        borderBottom:
                          i < category.specs!.length - 1 ? "1px solid var(--color-border)" : undefined,
                      }}
                    >
                      <td
                        className="py-3 px-5 text-[13px] font-semibold"
                        style={{ color: "var(--color-muted)", width: "42%" }}
                      >
                        {label}
                      </td>
                      <td className="py-3 px-5 text-[14px]" style={{ color: "var(--color-text)" }}>
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. MODELLER ────────────────────────────────────────────────── */}
      {hasModels && (
        <section
          id="models"
          aria-labelledby="models-heading"
          style={{
            ...SCROLL_MT,
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader eyebrow="Modeller" heading="Ürün Modelleri" headingId="models-heading" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.models!.map(({ name, description }) => (
                <div
                  key={name}
                  className="flex flex-col gap-3 p-6"
                  style={{ background: "var(--background)", border: "1px solid var(--color-border)", borderRadius: "6px" }}
                >
                  <h3 className="font-bold text-[15px] leading-snug" style={{ color: "var(--color-text)" }}>
                    {name}
                  </h3>
                  {description && (
                    <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
                      {description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. GALERİ ──────────────────────────────────────────────────── */}
      {hasGallery && (
        <section
          id="gallery"
          aria-labelledby="gallery-heading"
          style={{
            ...SCROLL_MT,
            background: "var(--background)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader eyebrow="Galeri" heading="Makine Görselleri" headingId="gallery-heading" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.gallery!.map((item) => (
                <div
                  key={item.src}
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4/3", borderRadius: "6px", border: "1px solid var(--color-border)" }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. VIDEO ───────────────────────────────────────────────────── */}
      {category.video && (
        <section
          id="video"
          aria-labelledby="video-heading"
          style={{
            ...SCROLL_MT,
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader eyebrow="Video" heading="Makine Tanıtımı" headingId="video-heading" />
            </div>
            <div
              className="relative w-full max-w-3xl overflow-hidden"
              style={{ aspectRatio: "16/9", borderRadius: "6px", border: "1px solid var(--color-border)" }}
            >
              <iframe
                src={category.video}
                title={`${category.name} tanıtım videosu`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── 9. SSS ─────────────────────────────────────────────────────── */}
      {hasFaq && (
        <section
          id="faq"
          aria-labelledby="faq-heading"
          style={{
            ...SCROLL_MT,
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader eyebrow="SSS" heading="Sık Sorulan Sorular" headingId="faq-heading" />
            </div>
            <div
              className="max-w-3xl"
              style={{ border: "1px solid var(--color-border)", borderRadius: "6px", overflow: "hidden" }}
            >
              {category.faq!.map(({ question, answer }, i) => (
                <details
                  key={question}
                  style={{
                    borderBottom:
                      i < category.faq!.length - 1 ? "1px solid var(--color-border)" : undefined,
                  }}
                >
                  <summary
                    className="cursor-pointer select-none"
                    style={{
                      padding: "16px 20px",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--color-text)",
                      listStyle: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <span>{question}</span>
                    <span
                      className="shrink-0 text-[18px] font-light leading-none"
                      style={{ color: "var(--color-accent)" }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div
                    style={{
                      padding: "12px 20px 18px",
                      fontSize: "14px",
                      lineHeight: "1.65",
                      color: "var(--color-muted)",
                      background: "var(--background)",
                    }}
                  >
                    {answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 10. İLGİLİ MAKİNELER ───────────────────────────────────────── */}
      {hasRelatedProducts && relatedCategories.length > 0 && (
        <section
          id="related-products"
          aria-labelledby="related-products-heading"
          style={{
            ...SCROLL_MT,
            background: "var(--background)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader eyebrow="Katalog" heading="İlgili Makineler" headingId="related-products-heading" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCategories.map((rel, i) => (
                <Link
                  href={p.product(rel.slug)}
                  key={rel.id}
                  className="group flex items-center gap-4 transition-colors hover:border-opacity-70"
                  style={{
                    padding: "16px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  {rel.image && (
                    <div
                      className="relative shrink-0 overflow-hidden"
                      style={{ width: "72px", height: "54px", borderRadius: "4px", background: "var(--color-surface)" }}
                    >
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span
                      className="font-mono text-[10px] font-bold tracking-widest tabular-nums"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-semibold text-[13px] leading-snug"
                      style={{ color: "var(--color-text)" }}
                    >
                      {rel.name}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 11. İLGİLİ SEKTÖRLER ───────────────────────────────────────── */}
      {hasSectors && categorySectors.length > 0 && (
        <section
          aria-labelledby="sectors-heading"
          style={{
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
            <h2
              id="sectors-heading"
              className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4"
              style={{ color: "var(--color-muted)" }}
            >
              İlgili Sektörler
            </h2>
            <div className="flex flex-wrap gap-2">
              {categorySectors.map((sector) => (
                <span
                  key={sector.id}
                  className="text-[12px] font-semibold"
                  style={{
                    padding: "4px 12px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                    color: "var(--color-muted)",
                    background: "var(--background)",
                  }}
                >
                  {sector.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 12. TEKLİF CTA ──────────────────────────────────────────────── */}
      <section
        aria-label="Teklif al"
        style={{ background: "#EEF1F4", borderTop: "2px solid var(--color-border)", borderBottom: "2px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-bold tracking-[0.15em] uppercase" style={{ color: "var(--color-muted)" }}>
              KGT Ambalaj
            </p>
            <h2 className="font-bold text-[22px] leading-snug" style={{ color: "var(--color-text)" }}>
              {category.name} için Teklif Alın
            </h2>
            <p className="text-[14px] leading-relaxed mt-1" style={{ color: "var(--color-muted)" }}>
              Makine ihtiyaçlarınızı paylaşın, teknik değerlendirme yapılsın.
            </p>
          </div>
          <Link
            href={p.contact}
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--color-accent-dark)", borderRadius: "6px" }}
          >
            Teklif Al
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── 13. KATALOG NAVİGASYONU ─────────────────────────────────────── */}
      <section
        aria-label="Katalog navigasyonu"
        style={{ background: "var(--background)", borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">

          {/* Sayaç */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} aria-hidden="true" />
            <span
              className="text-[11px] font-bold tracking-[0.2em] uppercase tabular-nums shrink-0"
              style={{ color: "var(--color-muted)" }}
            >
              <span style={{ color: "var(--color-text)" }}>
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              {" "}<span style={{ opacity: 0.4 }}>/</span>{" "}
              {String(categories.length).padStart(2, "0")}
            </span>
          </div>

          {/* Önceki / Sonraki */}
          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            <div>
              {prevCategory && (
                <Link href={p.product(prevCategory.slug)} className="group flex flex-col gap-2">
                  <span
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-opacity group-hover:opacity-75"
                    style={{ color: "var(--color-accent-dark)" }}
                  >
                    <ArrowLeft size={11} aria-hidden="true" />
                    Önceki Ürün
                  </span>
                  <span
                    className="text-[14px] font-semibold leading-snug transition-opacity group-hover:opacity-75"
                    style={{ color: "var(--color-text)" }}
                  >
                    {prevCategory.name}
                  </span>
                </Link>
              )}
            </div>
            <div className="flex justify-end">
              {nextCategory && (
                <Link
                  href={p.product(nextCategory.slug)}
                  className="group flex flex-col gap-2 items-end text-right"
                >
                  <span
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-opacity group-hover:opacity-75"
                    style={{ color: "var(--color-accent-dark)" }}
                  >
                    Sonraki Ürün
                    <ArrowRight size={11} aria-hidden="true" />
                  </span>
                  <span
                    className="text-[14px] font-semibold leading-snug transition-opacity group-hover:opacity-75"
                    style={{ color: "var(--color-text)" }}
                  >
                    {nextCategory.name}
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Alt satır */}
          <div
            className="mt-8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <Link
              href={p.products}
              className="inline-flex items-center gap-2 text-[13px] font-semibold transition-opacity hover:opacity-75"
              style={{ color: "var(--color-muted)" }}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Tüm Ürünler
            </Link>
            <Link
              href={p.contact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--color-accent-dark)" }}
            >
              Teklif Al
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
