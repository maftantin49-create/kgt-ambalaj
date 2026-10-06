// Ana sayfa için merkezi içerik kaynağı.
// Müşteri brief'i geldikten sonra yalnızca bu dosya güncellenir.
// Boş string ("") veya boş dizi ([]) bırakan alanlar sayfada render edilmez.

import type { LucideIcon } from "lucide-react"
import {
  Settings2,
  MessageSquare,
  Factory,
  FileText,
  ClipboardList,
  PackageCheck,
} from "lucide-react"

export interface TrustItem {
  icon: LucideIcon
  title: string
  desc: string
}

export interface WorkStep {
  number: string
  icon: LucideIcon
  title: string
  description: string
}

export interface HomeData {
  hero: {
    eyebrow: string
    headingBefore: string
    headingAccent: string
    headingAfter: string
    description: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
    image?: string
  }
  trustBar: TrustItem[]
  productsSection: {
    eyebrow: string
    heading: string
    description?: string
    viewAllLabel: string
  }
  sectorsSection: {
    eyebrow: string
    heading: string
    description?: string
  }
  aboutTeaser: {
    eyebrow: string
    heading: string
    paragraphs: string[]
    ctaLabel: string
    image?: string
  }
  howItWorks: {
    eyebrow: string
    heading: string
    description?: string
    steps: WorkStep[]
  }
  ctaBanner: {
    eyebrow: string
    heading: string
    description: string
    primaryCta: { label: string; href: string }
    secondaryCta?: { label: string; href: string }
  }
  contactTeaser: {
    eyebrow: string
    heading: string
    description?: string
  }
}

export const home: HomeData = {

  hero: {
    eyebrow: "Ambalaj Makineleri",
    headingBefore: "Ambalajın",
    headingAccent: "Geleceğini",
    headingAfter: "Şekillendiriyoruz",
    description:
      "Yüksek performanslı streç film ve alüminyum folyo sarma makineleri ile üretim hatlarınıza hız, hassasiyet ve sürdürülebilir verim kazandırıyoruz.",
    primaryCta: { label: "Ürünleri İncele", href: "/urunler" },
    secondaryCta: { label: "Teklif Al", href: "/iletisim" },
  },

  trustBar: [
    {
      icon: Settings2,
      title: "Proje Odaklı Çözüm",
      desc: "Uygulamaya özel ambalaj tasarımı ve üretimi",
    },
    {
      icon: MessageSquare,
      title: "Teknik Danışmanlık",
      desc: "Uzman ekiple süreç başından sonuna destek",
    },
    {
      icon: Factory,
      title: "Endüstriyel Uygulamalar",
      desc: "Ağır sanayi ve lojistik ihtiyaçlarına uygun çözümler",
    },
    {
      icon: FileText,
      title: "Teklif Desteği",
      desc: "Projenize özel fiyatlandırma ve teknik teklif",
    },
  ],

  productsSection: {
    eyebrow: "Ürünler",
    heading: "Ürün Kategorilerimiz",
    viewAllLabel: "Tüm Ürünler",
  },

  sectorsSection: {
    eyebrow: "Sektörler",
    heading: "Hizmet Verdiğimiz Sektörler",
  },

  aboutTeaser: {
    eyebrow: "GEÇİCİ — Hakkımızda",
    heading: "GEÇİCİ — Şirket başlığı buraya gelecek",
    paragraphs: [
      "GEÇİCİ — Şirketi tanıtan birinci paragraf. Faaliyet alanı, temel yaklaşım veya değer önerisi buraya gelecek.",
      "GEÇİCİ — İkinci paragraf. Müşteri odaklı çalışma anlayışı veya sektördeki konumlandırma buraya gelecek.",
    ],
    ctaLabel: "Hakkımızda Daha Fazla",
  },

  howItWorks: {
    eyebrow: "GEÇİCİ — Nasıl Çalışıyoruz",
    heading: "Çalışma Sürecimiz",
    steps: [
      {
        number: "01",
        icon: MessageSquare,
        title: "İhtiyacınızı Paylaşın",
        description:
          "GEÇİCİ — proje gereksinimlerinizi ve beklentilerinizi bizimle paylaşın. Bu adımın kısa açıklaması buraya gelecek.",
      },
      {
        number: "02",
        icon: ClipboardList,
        title: "Teknik Değerlendirme",
        description:
          "GEÇİCİ — ihtiyacınız teknik açıdan incelenir, uygun çözüm seçenekleri belirlenir. Bu adımın kısa açıklaması buraya gelecek.",
      },
      {
        number: "03",
        icon: FileText,
        title: "Teklif ve Planlama",
        description:
          "GEÇİCİ — projenize özel teklif hazırlanır, üretim planı oluşturulur. Bu adımın kısa açıklaması buraya gelecek.",
      },
      {
        number: "04",
        icon: PackageCheck,
        title: "Üretim ve Teslimat",
        description:
          "GEÇİCİ — onaylanan plana göre üretim gerçekleştirilir ve teslimat sağlanır. Bu adımın kısa açıklaması buraya gelecek.",
      },
    ],
  },

  ctaBanner: {
    eyebrow: "GEÇİCİ — Teklif / İletişim",
    heading: "GEÇİCİ — Projeniz için doğru ambalaj çözümü burada",
    description:
      "GEÇİCİ — Projenizi anlatın, size özel teknik değerlendirme ve teklif hazırlayalım.",
    primaryCta: { label: "Teklif Al", href: "#iletisim" },
    secondaryCta: { label: "Ürünleri İncele", href: "/urunler" },
  },

  contactTeaser: {
    eyebrow: "İletişim",
    heading: "Bizimle İletişime Geçin",
  },
}
