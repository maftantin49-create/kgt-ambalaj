import SectionHeader from "@/components/ui/SectionHeader"
import { sectors } from "@/data/sectors"
import { home } from "@/data/home"

const { sectorsSection } = home

export default function SectorsSection() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector) => {
            const Icon = sector.icon
            return (
              <div
                key={sector.id}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                {/* İkon */}
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                  style={{
                    background: "rgba(200,38,26,0.06)",
                    border: "1px solid rgba(200,38,26,0.14)",
                  }}
                  aria-hidden="true"
                >
                  <Icon size={18} style={{ color: "var(--color-accent)" }} />
                </div>

                {/* Metin */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span
                    className="text-[15px] font-semibold leading-snug"
                    style={{ color: "var(--color-text)" }}
                  >
                    {sector.name}
                  </span>
                  <span
                    className="text-[13px] leading-relaxed"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {sector.description}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
