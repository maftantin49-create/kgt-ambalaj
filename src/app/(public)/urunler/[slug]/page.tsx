import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight, Package } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import { productCategories } from "@/data/products"

export function generateStaticParams() {
  return productCategories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = productCategories.find((c) => c.slug === slug)
  if (!category) return { title: "Ürün Bulunamadı" }
  return {
    title: category.name,
    description: category.shortDescription,
  }
}

export default async function UrunDetayPage(props: PageProps<"/urunler/[slug]">) {
  const { slug } = await props.params
  const category = productCategories.find((c) => c.slug === slug)

  if (!category) notFound()

  const hasFeatures     = (category.features?.length    ?? 0) > 0
  const hasSpecs        = (category.specs?.length        ?? 0) > 0
  const hasModels       = (category.models?.length       ?? 0) > 0
  const hasApplications = (category.applications?.length ?? 0) > 0
  const hasSolutionCards = (category.solutionCards?.length ?? 0) > 0

  return (
    <>

      {/* ── 1. İç sayfa hero ────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">

          {/* Breadcrumb */}
          <nav aria-label="Sayfa konumu" className="flex items-center gap-1.5 mb-6">
            <Link
              href="/"
              className="text-[12px] transition-opacity hover:opacity-75"
              style={{ color: "var(--color-muted)" }}
            >
              Ana Sayfa
            </Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <Link
              href="/urunler"
              className="text-[12px] transition-opacity hover:opacity-75"
              style={{ color: "var(--color-muted)" }}
            >
              Ürünler
            </Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <span
              className="text-[12px] font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              {category.name}
            </span>
          </nav>

          {/* H1 + açıklama */}
          <div className="max-w-2xl flex flex-col gap-4">
            <h1
              className="font-black leading-tight tracking-tight"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(28px, 3.5vw, 48px)",
              }}
            >
              {category.name}
            </h1>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              {category.shortDescription}
            </p>
            {category.description && (
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                {category.description}
              </p>
            )}
          </div>

        </div>
      </section>

      {/* ── 2. Ana ürün bölümü — görsel + özellikler ────────────── */}
      <section
        aria-labelledby="product-detail-heading"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Sol: görsel veya nötr placeholder */}
            <div
              className="relative rounded-2xl overflow-hidden w-full"
              style={{ aspectRatio: "4/3" }}
              aria-hidden={category.image ? undefined : true}
            >
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <>
                  <div className="absolute inset-0" style={{ background: "#1E1E1C" }} />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
                      `,
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 w-12 h-0.5"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <div
                    className="absolute top-0 left-0 w-0.5 h-12"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(200,38,26,0.10)",
                        border: "1px solid rgba(200,38,26,0.22)",
                      }}
                    >
                      <Package size={26} style={{ color: "var(--color-accent)" }} />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sağ: özellikler (varsa) + CTA */}
            <div className="flex flex-col gap-6">
              {hasFeatures && (
                <>
                  <SectionHeader
                    eyebrow="Ürün"
                    heading="Temel Özellikler"
                    headingId="product-detail-heading"
                  />
                  <ul className="flex flex-col gap-3" role="list">
                    {category.features!.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]"
                          style={{ background: "var(--color-accent)" }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-[14px] leading-relaxed"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-semibold text-white transition-opacity hover:opacity-90 self-start"
                style={{ background: "var(--color-accent)" }}
              >
                Teklif Al
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Kullanım Alanları (opsiyonel) ────────────────────── */}
      {hasApplications && (
        <section
          aria-labelledby="applications-heading"
          style={{
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader
                eyebrow="Kullanım"
                heading="Kullanım Alanları"
                headingId="applications-heading"
              />
            </div>
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              role="list"
            >
              {category.applications!.map((app) => (
                <li key={app} className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]"
                    style={{ background: "var(--color-accent)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-[14px] leading-relaxed"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {app}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── 4. Teknik Özellikler tablosu (opsiyonel) ────────────── */}
      {hasSpecs && (
        <section
          aria-labelledby="specs-heading"
          style={{
            background: "var(--background)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader
                eyebrow="Teknik"
                heading="Teknik Özellikler"
                headingId="specs-heading"
              />
            </div>
            <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--color-border)" }}>
              <table className="w-full border-collapse">
                <tbody>
                  {category.specs!.map(({ label, value }, i) => (
                    <tr
                      key={label}
                      style={{
                        background: i % 2 === 0 ? "var(--color-surface)" : "var(--background)",
                        borderBottom: i < category.specs!.length - 1
                          ? "1px solid var(--color-border)"
                          : undefined,
                      }}
                    >
                      <td
                        className="py-3 px-5 text-[13px] font-semibold"
                        style={{ color: "var(--color-muted)", width: "42%" }}
                      >
                        {label}
                      </td>
                      <td
                        className="py-3 px-5 text-[14px]"
                        style={{ color: "var(--color-text)" }}
                      >
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

      {/* ── 5. Modeller (opsiyonel) ──────────────────────────────── */}
      {hasModels && (
        <section
          aria-labelledby="models-heading"
          style={{
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <SectionHeader
                eyebrow="Modeller"
                heading="Ürün Modelleri"
                headingId="models-heading"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.models!.map(({ name, description }) => (
                <div
                  key={name}
                  className="flex flex-col gap-3 p-6 rounded-xl"
                  style={{
                    background: "var(--background)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <h3
                    className="font-bold text-[15px] leading-snug"
                    style={{ color: "var(--color-text)" }}
                  >
                    {name}
                  </h3>
                  {description && (
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Çözüm kartları (opsiyonel) ───────────────────────── */}
      {hasSolutionCards && (
        <section
          aria-labelledby="solution-heading"
          style={{
            background: "var(--background)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-10">
              <SectionHeader
                eyebrow="Çözümlerimiz"
                heading="Neler Sunuyoruz?"
                headingId="solution-heading"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {category.solutionCards!.map(({ title, description }) => (
                <div
                  key={title}
                  className="flex flex-col gap-4 p-6 rounded-xl"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    className="w-8 h-0.5"
                    style={{ background: "var(--color-accent)" }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-1.5">
                    <h3
                      className="font-bold text-[15px] leading-snug"
                      style={{ color: "var(--color-text)" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. Alt navigasyon ────────────────────────────────────── */}
      <section
        aria-label="Sayfa alt yönlendirme"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 text-[13px] font-semibold transition-opacity hover:opacity-75"
              style={{ color: "var(--color-muted)" }}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Tüm Ürünler
            </Link>

            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--color-accent)" }}
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
