import type { Metadata } from "next"
import { buildAlternates } from "@/lib/seo"

export function generateStaticParams() {
  return [{ locale: "en" }]
}

export function generateMetadata(): Metadata {
  return {
    title: "Cookie Policy — KGT Ambalaj",
    description: "Information about cookies used on the KGT Ambalaj website.",
    alternates: buildAlternates("en", "/en/cookie-policy", "/tr/cerez-politikasi"),
    robots: { index: false },
  }
}

export default function CookiePolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[2px] shrink-0" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-accent-dark)" }}>
            Legal
          </p>
        </div>
        <h1 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(26px,3.5vw,42px)" }}>
          Cookie Policy
        </h1>
      </div>

      <div className="flex flex-col gap-10 text-[14px] leading-relaxed" style={{ color: "var(--color-text)" }}>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            What Are Cookies?
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Cookies are small text files placed on your device by websites you visit. They are
            used to make sites work correctly or to remember your preferences.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            Cookies Used on This Site
          </h2>
          <p className="mb-4" style={{ color: "var(--color-muted)" }}>
            This site uses only strictly necessary technical cookies.
          </p>
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--color-text)" }}>Cookie</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--color-text)" }}>Type</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--color-text)" }}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>
                    <code className="text-[12px]">NEXT_LOCALE</code>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>
                    Essential
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>
                    Remembers your chosen language (TR/EN)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)" }}>Session cookie</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)" }}>Essential</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)" }}>Technical operation during browser session</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            Analytics and Marketing Cookies
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            This site does not use any analytics tools (such as Google Analytics), marketing
            pixels (such as Meta Pixel), or any third-party tracking scripts. No consent
            mechanism for non-essential cookies is therefore required.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            Managing Cookies
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            You can delete or block cookies through your browser settings. Blocking essential
            cookies may affect the correct functioning of the site.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            Questions
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            If you have questions about our use of cookies, please visit our{" "}
            <a href="/en/contact" style={{ color: "var(--color-accent-dark)" }}>contact page</a>.
          </p>
        </section>

      </div>
    </main>
  )
}
