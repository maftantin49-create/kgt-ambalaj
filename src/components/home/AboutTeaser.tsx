import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2 } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import { home } from "@/data/home"

const { aboutTeaser } = home

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
              eyebrow={aboutTeaser.eyebrow}
              heading={aboutTeaser.heading}
              headingId="about-teaser-heading"
            />

            {aboutTeaser.paragraphs.length > 0 && (
              <div className="flex flex-col gap-4 max-w-lg">
                {aboutTeaser.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="leading-[1.75] text-[15px]"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {aboutTeaser.ctaLabel && (
              <Link
                href="/hakkimizda"
                className="inline-flex items-center gap-2 text-[14px] font-semibold transition-opacity hover:opacity-75 self-start"
                style={{ color: "var(--color-accent)" }}
              >
                {aboutTeaser.ctaLabel}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
          </div>

          {/* Sağ: görsel alanı */}
          <div
            className="relative rounded-2xl overflow-hidden w-full"
            style={{ aspectRatio: "4/3" }}
            aria-hidden={aboutTeaser.image ? undefined : true}
          >
            {aboutTeaser.image ? (
              <Image
                src={aboutTeaser.image}
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
                  className="absolute bottom-0 right-0 w-14 h-0.5"
                  style={{ background: "var(--color-accent)" }}
                />
                <div
                  className="absolute bottom-0 right-0 w-0.5 h-14"
                  style={{ background: "var(--color-accent)" }}
                />
                <div
                  className="absolute top-6 left-6 right-6 h-px"
                  style={{ background: "rgba(255,255,255,0.07)" }}
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
  )
}
