"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

interface NavLink {
  href: string
  label: string
}

export default function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  return (
    <>
      <button
        className="md:hidden p-2 rounded-md transition-colors hover:bg-[var(--color-surface)]"
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
          {/* Backdrop — click to close */}
          <div
            className="md:hidden fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.18)" }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel — fixed below the 64px nav bar */}
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
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-3.5 rounded-lg text-[15px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                  style={{ color: "var(--color-text)" }}
                >
                  {label}
                </Link>
              ))}

              <div
                className="pt-3 pb-1 mt-2"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <Link
                  href="/iletisim"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full px-5 py-3 rounded-lg text-[14px] font-semibold text-white"
                  style={{ background: "var(--color-accent)" }}
                >
                  Teklif Al
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
