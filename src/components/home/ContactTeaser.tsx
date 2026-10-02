import { Phone, Mail, MapPin } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import ContactForm from "@/components/contact/ContactForm"
import { site } from "@/config/site"

const contactItems = [
  {
    icon: Phone,
    label: "Telefon",
    value: site.phoneDisplay,
    href: `tel:${site.phone}`,
  },
  {
    icon: Mail,
    label: "E-posta",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "Adres",
    value: site.address,
    href: undefined,
  },
] as const

export default function ContactTeaser() {
  const isConfigured = !!(
    process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL
  )

  return (
    <section
      id="iletisim"
      aria-labelledby="contact-teaser-heading"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Sol: metin + iletişim bilgileri */}
          <div className="flex flex-col gap-8">
            <SectionHeader
              eyebrow="İletişim"
              heading="Bizimle İletişime Geçin"
              headingId="contact-teaser-heading"
            />

            <ul className="flex flex-col gap-4" role="list">
              {contactItems.filter((item) => Boolean(item.value)).map(
                ({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div
                      className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                      style={{
                        background: "rgba(200,38,26,0.06)",
                        border: "1px solid rgba(200,38,26,0.14)",
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={16} style={{ color: "var(--color-accent)" }} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-[11px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          className="text-[14px] font-medium transition-opacity hover:opacity-75"
                          style={{ color: "var(--color-text)" }}
                        >
                          {value}
                        </a>
                      ) : (
                        <span
                          className="text-[14px]"
                          style={{ color: "var(--color-text)" }}
                        >
                          {value}
                        </span>
                      )}
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Sağ: iletişim formu */}
          <ContactForm isConfigured={isConfigured} />

        </div>
      </div>
    </section>
  )
}
