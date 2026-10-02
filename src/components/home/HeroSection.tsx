import Link from "next/link"
import { ArrowRight, Package } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      aria-label="Ana sayfa hero"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_520px] gap-10 lg:gap-16 py-16 lg:py-24 items-center">

          {/* ── Sol: İçerik ───────────────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow — GEÇİCİ */}
            <div
              className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full"
              style={{
                background: "rgba(200,38,26,0.06)",
                border: "1px solid rgba(200,38,26,0.18)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--color-accent)" }}
                aria-hidden="true"
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--color-accent)" }}
              >
                Ambalaj Makineleri
              </span>
            </div>

            <h1
              className="font-black leading-[1.08] tracking-tight"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(32px, 4.5vw, 58px)",
              }}
            >
              Ambalajın{" "}
              <span style={{ color: "var(--color-accent)" }}>Geleceğini</span>
              <br />
              Şekillendiriyoruz
            </h1>

            <p
              className="text-[15px] lg:text-[16px] leading-[1.8] max-w-[500px]"
              style={{ color: "var(--color-muted)" }}
            >
              Yüksek performanslı streç film ve alüminyum folyo sarma makineleri
              ile üretim hatlarınıza hız, hassasiyet ve sürdürülebilir verim
              kazandırıyoruz.
            </p>

            {/* CTA'lar */}
            <div className="flex flex-wrap gap-3 items-center">

              {/* Birincil CTA */}
              <Link
                href="/urunler"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[14px] text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: "var(--color-accent)",
                  boxShadow: "0 4px 16px -4px rgba(200,38,26,0.35)",
                }}
              >
                Ürünleri İncele
                <ArrowRight size={15} aria-hidden="true" />
              </Link>

              {/* İkincil CTA */}
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[14px] transition-colors"
                style={{
                  color: "var(--color-text)",
                  background: "#FFFFFF",
                  border: "1px solid var(--color-border)",
                }}
              >
                Teklif Al
              </Link>

            </div>

          </div>

          {/* ── Sağ: Görsel alanı — GEÇİCİ placeholder ───────────── */}
          {/* GEÇİCİ — ürün veya fabrika fotoğrafı buraya gelecek.
              Görseller temin edildiğinde next/image ile değiştirilecek. */}
          <div
            className="relative hidden lg:flex items-center justify-center rounded-2xl overflow-hidden"
            style={{
              minHeight: "400px",
              background: "#1E1E1C",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            aria-hidden="true"
          >
            {/* Endüstriyel grid deseni */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Köşe aksan çizgisi */}
            <div
              className="absolute top-0 left-0 w-16 h-1"
              style={{ background: "var(--color-accent)" }}
            />
            <div
              className="absolute top-0 left-0 w-1 h-16"
              style={{ background: "var(--color-accent)" }}
            />

            {/* Merkez ikon */}
            <div className="relative z-10">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(200,38,26,0.10)",
                  border: "1px solid rgba(200,38,26,0.22)",
                }}
              >
                <Package size={28} style={{ color: "var(--color-accent)" }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
