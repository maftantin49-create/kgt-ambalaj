import Link from "next/link"
import Image from "next/image"
import { site } from "@/config/site"
import { getProducts } from "@/data/index"
import { localePaths, type Locale } from "@/config/i18n"

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
  const rightsLabel   = locale === "tr"
    ? `© ${year} ${site.name}. Tüm hakları saklıdır.`
    : `© ${year} ${site.name}. All rights reserved.`

  return (
    <footer
      aria-label={locale === "tr" ? "Site alt bilgisi" : "Site footer"}
      style={{
        background: "#1A1A18",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        color: "#A5A5A3",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Kolon 1 — Şirket */}
          <div className="flex flex-col gap-4">
            <Link href={p.home} className="flex items-center" aria-label={site.name}>
              <Image
                src="/images/kgt/logo-kgt-dark.webp"
                alt={site.name}
                width={131}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            {site.tagline && (
              <p className="text-[13px] leading-relaxed max-w-[220px]" style={{ color: "#6A6A68" }}>
                {site.tagline}
              </p>
            )}
          </div>

          {/* Kolon 2 — Ürünler */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-[12px] font-bold uppercase tracking-[0.15em]"
              style={{ color: "#F0F0EE" }}
            >
              {productsLabel}
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href={p.products}
                  className="text-[13px] transition-colors hover:text-white"
                  style={{ color: "#6A6A68" }}
                >
                  {allLabel}
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={p.product(cat.slug)}
                    className="text-[13px] transition-colors hover:text-white"
                    style={{ color: "#6A6A68" }}
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
              className="text-[12px] font-bold uppercase tracking-[0.15em]"
              style={{ color: "#F0F0EE" }}
            >
              {contactLabel}
            </h3>
            <address className="not-italic flex flex-col gap-2 text-[13px]" style={{ color: "#6A6A68" }}>
              <a href={`tel:${site.phone}`} className="hover:text-white transition-colors">
                {site.phoneDisplay}
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
                    style={{ color: "#6A6A68" }}
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
          borderTop: "1px solid rgba(255,255,255,0.06)",
          color: "#4A4A48",
        }}
      >
        <span>{rightsLabel}</span>
      </div>
    </footer>
  )
}
