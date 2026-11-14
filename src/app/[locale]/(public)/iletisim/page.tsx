import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import ContactForm from "@/components/contact/ContactForm"
import { site } from "@/config/site"
import { localePaths, isValidLocale, type Locale } from "@/config/i18n"
import { buildAlternates } from "@/lib/seo"

export function generateStaticParams() {
  return [{ locale: "tr" }]
}

export function generateMetadata(): Metadata {
  return {
    title: "İletişim",
    description:
      "KGT Ambalaj ile iletişime geçin. Teklif almak veya teknik danışmanlık talebi için formu doldurun ya da doğrudan ulaşın.",
    alternates: buildAlternates("tr", "/tr/iletisim", "/en/contact"),
  }
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const topCards = [
  {
    label: "Telefon",
    value: site.phoneDisplay,
    href: `tel:${site.phone}`,
    isExternal: false,
    iconAccent: "var(--color-accent-dark)" as string,
    Icon: Phone,
  },
  {
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: `https://wa.me/${site.waNumber}`,
    isExternal: true,
    iconAccent: "var(--color-wa)" as string,
    Icon: null,
  },
  ...(site.email ? [{
    label: "E-posta",
    value: site.email,
    href: `mailto:${site.email}`,
    isExternal: false,
    iconAccent: "var(--color-accent-dark)" as string,
    Icon: Mail,
  }] : []),
  ...(site.address ? [{
    label: "Adres",
    value: site.address,
    href: undefined as string | undefined,
    isExternal: false,
    iconAccent: "var(--color-accent-dark)" as string,
    Icon: MapPin,
  }] : []),
]

export default async function IletisimPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale) || locale !== "tr") notFound()
  const p = localePaths[locale as Locale]

  const isConfigured = false

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-surface)", borderBottom: "2px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <nav aria-label="Sayfa konumu" className="flex items-center gap-1.5 mb-6">
            <Link href={p.home} className="text-[12px] transition-opacity hover:opacity-75" style={{ color: "var(--color-muted)" }}>
              Ana Sayfa
            </Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <span className="text-[12px] font-semibold" style={{ color: "var(--color-text)" }}>İletişim</span>
          </nav>
          <div className="max-w-2xl flex flex-col gap-4">
            <h1 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Bizimle İletişime Geçin
            </h1>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Projeniz için teklif almak veya teknik danışmanlık talep etmek için aşağıdaki kanalları kullanabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact cards ─────────────────────────────────────────────── */}
      <section aria-label="İletişim bilgileri" style={{ background: "var(--background)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCards.map(({ label, value, href, isExternal, iconAccent, Icon }) => {
              const inner = (
                <>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(28,100,133,0.06)", border: "1px solid rgba(28,100,133,0.14)" }}
                    aria-hidden="true"
                  >
                    {Icon ? (
                      <Icon size={18} style={{ color: iconAccent }} />
                    ) : (
                      <span style={{ color: iconAccent }}>
                        <WhatsAppIcon size={18} />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-muted)" }}>
                      {label}
                    </span>
                    <span className="text-[14px] font-medium leading-snug break-all" style={{ color: "var(--color-text)" }}>
                      {value}
                    </span>
                  </div>
                </>
              )
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-3 p-5 rounded-md transition-opacity hover:opacity-80"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={label}
                  className="flex items-start gap-3 p-5 rounded-md"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Form section ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="contact-form-heading"
        style={{ background: "var(--color-surface)", borderBottom: "2px solid var(--color-border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left: editorial contact block */}
            <div className="flex flex-col gap-8">
              <SectionHeader
                eyebrow="Teklif Formu"
                heading="Projenizi Anlatın"
                headingId="contact-form-heading"
              />

              <div
                className="flex flex-col"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                {/* Phone */}
                <div
                  className="flex items-start gap-4 py-6"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                  <div className="shrink-0 mt-0.5" style={{ color: "var(--color-accent-dark)" }}>
                    <Phone size={15} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-muted)" }}>
                      Telefon
                    </span>
                    <span className="text-[16px] font-semibold tracking-tight" style={{ color: "var(--color-text)" }}>
                      {site.phoneDisplay}
                    </span>
                    <a
                      href={`tel:${site.phone}`}
                      className="inline-flex items-center gap-1.5 self-start rounded-md px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
                      style={{ background: "var(--color-accent-dark)" }}
                    >
                      Telefon Et
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 py-6">
                  <div className="shrink-0 mt-0.5" style={{ color: "var(--color-wa)" }}>
                    <WhatsAppIcon size={15} />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-muted)" }}>
                      WhatsApp
                    </span>
                    <span className="text-[16px] font-semibold tracking-tight" style={{ color: "var(--color-text)" }}>
                      {site.phoneDisplay}
                    </span>
                    <a
                      href={`https://wa.me/${site.waNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 self-start rounded-md px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
                      style={{ background: "var(--color-wa)" }}
                    >
                      WhatsApp Yaz
                    </a>
                  </div>
                </div>

                {/* Email (if configured) */}
                {site.email && (
                  <div className="flex items-start gap-4 py-6" style={{ borderTop: "1px solid var(--color-border)" }}>
                    <div className="shrink-0 mt-0.5" style={{ color: "var(--color-accent-dark)" }}>
                      <Mail size={15} aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-muted)" }}>
                        E-posta
                      </span>
                      <a href={`mailto:${site.email}`} className="text-[14px] font-medium transition-opacity hover:opacity-75" style={{ color: "var(--color-text)" }}>
                        {site.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: form panel */}
            <ContactForm isConfigured={isConfigured} locale="tr" />
          </div>
        </div>
      </section>
    </>
  )
}
