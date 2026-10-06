import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import ProductCard from "@/components/product/ProductCard"
import { productCategories } from "@/data/products"
import { home } from "@/data/home"

const { productsSection } = home

export default function ProductsSection() {
  return (
    <section
      aria-labelledby="products-heading"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">

        {/* Başlık satırı */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <SectionHeader
            eyebrow={productsSection.eyebrow}
            heading={productsSection.heading}
            headingId="products-heading"
            description={productsSection.description}
          />
          <Link
            href="/urunler"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold shrink-0 transition-colors hover:opacity-80"
            style={{ color: "var(--color-accent)" }}
          >
            {productsSection.viewAllLabel}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Kart grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {productCategories.map((cat) => (
            <ProductCard key={cat.id} category={cat} />
          ))}
        </div>

      </div>
    </section>
  )
}
