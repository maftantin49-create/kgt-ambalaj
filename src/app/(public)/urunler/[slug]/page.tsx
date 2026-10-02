import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight, Package, CheckCircle, Wrench, HeadphonesIcon } from "lucide-react"
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
    description: category.description,
  }
}

const solutionCards = [
  {
    icon: CheckCircle,
    title: "GEÇİCİ — Kullanım Alanları",
    desc: "GEÇİCİ — bu kategori ürünlerinin hizmet verdiği sektörler ve uygulamalar buraya gelecek.",
  },
  {
    icon: Wrench,
    title: "GEÇİCİ — Çözüm Yaklaşımı",
    desc: "GEÇİCİ — projeye özel tasarım ve üretim sürecinin kısa açıklaması buraya gelecek.",
  },
  {
    icon: HeadphonesIcon,
    title: "GEÇİCİ — Teknik Destek",
    desc: "GEÇİCİ — satış öncesi ve sonrası teknik destek hizmetinin kısa açıklaması buraya gelecek.",
  },
]

export default async function UrunDetayPage(props: PageProps<"/urunler/[slug]">) {
  const { slug } = await props.params
  const category = productCategories.find((c) => c.slug === slug)

  if (!category) notFound()

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
              {category.description}
            </p>
          </div>

        </div>
      </section>

      {/* ── 2. Ana ürün tanıtım bölümü ──────────────────────────── */}
      <section
        aria-labelledby="product-detail-heading"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Sol: görsel placeholder */}
            {/* GEÇİCİ: gerçek ürün görseli geldiğinde next/image ile değiştirilecek */}
            <div
              className="relative rounded-2xl overflow-hidden w-full"
              style={{ aspectRatio: "4/3" }}
              aria-hidden="true"
            >
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
            </div>

            {/* Sağ: başlık + açıklama + bullet list */}
            <div className="flex flex-col gap-6">
              <SectionHeader
                eyebrow="Ürün"
                heading="Temel Özellikler"
                headingId="product-detail-heading"
              />

              {/* Bullet list — GEÇİCİ */}
              <ul className="flex flex-col gap-3" role="list">
                {[
                  "GEÇİCİ — bu kategori için önemli özellik veya fayda 1",
                  "GEÇİCİ — bu kategori için önemli özellik veya fayda 2",
                  "GEÇİCİ — bu kategori için önemli özellik veya fayda 3",
                ].map((item) => (
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

              {/* Teklif Al CTA */}
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

      {/* ── 3. Kullanım / çözüm alanı ───────────────────────────── */}
      <section
        aria-labelledby="solution-heading"
        style={{
          background: "var(--color-surface)",
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
            {solutionCards.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-6 rounded-xl"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(200,38,26,0.06)",
                    border: "1px solid rgba(200,38,26,0.14)",
                  }}
                  aria-hidden="true"
                >
                  <Icon size={18} style={{ color: "var(--color-accent)" }} />
                </div>
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
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. CTA ───────────────────────────────────────────────── */}
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
