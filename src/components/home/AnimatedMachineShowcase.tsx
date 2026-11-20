"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { localePaths, type Locale } from "@/config/i18n"

// ── IntersectionObserver hook — fires once when element is sufficiently visible ──
function useActivation(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, active }
}

// ── SVG overlay: Streç Film Rewinding machine ─────────────────────────────────
// Maps to rewinding-workshop.webp: input reel top-centre, output implied right
function RewindingSVG({ active }: { active: boolean }) {
  const dur = active ? undefined : "0s"
  const anim = (name: string, duration: string, dir?: string) =>
    active ? `${name} ${duration} linear infinite${dir ? " " + dir : ""}` : "none"

  return (
    <svg
      viewBox="0 0 650 550"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Input reel — top centre of machine, matches photo ── */}
      <g transform="translate(325, 112)">
        {/* Static inner hub */}
        <circle r="14" fill="rgba(28,100,133,0.08)" stroke="rgba(28,100,133,0.25)" strokeWidth="1.5" />
        {/* Rotating outer ring + 6 spokes */}
        <g style={{ animation: anim("reelCW", "9s"), transformOrigin: "0 0" }}>
          <circle r="52" stroke="var(--color-accent)" strokeWidth="2" strokeOpacity="0.55" fill="none" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const r = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1={+(14 * Math.cos(r)).toFixed(3)}
                y1={+(14 * Math.sin(r)).toFixed(3)}
                x2={+(52 * Math.cos(r)).toFixed(3)}
                y2={+(52 * Math.sin(r)).toFixed(3)}
                stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.4"
              />
            )
          })}
        </g>
      </g>

      {/* ── Film exit path: top reel → processing bed below ── */}
      <path
        d="M 325,164 Q 325,200 300,220 L 270,245"
        stroke="var(--color-accent)" strokeWidth="2" strokeOpacity="0.5"
        fill="none" strokeDasharray="6 4"
        style={{ animation: anim("filmDash", "1.8s") }}
      />

      {/* ── Secondary output reel — lower right, represents finished roll ── */}
      <g transform="translate(490, 290)">
        <circle r="10" fill="rgba(28,100,133,0.06)" stroke="rgba(28,100,133,0.20)" strokeWidth="1" />
        <g style={{ animation: anim("reelCCW", "7s"), transformOrigin: "0 0" }}>
          <circle r="38" stroke="var(--color-accent)" strokeWidth="1.8" strokeOpacity="0.45" fill="none" />
          {[0, 90, 180, 270].map((deg) => {
            const r = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1={+(10 * Math.cos(r)).toFixed(3)}
                y1={+(10 * Math.sin(r)).toFixed(3)}
                x2={+(38 * Math.cos(r)).toFixed(3)}
                y2={+(38 * Math.sin(r)).toFixed(3)}
                stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.35"
              />
            )
          })}
        </g>
      </g>

      {/* ── Finished-roll label dot ── */}
      {active && (
        <g>
          <circle cx="490" cy="290" r="5" fill="var(--color-accent-dark)" fillOpacity="0.7" />
          <line x1="490" y1="285" x2="535" y2="250" stroke="var(--color-accent-dark)" strokeWidth="1" strokeOpacity="0.4" />
          <rect x="536" y="237" width="68" height="20" rx="4"
            fill="var(--color-accent-dark)" fillOpacity="0.08"
            stroke="var(--color-accent-dark)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="570" y="251" textAnchor="middle"
            fontSize="9" fontWeight="600" letterSpacing="0.08em"
            fill="var(--color-accent-dark)" fillOpacity="0.75">
            ÇIKTI
          </text>
        </g>
      )}

      {/* ── Material flow: left-to-right horizontal indicator ── */}
      <path
        d="M 160,310 L 440,310"
        stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.3"
        strokeDasharray="8 5"
        fill="none"
        style={{ animation: anim("filmDash", "2.5s") }}
      />
      <polygon points="440,306 450,310 440,314"
        fill="var(--color-accent)" fillOpacity={active ? "0.45" : "0"} />
    </svg>
  )
}

