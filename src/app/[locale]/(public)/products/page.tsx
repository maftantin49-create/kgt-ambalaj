import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ChevronRight, MessageSquare } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import ProductCard from "@/components/product/ProductCard"
import { productCategories } from "@/data/products"
import { localePaths, isValidLocale, type Locale } from "@/config/i18n"

export const metadata: Metadata = { title: "Products" }

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale) || locale !== "en") notFound()
  const p = localePaths[locale as Locale]

  return (
    <>
      <section style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <nav aria-label="Page location" className="flex items-center gap-1.5 mb-6">
            <Link href={p.home} className="text-[12px] transition-opacity hover:opacity-75" style={{ color: "var(--color-muted)" }}>Home</Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <span className="text-[12px] font-semibold" style={{ color: "var(--color-text)" }}>Products</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl flex flex-col gap-4">
              <h1 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                Product Categories
              </h1>
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
                Explore KGT Ambalaj&apos;s full range of industrial packaging machinery — from stretch wrapping to strapping systems.
              </p>
            </div>
            <div className="shrink-0 px-4 py-2 rounded-lg text-[13px] font-semibold self-start sm:self-auto" style={{ background: "var(--background)", border: "1px solid var(--color-border)", color: "var(--color-muted)" }}>
              {productCategories.length} categories
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="products-list-heading" style={{ background: "var(--background)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="mb-10">
            <SectionHeader eyebrow="Product Lines" heading="All Categories" headingId="products-list-heading" description="Industrial packaging solutions for every application — find the right machine for your production line." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {productCategories.map((category) => (
              <ProductCard key={category.id} category={category} locale="en" />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="product-support-heading" style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(200,38,26,0.06)", border: "1px solid rgba(200,38,26,0.14)" }} aria-hidden="true">
              <MessageSquare size={22} style={{ color: "var(--color-accent)" }} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-1">
              <div className="flex flex-col gap-1">
                <h2 id="product-support-heading" className="font-bold text-[16px]" style={{ color: "var(--color-text)" }}>Need help finding the right machine?</h2>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>Our team provides technical consulting and product selection support.</p>
              </div>
              <Link href={p.contact} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white transition-opacity hover:opacity-90 shrink-0" style={{ background: "var(--color-accent)" }}>
                Get a Quote
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
