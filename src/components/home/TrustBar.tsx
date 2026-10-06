import { home } from "@/data/home"

export default function TrustBar() {
  const { trustBar } = home

  if (trustBar.length === 0) return null

  return (
    <section
      aria-label="Neden biz"
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {trustBar.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3 px-0 py-4 lg:px-6 lg:py-5 lg:[&:not(:last-child)]:border-r"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: "rgba(200,38,26,0.07)",
                  border: "1px solid rgba(200,38,26,0.15)",
                }}
              >
                <Icon size={16} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
