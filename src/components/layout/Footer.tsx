import Link from "next/link"
import { site } from "@/config/site"
import { productCategories } from "@/data/products"

const companyLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim",   label: "İletişim"   },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      aria-label="Site alt bilgisi"
      style={{
        background: "#1A1A18",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        color: "#A5A5A3",
      }}
    >
      {/* ── Ana footer içeriği ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Kolon 1 — Şirket */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-black text-[18px] tracking-tight"
              style={{ color: "#F0F0EE" }}
            >
              {site.shortName}
              <span className="font-light ml-1.5" style={{ color: "#6A6A68" }}>
                Ambalaj
              </span>
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
              Ürünler
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/urunler"
                  className="text-[13px] transition-colors hover:text-white"
                  style={{ color: "#6A6A68" }}
                >
                  Tüm Ürünler
                </Link>
              </li>
              {productCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={cat.href}
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
              İletişim
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
              {site.address && (
                <span>{site.address}</span>
              )}
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

      {/* ── Alt bar — copyright ──────────────────────────────────── */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px]"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          color: "#4A4A48",
        }}
      >
        <span>© {year} {site.name}. Tüm hakları saklıdır.</span>
      </div>
    </footer>
  )
}
