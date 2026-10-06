import SectionHeader from "@/components/ui/SectionHeader"
import { home } from "@/data/home"

const { howItWorks } = home

export default function HowItWorks() {
  if (howItWorks.steps.length === 0) return null

  return (
    <section
      aria-labelledby="how-it-works-heading"
      style={{
        background: "var(--background)",
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
            align="center"
          />
        </div>

        <ol
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden"
          style={{ background: "var(--color-border)" }}
        >
          {howItWorks.steps.map(({ number, title, description, icon: Icon }) => (
            <li
              key={number}
              className="flex flex-col gap-5 p-7 lg:p-8"
              style={{ background: "var(--background)" }}
            >
              {/* Numara + ikon satırı */}
              <div className="flex items-center justify-between">
                <span
                  className="font-black leading-none select-none"
                  style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    color: "rgba(200,38,26,0.15)",
                    letterSpacing: "-0.02em",
                  }}
                  aria-hidden="true"
                >
                  {number}
                </span>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                  aria-hidden="true"
                >
                  <Icon size={17} style={{ color: "var(--color-accent)" }} />
                </div>
              </div>

              {/* Başlık + açıklama */}
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
