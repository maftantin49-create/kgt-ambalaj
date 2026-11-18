"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { localePaths, type Locale } from "@/config/i18n"

// ── Smooth interpolation ──────────────────────────────────────────────────────
function lerp(e0: number, e1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t) // smoothstep
}

// ── Reel SVG element ──────────────────────────────────────────────────────────
function Reel({
  cx, cy, outerR, hubR, spokes, dir = "cw", speed = "9s", isRunning, opacity,
}: {
  cx: number; cy: number; outerR: number; hubR: number; spokes: number
  dir?: "cw" | "ccw"; speed?: string; isRunning: boolean; opacity: number
}) {
  const anim = isRunning
    ? `${dir === "cw" ? "reelCW" : "reelCCW"} ${speed} linear infinite`
    : "none"
  const spokeAngles = Array.from({ length: spokes }, (_, i) => (i * Math.PI * 2) / spokes)
  return (
    <g transform={`translate(${cx},${cy})`} style={{ opacity }}>
      <circle r={hubR} fill="rgba(28,100,133,0.14)" stroke="rgba(28,100,133,0.40)" strokeWidth="1.5" />
      <g style={{ animation: anim, transformOrigin: "0px 0px" }}>
        <circle r={outerR} stroke="var(--color-accent)" strokeWidth="2" strokeOpacity="0.6"
          fill="rgba(107,173,212,0.04)" />
        {spokeAngles.map((a, i) => (
          <line key={i}
            x1={+(hubR * Math.cos(a)).toFixed(2)} y1={+(hubR * Math.sin(a)).toFixed(2)}
            x2={+(outerR * Math.cos(a)).toFixed(2)} y2={+(outerR * Math.sin(a)).toFixed(2)}
            stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.45" />
        ))}
      </g>
    </g>
  )
}

// ── Parts metadata ────────────────────────────────────────────────────────────
const PARTS = {
  tr: [
    { id: "input",   svgX: 128, svgY: 192, label: "Giriş Rulosu",      desc: "Ham malzeme besleme" },
    { id: "tension", svgX: 334, svgY: 262, label: "Gerilim Kontrolü",  desc: "Film gerilim ayarı" },
    { id: "output",  svgX: 494, svgY: 212, label: "Sarım Rulosu",      desc: "Bitmiş ürün sarımı" },
    { id: "drive",   svgX: 128, svgY: 420, label: "Tahrik Sistemi",    desc: "Motor ve zincir aktarımı" },
  ],
  en: [
    { id: "input",   svgX: 128, svgY: 192, label: "Input Reel",        desc: "Raw material feed" },
    { id: "tension", svgX: 334, svgY: 262, label: "Tension Control",   desc: "Film tension regulation" },
    { id: "output",  svgX: 494, svgY: 212, label: "Winding Reel",      desc: "Finished product winding" },
    { id: "drive",   svgX: 128, svgY: 420, label: "Drive System",      desc: "Motor & chain transmission" },
  ],
}

