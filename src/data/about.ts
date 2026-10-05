// Hakkımızda sayfası için merkezi içerik kaynağı.
// Müşteri brief'i geldikten sonra yalnızca bu dosya güncellenir.
// Boş string ("") veya boş dizi ([]) bırakan alanlar sayfada render edilmez.

import type { LucideIcon } from "lucide-react"
import { ShieldCheck, Wrench, Users, Lightbulb } from "lucide-react"

export interface AboutValue {
  icon: LucideIcon
  title: string
  desc: string
}

export interface AboutData {
  heroHeading: string
  heroIntro: string
  intro: {
    eyebrow: string
    heading: string
    paragraphs: string[]
  }
  valuesSection: {
    eyebrow: string
    heading: string
    description?: string
    items: AboutValue[]
  }
  production: {
    eyebrow: string
    heading: string
    paragraphs: string[]
  }
  ctaHeading: string
  ctaBody: string
}

export const about: AboutData = {
  heroHeading: "GEÇİCİ — Hakkımızda başlığı",
  heroIntro:
    "GEÇİCİ — hakkımızda sayfasını tanıtan kısa giriş. Şirketin ne yaptığını ve neden burada olduğunu anlatan 1–2 cümle buraya gelecek.",

  intro: {
    eyebrow: "GEÇİCİ — Biz Kimiz",
    heading: "GEÇİCİ — Şirket tanıtım başlığı",
    paragraphs: [
      "GEÇİCİ — Birinci paragraf. Şirketin tarihçesi, faaliyet alanı veya kuruluş amacı buraya gelecek.",
      "GEÇİCİ — İkinci paragraf. Şirketin misyonu, vizyonu veya endüstrideki yeri buraya gelecek.",
      "GEÇİCİ — Üçüncü paragraf. Müşterilere sunulan temel fayda veya rekabet avantajı buraya gelecek.",
    ],
  },

  valuesSection: {
    eyebrow: "GEÇİCİ — Değerlerimiz",
    heading: "Çalışma Yaklaşımımız",
    description:
      "GEÇİCİ — temel değerleri ve çalışma felsefesini özetleyen 1–2 cümle buraya gelecek.",
    items: [
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
    ],
  },

  production: {
    eyebrow: "GEÇİCİ — Üretim / Çözüm",
    heading: "GEÇİCİ — Üretim veya çözüm yaklaşımı başlığı",
    paragraphs: [
      "GEÇİCİ — Üretim süreçleri, kullanılan teknolojiler veya çözüm geliştirme yaklaşımını anlatan birinci paragraf buraya gelecek.",
      "GEÇİCİ — Kalite kontrol, teknik altyapı veya proje yönetimi hakkında ikinci paragraf buraya gelecek.",
    ],
  },

  ctaHeading: "GEÇİCİ — Projeniz için teklif almak ister misiniz?",
  ctaBody: "GEÇİCİ — iletişim CTA açıklaması buraya gelecek.",
}
