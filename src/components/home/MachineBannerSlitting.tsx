"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { localePaths, type Locale } from "@/config/i18n"

function useVisible(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Paper slitting machine SVG (480 × 360 viewBox) ───────────────────────────
function SlittingSVG({ active }: { active: boolean }) {
  const filmAnim  = active ? "filmDash 2.0s linear infinite"  : "none"
  const reelAnim  = active ? "reelCW 5s linear infinite"      : "none"
  const chainAnim = active ? "chainDrive 1.0s linear infinite" : "none"

  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" aria-hidden="true">

      {/* ── Background grid ── */}
      <defs>
        <pattern id="mbs-grid" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 0L0 0 0 18" fill="none" stroke="rgba(107,173,212,0.09)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="20" y="20" width="440" height="320" rx="8" fill="url(#mbs-grid)"
        stroke="rgba(28,100,133,0.15)" strokeWidth="1.2" />

      {/* ── Frame members ── */}
      <line x1="20"  y1="20"  x2="20"  y2="340" stroke="rgba(28,100,133,0.2)" strokeWidth="2" />
      <line x1="460" y1="20"  x2="460" y2="340" stroke="rgba(28,100,133,0.2)" strokeWidth="2" />
      <line x1="20"  y1="310" x2="460" y2="310" stroke="rgba(28,100,133,0.15)" strokeWidth="1.5" />

      {/* ── Input roll (left) ── */}
      <g transform="translate(90,130)">
        <circle r="18" fill="rgba(28,100,133,0.12)" stroke="rgba(28,100,133,0.35)" strokeWidth="1.5" />
        <g style={{ animation: reelAnim, transformOrigin: "0px 0px" }}>
          <circle r="68" stroke="var(--color-accent)" strokeWidth="2" strokeOpacity="0.55" fill="rgba(107,173,212,0.03)" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const a = (deg * Math.PI) / 180
            return (
              <line key={deg}
                x1={+(18 * Math.cos(a)).toFixed(2)} y1={+(18 * Math.sin(a)).toFixed(2)}
                x2={+(68 * Math.cos(a)).toFixed(2)} y2={+(68 * Math.sin(a)).toFixed(2)}
                stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.4" />
            )
          })}
        </g>
      </g>

      {/* ── Rotary cutting head (centre top) ── */}
      <g transform="translate(240,118)">
        <circle r="12" fill="rgba(28,100,133,0.12)" stroke="rgba(28,100,133,0.35)" strokeWidth="1.5" />
        <g style={{ animation: active ? "reelCCW 3.5s linear infinite" : "none", transformOrigin: "0px 0px" }}>
          <circle r="52" stroke="var(--color-accent)" strokeWidth="2.5" strokeOpacity="0.6" fill="rgba(107,173,212,0.04)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const a = (deg * Math.PI) / 180
            return (
              <line key={deg}
                x1={+(12 * Math.cos(a)).toFixed(2)} y1={+(12 * Math.sin(a)).toFixed(2)}
                x2={+(52 * Math.cos(a)).toFixed(2)} y2={+(52 * Math.sin(a)).toFixed(2)}
                stroke="var(--color-accent)" strokeWidth="1.3" strokeOpacity="0.4" />
            )
          })}
        </g>
        {/* Blade tip indicator */}
        <circle r="2.5" cx="52" cy="0" fill="var(--color-accent)" fillOpacity="0.7" />
      </g>

      {/* ── Material flow — horizontal ── */}
      <path d="M 90,195 L 390,195"
        stroke="var(--color-accent)" strokeWidth="2.5" strokeOpacity="0.5"
        strokeDasharray="10 6" style={{ animation: filmAnim }} />
      <path d="M 90,203 L 390,203"
        stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.28"
        strokeDasharray="10 6" style={{ animation: filmAnim }} />
      <polygon points="390,189 400,195 390,201" fill="var(--color-accent)" fillOpacity={active ? "0.55" : "0"} />

      {/* ── Guide rollers along material path ── */}
      {[180, 310].map((x) => (
        <g key={x} transform={`translate(${x},195)`}>
          <circle r="10" fill="rgba(28,100,133,0.10)" stroke="rgba(28,100,133,0.30)" strokeWidth="1.2" />
          <g style={{ animation: active ? "reelCW 2s linear infinite" : "none", transformOrigin: "0px 0px" }}>
            <circle r="10" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.4" fill="none" />
          </g>
        </g>
      ))}

      {/* ── Output spindle (right) ── */}
      <g transform="translate(390,195)">
        <circle r="13" fill="rgba(28,100,133,0.10)" stroke="rgba(28,100,133,0.30)" strokeWidth="1.2" />
        <g style={{ animation: active ? "reelCCW 4.5s linear infinite" : "none", transformOrigin: "0px 0px" }}>
          <circle r="38" stroke="var(--color-accent)" strokeWidth="1.8" strokeOpacity="0.5" fill="rgba(107,173,212,0.03)" />
          {[0, 90, 180, 270].map((deg) => {
            const a = (deg * Math.PI) / 180
            return (
              <line key={deg}
                x1={+(13 * Math.cos(a)).toFixed(2)} y1={+(13 * Math.sin(a)).toFixed(2)}
                x2={+(38 * Math.cos(a)).toFixed(2)} y2={+(38 * Math.sin(a)).toFixed(2)}
                stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.35" />
            )
          })}
        </g>
      </g>

      {/* ── Chain drive (bottom) ── */}
      <path d="M 90,210 Q 90,275 240,278 Q 390,280 390,218"
        stroke="rgba(28,100,133,0.30)" strokeWidth="1.5" strokeDasharray="5 3"
        style={{ animation: chainAnim }} />

      {/* ── Labels ── */}
      {active && (
        <>
          {/* Input */}
          <line x1="90" y1="62" x2="90" y2="38" stroke="rgba(28,100,133,0.3)" strokeWidth="1" />
          <rect x="34" y="22" width="112" height="18" rx="4"
            fill="rgba(28,100,133,0.07)" stroke="rgba(28,100,133,0.18)" strokeWidth="0.8" />
          <text x="90" y="35" textAnchor="middle" fontSize="9" fontWeight="700"
            fill="rgba(28,100,133,0.6)" letterSpacing="0.06em">
            {/* locale handled by parent — reused for both locales */}
            GİRİŞ / INPUT
          </text>

          {/* Cutting head */}
          <line x1="292" y1="70" x2="320" y2="38" stroke="rgba(28,100,133,0.3)" strokeWidth="1" />
          <rect x="318" y="22" width="104" height="18" rx="4"
            fill="rgba(28,100,133,0.07)" stroke="rgba(28,100,133,0.18)" strokeWidth="0.8" />
          <text x="370" y="35" textAnchor="middle" fontSize="9" fontWeight="700"
            fill="rgba(28,100,133,0.6)" letterSpacing="0.06em">
            KESİM / CUT
          </text>
        </>
      )}
    </svg>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function MachineBannerSlitting({ locale }: { locale: Locale }) {
  const { ref, visible } = useVisible(0.25)
  const isTr = locale === "tr"
  const p    = localePaths[locale]
  const productSlug = isTr ? "kagit-dilimleme-makineleri" : "paper-slitting-machines"

  return (
    <section
      ref={ref}
      aria-labelledby="mbs-heading"
      style={{
        background: "var(--color-surface)",
        borderTop: "2px solid var(--color-border)",
        borderBottom: "2px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] items-center gap-0">

          {/* ── Info ── */}
          <div
            className="py-12 lg:py-16 pr-0 lg:pr-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 500ms ease, transform 500ms ease",
            }}
          >
            {/* Catalog number */}
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="font-black leading-none" style={{ fontSize: "clamp(44px,6vw,72px)", color: "rgba(107,173,212,0.12)", letterSpacing: "-0.04em" }}>
                02
              </span>
              <span className="text-[13px] font-semibold" style={{ color: "rgba(28,100,133,0.4)" }}>/ 04</span>
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] shrink-0" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
              <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-accent)" }}>
                {isTr ? "Dilimleme Sistemleri" : "Slitting Systems"}
              </p>
            </div>

            <h2
              id="mbs-heading"
              className="font-black leading-tight tracking-tight"
              style={{ color: "var(--color-text)", fontSize: "clamp(20px,2.6vw,36px)", maxWidth: "22ch" }}
            >
              {isTr ? "Kağıt Kesme Bobin Dilimleme" : "Paper Slitting Machines"}
            </h2>

            <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)", maxWidth: "36ch" }}>
              {isTr
                ? "Kağıt rulo ve masura üretim hatları için hassas kesim ve dilimleme mekanizmaları."
                : "Precision cutting and slitting mechanisms for paper roll and core tube production lines."}
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
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
                style={{ color: "var(--color-text)", border: "1px solid var(--color-border)" }}
              >
                {isTr ? "Teklif Al" : "Get a Quote"}
              </Link>
            </div>
          </div>

          {/* ── SVG machine ── */}
          <div
            className="relative py-8 lg:py-12"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
              transition: "opacity 500ms 100ms ease, transform 500ms 100ms ease",
              borderLeft: "1px solid var(--color-border)",
              paddingLeft: "clamp(1.5rem, 3vw, 3rem)",
            }}
          >
            <SlittingSVG active={visible} />
          </div>

        </div>
      </div>
    </section>
  )
}
