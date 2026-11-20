import type { Metadata } from "next"
import { buildAlternates } from "@/lib/seo"
import { site } from "@/config/site"

export function generateStaticParams() {
  return [{ locale: "en" }]
}

export function generateMetadata(): Metadata {
  return {
    title: "Privacy Policy — KGT Ambalaj",
    description:
      "KGT Ambalaj privacy policy and data protection notice covering personal data processing on this website.",
    alternates: buildAlternates("en", "/en/privacy", "/tr/gizlilik"),
    robots: { index: false },
  }
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
          This notice describes how KGT Ambalaj handles personal data collected through this website.
        </p>
      </div>

      <div className="flex flex-col gap-10 text-[14px] leading-relaxed" style={{ color: "var(--color-text)" }}>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            1. Data Controller
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            This website is operated by KGT Ambalaj. Contact details for the data controller
            are available on our{" "}
            <a href="/en/contact" style={{ color: "var(--color-accent-dark)" }}>contact page</a>.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            2. Data We Collect
          </h2>
          <p className="mb-3" style={{ color: "var(--color-muted)" }}>
            Personal data is collected only when you submit the contact form. The fields collected are:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5" style={{ color: "var(--color-muted)" }}>
            <li>Full name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Message content</li>
          </ul>
          <p className="mt-3" style={{ color: "var(--color-muted)" }}>
            No personal data is collected passively. This site does not use Google Analytics,
            Meta Pixel, GTM or any third-party tracking scripts.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            3. Purpose and Legal Basis
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Data submitted through the contact form is used solely to respond to your enquiry.
            The legal basis is our legitimate interest in responding to business enquiries and,
            where applicable, your consent at the time of submission.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            4. Retention and Sharing
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Personal data is retained only for as long as necessary to fulfil the purpose for
            which it was collected. We do not sell, rent or share your data with third parties
            for commercial purposes. Data may be disclosed to public authorities only where
            required by law.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            5. Your Rights
          </h2>
          <p className="mb-3" style={{ color: "var(--color-muted)" }}>
            Depending on applicable law, you may have the right to:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5" style={{ color: "var(--color-muted)" }}>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing based on legitimate interests</li>
            <li>Request restriction of processing</li>
          </ul>
          <p className="mt-3" style={{ color: "var(--color-muted)" }}>
            To exercise these rights, please contact us via{" "}
            {site.phone && (
              <a href={`tel:${site.phone}`} style={{ color: "var(--color-accent-dark)" }}>
                {site.phoneDisplay}
              </a>
            )}{" "}
            or the{" "}
            <a href="/en/contact" style={{ color: "var(--color-accent-dark)" }}>contact form</a>.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            6. Cookies
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            This site uses only essential technical cookies required for correct operation.
            No analytics or marketing cookies are set. See our{" "}
            <a href="/en/cookie-policy" style={{ color: "var(--color-accent-dark)" }}>
              Cookie Policy
            </a>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            7. Policy Updates
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            This policy may be updated to reflect changes in legal requirements or how the
            site operates. The current version is always published on this page.
          </p>
        </section>

      </div>
    </main>
  )
}