// ── Machine SVG (600 × 500 viewBox) ──────────────────────────────────────────
function StretchFilmSVG({
  shellOpacity, interiorOpacity, isRunning, labelsVisible, activePart, onPartClick, locale,
}: {
  shellOpacity: number; interiorOpacity: number; isRunning: boolean
  labelsVisible: boolean; activePart: string | null
  onPartClick: (id: string | null) => void; locale: Locale
}) {
  const filmAnim  = isRunning ? "filmDash 1.6s linear infinite"  : "none"
  const chainAnim = isRunning ? "chainDrive 1.1s linear infinite" : "none"
  const parts = PARTS[locale]

  return (
    <div className="relative w-full select-none" style={{ aspectRatio: "6/5" }}>
      <svg viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full" aria-hidden="true">

        {/* ── Grid pattern def ── */}
        <defs>
          <pattern id="smh-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(107,173,212,0.09)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* ════════════════ OUTER SHELL ════════════════════════════════════════ */}
        <g style={{ opacity: shellOpacity, transition: "opacity 50ms linear" }}>
          {/* Main casing */}
          <rect x="28" y="28" width="544" height="444" rx="10"
            fill="rgba(212,218,224,0.72)" stroke="#A8B4BF" strokeWidth="2" />
          {/* Top panel seam */}
          <line x1="28" y1="122" x2="572" y2="122" stroke="#A8B4BF" strokeWidth="1" strokeDasharray="5 3" />
          {/* Ventilation slots — top right */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={440 + i * 18} y={40} width="11" height="64" rx="4"
              fill="none" stroke="#A8B4BF" strokeWidth="1" />
          ))}
          {/* Access door — right side */}
          <rect x="460" y="136" width="88" height="244" rx="6"
            fill="none" stroke="#A8B4BF" strokeWidth="1.2" strokeDasharray="6 3" />
          <circle cx="466" cy="258" r="5" fill="none" stroke="#A8B4BF" strokeWidth="1.5" />
          {/* Control panel — bottom left */}
          <rect x="44" y="366" width="148" height="84" rx="6"
            fill="rgba(192,202,212,0.88)" stroke="#A8B4BF" strokeWidth="1.2" />
          <circle cx="74"  cy="398" r="6" fill="rgba(107,173,212,0.5)" />
          <circle cx="96"  cy="398" r="6" fill="rgba(107,173,212,0.3)" />
          <circle cx="118" cy="398" r="6" fill="rgba(107,173,212,0.18)" />
          <rect x="58" y="420" width="80" height="8" rx="3" fill="rgba(107,173,212,0.22)" />
          {/* Nameplate */}
          <rect x="216" y="376" width="148" height="44" rx="6"
            fill="rgba(28,100,133,0.07)" stroke="rgba(28,100,133,0.18)" strokeWidth="1" />
          <text x="290" y="403" textAnchor="middle" fontSize="13" fontWeight="700"
            fill="rgba(28,100,133,0.45)" letterSpacing="0.10em">KGT</text>
          {/* Bottom rail */}
          <rect x="28" y="452" width="544" height="20" rx="10"
            fill="rgba(180,192,204,0.6)" stroke="#A8B4BF" strokeWidth="1" />
        </g>

        {/* ════════════════ INTERIOR ═══════════════════════════════════════════ */}
        <g style={{ opacity: interiorOpacity, transition: "opacity 50ms linear" }}>
          {/* Grid bg */}
          <rect x="28" y="28" width="544" height="444" rx="10" fill="url(#smh-grid)"
            stroke="rgba(28,100,133,0.18)" strokeWidth="1.2" />
          {/* Frame skeleton — vertical members */}
          <line x1="28"  y1="28"  x2="28"  y2="472" stroke="rgba(28,100,133,0.22)" strokeWidth="2" />
          <line x1="572" y1="28"  x2="572" y2="472" stroke="rgba(28,100,133,0.22)" strokeWidth="2" />
          {/* Centre guide rail */}
          <line x1="28" y1="472" x2="572" y2="472" stroke="rgba(28,100,133,0.18)" strokeWidth="2" />
          {/* Horizontal structural member */}
          <line x1="28" y1="362" x2="572" y2="362" stroke="rgba(28,100,133,0.10)" strokeWidth="1" strokeDasharray="8 5" />

          {/* Motor block */}
          <rect x="72" y="384" width="124" height="44" rx="5"
            fill="rgba(28,100,133,0.08)" stroke="rgba(28,100,133,0.26)" strokeWidth="1.5" />
          <text x="134" y="411" textAnchor="middle" fontSize="10" fontWeight="700"
            fill="rgba(28,100,133,0.5)" letterSpacing="0.07em">MOTOR</text>

          {/* Chain drive path */}
          <path d="M 128,374 L 128,338 Q 128,310 200,290 L 494,245 L 494,210"
            stroke="rgba(28,100,133,0.35)" strokeWidth="2" strokeDasharray="6 3"
            style={{ animation: chainAnim }} />

          {/* Film path — upper strand */}
          <path d="M 128,275 Q 170,345 254,328 Q 294,318 334,278 Q 372,242 414,268 Q 455,290 494,280"
            stroke="var(--color-accent)" strokeWidth="2.5" strokeOpacity="0.58"
            strokeDasharray="9 5" style={{ animation: filmAnim }} />
          {/* Film path — lower strand (width simulation) */}
          <path d="M 128,283 Q 170,355 254,338 Q 294,328 334,288 Q 372,252 414,278 Q 455,300 494,290"
            stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.30"
            strokeDasharray="9 5" style={{ animation: filmAnim }} />

          {/* Direction arrow */}
          <polygon points="490,274 500,279 490,284" fill="var(--color-accent)" fillOpacity="0.55" />
        </g>

        {/* ════════════════ REELS (always rendered, opacity-gated) ═════════════ */}

        {/* Input reel */}
        <Reel cx={128} cy={192} outerR={82} hubR={22} spokes={6}
          dir="cw" speed="10s" isRunning={isRunning} opacity={interiorOpacity} />

        {/* Guide rollers */}
        <Reel cx={254} cy={316} outerR={22} hubR={8} spokes={4}
          dir="ccw" speed="3.8s" isRunning={isRunning} opacity={interiorOpacity} />
        <Reel cx={334} cy={262} outerR={22} hubR={8} spokes={4}
          dir="cw"  speed="3.8s" isRunning={isRunning} opacity={interiorOpacity} />
        <Reel cx={414} cy={264} outerR={22} hubR={8} spokes={4}
          dir="ccw" speed="3.8s" isRunning={isRunning} opacity={interiorOpacity} />

        {/* Output winding reel */}
        <Reel cx={494} cy={212} outerR={68} hubR={18} spokes={5}
          dir="ccw" speed="7s" isRunning={isRunning} opacity={interiorOpacity} />

        {/* ════════════════ PART HOTSPOT TARGETS ═══════════════════════════════ */}
        {labelsVisible && parts.map((p) => (
          <circle key={p.id} cx={p.svgX} cy={p.svgY} r="14"
            fill={activePart === p.id ? "rgba(28,100,133,0.18)" : "rgba(28,100,133,0.06)"}
            stroke={activePart === p.id ? "var(--color-accent-dark)" : "rgba(28,100,133,0.35)"}
            strokeWidth="1.5" className="cursor-pointer"
            onClick={() => onPartClick(activePart === p.id ? null : p.id)} />
        ))}
      </svg>

      {/* ════════════════ HTML PART LABELS (positioned over SVG) ════════════════ */}
      {labelsVisible && (
        <div className="absolute inset-0 pointer-events-none">
          {PARTS[locale].map((part) => {
            const lx = (part.svgX / 600) * 100
            const ly = (part.svgY / 500) * 100
            const isActive = activePart === part.id
            // Push tooltip left for right-edge parts
            const tooltipSide: React.CSSProperties =
              part.svgX > 400
                ? { right: `${100 - lx + 3}%`, left: "auto" }
                : { left: `${lx + 3}%` }

            return (
              <div
                key={part.id}
                className="absolute pointer-events-auto"
                style={{ left: `${lx}%`, top: `${ly}%`, transform: "translate(-50%,-50%)" }}
              >
                {/* Hotspot button */}
                <button
                  className="relative flex items-center justify-center w-8 h-8 rounded-full text-white font-bold transition-transform hover:scale-110 focus-visible:outline-none"
                  style={{ fontSize: 11, background: "var(--color-accent-dark)", boxShadow: isActive ? "0 0 0 3px rgba(28,100,133,0.25)" : "none" }}
                  onClick={() => onPartClick(activePart === part.id ? null : part.id)}
                  aria-label={part.label}
                  aria-pressed={isActive}
                >
                  {isActive ? "×" : "+"}
                </button>

                {/* Tooltip */}
                {isActive && (
                  <div
                    className="absolute z-20 top-1/2 -translate-y-1/2 w-max max-w-[148px] rounded-lg px-3 py-2 pointer-events-none"
                    style={{ ...tooltipSide, background: "#fff", border: "1px solid var(--color-border)", boxShadow: "0 4px 16px rgba(0,0,0,0.11)" }}
                  >
                    <p className="text-[12px] font-bold leading-snug" style={{ color: "var(--color-text)" }}>
                      {part.label}
                    </p>
                    <p className="text-[11px] mt-0.5 leading-snug" style={{ color: "var(--color-muted)" }}>
                      {part.desc}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Scroll stage progress indicator ──────────────────────────────────────────
function ProgressPips({ progress }: { progress: number }) {
  const idx = Math.min(4, Math.floor(progress * 5))
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="rounded-full transition-all duration-300"
          style={{
            width: i === idx ? 18 : 5, height: 5,
            background: i <= idx ? "var(--color-accent-dark)" : "rgba(28,100,133,0.18)",
          }} />
      ))}
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ScrollMachineHero({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress]     = useState(0)
  const [activePart, setActivePart] = useState<string | null>(null)
  const [prefersReduced, setPrefersReduced] = useState(false)

  const isTr = locale === "tr"
  const p    = localePaths[locale]
  const productSlug = isTr ? "strec-film-sarma-makineleri" : "stretch-film-rewinding-machines"

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

  // Derived animation values — shell fades first, interior reveals after (sequential, HIGH contrast)
  const shellOpacity    = 1 - lerp(0.08, 0.32, progress)
  const interiorOpacity = lerp(0.30, 0.52, progress)
  const isRunning       = progress > 0.60
  const isFinal         = progress > 0.86
  const labelsVisible   = progress > 0.36 && !isFinal

  // Text stage visibility
  const s0 = progress < 0.38                           // initial
  const s1 = progress >= 0.30 && progress < 0.62       // revealed
  const s2 = progress >= 0.58 && progress < 0.87       // running
  const s3 = isFinal                                    // CTA final

  function textStyle(visible: boolean): React.CSSProperties {
    return {
      opacity:        visible ? 1 : 0,
      transform:      visible ? "translateY(0)" : "translateY(14px)",
      pointerEvents:  visible ? "auto" : "none",
      transition:     "opacity 400ms ease, transform 400ms ease",
      position:       "absolute",
      inset:          0,
    }
  }

  return (
    /* Sticky scroll container — 220vh total */
    <div ref={containerRef} style={{ height: prefersReduced ? "auto" : "220vh" }}>
      <div
        className="overflow-hidden"
        style={{
          position: prefersReduced ? "relative" : "sticky",
          top: 0,
          height: prefersReduced ? "auto" : "100vh",
          minHeight: "620px",
          background: "var(--color-surface)",
          borderBottom: "2px solid var(--color-border)",
        }}
      >
        {/* Mobile: machine on top (order-1), text below (order-2). Desktop: text left, machine right */}
        <div className="grid grid-rows-[auto_1fr] lg:grid-rows-none lg:grid-cols-[42%_58%] h-full">

          {/* ── LEFT: Text column ─────────────────────────────────────────── */}
          <div
            className="order-2 lg:order-1 relative flex flex-col justify-start lg:justify-center px-6 sm:px-8 lg:pl-10 xl:pl-16 lg:pr-6 pt-6 pb-8 lg:py-0 overflow-hidden"
            style={{ borderRight: "1px solid var(--color-border)" }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-5 h-[2px] shrink-0" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
              <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-accent-dark)" }}>
                {isTr ? "Makine Teknolojisi" : "Machine Technology"}
              </p>
            </div>

            {/* Stacked text panels — absolute positioned, one visible at a time */}
            <div className="relative" style={{ minHeight: "clamp(140px,22vh,220px)" }}>

              {/* Stage 0: initial */}
              <div style={textStyle(s0)}>
                <h1 className="font-black leading-[1.04] tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(26px,3.6vw,52px)" }}>
                  {isTr ? "Streç Film Sarma — İçeriden" : "Stretch Film Rewinding — From Inside"}
                </h1>
                <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)", maxWidth: "36ch" }}>
                  {isTr
                    ? "Makinenin dış kabuğundan mekanizmasına doğru ilerleyin."
                    : "Move from the outer shell through to the mechanism."}
                </p>
                {!prefersReduced && (
                  <p className="mt-3 flex items-center gap-1.5 text-[12px]" style={{ color: "rgba(107,173,212,0.65)" }}>
                    <span aria-hidden="true">↓</span>
                    {isTr ? "Kaydırarak keşfet" : "Scroll to explore"}
                  </p>
                )}
              </div>

              {/* Stage 1: interior revealed */}
              <div style={textStyle(s1)}>
                <h2 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(20px,2.6vw,36px)" }}>
                  {isTr ? "İç Mekanizma" : "Inner Mechanism"}
                </h2>
                <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)", maxWidth: "36ch" }}>
                  {isTr
                    ? "Sarım sistemi, yönlendirme ruloları ve film yolunu inceleyin. + işaretli noktaları tıklayın."
                    : "Examine the winding system, guide rollers and film path. Click the + markers."}
                </p>
                {activePart && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold"
                    style={{ background: "rgba(28,100,133,0.07)", color: "var(--color-accent-dark)", border: "1px solid rgba(28,100,133,0.14)" }}>
                    ← {PARTS[locale].find(pt => pt.id === activePart)?.label}
                  </div>
                )}
              </div>

              {/* Stage 2: running */}
              <div style={textStyle(s2)}>
                <h2 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(20px,2.6vw,36px)" }}>
                  {isTr ? "Makine Çalışıyor" : "Machine Running"}
                </h2>
                <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)", maxWidth: "36ch" }}>
                  {isTr
                    ? "Giriş rulosu ve sarım rulosu dönüyor; film mekanizma boyunca ilerliyor."
                    : "Input and winding reels rotating; film advancing through the mechanism."}
                </p>
              </div>

              {/* Stage 3: final CTA */}
              <div style={textStyle(s3)}>
                <h2 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(20px,2.6vw,36px)" }}>
                  {isTr ? "Streç Film Sarma Makinesi" : "Stretch Film Rewinding Machine"}
                </h2>
                <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--color-muted)", maxWidth: "36ch" }}>
                  {isTr
                    ? "Üretim hatları ve palet sarma süreçleri için yüksek verimli sarma sistemleri."
                    : "High-efficiency winding systems for production lines and pallet wrapping processes."}
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
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
            </div>

            {/* Progress bar (bottom of left column) */}
            {!prefersReduced && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "var(--color-border)" }}>
                <div className="h-full" style={{ width: `${progress * 100}%`, background: "var(--color-accent-dark)", transition: "width 80ms linear" }} />
              </div>
            )}
          </div>

          {/* ── RIGHT: Machine column ──────────────────────────────────────── */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center p-5 lg:p-8 overflow-hidden">
            <div className="w-full" style={{ maxWidth: 560 }}>
              <StretchFilmSVG
                shellOpacity={shellOpacity}
                interiorOpacity={interiorOpacity}
                isRunning={isRunning}
                labelsVisible={labelsVisible}
                activePart={activePart}
                onPartClick={setActivePart}
                locale={locale}
              />
            </div>

            {!prefersReduced && <ProgressPips progress={progress} />}
          </div>

        </div>
      </div>
    </div>
  )
}
