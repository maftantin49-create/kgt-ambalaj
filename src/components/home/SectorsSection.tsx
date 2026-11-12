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
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">

        <div className="mb-10 max-w-xl">
          <SectionHeader
            eyebrow={sectorsSection.eyebrow}
            heading={sectorsSection.heading}
            headingId="sectors-heading"
            description={sectorsSection.description}
          />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {sectors.map((sector, i) => (
            <div
              key={sector.id}
              className="flex flex-col gap-3 py-7 sm:px-8 sm:[&:not(:last-child)]:border-r"
              style={{
                borderColor: "var(--color-border)",
                borderTop: i > 0 ? "1px solid var(--color-border)" : undefined,
              }}
            >
              <div
                className="w-5 h-px"
                style={{ background: "var(--color-accent)" }}
                aria-hidden="true"
              />
              <h3
                className="font-bold text-[16px] leading-snug"
                style={{ color: "var(--color-text)" }}
              >
                {sector.name}
              </h3>
              <p
                className="text-[13px] leading-relaxed"
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
