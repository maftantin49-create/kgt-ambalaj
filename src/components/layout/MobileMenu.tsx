"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { site } from "@/config/site"
import type { NavItem } from "@/config/nav"

interface MobileMenuProps {
  navItems: NavItem[]
  ctaLabel: string
  ctaHref: string
}

export default function MobileMenu({ navItems, ctaLabel, ctaHref }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setOpenGroup(null)
      return
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  return (
    <>
      <button
        className="md:hidden relative z-50 p-2 rounded-md transition-colors hover:bg-[var(--color-surface)]"
        style={{ color: "var(--color-muted)" }}
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen
          ? <X size={22} aria-hidden="true" />
          : <Menu size={22} aria-hidden="true" />
        }
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.18)" }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            id="mobile-nav"
            className="md:hidden fixed top-16 inset-x-0 z-50"
            style={{
              background: "#FFFFFF",
              borderBottom: "1px solid var(--color-border)",
              boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10)",
            }}
          >
            <nav
              aria-label="Mobil navigasyon"
              className="max-w-7xl mx-auto px-6 py-3 flex flex-col"
            >
              {navItems.map((item) => {
                if (item.hidden) return null

                if (item.type === "link") {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-3.5 rounded-lg text-[15px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                      style={{ color: "var(--color-text)" }}
                    >
                      {item.label}
                    </Link>
                  )
                }

                if (item.type === "mega" || item.type === "dropdown") {
                  const isGroupOpen = openGroup === item.key
                  const children =
                    item.type === "mega"
                      ? item.products.map((p) => ({ href: p.href, label: p.name }))
                      : item.children.filter((c) => !c.hidden)

                  return (
                    <div key={item.key}>
                      <button
                        onClick={() => setOpenGroup(isGroupOpen ? null : item.key)}
                        aria-expanded={isGroupOpen}
                        className="w-full flex items-center justify-between px-3 py-3.5 rounded-lg text-[15px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                        style={{ color: "var(--color-text)" }}
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          style={{
                            transition: "transform 150ms",
                            transform: isGroupOpen ? "rotate(180deg)" : "rotate(0deg)",
                            color: "var(--color-muted)",
                          }}
                        />
                      </button>

                      {isGroupOpen && (
                        <div
                          className="ml-3 mb-1 flex flex-col"
                          style={{ borderLeft: "2px solid var(--color-accent)" }}
                        >
                          {children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="pl-4 pr-3 py-2.5 text-[14px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                              style={{ color: "var(--color-muted)" }}
                            >
                              {child.label}
                            </Link>
                          ))}
                          {item.type === "mega" && (
                            <Link
                              href={item.viewAllHref}
                              onClick={() => setIsOpen(false)}
                              className="pl-4 pr-3 py-2.5 text-[13px] font-semibold transition-colors hover:bg-[var(--color-surface)]"
                              style={{ color: "var(--color-accent-dark)" }}
                            >
                              {item.viewAllLabel} →
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  )
                }

                return null
              })}

              <div
                className="flex flex-col gap-2 pt-3 pb-1 mt-2"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                {site.phone && (
                  <a
                    href={`tel:${site.phone}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <Phone size={15} aria-hidden="true" />
                    {site.phoneDisplay}
                  </a>
                )}
                <Link
                  href={ctaHref}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full px-5 py-3 rounded-md text-[14px] font-semibold text-white"
                  style={{ background: "var(--color-accent-dark)" }}
                >
                  {ctaLabel}
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
