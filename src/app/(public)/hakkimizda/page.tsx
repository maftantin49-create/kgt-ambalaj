import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, ShieldCheck, Wrench, Users, Lightbulb, Building2, Factory } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "GEÇİCİ — KGT Ambalaj hakkımızda meta description buraya gelecek (maks 155 karakter)",
}

const values = [
  {
    icon: ShieldCheck,
    title: "GEÇİCİ — Değer 1",
    desc: "GEÇİCİ — bu temel değerin kısa açıklaması buraya gelecek.",
  },
  {
    icon: Wrench,
    title: "GEÇİCİ — Değer 2",
    desc: "GEÇİCİ — bu temel değerin kısa açıklaması buraya gelecek.",
  },
  {
    icon: Users,
    title: "GEÇİCİ — Değer 3",
    desc: "GEÇİCİ — bu temel değerin kısa açıklaması buraya gelecek.",
  },
  {
    icon: Lightbulb,
    title: "GEÇİCİ — Değer 4",
    desc: "GEÇİCİ — bu temel değerin kısa açıklaması buraya gelecek.",
  },
]

export default function HakkimizdaPage() {
  return (
    <>

      {/* ── 1. İç sayfa hero ────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">

          {/* Breadcrumb */}
          <nav aria-label="Sayfa konumu" className="flex items-center gap-1.5 mb-6">
            <Link
              href="/"
              className="text-[12px] transition-opacity hover:opacity-75"
              style={{ color: "var(--color-muted)" }}
            >
              Ana Sayfa
            </Link>
            <ChevronRight size={12} style={{ color: "var(--color-muted)" }} aria-hidden="true" />
            <span
              className="text-[12px] font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Hakkımızda
            </span>
          </nav>

          {/* H1 + açıklama */}
          <div className="max-w-2xl flex flex-col gap-4">
            <h1
              className="font-black leading-tight tracking-tight"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(28px, 3.5vw, 48px)",
              }}
            >
              {/* GEÇİCİ — asıl H1 metni marka brief'inden sonra yazılacak */}
              GEÇİCİ — Hakkımızda başlığı
            </h1>
            <p
              className="text-[15px] leading-relaxed max-w-xl"
              style={{ color: "var(--color-muted)" }}
            >
              GEÇİCİ — hakkımızda sayfasını tanıtan kısa giriş. Şirketin ne yaptığını ve neden burada olduğunu anlatan 1–2 cümle buraya gelecek.
            </p>
          </div>

        </div>
      </section>

      {/* ── 2. Şirket tanıtımı ──────────────────────────────────── */}
      <section
        aria-labelledby="about-intro-heading"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Sol: metin */}
            <div className="flex flex-col gap-6">
              <SectionHeader
                eyebrow="GEÇİCİ — Biz Kimiz"
                heading="GEÇİCİ — Şirket tanıtım başlığı"
                headingId="about-intro-heading"
              />
              <div className="flex flex-col gap-4 max-w-lg">
                <p className="text-[15px] leading-[1.75]" style={{ color: "var(--color-muted)" }}>
                  GEÇİCİ — Birinci paragraf. Şirketin tarihçesi, faaliyet alanı veya kuruluş amacı buraya gelecek.
                </p>
                <p className="text-[15px] leading-[1.75]" style={{ color: "var(--color-muted)" }}>
                  GEÇİCİ — İkinci paragraf. Şirketin misyonu, vizyonu veya endüstrideki yeri buraya gelecek.
                </p>
                <p className="text-[15px] leading-[1.75]" style={{ color: "var(--color-muted)" }}>
                  GEÇİCİ — Üçüncü paragraf. Müşterilere sunulan temel fayda veya rekabet avantajı buraya gelecek.
                </p>
              </div>
            </div>

            {/* Sağ: görsel — GEÇİCİ placeholder */}
            {/* GEÇİCİ: gerçek şirket/fabrika görseli geldiğinde next/image ile değiştirilecek */}
            <div
              className="relative rounded-2xl overflow-hidden w-full"
              style={{ aspectRatio: "4/3" }}
              aria-hidden="true"
            >
              <div className="absolute inset-0" style={{ background: "#1E1E1C" }} />
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
              <div
                className="absolute top-0 left-0 w-12 h-0.5"
                style={{ background: "var(--color-accent)" }}
              />
              <div
                className="absolute top-0 left-0 w-0.5 h-12"
                style={{ background: "var(--color-accent)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
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

      {/* ── 3. Değerler / çalışma yaklaşımı ─────────────────────── */}
      <section
        aria-labelledby="values-heading"
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">

          <div className="mb-10">
            <SectionHeader
              eyebrow="GEÇİCİ — Değerlerimiz"
              heading="Çalışma Yaklaşımımız"
              headingId="values-heading"
              description="GEÇİCİ — temel değerleri ve çalışma felsefesini özetleyen 1–2 cümle buraya gelecek."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-6 rounded-xl"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(200,38,26,0.06)",
                    border: "1px solid rgba(200,38,26,0.14)",
                  }}
                  aria-hidden="true"
                >
                  <Icon size={18} style={{ color: "var(--color-accent)" }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3
                    className="font-bold text-[15px] leading-snug"
                    style={{ color: "var(--color-text)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. Üretim / çözüm yaklaşımı ─────────────────────────── */}
      <section
        aria-labelledby="production-heading"
        style={{
          background: "var(--background)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Sol: görsel — GEÇİCİ placeholder (sıra mobilde önce metin) */}
            {/* GEÇİCİ: gerçek üretim/tesis görseli geldiğinde next/image ile değiştirilecek */}
            <div
              className="relative rounded-2xl overflow-hidden w-full order-2 lg:order-1"
              style={{ aspectRatio: "4/3" }}
              aria-hidden="true"
            >
              <div className="absolute inset-0" style={{ background: "#1E1E1C" }} />
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
              <div
                className="absolute bottom-0 right-0 w-12 h-0.5"
                style={{ background: "var(--color-accent)" }}
              />
              <div
                className="absolute bottom-0 right-0 w-0.5 h-12"
                style={{ background: "var(--color-accent)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(200,38,26,0.10)",
                      border: "1px solid rgba(200,38,26,0.22)",
                    }}
                  >
                    <Factory size={26} style={{ color: "var(--color-accent)" }} />
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

            {/* Sağ: metin */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <SectionHeader
                eyebrow="GEÇİCİ — Üretim / Çözüm"
                heading="GEÇİCİ — Üretim veya çözüm yaklaşımı başlığı"
                headingId="production-heading"
              />
              <div className="flex flex-col gap-4 max-w-lg">
                <p className="text-[15px] leading-[1.75]" style={{ color: "var(--color-muted)" }}>
                  GEÇİCİ — Üretim süreçleri, kullanılan teknolojiler veya çözüm geliştirme yaklaşımını anlatan birinci paragraf buraya gelecek.
                </p>
                <p className="text-[15px] leading-[1.75]" style={{ color: "var(--color-muted)" }}>
                  GEÇİCİ — Kalite kontrol, teknik altyapı veya proje yönetimi hakkında ikinci paragraf buraya gelecek.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. CTA ───────────────────────────────────────────────── */}
      <section
        aria-label="İletişim yönlendirme"
        className="relative overflow-hidden"
        style={{ background: "#1A1A18" }}
      >
        {/* Dekoratif grid */}
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
        {/* Sağ üst köşe aksanı (CtaBanner'dan farklı köşe) */}
        <div
          className="absolute top-0 right-0 w-16 h-0.5"
          style={{ background: "var(--color-accent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-0.5 h-16"
          style={{ background: "var(--color-accent)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-xl flex flex-col gap-5">
            <h2
              className="font-black leading-tight tracking-tight text-white"
              style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
            >
              GEÇİCİ — Projeniz için teklif almak ister misiniz?
            </h2>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              GEÇİCİ — iletişim CTA açıklaması buraya gelecek.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-semibold text-white transition-opacity hover:opacity-90 self-start"
              style={{ background: "var(--color-accent)" }}
            >
              İletişime Geçin
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
