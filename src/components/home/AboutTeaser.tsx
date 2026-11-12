import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Sol: metin */}
          <div className="flex flex-col gap-7">
            <SectionHeader
              eyebrow={aboutTeaser.eyebrow}
              heading={aboutTeaser.heading}
              headingId="about-teaser-heading"
            />

            {aboutTeaser.paragraphs.length > 0 && (
              <div className="flex flex-col gap-4 max-w-lg">
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

            {aboutTeaser.ctaLabel && (
              <Link
                href={localePaths[locale].about}
                className="inline-flex items-center gap-2 text-[14px] font-semibold transition-opacity hover:opacity-75 self-start"
                style={{ color: "var(--color-accent)" }}
              >
                {aboutTeaser.ctaLabel}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
          </div>

          {/* Sağ: görsel alanı */}
          <div
            className="relative rounded-lg overflow-hidden w-full"
            style={{ aspectRatio: "4/3" }}
          >
            {aboutTeaser.image ? (
              <Image
                src={aboutTeaser.image}
                alt={locale === "tr" ? "KGT Ambalaj üretim hattı" : "KGT Ambalaj production line"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
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
