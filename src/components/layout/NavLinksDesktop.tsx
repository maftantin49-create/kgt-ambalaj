"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLink {
  href: string
  label: string
}

export default function NavLinksDesktop({
  navLinks,
  ariaLabel,
}: {
  navLinks: NavLink[]
  ariaLabel: string
}) {
  const pathname = usePathname()

  function isActive(href: string): boolean {
    const normalHref = href.replace(/\/$/, "")
    const normalPath = pathname.replace(/\/$/, "")
    if (normalHref === "/tr" || normalHref === "/en") return normalPath === normalHref
    return normalPath === normalHref || normalPath.startsWith(normalHref + "/")
  }

  return (
    <nav className="hidden md:flex items-center gap-1" aria-label={ariaLabel}>
      {navLinks.map(({ href, label }) => {
        const active = isActive(href)
        return (
          <Link
            key={href}
            href={href}
            className="px-3 py-2 rounded-md text-[14px] transition-colors hover:bg-[var(--color-surface)]"
            style={{
              color: active ? "var(--color-text)" : "var(--color-muted)",
              fontWeight: active ? 600 : 500,
            }}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
