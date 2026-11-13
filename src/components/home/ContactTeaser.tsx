import { Phone, Mail, MapPin } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import ContactForm from "@/components/contact/ContactForm"
import { site } from "@/config/site"
import { getHomeData } from "@/data/index"
import type { Locale } from "@/config/i18n"

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const labels = {
  tr: { phone: "Telefon", email: "E-posta", address: "Adres", whatsapp: "WhatsApp" },
  en: { phone: "Phone", email: "Email", address: "Address", whatsapp: "WhatsApp" },
}

export default function ContactTeaser({ locale }: { locale: Locale }) {
  const { contactTeaser } = getHomeData(locale)
  const l = labels[locale]

  const isConfigured = !!(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL)

  return (
    <section
      id="contact"
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
              eyebrow={contactTeaser.eyebrow}
              heading={contactTeaser.heading}
              headingId="contact-teaser-heading"
              description={contactTeaser.description}
            />

            <ul className="flex flex-col gap-5" role="list">
              {/* Telefon — her zaman göster */}
              <li className="flex items-start gap-3">
                <Phone
                  size={15}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--color-accent-dark)" }}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-muted)" }}>
                    {l.phone}
                  </span>
                  <a
                    href={`tel:${site.phone}`}
                    className="text-[14px] font-medium transition-opacity hover:opacity-75"
                    style={{ color: "var(--color-text)" }}
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>

              {/* WhatsApp — her zaman göster */}
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "#25D366" }}>
                  <WhatsAppIcon size={15} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-muted)" }}>
                    {l.whatsapp}
                  </span>
                  <a
                    href={`https://wa.me/${site.waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium transition-opacity hover:opacity-75"
                    style={{ color: "var(--color-text)" }}
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>

              {/* E-posta — sadece dolu ise göster */}
              {site.email && (
                <li className="flex items-start gap-3">
                  <Mail
                    size={15}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--color-accent-dark)" }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-muted)" }}>
                      {l.email}
                    </span>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-[14px] font-medium transition-opacity hover:opacity-75"
                      style={{ color: "var(--color-text)" }}
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
              )}

              {/* Adres — sadece dolu ise göster */}
              {site.address && (
                <li className="flex items-start gap-3">
                  <MapPin
                    size={15}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--color-accent-dark)" }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-muted)" }}>
                      {l.address}
                    </span>
                    <span className="text-[14px]" style={{ color: "var(--color-text)" }}>
                      {site.address}
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Sağ: iletişim formu */}
          <ContactForm isConfigured={isConfigured} locale={locale} />

        </div>
      </div>
    </section>
  )
}
