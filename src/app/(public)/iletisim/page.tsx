import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import ContactForm from "@/components/contact/ContactForm"
import { site } from "@/config/site"

export const metadata: Metadata = {
  title: "İletişim",
  description: "GEÇİCİ — KGT Ambalaj iletişim bilgileri ve teklif formu meta description buraya gelecek",
}

const infoCards = [
  {
    icon: Phone,
    label: "Telefon",
    value: site.phoneDisplay,
    href: `tel:${site.phone}`,
    note: "",
  },
  ...(site.email ? [{
    icon: Mail,
    label: "E-posta",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "",
  }] : []),
  ...(site.address ? [{
    icon: MapPin,
    label: "Adres",
    value: site.address,
    href: undefined as string | undefined,
    note: "",
  }] : []),
]

export default function IletisimPage() {
  const isConfigured = !!(
    process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL
  )

  return (
    <>

      {/* ── 1. İç sayfa hero ────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">

          {/* Breadcrumb */}
          <nav aria-label="Sayfa konumu" className="flex items-center gap-1.5 mb-6">
            <Link
              href="/"
              className="text-[12px] transition-opacity hover:opacity-75"
              style={{ color: "var(--color-muted)" }}
            >
              Ana Sayfa
            </Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <span
              className="text-[12px] font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              İletişim
            </span>
          </nav>

          <div className="max-w-2xl flex flex-col gap-4">
            <h1
              className="font-black leading-tight tracking-tight"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(28px, 3.5vw, 48px)",
              }}
            >
              Bizimle İletişime Geçin
            </h1>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              Projeniz için teklif almak veya teknik danışmanlık talep etmek için aşağıdaki kanalları kullanabilir ya da formu doldurabilirsiniz.
            </p>
          </div>

        </div>
      </section>

      {/* ── 2. İletişim bilgi kartları ───────────────────────────── */}
      <section
        aria-label="İletişim bilgileri"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {infoCards.map(({ icon: Icon, label, value, href, note }) => (
              <div
                key={label}
                className="flex flex-col gap-3 p-6 rounded-xl"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(200,38,26,0.06)",
                    border: "1px solid rgba(200,38,26,0.14)",
                  }}
                  aria-hidden="true"
                >
                  <Icon size={18} style={{ color: "var(--color-accent)" }} />
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="text-[14px] font-medium leading-snug transition-opacity hover:opacity-75"
                      style={{ color: "var(--color-text)" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span
                      className="text-[14px] leading-snug"
                      style={{ color: "var(--color-text)" }}
                    >
                      {value}
                    </span>
                  )}
                  <span
                    className="text-[11px]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Ana iletişim alanı ────────────────────────────────── */}
      <section
        aria-labelledby="contact-form-heading"
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Sol: açıklama + iletişim listesi */}
            <div className="flex flex-col gap-8">
              <SectionHeader
                eyebrow="Teklif Formu"
                heading="Projenizi Anlatın"
                headingId="contact-form-heading"
              />

              <ul className="flex flex-col gap-5" role="list">
                {infoCards.map(({ icon: Icon, label, value, href }) => (
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
                        <span className="text-[14px]" style={{ color: "var(--color-text)" }}>
                          {value}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sağ: iletişim formu */}
            <ContactForm isConfigured={isConfigured} />

          </div>
        </div>
      </section>

      {/* ── 4. Harita alanı — GEÇİCİ placeholder ───────────────── */}
      {/* GEÇİCİ: gerçek adres bilgisi ve harita embed kodu geldiğinde değiştirilecek */}
      <section
        aria-label="Konum haritası"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div
          className="w-full relative overflow-hidden"
          style={{ minHeight: "280px", background: "#EEECEA" }}
          aria-hidden="true"
        >
          {/* Harita grid deseni */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />
          {/* İnce yatay yollar */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.7) 2px, transparent 2px),
                linear-gradient(90deg, rgba(255,255,255,0.7) 2px, transparent 2px)
              `,
              backgroundSize: "192px 192px",
            }}
          />
          {/* Merkez: pin + etiket */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: "var(--color-accent)" }}
              >
                <MapPin size={20} className="text-white" />
              </div>
              <span
                className="text-[11px] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  color: "var(--color-muted)",
                  border: "1px solid var(--color-border)",
                }}
              >
                GEÇİCİ — Harita
              </span>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
