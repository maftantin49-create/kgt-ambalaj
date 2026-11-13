import Link from "next/link"
import Logo from "@/components/brand/Logo"
import { site } from "@/config/site"
import { getProducts } from "@/data/index"
import { localePaths, type Locale } from "@/config/i18n"

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear()
  const p = localePaths[locale]
  const categories = getProducts(locale)

  const companyLinks =
    locale === "tr"
      ? [
          { href: p.about,   label: "Hakkımızda" },
          { href: p.contact, label: "İletişim"   },
        ]
      : [
          { href: p.about,   label: "About"   },
          { href: p.contact, label: "Contact" },
        ]

  const productsLabel = locale === "tr" ? "Ürünler"     : "Products"
  const allLabel      = locale === "tr" ? "Tüm Ürünler" : "All Products"
  const contactLabel  = locale === "tr" ? "İletişim"    : "Contact"
  const waLabel       = locale === "tr" ? "WhatsApp"    : "WhatsApp"
  const rightsLabel   = locale === "tr"
    ? `© ${year} ${site.name}. Tüm hakları saklıdır.`
    : `© ${year} ${site.name}. All rights reserved.`

  return (
    <footer
      aria-label={locale === "tr" ? "Site alt bilgisi" : "Site footer"}
      style={{
        background: "#1A1A18",
        borderTop: "2px solid rgba(255,255,255,0.10)",
        color: "#A5A5A3",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Kolon 1 — Şirket */}
          <div className="flex flex-col gap-4">
            <Link href={p.home} className="flex items-center">
              <Logo variant="dark" size="sm" />
            </Link>
            {site.tagline && (
              <p className="text-[13px] leading-relaxed max-w-[220px]" style={{ color: "#7A7A78" }}>
                {site.tagline}
              </p>
            )}
          </div>

          {/* Kolon 2 — Ürünler */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.16em] mb-1"
              style={{ color: "#F0F0EE" }}
            >
              {productsLabel}
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href={p.products}
                  className="text-[13px] transition-colors hover:text-white"
                  style={{ color: "#7A7A78" }}
                >
                  {allLabel}
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={p.product(cat.slug)}
                    className="text-[13px] transition-colors hover:text-white"
                    style={{ color: "#7A7A78" }}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolon 3 — İletişim */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.16em] mb-1"
              style={{ color: "#F0F0EE" }}
            >
              {contactLabel}
            </h3>
            <address className="not-italic flex flex-col gap-2 text-[13px]" style={{ color: "#7A7A78" }}>
              <a href={`tel:${site.phone}`} className="hover:text-white transition-colors">
                {site.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${site.waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-white"
                style={{ color: "#25D366" }}
              >
                <WhatsAppIcon size={13} />
                {waLabel}
              </a>
              {site.email && (
                <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                  {site.email}
                </a>
              )}
              {site.address && <span>{site.address}</span>}
            </address>
            <ul className="flex flex-col gap-2 mt-1">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] transition-colors hover:text-white"
                    style={{ color: "#7A7A78" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Alt bar */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px]"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          color: "#6A6A68",
        }}
      >
        <span>{rightsLabel}</span>
      </div>
    </footer>
  )
}
