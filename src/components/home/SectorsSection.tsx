import SectionHeader from "@/components/ui/SectionHeader"
import { getHomeData, getSectors } from "@/data/index"
import type { Locale } from "@/config/i18n"

export default function SectorsSection({ locale }: { locale: Locale }) {
  const { sectorsSection } = getHomeData(locale)
  const sectors = getSectors(locale)

  return (
    <section
      aria-labelledby="sectors-heading"
      style={{
        background: "var(--background)",
        borderBottom: "2px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">

        <div className="mb-12 max-w-xl">
          <SectionHeader
            eyebrow={sectorsSection.eyebrow}
            heading={sectorsSection.heading}
            headingId="sectors-heading"
            description={sectorsSection.description}
          />
        </div>

        <div
          className="flex flex-col"
          style={{ borderTop: "2px solid var(--color-border)" }}
        >
          {sectors.map((sector, i) => (
            <div
              key={sector.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 py-10 lg:py-14 items-start"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              {/* Sol: büyük numara + sektör adı */}
              <div className="flex items-start gap-6 lg:gap-8">
                <span
                  className="font-mono font-black leading-none tabular-nums shrink-0 select-none"
                  style={{
                    fontSize: "clamp(40px, 4.5vw, 60px)",
                    color: "var(--color-accent)",
                    letterSpacing: "-0.02em",
                    lineHeight: "1",
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="font-black leading-snug"
                  style={{
                    color: "var(--color-text)",
                    fontSize: "clamp(20px, 2.4vw, 32px)",
                    paddingTop: "0.1em",
                  }}
                >
                  {sector.name}
                </h3>
              </div>

              {/* Sağ: açıklama */}
              <p
                className="text-[15px] leading-relaxed lg:pt-1"
                style={{ color: "var(--color-muted)" }}
              >
                {sector.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
