import { Phone, Mail, MapPin } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
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
              eyebrow="GEÇİCİ — İletişim"
              heading="Bizimle İletişime Geçin"
              description="GEÇİCİ — projeniz hakkında bilgi almak veya teklif talep etmek için aşağıdaki kanalları kullanabilirsiniz."
              headingId="contact-teaser-heading"
            />

            <ul className="flex flex-col gap-4" role="list">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
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
              ))}
            </ul>
          </div>

          {/* Sağ: form shell */}
          {/* GEÇİCİ: form backend entegrasyonu yapılmadı, UI iskeleti */}
          <div
            className="rounded-2xl p-7 lg:p-8"
            style={{
              background: "var(--background)",
              border: "1px solid var(--color-border)",
            }}
          >
            <p
              className="text-[13px] font-semibold mb-6 pb-4"
              style={{
                color: "var(--color-muted)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              Teklif / Bilgi Talebi
            </p>

            <form
              aria-label="İletişim formu"
              noValidate
            >
              <fieldset className="flex flex-col gap-4" disabled>
                <legend className="sr-only">İletişim formu alanları</legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-[12px] font-semibold"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Ad Soyad
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Ad Soyad"
                      autoComplete="name"
                      className="w-full rounded-lg px-3.5 py-2.5 text-[14px]"
                      style={{
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        color: "var(--color-text)",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-company"
                      className="text-[12px] font-semibold"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Firma
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Firma adı"
                      autoComplete="organization"
                      className="w-full rounded-lg px-3.5 py-2.5 text-[14px]"
                      style={{
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        color: "var(--color-text)",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-[12px] font-semibold"
                      style={{ color: "var(--color-muted)" }}
                    >
                      E-posta
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="ornek@firma.com"
                      autoComplete="email"
                      className="w-full rounded-lg px-3.5 py-2.5 text-[14px]"
                      style={{
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        color: "var(--color-text)",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="text-[12px] font-semibold"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Telefon
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+90 5xx xxx xx xx"
                      autoComplete="tel"
                      className="w-full rounded-lg px-3.5 py-2.5 text-[14px]"
                      style={{
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        color: "var(--color-text)",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-[12px] font-semibold"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Mesaj
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Proje ihtiyacınızı kısaca açıklayın..."
                    className="w-full rounded-lg px-3.5 py-2.5 text-[14px] resize-none"
                    style={{
                      border: "1px solid var(--color-border)",
                      background: "var(--color-surface)",
                      color: "var(--color-text)",
                      outline: "none",
                    }}
                  />
                </div>

                {/* GEÇİCİ: submit butonu aktif değil, backend entegrasyonu bekleniyor */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-[14px] font-semibold text-white cursor-not-allowed opacity-50"
                    style={{ background: "var(--color-accent)" }}
                    aria-disabled="true"
                  >
                    Gönder
                  </button>
                  <p
                    className="text-[11px] text-center"
                    style={{ color: "var(--color-muted)" }}
                  >
                    GEÇİCİ — form backend entegrasyonu henüz yapılmadı
                  </p>
                </div>

              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
