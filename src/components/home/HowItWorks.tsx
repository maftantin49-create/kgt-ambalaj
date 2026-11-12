import SectionHeader from "@/components/ui/SectionHeader"
import { getHomeData } from "@/data/index"
import type { Locale } from "@/config/i18n"

export default function HowItWorks({ locale }: { locale: Locale }) {
  const { howItWorks } = getHomeData(locale)

  if (howItWorks.steps.length === 0) return null

  return (
    <section
      aria-labelledby="how-it-works-heading"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">

        <div className="mb-10 lg:mb-14">
          <SectionHeader
            eyebrow={howItWorks.eyebrow}
            heading={howItWorks.heading}
            headingId="how-it-works-heading"
            description={howItWorks.description}
          />
        </div>

        <ol
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "var(--color-border)" }}
        >
          {howItWorks.steps.map(({ number, title, description }) => (
            <li
              key={number}
              className="flex flex-col gap-4 p-7 lg:p-8"
              style={{ background: "var(--color-surface)" }}
            >
              <span
                className="font-black leading-none select-none"
                style={{
                  fontSize: "clamp(40px, 4vw, 60px)",
                  color: "var(--color-border)",
                  letterSpacing: "-0.04em",
                }}
                aria-hidden="true"
              >
                {number}
              </span>
              <div className="flex flex-col gap-2">
                <h3
                  className="font-bold text-[15px] leading-snug"
                  style={{ color: "var(--color-text)" }}
                >
                  {title}
                </h3>
                {description && (
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  )
}