// ── SVG overlay: Kağıt Dilimleme / Masura machine ────────────────────────────
// Maps to paper-slitting-machine.webp: rotating red cutting head, horizontal tube
function SlittingSVG({ active }: { active: boolean }) {
  const anim = (name: string, duration: string, dir?: string) =>
    active ? `${name} ${duration} linear infinite${dir ? " " + dir : ""}` : "none"

  return (
    <svg
      viewBox="0 0 1080 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Rotating cutting head overlay — maps to red head top-centre ── */}
      <g transform="translate(390, 265)">
        <circle r="16" fill="rgba(28,100,133,0.06)" stroke="rgba(28,100,133,0.20)" strokeWidth="1.5" />
        <g style={{ animation: anim("reelCW", "5s"), transformOrigin: "0 0" }}>
          <circle r="68" stroke="var(--color-accent)" strokeWidth="2.5" strokeOpacity="0.5" fill="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const r = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1={+(16 * Math.cos(r)).toFixed(3)}
                y1={+(16 * Math.sin(r)).toFixed(3)}
                x2={+(68 * Math.cos(r)).toFixed(3)}
                y2={+(68 * Math.sin(r)).toFixed(3)}
                stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.35"
              />
            )
          })}
        </g>
      </g>

      {/* ── Chain drive overlay — right side of cutting head ── */}
      <path
        d="M 500,220 L 580,220 L 580,310 L 500,310 Z"
        stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.25"
        strokeDasharray="6 3"
        fill="none"
        style={{ animation: anim("chainDrive", "1.2s") }}
      />

      {/* ── Horizontal tube flow: left to right ── */}
      <path
        d="M 100,560 L 980,560"
        stroke="var(--color-accent)" strokeWidth="2" strokeOpacity="0.35"
        strokeDasharray="10 6"
        fill="none"
        style={{ animation: anim("filmDash", "3s") }}
      />
      <polygon points="980,554 996,560 980,566"
        fill="var(--color-accent)" fillOpacity={active ? "0.5" : "0"} />

      {/* ── Process label ── */}
      {active && (
        <g>
          <circle cx="996" cy="560" r="5" fill="var(--color-accent-dark)" fillOpacity="0.7" />
          <line x1="996" y1="555" x2="1030" y2="510" stroke="var(--color-accent-dark)" strokeWidth="1" strokeOpacity="0.4" />
          <rect x="1031" y="496" width="40" height="20" rx="4"
            fill="var(--color-accent-dark)" fillOpacity="0.08"
            stroke="var(--color-accent-dark)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="1051" y="510" textAnchor="middle"
            fontSize="9" fontWeight="600" letterSpacing="0.08em"
            fill="var(--color-accent-dark)" fillOpacity="0.75">
            KES
          </text>
        </g>
      )}
    </svg>
  )
}

// ── Single machine panel ──────────────────────────────────────────────────────
interface PanelProps {
  locale: Locale
  imageFlip?: boolean // false = image right (default), true = image left
  catalogNo: string
  catalogTotal: string
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  quoteLabel: string
  quotaHref: string
  imageSrc: string
  imageAlt: string
  imageW: number
  imageH: number
  SvgOverlay: React.ComponentType<{ active: boolean }>
}

