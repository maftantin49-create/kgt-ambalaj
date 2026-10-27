import type { HomeData } from "@/data/types"
import {
  Settings2,
  MessageSquare,
  Factory,
  FileText,
  ClipboardList,
  PackageCheck,
} from "lucide-react"

export const home: HomeData = {

  hero: {
    eyebrow: "Ambalaj Makineleri",
    headingBefore: "Ambalajın",
    headingAccent: "Geleceğini",
    headingAfter: "Şekillendiriyoruz",
    description:
      "Streç film ve alüminyum folyo sarma makineleri ile üretim hatlarınıza hız ve hassasiyet kazandırıyoruz.",
    primaryCta: { label: "Ürünleri İncele", href: "/tr/urunler" },
    secondaryCta: { label: "Teklif Al", href: "/tr/iletisim" },
    image: "/images/kgt/rewinding-workshop.webp",
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
      desc: "Proje sürecine yönelik iletişim ve destek",
    },
    {
      icon: Factory,
      title: "Endüstriyel Uygulamalar",
      desc: "Ağır sanayi ihtiyaçlarına uygun endüstriyel çözümler",
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
    eyebrow: "Hakkımızda",
    heading: "KGT Ambalaj",
    paragraphs: [
      "KGT Ambalaj, endüstriyel streç film sarma, alüminyum folyo sarma ve kağıt dilimleme makineleri tasarlar ve üretir.",
      "Ambalaj ve tekstil sektörlerine yönelik proje bazlı çözümler sunan KGT, üretim hattı gereksinimlerine özel makineler geliştirir.",
    ],
    ctaLabel: "Hakkımızda Daha Fazla",
    image: "/images/kgt/production-line.jpeg",
  },

  howItWorks: {
    eyebrow: "Nasıl Çalışıyoruz",
    heading: "Çalışma Sürecimiz",
    steps: [
      {
        number: "01",
        icon: MessageSquare,
        title: "İhtiyacınızı Paylaşın",
        description:
          "Proje gereksinimlerinizi ve beklentilerinizi bizimle paylaşın.",
      },
      {
        number: "02",
        icon: ClipboardList,
        title: "Teknik Değerlendirme",
        description:
          "İhtiyacınız teknik açıdan incelenir, uygun makine ve çözüm seçenekleri belirlenir.",
      },
      {
        number: "03",
        icon: FileText,
        title: "Teklif ve Planlama",
        description:
          "Projenize özel teklif hazırlanır, üretim ve teslimat planı oluşturulur.",
      },
      {
        number: "04",
        icon: PackageCheck,
        title: "Üretim ve Teslimat",
        description:
          "Onaylanan plana göre makine üretilir, montaj ve devreye alma gerçekleştirilir.",
      },
    ],
  },

  ctaBanner: {
    eyebrow: "Teklif",
    heading: "Projeniz için doğru ambalaj çözümü",
    description:
      "Makine ihtiyaçlarınızı paylaşın, size özel teknik değerlendirme ve teklif hazırlayalım.",
    primaryCta: { label: "Teklif Al", href: "/tr/iletisim" },
    secondaryCta: { label: "Ürünleri İncele", href: "/tr/urunler" },
  },

  contactTeaser: {
    eyebrow: "İletişim",
    heading: "Bizimle İletişime Geçin",
  },
}
