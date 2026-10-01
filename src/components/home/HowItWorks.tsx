import { MessageSquare, ClipboardList, FileText, PackageCheck } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"

const steps = [
  {
    number: "01",
    title: "İhtiyacınızı Paylaşın",
    description:
      "GEÇİCİ — proje gereksinimlerinizi ve beklentilerinizi bizimle paylaşın. Bu adımın kısa açıklaması buraya gelecek.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Teknik Değerlendirme",
    description:
      "GEÇİCİ — ihtiyacınız teknik açıdan incelenir, uygun çözüm seçenekleri belirlenir. Bu adımın kısa açıklaması buraya gelecek.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Teklif ve Planlama",
    description:
      "GEÇİCİ — projenize özel teklif hazırlanır, üretim planı oluşturulur. Bu adımın kısa açıklaması buraya gelecek.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Üretim ve Teslimat",
    description:
      "GEÇİCİ — onaylanan plana göre üretim gerçekleştirilir ve teslimat sağlanır. Bu adımın kısa açıklaması buraya gelecek.",
    icon: PackageCheck,
  },
] as const

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      style={{
        background: "var(--background)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">

        <div className="mb-10 lg:mb-14">
          <SectionHeader
            eyebrow="GEÇİCİ — Nasıl Çalışıyoruz"
            heading="Çalışma Sürecimiz"
            headingId="how-it-works-heading"
            align="center"
          />
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden"
          style={{ background: "var(--color-border)" }}
        >
          {steps.map(({ number, title, description, icon: Icon }) => (
            <li
              key={number}
              className="flex flex-col gap-5 p-7 lg:p-8"
              style={{ background: "var(--background)" }}
            >
              {/* Numara + ikon satırı */}
              <div className="flex items-center justify-between">
                <span
                  className="font-black leading-none select-none"
                  style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    color: "rgba(200,38,26,0.15)",
                    letterSpacing: "-0.02em",
                  }}
                  aria-hidden="true"
                >
                  {number}
                </span>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                  aria-hidden="true"
                >
                  <Icon size={17} style={{ color: "var(--color-accent)" }} />
                </div>
              </div>

              {/* Başlık + açıklama */}
              <div className="flex flex-col gap-2">
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
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  )
}
