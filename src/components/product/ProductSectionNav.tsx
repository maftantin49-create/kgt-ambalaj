"use client"
import { useEffect, useState } from "react"

export interface SectionNavItem {
  id: string
  label: string
}

export default function ProductSectionNav({
  sections,
  locale,
}: {
  sections: SectionNavItem[]
  locale: "tr" | "en"
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id)
        }
      },
      { rootMargin: "-56px 0px -55% 0px", threshold: 0 }
    )
    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label={locale === "tr" ? "Bölüm navigasyonu" : "Section navigation"}
      data-testid="product-section-nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "var(--background)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8"
        style={{ overflowX: "auto", scrollbarWidth: "none" }}
      >
        <ul
          className="flex items-center whitespace-nowrap"
          role="list"
          style={{ listStyle: "none", padding: 0, margin: 0, gap: 0 }}
        >
          {sections.map(({ id, label }) => {
            const isActive = activeId === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  style={{
                    display: "block",
                    padding: "13px 14px",
                    fontSize: "10px",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--color-text)" : "var(--color-muted)",
                    borderBottom: isActive
                      ? "2px solid var(--color-accent)"
                      : "2px solid transparent",
                    textDecoration: "none",
                    transition: "color 0.15s, border-color 0.15s",
                  }}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
