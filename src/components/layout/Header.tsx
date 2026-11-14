import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import Logo from "@/components/brand/Logo"
import MobileMenu from "@/components/layout/MobileMenu"
import LanguageSwitch from "@/components/layout/LanguageSwitch"
import NavLinksDesktop from "@/components/layout/NavLinksDesktop"
import { site } from "@/config/site"
import { localePaths, type Locale } from "@/config/i18n"
import { getNavItems } from "@/config/nav"

export default function Header({ locale }: { locale: Locale }) {
  const navItems = getNavItems(locale)
  const ctaLabel = locale === "tr" ? "Teklif Al" : "Get a Quote"
  const ctaHref  = localePaths[locale].contact

  return (
    <header className="relative z-60 w-full">

      {/* ── Üst bilgi çubuğu ────────────────────────────────────── */}
      <div
        className="hidden md:block text-[12px]"
        style={{
          background: "#EEF1F4",
          color: "var(--color-muted)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-10 flex items-center justify-between gap-6">
          <LanguageSwitch locale={locale} />
          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{ color: "var(--color-accent-dark)" }}
            >
              <Phone size={12} aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                style={{ color: "var(--color-muted)" }}
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
          borderBottom: "2px solid var(--color-border)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link
            href={localePaths[locale].home}
            className="shrink-0 flex items-center"
          >
            <Logo variant="light" size="md" />
          </Link>

          {/* Desktop nav */}
          <NavLinksDesktop
            navItems={navItems}
            ariaLabel={locale === "tr" ? "Ana menü" : "Main navigation"}
          />

          {/* CTA + lang switch (mobile) + mobile menu trigger */}
          <div className="flex items-center gap-3">
            <Link
              href={ctaHref}
              className="hidden md:inline-flex items-center px-5 py-2 rounded-md text-[13px] font-semibold transition-colors text-white"
              style={{ background: "var(--color-accent-dark)" }}
            >
              {ctaLabel}
            </Link>

            <div className="md:hidden">
              <LanguageSwitch locale={locale} />
            </div>

            <MobileMenu navItems={navItems} ctaLabel={ctaLabel} ctaHref={ctaHref} />
          </div>

        </div>
      </div>

    </header>
  )
}
