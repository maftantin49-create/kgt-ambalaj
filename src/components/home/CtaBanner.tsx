import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { home } from "@/data/home"

const { ctaBanner } = home

export default function CtaBanner() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden"
      style={{ background: "#1A1A18" }}
    >

      {/* Dekoratif grid deseni */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Sol üst accent çizgisi */}
      <div
        className="absolute top-0 left-0 w-24 h-0.5"
        style={{ background: "var(--color-accent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 w-0.5 h-24"
        style={{ background: "var(--color-accent)" }}
        aria-hidden="true"
      />

      {/* Sağ alt accent çizgisi */}
      <div
        className="absolute bottom-0 right-0 w-24 h-0.5"
        style={{ background: "var(--color-accent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-0.5 h-24"
        style={{ background: "var(--color-accent)" }}
        aria-hidden="true"
      />

      {/* İçerik */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">

          {/* Eyebrow */}
          {ctaBanner.eyebrow && (
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-px shrink-0"
                style={{ background: "var(--color-accent)" }}
                aria-hidden="true"
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--color-accent)" }}
              >
                {ctaBanner.eyebrow}
              </span>
              <span
                className="w-5 h-px shrink-0"
                style={{ background: "var(--color-accent)" }}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Başlık */}
          <h2
            id="cta-heading"
            className="font-black leading-tight tracking-tight text-white"
            style={{ fontSize: "clamp(28px, 3.6vw, 52px)" }}
          >
            {ctaBanner.heading}
          </h2>

          {/* Açıklama */}
          {ctaBanner.description && (
            <p
              className="text-[15px] leading-relaxed max-w-lg"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {ctaBanner.description}
            </p>
          )}

          {/* CTA butonları */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href={ctaBanner.primaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-[14px] text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--color-accent)" }}
            >
              {ctaBanner.primaryCta.label}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            {ctaBanner.secondaryCta && (
              <Link
                href={ctaBanner.secondaryCta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-[14px] transition-colors hover:bg-white/10"
                style={{
                  color: "rgba(255,255,255,0.80)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                {ctaBanner.secondaryCta.label}
              </Link>
            )}
          </div>

        </div>
      </div>

    </section>
  )
}
