import Link from "next/link"
import { Phone, Mail, Menu } from "lucide-react"
import { site } from "@/config/site"

const navLinks = [
  { href: "/",          label: "Ana Sayfa" },
  { href: "/urunler",   label: "Ürünler"   },
  { href: "/sektorler", label: "Sektörler" },
  { href: "/hakkimizda",label: "Hakkımızda"},
  { href: "/iletisim",  label: "İletişim"  },
]

export default function Header() {
  return (
    <header className="w-full">

      {/* ── Üst bilgi çubuğu ────────────────────────────────────── */}
      <div
        className="hidden md:block text-[12px]"
        style={{
          background: "#1A1A18",
          color: "#A5A5A3",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-9 flex items-center justify-end gap-6">
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone size={12} aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail size={12} aria-hidden="true" />
            {site.email}
          </a>
        </div>
      </div>

      {/* ── Ana nav ─────────────────────────────────────────────── */}
      <div
        className="w-full"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid var(--color-border)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link
            href="/"
            className="font-black text-[20px] tracking-tight shrink-0"
            style={{ color: "var(--color-text)" }}
          >
            {/* GEÇİCİ — logo görseli eklenecek */}
            <span>{site.shortName}</span>
            <span className="font-light ml-1.5" style={{ color: "var(--color-muted)" }}>
              Ambalaj
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Ana menü">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 rounded-md text-[14px] font-medium transition-colors hover:bg-surface hover:text-text"
                style={{ color: "var(--color-muted)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile trigger */}
          <div className="flex items-center gap-3">
            <Link
              href="/iletisim"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-lg text-[13px] font-semibold transition-colors text-white"
              style={{
                background: "var(--color-accent)",
              }}
            >
              Teklif Al
            </Link>

            {/* Mobile menü butonu — Aşama 2'de client component olacak */}
            <button
              className="md:hidden p-2 rounded-md"
              style={{ color: "var(--color-muted)" }}
              aria-label="Menüyü aç"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>

        </div>
      </div>

    </header>
  )
}
