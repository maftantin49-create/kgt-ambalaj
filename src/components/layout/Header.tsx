import Link from "next/link"
import Image from "next/image"
import { Phone, Mail } from "lucide-react"
import MobileMenu from "@/components/layout/MobileMenu"
import LanguageSwitch from "@/components/layout/LanguageSwitch"
import { site } from "@/config/site"
import { localePaths, type Locale } from "@/config/i18n"

interface NavLink {
  href: string
  label: string
}

function getNavLinks(locale: Locale): NavLink[] {
  const p = localePaths[locale]
  if (locale === "tr") {
    return [
      { href: p.home,     label: "Ana Sayfa"  },
      { href: p.products, label: "Ürünler"    },
      { href: p.about,    label: "Hakkımızda" },
      { href: p.contact,  label: "İletişim"   },
    ]
  }
  return [
    { href: p.home,     label: "Home"     },
    { href: p.products, label: "Products" },
    { href: p.about,    label: "About"    },
    { href: p.contact,  label: "Contact"  },
  ]
}

export default function Header({ locale }: { locale: Locale }) {
  const navLinks = getNavLinks(locale)
  const ctaLabel = locale === "tr" ? "Teklif Al" : "Get a Quote"
  const ctaHref  = localePaths[locale].contact

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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-9 flex items-center justify-between gap-6">
          <LanguageSwitch locale={locale} />
          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone size={12} aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail size={12} aria-hidden="true" />
                {site.email}
              </a>
            )}
          </div>
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
          <Link href={localePaths[locale].home} className="shrink-0 flex items-center" aria-label={site.name}>
            <Image
              src="/images/kgt/logo-kgt.png"
              alt={site.name}
              width={78}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label={locale === "tr" ? "Ana menü" : "Main navigation"}>
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

          {/* CTA + lang switch (mobile) + mobile menu trigger */}
          <div className="flex items-center gap-3">
            <Link
              href={ctaHref}
              className="hidden md:inline-flex items-center px-5 py-2 rounded-lg text-[13px] font-semibold transition-colors text-white"
              style={{ background: "var(--color-accent)" }}
            >
              {ctaLabel}
            </Link>

            <div className="md:hidden">
              <LanguageSwitch locale={locale} />
            </div>

            <MobileMenu navLinks={navLinks} ctaLabel={ctaLabel} ctaHref={ctaHref} />
          </div>

        </div>
      </div>

    </header>
  )
}
