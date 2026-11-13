import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getHomeData } from "@/data/index"
import { localePaths, type Locale } from "@/config/i18n"

export default function AboutTeaser({ locale }: { locale: Locale }) {
  const { aboutTeaser } = getHomeData(locale)

  return (
    <section
      aria-labelledby="about-teaser-heading"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-8">
          <span
            className="w-6 h-[2px] shrink-0"
            style={{ background: "var(--color-accent)" }}
            aria-hidden="true"
          />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--color-accent-dark)" }}
          >
            {aboutTeaser.eyebrow}
          </span>
        </div>

        {/* Full-width image */}
        {aboutTeaser.image && (
          <div
            className="relative overflow-hidden w-full"
            style={{ height: "clamp(280px, 36vw, 520px)" }}
          >
            <Image
              src={aboutTeaser.image}
              alt={locale === "tr" ? "KGT Ambalaj üretim hattı" : "KGT Ambalaj production line"}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) calc(100vw - 4rem), 1280px"
            />
          </div>
        )}

        {/* Text row below image */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-16 mt-8 lg:mt-10 items-start">

          <div className="flex flex-col gap-4">
            <h2
              id="about-teaser-heading"
              className="font-black leading-tight tracking-tight"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(22px, 2.6vw, 38px)",
              }}
            >
              {aboutTeaser.heading}
            </h2>

            {aboutTeaser.paragraphs.length > 0 && (
              <div className="flex flex-col gap-3 max-w-2xl">
                {aboutTeaser.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="leading-[1.75] text-[15px]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>

          {aboutTeaser.ctaLabel && (
            <div className="flex lg:justify-end lg:pt-2">
              <Link
                href={localePaths[locale].about}
                className="inline-flex items-center gap-2 text-[14px] font-semibold transition-opacity hover:opacity-75"
                style={{ color: "var(--color-accent-dark)" }}
              >
                {aboutTeaser.ctaLabel}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
