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

  const detailLabel = locale === "tr" ? "Ürünü İncele" : "View Product"

  return (
    <section
      aria-labelledby="products-heading"
      style={{
        background: "var(--background)",
        borderBottom: "2px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="pt-14 lg:pt-20 pb-10 lg:pb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <SectionHeader
            eyebrow={productsSection.eyebrow}
            heading={productsSection.heading}
            headingId="products-heading"
          />
          <Link
            href={p.products}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold shrink-0 transition-opacity hover:opacity-75"
            style={{ color: "var(--color-accent-dark)" }}
          >
            {productsSection.viewAllLabel}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <ol
          className="flex flex-col"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {categories.map((cat, i) => {
            const imageFirst = i % 2 === 0

            return (
              <li
                key={cat.id}
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <Link
                  href={p.product(cat.slug)}
                  className="group grid grid-cols-1 lg:grid-cols-2"
                  style={{ minHeight: "600px" }}
                >
                  {/* Görsel — desktop'ta 50%, tam yükseklik */}
                  <div
                    className={[
                      "relative overflow-hidden",
                      "h-80 lg:h-auto",
                      imageFirst ? "lg:order-first" : "lg:order-last",
                    ].join(" ")}
                    style={{ background: "var(--color-surface)" }}
                  >
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0" style={{ background: "#ECECEA" }} />
                    )}
                  </div>

                  {/* Metin — 50%, tam hizalanmış */}
                  <div
                    className={[
                      "flex flex-col justify-center gap-6 px-8 py-12 lg:px-14 lg:py-16",
                      imageFirst ? "lg:order-last" : "lg:order-first",
                    ].join(" ")}
                    style={{
                      background: imageFirst ? "var(--background)" : "var(--color-surface)",
                      borderLeft: imageFirst ? "1px solid var(--color-border)" : undefined,
                      borderRight: !imageFirst ? "1px solid var(--color-border)" : undefined,
                    }}
                  >
                    {/* Büyük katalog numarası */}
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-black leading-none tabular-nums select-none"
                        style={{
                          fontSize: "clamp(56px, 6vw, 88px)",
                          color: "var(--color-accent)",
                          letterSpacing: "-0.04em",
                        }}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-mono font-bold text-[13px] tabular-nums"
                        style={{ color: "var(--color-muted)" }}
                        aria-hidden="true"
                      >
                        / {String(categories.length).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Ürün adı */}
                    <h3
                      className="font-black leading-tight"
                      style={{
                        color: "var(--color-text)",
                        fontSize: "clamp(22px, 2.4vw, 32px)",
                      }}
                    >
                      {cat.name}
                    </h3>

                    {/* Açıklama */}
                    <p
                      className="text-[14px] lg:text-[15px] leading-relaxed"
                      style={{ color: "var(--color-muted)", maxWidth: "36ch" }}
                    >
                      {cat.shortDescription}
                    </p>

                    {/* CTA */}
                    <span
                      className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.08em] uppercase transition-opacity group-hover:opacity-75"
                      style={{ color: "var(--color-accent-dark)" }}
                    >
                      {detailLabel}
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>

        <div className="pb-6" />

      </div>
    </section>
  )
}
