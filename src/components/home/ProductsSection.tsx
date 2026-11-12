import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import { getHomeData, getProducts } from "@/data/index"
import { localePaths, type Locale } from "@/config/i18n"

export default function ProductsSection({ locale }: { locale: Locale }) {
  const { productsSection } = getHomeData(locale)
  const categories = getProducts(locale)
  const p = localePaths[locale]

  const detailLabel = locale === "tr" ? "Detayları İncele" : "View Details"

  return (
    <section
      aria-labelledby="products-heading"
      style={{
        background: "var(--background)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 lg:mb-12">
          <SectionHeader
            eyebrow={productsSection.eyebrow}
            heading={productsSection.heading}
            headingId="products-heading"
          />
          <Link
            href={p.products}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold shrink-0 transition-opacity hover:opacity-75"
            style={{ color: "var(--color-accent)" }}
          >
            {productsSection.viewAllLabel}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

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
                {/* Metin alanı */}
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
                      {detailLabel}
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>

                {/* Görsel — sm+ üzerinde görünür */}
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
                    <div
                      className="absolute inset-0"
                      style={{ background: "#ECECEA" }}
                    />
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ol>

      </div>
    </section>
  )
}