function MachinePanel({
  imageFlip,
  catalogNo,
  catalogTotal,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  quoteLabel,
  quotaHref,
  imageSrc,
  imageAlt,
  imageW,
  imageH,
  SvgOverlay,
}: PanelProps) {
  const { ref, active } = useActivation(0.2)
  const machineStyle: React.CSSProperties = {
    opacity: active ? 1 : 0,
    animation: active ? "machineEntrance 600ms cubic-bezier(0.16,1,0.3,1) both" : "none",
  }
  const infoStyle: React.CSSProperties = {
    opacity: active ? 1 : 0,
    animation: active
      ? `${imageFlip ? "infoEntranceRight" : "infoEntrance"} 600ms 150ms cubic-bezier(0.16,1,0.3,1) both`
      : "none",
  }

  const InfoCol = (
    <div className="ams-info flex flex-col justify-center gap-5 py-10 lg:py-16 px-6 lg:px-12" style={infoStyle}>
      {/* Eyebrow */}
      <div className="flex items-center gap-2">
        <span className="w-5 h-[2px] shrink-0" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
        <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-accent-dark)" }}>
          {eyebrow}
        </p>
      </div>
      {/* Catalog number */}
      <div className="flex items-baseline gap-1.5">
        <span className="font-black leading-none" style={{ fontSize: "clamp(44px,6vw,72px)", color: "rgba(28,100,133,0.12)", letterSpacing: "-0.04em" }}>
          {catalogNo}
        </span>
        <span className="text-[13px] font-semibold" style={{ color: "var(--color-muted)" }}>/ {catalogTotal}</span>
      </div>
      {/* Title */}
      <h2 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(22px,2.6vw,36px)" }}>
        {title}
      </h2>
      {/* Description */}
      <p className="text-[14px] leading-relaxed max-w-[38ch]" style={{ color: "var(--color-muted)" }}>
        {description}
      </p>
      {/* CTAs */}
      <div className="flex flex-wrap gap-3 pt-1">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--color-accent-dark)" }}
        >
          {ctaLabel}
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
        <Link
          href={quotaHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold transition-opacity hover:opacity-75"
          style={{ color: "var(--color-text)", border: "1px solid var(--color-border)" }}
        >
          {quoteLabel}
        </Link>
      </div>
    </div>
  )

  const MachineCol = (
    <div
      className="ams-machine relative flex items-center justify-center overflow-hidden"
      style={{ background: "var(--color-surface)", minHeight: "clamp(260px,42vw,520px)", ...machineStyle }}
    >
      <div className="relative w-full h-full" style={{ minHeight: "clamp(260px,42vw,520px)" }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageW}
          height={imageH}
          className="w-full h-full object-contain p-6 lg:p-10"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority={catalogNo === "01"}
        />
        <SvgOverlay active={active} />
      </div>
    </div>
  )

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-[45fr_55fr]"
      style={imageFlip ? { direction: "rtl" } : undefined}
    >
      {/* direction:rtl flips column order on desktop without changing DOM order */}
      <div style={imageFlip ? { direction: "ltr" } : undefined}>{InfoCol}</div>
      <div style={imageFlip ? { direction: "ltr" } : undefined}>{MachineCol}</div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function AnimatedMachineShowcase({ locale }: { locale: Locale }) {
  const isTr = locale === "tr"
  const p = localePaths[locale]

  return (
    <section
      aria-labelledby="animated-showcase-heading"
      style={{ borderBottom: "2px solid var(--color-border)" }}
    >
      {/* Section eyebrow header */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 lg:pt-14 pb-6"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-5 h-[2px] shrink-0" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
          <p
            id="animated-showcase-heading"
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-accent-dark)" }}
          >
            {isTr ? "Makine Serimiz" : "Our Machine Range"}
          </p>
        </div>
      </div>

      {/* Panel 01 — Streç Film, image right */}
      <div style={{ borderBottom: "1px solid var(--color-border)" }}>
        <MachinePanel
          locale={locale}
          imageFlip={false}
          catalogNo="01"
          catalogTotal="04"
          eyebrow={isTr ? "Sarma Sistemleri" : "Rewinding Systems"}
          title={isTr ? "Streç Film Sarma Makineleri" : "Stretch Film Rewinding Machines"}
          description={
            isTr
              ? "Üretim hatları ve palet sarma süreçleri için yüksek verimli streç film sarma ve rewinding makineleri."
              : "High-efficiency stretch film rewinding machines for production lines and pallet wrapping processes."
          }
          ctaLabel={isTr ? "Ürünü İncele" : "View Product"}
          ctaHref={p.product("strec-film-sarma-makineleri")}
          quoteLabel={isTr ? "Teklif Al" : "Get a Quote"}
          quotaHref={p.contact}
          imageSrc="/images/kgt/rewinding-workshop.webp"
          imageAlt={
            isTr
              ? "KGT Ambalaj streç film sarma makinesi — atölye görünümü"
              : "KGT Ambalaj stretch film rewinding machine — workshop view"
          }
          imageW={1112}
          imageH={937}
          SvgOverlay={RewindingSVG}
        />
      </div>

      {/* Panel 02 — Kağıt Dilimleme, image left */}
      <MachinePanel
        locale={locale}
        imageFlip={true}
        catalogNo="02"
        catalogTotal="04"
        eyebrow={isTr ? "Dilimleme Sistemleri" : "Slitting Systems"}
        title={isTr ? "Kağıt Kesme Bobin Dilimleme" : "Paper Slitting Machines"}
        description={
          isTr
            ? "Kağıt rulo ve masura üretim hatları için hassas kesim ve dilimleme mekanizmaları."
            : "Precision cutting and slitting mechanisms for paper roll and core tube production lines."
        }
        ctaLabel={isTr ? "Ürünü İncele" : "View Product"}
        ctaHref={p.product("kagit-dilimleme-makineleri")}
        quoteLabel={isTr ? "Teklif Al" : "Get a Quote"}
        quotaHref={p.contact}
        imageSrc="/images/kgt/paper-slitting-machine.webp"
        imageAlt={
          isTr
            ? "KGT Ambalaj kağıt dilimleme makinesi — döner kesim kafası yakın plan"
            : "KGT Ambalaj paper slitting machine — rotary cutting head close-up"
        }
        imageW={1080}
        imageH={1080}
        SvgOverlay={SlittingSVG}
      />
    </section>
  )
}
