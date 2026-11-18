"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { localePaths, type Locale } from "@/config/i18n"

function lerp(e0: number, e1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

function ProgressPips({ progress }: { progress: number }) {
  const idx = Math.min(2, Math.floor(progress * 3))
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className="rounded-full transition-all duration-300"
          style={{
            width: i === idx ? 18 : 5,
            height: 5,
            background: i <= idx ? "var(--color-accent)" : "rgba(107,173,212,0.3)",
          }} />
      ))}
    </div>
  )
}

export default function ScrollMachineHero({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress]         = useState(0)
  const [prefersReduced, setPrefersReduced] = useState(false)

  const isTr = locale === "tr"
  const p    = localePaths[locale]
  const productSlug = isTr
    ? "strec-film-sarma-makineleri"
    : "stretch-film-rewinding-machines"

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) {
      setPrefersReduced(true)
      setProgress(1)
      return
    }
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      setProgress(Math.max(0, Math.min(1, -top / scrollable)))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Exterior: full 0–35%, crossfade 35–65%, gone 65–100%
  // Interior: none 0–35%, crossfade 35–65%, full 65–100%
  const exteriorOpacity = 1 - lerp(0.35, 0.65, progress)
  const interiorOpacity = lerp(0.35, 0.65, progress)
  const isFinal         = progress > 0.84
  const ctaOpacity      = lerp(0.84, 0.96, progress)

  return (
    // Outer scroll container — 190vh gives enough travel for the crossfade
    <div ref={containerRef} style={{ height: prefersReduced ? "auto" : "190vh" }}>

      {/* Visually-hidden H1 — required for a11y/SEO; images contain baked visual headings */}
      <h1 className="sr-only">
        {isTr
          ? "Endüstriyel Sarma ve Dilimleme Makineleri — KGT Mak"
          : "Industrial Rewinding and Slitting Machines — KGT Mak"}
      </h1>

      {/* Sticky viewport frame */}
      <div
        style={{
          position:        prefersReduced ? "relative" : "sticky",
          top:             0,
          height:          prefersReduced ? "auto"  : "100vh",
          minHeight:       prefersReduced ? "200px" : "320px",
          aspectRatio:     prefersReduced ? "16/9"  : undefined,
          background:      "#0A0F1A",
          borderBottom:    "2px solid var(--color-border)",
          overflow:        "hidden",
        }}
      >
        {/* ── Image crossfade layer ─────────────────────────────────────── */}
        <div className="absolute inset-0">

          {/* Exterior */}
          <img
            src="/images/kgt/hero-machine-exterior.png"
            alt={isTr ? "Makineyi Dışarıdan İnceleyin" : "Machine Exterior View"}
            className="absolute inset-0 w-full h-full select-none pointer-events-none"
            style={{ objectFit: "contain", opacity: exteriorOpacity }}
            draggable={false}
          />

          {/* Interior */}
          <img
            src="/images/kgt/hero-machine-interior.png"
            alt={isTr ? "Makinenin İç Yapısını İnceleyin" : "Machine Interior View"}
            className="absolute inset-0 w-full h-full select-none pointer-events-none"
            style={{ objectFit: "contain", opacity: interiorOpacity }}
            draggable={false}
          />

        </div>

        {/* ── Scroll hint (first few percent only) ─────────────────────── */}
        {!prefersReduced && progress < 0.07 && (
          <div
            className="absolute bottom-14 inset-x-0 flex justify-center items-center gap-2 z-10"
            style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, letterSpacing: "0.14em" }}
            aria-hidden="true"
          >
            <span>↓</span>
            <span className="font-medium uppercase tracking-widest">
              {isTr ? "Kaydırarak keşfet" : "Scroll to explore"}
            </span>
          </div>
        )}

        {/* ── Final CTA (bottom-right, fades in at end) ────────────────── */}
        {isFinal && (
          <div
            className="absolute bottom-10 right-5 lg:right-14 flex flex-wrap gap-3 z-10"
            style={{ opacity: ctaOpacity, transition: "opacity 300ms ease" }}
          >
            <Link
              href={p.product(productSlug)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--color-accent-dark)" }}
            >
              {isTr ? "Ürünü İncele" : "View Product"}
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
            <Link
              href={p.contact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold transition-opacity hover:opacity-70"
              style={{ color: "white", border: "1px solid rgba(255,255,255,0.28)" }}
            >
              {isTr ? "Teklif Al" : "Get a Quote"}
            </Link>
          </div>
        )}

        {/* ── Progress bar ─────────────────────────────────────────────── */}
        {!prefersReduced && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] z-10"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full"
              style={{
                width:      `${progress * 100}%`,
                background: "var(--color-accent)",
                transition: "width 80ms linear",
              }}
            />
          </div>
        )}

        {/* ── Progress pips ─────────────────────────────────────────────── */}
        {!prefersReduced && <ProgressPips progress={progress} />}

      </div>
    </div>
  )
}
