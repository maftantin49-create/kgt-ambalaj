import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight, Package } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import { productCategories } from "@/data/products"
import { localePaths, isValidLocale, type Locale } from "@/config/i18n"

export function generateStaticParams() {
  return productCategories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = productCategories.find((c) => c.slug === slug)
  if (!category) return { title: "Product Not Found" }
  return { title: category.name, description: category.shortDescription }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isValidLocale(locale) || locale !== "en") notFound()

  const category = productCategories.find((c) => c.slug === slug)
  if (!category) notFound()

  const p = localePaths[locale as Locale]
  const hasFeatures      = (category.features?.length    ?? 0) > 0
  const hasSpecs         = (category.specs?.length        ?? 0) > 0
  const hasModels        = (category.models?.length       ?? 0) > 0
  const hasApplications  = (category.applications?.length ?? 0) > 0
  const hasSolutionCards = (category.solutionCards?.length ?? 0) > 0

  return (
    <>
      <section style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <nav aria-label="Page location" className="flex items-center gap-1.5 mb-6">
            <Link href={p.home} className="text-[12px] transition-opacity hover:opacity-75" style={{ color: "var(--color-muted)" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <Link href={p.products} className="text-[12px] transition-opacity hover:opacity-75" style={{ color: "var(--color-muted)" }}>Products</Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <span className="text-[12px] font-semibold" style={{ color: "var(--color-text)" }}>{category.name}</span>
          </nav>
          <div className="max-w-2xl flex flex-col gap-4">
            <h1 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              {category.name}
            </h1>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>{category.shortDescription}</p>
            {category.description && (
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>{category.description}</p>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="product-detail-heading" style={{ background: "var(--background)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden w-full" style={{ aspectRatio: "4/3" }} aria-hidden={category.image ? undefined : true}>
              {category.image ? (
                <Image src={category.image} alt={category.name} fill className="object-cover rounded-2xl" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <>
                  <div className="absolute inset-0" style={{ background: "#1E1E1C" }} />
                  <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "rgba(200,38,26,0.10)", border: "1px solid rgba(200,38,26,0.22)" }}>
                      <Package size={26} style={{ color: "var(--color-accent)" }} />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-6">
              {hasFeatures && (
                <>
                  <SectionHeader eyebrow="Product" heading="Key Features" headingId="product-detail-heading" />
                  <ul className="flex flex-col gap-3" role="list">
                    {category.features!.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
                        <span className="text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Link href={p.contact} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-semibold text-white transition-opacity hover:opacity-90 self-start" style={{ background: "var(--color-accent)" }}>
                Get a Quote
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {hasApplications && (
        <section aria-labelledby="applications-heading" style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8"><SectionHeader eyebrow="Usage" heading="Applications" headingId="applications-heading" /></div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
              {category.applications!.map((app) => (
                <li key={app} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
                  <span className="text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {hasSpecs && (
        <section aria-labelledby="specs-heading" style={{ background: "var(--background)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8"><SectionHeader eyebrow="Technical" heading="Specifications" headingId="specs-heading" /></div>
            <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--color-border)" }}>
              <table className="w-full border-collapse">
                <tbody>
                  {category.specs!.map(({ label, value }, i) => (
                    <tr key={label} style={{ background: i % 2 === 0 ? "var(--color-surface)" : "var(--background)", borderBottom: i < category.specs!.length - 1 ? "1px solid var(--color-border)" : undefined }}>
                      <td className="py-3 px-5 text-[13px] font-semibold" style={{ color: "var(--color-muted)", width: "42%" }}>{label}</td>
                      <td className="py-3 px-5 text-[14px]" style={{ color: "var(--color-text)" }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {hasModels && (
        <section aria-labelledby="models-heading" style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8"><SectionHeader eyebrow="Models" heading="Product Models" headingId="models-heading" /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.models!.map(({ name, description }) => (
                <div key={name} className="flex flex-col gap-3 p-6 rounded-xl" style={{ background: "var(--background)", border: "1px solid var(--color-border)" }}>
                  <h3 className="font-bold text-[15px] leading-snug" style={{ color: "var(--color-text)" }}>{name}</h3>
                  {description && <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>{description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasSolutionCards && (
        <section aria-labelledby="solution-heading" style={{ background: "var(--background)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-10"><SectionHeader eyebrow="Our Solutions" heading="What We Offer" headingId="solution-heading" /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {category.solutionCards!.map(({ title, description }) => (
                <div key={title} className="flex flex-col gap-4 p-6 rounded-xl" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <div className="w-8 h-0.5" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold text-[15px] leading-snug" style={{ color: "var(--color-text)" }}>{title}</h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-label="Page navigation" style={{ background: "var(--background)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href={p.products} className="inline-flex items-center gap-2 text-[13px] font-semibold transition-opacity hover:opacity-75" style={{ color: "var(--color-muted)" }}>
              <ArrowLeft size={14} aria-hidden="true" />
              All Products
            </Link>
            <Link href={p.contact} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "var(--color-accent)" }}>
              Get a Quote
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
