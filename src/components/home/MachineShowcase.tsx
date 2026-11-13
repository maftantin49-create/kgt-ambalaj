import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { localePaths, type Locale } from "@/config/i18n"

export default function MachineShowcase({ locale }: { locale: Locale }) {
  const p = localePaths[locale]
  const isTr = locale === "tr"

  return (
    <section
      aria-labelledby="machine-showcase-heading"
      style={{ background: "#1A1A18" }}
    >
      {/* Full-width workshop image */}
      <div
        className="relative overflow-hidden w-full"
        style={{ height: "clamp(280px, 36vw, 480px)" }}
      >
        <Image
          src="/images/kgt/delivery-production.jpeg"
          alt={
            isTr
              ? "KGT Ambalaj üretim tesisi ve makine parkuru"
              : "KGT Ambalaj production facility and machine floor"
          }
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dark content strip */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--color-accent)" }}
            >
              {isTr ? "Üretim" : "Manufacturing"}
            </p>
            <h2
              id="machine-showcase-heading"
              className="mt-2 font-bold leading-snug text-white"
              style={{ fontSize: "clamp(16px, 1.8vw, 21px)", maxWidth: "44ch" }}
            >
              {isTr
                ? "Proje gereksinimlerinize özel endüstriyel makine üretimi."
                : "Industrial machine manufacturing tailored to your project requirements."}
            </h2>
          </div>
          <Link
            href={p.about}
            className="inline-flex items-center gap-2 font-semibold text-[14px] shrink-0 transition-opacity hover:opacity-75"
            style={{ color: "white" }}
          >
            {isTr ? "Hakkımızda" : "About Us"}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
