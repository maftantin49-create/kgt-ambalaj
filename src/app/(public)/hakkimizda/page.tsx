import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, Building2, Factory } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import { about } from "@/data/about"

export const metadata: Metadata = {
  title: "Hakkımızda",
}

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
              {about.heroHeading}
            </h1>
            <p
              className="text-[15px] leading-relaxed max-w-xl"
              style={{ color: "var(--color-muted)" }}
            >
              {about.heroIntro}
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
                eyebrow={about.intro.eyebrow}
                heading={about.intro.heading}
                headingId="about-intro-heading"
              />
              {about.intro.paragraphs.length > 0 && (
                <div className="flex flex-col gap-4 max-w-lg">
                  {about.intro.paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="text-[15px] leading-[1.75]"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Sağ: görsel */}
            <div
              className="relative rounded-2xl overflow-hidden w-full"
              style={{ aspectRatio: "4/3" }}
              aria-hidden={about.intro.image ? undefined : true}
            >
              {about.intro.image ? (
                <Image
                  src={about.intro.image}
                  alt=""
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <>
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
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(200,38,26,0.10)",
                        border: "1px solid rgba(200,38,26,0.22)",
                      }}
                    >
                      <Building2 size={26} style={{ color: "var(--color-accent)" }} />
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Değerler / çalışma yaklaşımı ─────────────────────── */}
      {about.valuesSection.items.length > 0 && (
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
                eyebrow={about.valuesSection.eyebrow}
                heading={about.valuesSection.heading}
                headingId="values-heading"
                description={about.valuesSection.description}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {about.valuesSection.items.map(({ icon: Icon, title, desc }) => (
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
      )}

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

            {/* Sol: görsel */}
            <div
              className="relative rounded-2xl overflow-hidden w-full order-2 lg:order-1"
              style={{ aspectRatio: "4/3" }}
              aria-hidden={about.production.image ? undefined : true}
            >
              {about.production.image ? (
                <Image
                  src={about.production.image}
                  alt=""
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <>
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
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(200,38,26,0.10)",
                        border: "1px solid rgba(200,38,26,0.22)",
                      }}
                    >
                      <Factory size={26} style={{ color: "var(--color-accent)" }} />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sağ: metin */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <SectionHeader
                eyebrow={about.production.eyebrow}
                heading={about.production.heading}
                headingId="production-heading"
              />
              {about.production.paragraphs.length > 0 && (
                <div className="flex flex-col gap-4 max-w-lg">
                  {about.production.paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="text-[15px] leading-[1.75]"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
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
              {about.ctaHeading}
            </h2>
            {about.ctaBody && (
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {about.ctaBody}
              </p>
            )}
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
