"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import type { NavItem, NavMegaItem, NavDropdownItem } from "@/config/nav"

interface Props {
  navItems: NavItem[]
  ariaLabel: string
}

export default function NavLinksDesktop({ navItems, ariaLabel }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const pathname = usePathname()

  const close = useCallback(() => setOpenKey(null), [])

  useEffect(() => {
    if (!openKey) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [openKey, close])

  useEffect(() => {
    if (!openKey) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
        triggerRefs.current[openKey]?.focus()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [openKey, close])

  function isLinkActive(href: string): boolean {
    const normalHref = href.replace(/\/$/, "")
    const normalPath = pathname.replace(/\/$/, "")
    if (normalHref === "/tr" || normalHref === "/en") return normalPath === normalHref
    return normalPath === normalHref || normalPath.startsWith(normalHref + "/")
  }

  function isGroupActive(prefixes: string[]): boolean {
    const normalPath = pathname.replace(/\/$/, "")
    return prefixes.some(
      (prefix) => normalPath === prefix || normalPath.startsWith(prefix + "/")
    )
  }

  return (
    <nav ref={navRef} className="hidden md:flex items-center gap-0.5" aria-label={ariaLabel}>
      {navItems.map((item) => {
        if (item.hidden) return null

        if (item.type === "link") {
          const active = isLinkActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="px-3 py-2 rounded-md text-[14px] transition-colors hover:bg-[var(--color-surface)]"
              style={{
                color: active ? "var(--color-text)" : "var(--color-muted)",
                fontWeight: active ? 600 : 500,
              }}
            >
              {item.label}
            </Link>
          )
        }

        if (item.type === "mega" || item.type === "dropdown") {
          const isOpen = openKey === item.key
          const active = isGroupActive(item.activePrefixes)

          return (
            <div key={item.key} className="relative">
              <button
                ref={(el) => { triggerRefs.current[item.key] = el }}
                onClick={() => setOpenKey(isOpen ? null : item.key)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-current={active ? "true" : undefined}
                className="flex items-center gap-1 px-3 py-2 rounded-md text-[14px] transition-colors hover:bg-[var(--color-surface)]"
                style={{
                  color: active ? "var(--color-text)" : "var(--color-muted)",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {item.label}
                <ChevronDown
                  size={13}
                  aria-hidden="true"
                  style={{
                    transition: "transform 150ms",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Always in DOM so aria-current on child links is discoverable */}
              <div
                style={{ display: isOpen ? "block" : "none" }}
                aria-hidden={!isOpen}
              >
                {item.type === "mega" ? (
                  <MegaPanel
                    item={item}
                    isLinkActive={isLinkActive}
                    onClose={close}
                  />
                ) : (
                  <DropdownPanel
                    item={item}
                    isLinkActive={isLinkActive}
                    onClose={close}
                  />
                )}
              </div>
            </div>
          )
        }

        return null
      })}
    </nav>
  )
}

// ── Mega panel (products) ─────────────────────────────────────────────────────

function MegaPanel({
  item,
  isLinkActive,
  onClose,
}: {
  item: NavMegaItem
  isLinkActive: (href: string) => boolean
  onClose: () => void
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        width: "480px",
        background: "#FFFFFF",
        border: "1px solid var(--color-border)",
        borderTop: "2px solid var(--color-accent)",
        zIndex: 50,
      }}
    >
      {item.products.map((product, i) => {
        const active = isLinkActive(product.href)
        return (
          <Link
            key={product.href}
            href={product.href}
            onClick={onClose}
            aria-current={active ? "page" : undefined}
            className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-[var(--color-surface)]"
            style={{
              borderBottom: i < item.products.length - 1 ? "1px solid var(--color-border)" : undefined,
            }}
          >
            <span
              className="shrink-0 font-black tabular-nums"
              style={{
                fontSize: "13px",
                lineHeight: "20px",
                color: "var(--color-border)",
                minWidth: "24px",
              }}
              aria-hidden="true"
            >
              {product.number}
            </span>
            <div>
              <div
                className="font-semibold leading-snug"
                style={{
                  fontSize: "13px",
                  color: active ? "var(--color-accent-dark)" : "var(--color-text)",
                }}
              >
                {product.name}
              </div>
              <div
                className="mt-0.5 leading-snug"
                style={{ fontSize: "12px", color: "var(--color-muted)" }}
              >
                {product.desc}
              </div>
            </div>
          </Link>
        )
      })}

      {/* Footer row */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <Link
          href={item.viewAllHref}
          onClick={onClose}
          className="text-[12px] font-semibold transition-colors hover:opacity-75"
          style={{ color: "var(--color-muted)" }}
        >
          {item.viewAllLabel}
        </Link>
        <Link
          href={item.ctaHref}
          onClick={onClose}
          className="text-[12px] font-bold transition-opacity hover:opacity-80"
          style={{ color: "var(--color-accent-dark)" }}
        >
          {item.ctaLabel} →
        </Link>
      </div>
    </div>
  )
}

// ── Dropdown panel (corporate etc.) ──────────────────────────────────────────

function DropdownPanel({
  item,
  isLinkActive,
  onClose,
}: {
  item: NavDropdownItem
  isLinkActive: (href: string) => boolean
  onClose: () => void
}) {
  const visibleChildren = item.children.filter((c) => !c.hidden)

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        minWidth: "200px",
        background: "#FFFFFF",
        border: "1px solid var(--color-border)",
        borderTop: "2px solid var(--color-accent)",
        zIndex: 50,
      }}
    >
      {visibleChildren.map((child, i) => {
        const active = isLinkActive(child.href)
        return (
          <Link
            key={child.href}
            href={child.href}
            onClick={onClose}
            aria-current={active ? "page" : undefined}
            className="block px-5 py-3 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            style={{
              color: active ? "var(--color-text)" : "var(--color-muted)",
              fontWeight: active ? 600 : 500,
              borderBottom: i < visibleChildren.length - 1 ? "1px solid var(--color-border)" : undefined,
            }}
          >
            {child.label}
          </Link>
        )
      })}
    </div>
  )
}
