import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getHomeData, getProducts } from "@/data/index"
import { localePaths, type Locale } from "@/config/i18n"

export default function HeroSection({ locale }: { locale: Locale }) {
  const hero = getHomeData(locale).hero
  const categories = getProducts(locale)
  const p = localePaths[locale]

  const imgAlt =
    locale === "tr"
      ? "KGT Ambalaj üretim atölyesi — sarma makineleri"
      : "KGT Ambalaj production workshop — rewinding machines"

  return (
    <section
      aria-label={locale === "en" ? "Homepage hero" : "Ana sayfa hero"}
      style={{
        background: "var(--color-surface)",
        borderBottom: "2px solid var(--color-border)",
      }}
    >
      {/* Full-bleed: text sol / image sağ viewport edge'e uzanır */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,52%)]"
        style={{ minHeight: "680px" }}
      >
        {/* ── Metin ──────────────────────────────────────────────── */}
        <div
          className="flex flex-col justify-center gap-6 py-16 px-6 sm:px-8 lg:pr-10"
          style={{
            paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 2rem))",
            borderRight: "1px solid var(--color-border)",
          }}
        >
          {hero.eyebrow && (
            <div className="flex flex-col gap-2">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--color-accent-dark)" }}
              >
                {hero.eyebrow}
              </p>
              <div className="w-8 h-[2px]" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
            </div>
          )}

          <h1
            className="font-black leading-[1.03] tracking-tight max-w-xl"
            style={{
              color: "var(--color-text)",
              fontSize: "clamp(32px, 4.8vw, 68px)",
            }}
          >
            {hero.heading}
          </h1>

          {hero.description && (
            <p
              className="text-[15px] leading-[1.75] max-w-[400px]"
              style={{ color: "var(--color-muted)" }}
            >
              {hero.description}
            </p>
          )}

          {/* Teknik ürün indeksi */}
          <ul
            className="flex flex-col gap-2.5 py-2"
            style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
            role="list"
          >
            {categories.map((cat, i) => (
              <li key={cat.id} className="flex items-center gap-3">
                <span
                  className="font-mono font-bold text-[10px] tabular-nums shrink-0 w-5"
                  style={{ color: "var(--color-accent)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link
                  href={p.product(cat.slug)}
                  className="text-[13px] font-medium leading-snug transition-opacity hover:opacity-70"
                  style={{ color: "var(--color-muted)" }}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 items-center">
            <Link
              href={p.products}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-[14px] text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{ background: "var(--color-accent-dark)" }}
            >
              {hero.primaryCta.label}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            <Link
              href={p.contact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-[14px] transition-opacity hover:opacity-70"
              style={{
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* ── Görsel — sağ sütun viewport edge'e uzanır ──────────── */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: "380px" }}
        >
          {hero.image ? (
            <Image
              src={hero.image}
              alt={imgAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: "var(--color-surface)" }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
