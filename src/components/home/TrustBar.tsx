import { getHomeData } from "@/data/index"
import type { Locale } from "@/config/i18n"

export default function TrustBar({ locale }: { locale: Locale }) {
  const { trustBar } = getHomeData(locale)

  if (trustBar.length === 0) return null

  return (
    <section
      aria-label={locale === "en" ? "Why choose us" : "Neden biz"}
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {trustBar.map(({ title, desc }, i) => (
            <div
              key={title}
              className="flex flex-col gap-1 py-5 lg:py-6 px-0 lg:px-6 lg:[&:not(:last-child)]:border-r"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="w-5 h-px mb-2"
                style={{ background: "var(--color-accent)" }}
                aria-hidden="true"
              />
              <span
                className="text-[13px] font-semibold leading-snug"
                style={{ color: "var(--color-text)" }}
              >
                {title}
              </span>
              {desc && (
                <span
                  className="text-[12px] leading-snug hidden sm:block"
                  style={{ color: "var(--color-muted)" }}
                >
                  {desc}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
