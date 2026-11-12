import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getHomeData } from "@/data/index"
import { localePaths, type Locale } from "@/config/i18n"

export default function HeroSection({ locale }: { locale: Locale }) {
  const hero = getHomeData(locale).hero
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
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_520px] gap-8 lg:gap-14 py-12 lg:py-20 items-center">

          {/* ── Metin ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {hero.eyebrow && (
              <p
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--color-accent)" }}
              >
                {hero.eyebrow}
              </p>
            )}

            <h1
              className="font-black leading-[1.06] tracking-tight"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(30px, 4.2vw, 56px)",
              }}
            >
              {hero.heading}
            </h1>

            {hero.description && (
              <p
                className="text-[15px] lg:text-[16px] leading-[1.75] max-w-[480px]"
                style={{ color: "var(--color-muted)" }}
              >
                {hero.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href={p.products}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-[14px] text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{ background: "var(--color-accent)" }}
              >
                {hero.primaryCta.label}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>

              <Link
                href={p.contact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-[14px] transition-colors"
                style={{
                  color: "var(--color-text)",
                  background: "#FFFFFF",
                  border: "1px solid var(--color-border)",
                }}
              >
                {hero.secondaryCta.label}
              </Link>
            </div>

          </div>

          {/* ── Görsel ────────────────────────────────────────────── */}
          <div
            className="relative overflow-hidden rounded-lg"
            style={{ aspectRatio: "4/3" }}
          >
            {hero.image ? (
              <Image
                src={hero.image}
                alt={imgAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 460px, 520px"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: "#1E1E1C" }}
              />
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
