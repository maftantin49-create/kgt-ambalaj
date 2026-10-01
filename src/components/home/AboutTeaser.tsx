import Link from "next/link"
import { ArrowRight, Building2 } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"

export default function AboutTeaser() {
  return (
    <section
      aria-labelledby="about-teaser-heading"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Sol: metin */}
          <div className="flex flex-col gap-7">
            <SectionHeader
              eyebrow="GEÇİCİ — Hakkımızda"
              heading="GEÇİCİ — Şirket başlığı buraya gelecek"
              headingId="about-teaser-heading"
            />

            <div className="flex flex-col gap-4 max-w-lg">
              <p
                className="leading-[1.75] text-[15px]"
                style={{ color: "var(--color-muted)" }}
              >
                GEÇİCİ — Şirketi tanıtan birinci paragraf. Faaliyet alanı,
                temel yaklaşım veya değer önerisi buraya gelecek.
              </p>
              <p
                className="leading-[1.75] text-[15px]"
                style={{ color: "var(--color-muted)" }}
              >
                GEÇİCİ — İkinci paragraf. Müşteri odaklı çalışma anlayışı
                veya sektördeki konumlandırma buraya gelecek.
              </p>
            </div>

            <Link
              href="/hakkimizda"
              className="inline-flex items-center gap-2 text-[14px] font-semibold transition-opacity hover:opacity-75 self-start"
              style={{ color: "var(--color-accent)" }}
            >
              Hakkımızda Daha Fazla
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {/* Sağ: görsel alanı — GEÇİCİ placeholder */}
          {/* GEÇİCİ: gerçek şirket görseli geldiğinde next/image ile değiştirilecek */}
          <div
            className="relative rounded-2xl overflow-hidden w-full"
            style={{ aspectRatio: "4/3" }}
            aria-hidden="true"
          >
            {/* Koyu zemin */}
            <div
              className="absolute inset-0"
              style={{ background: "#1E1E1C" }}
            />

            {/* Endüstriyel grid deseni */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Sağ alt köşe aksan (HeroSection'dan farklı konum) */}
            <div
              className="absolute bottom-0 right-0 w-14 h-0.5"
              style={{ background: "var(--color-accent)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-0.5 h-14"
              style={{ background: "var(--color-accent)" }}
            />

            {/* Sol üst ince çizgi detay */}
            <div
              className="absolute top-6 left-6 right-6 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />

            {/* Merkez ikon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(200,38,26,0.10)",
                    border: "1px solid rgba(200,38,26,0.22)",
                  }}
                >
                  <Building2 size={26} style={{ color: "var(--color-accent)" }} />
                </div>
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  GEÇİCİ
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
