import type { AboutData } from "@/data/types"
import { ShieldCheck, Wrench, Users, Lightbulb } from "lucide-react"

export const about: AboutData = {
  heroHeading: "KGT Ambalaj Hakkında",
  heroIntro:
    "Endüstriyel ambalaj makineleri alanında faaliyet gösteren KGT Ambalaj, streç film sarma, alüminyum folyo sarma ve kağıt dilimleme ekipmanları tasarlar ve üretir.",

  intro: {
    eyebrow: "Biz Kimiz",
    heading: "Endüstriyel Ambalaj Makineleri",
    paragraphs: [
      "KGT Ambalaj, üretim hatları için streç film sarma, alüminyum folyo sarma ve kağıt dilimleme makineleri tasarlar ve üretir.",
      "Ambalaj ve tekstil sektörlerine yönelik proje bazlı çözümler sunan KGT, müşteri ihtiyaçlarına göre özelleştirilebilen makineler geliştirir.",
      "Her projede teknik doğruluk önceliğimizdir.",
    ],
    image: "/images/kgt/production-line.jpeg",
  },

  valuesSection: {
    eyebrow: "Yaklaşımımız",
    heading: "Çalışma Yaklaşımımız",
    description:
      "Her projede güvenilir, teknik olarak doğru ve uygulanabilir çözümler üretiyoruz.",
    items: [
      {
        icon: ShieldCheck,
        title: "Kalite Odaklı Üretim",
        desc: "Her makine, endüstriyel kullanım koşullarını karşılayacak şekilde tasarlanır.",
      },
      {
        icon: Wrench,
        title: "Teknik Uzmanlık",
        desc: "Ambalaj makineleri alanındaki birikimimizle projeleri başından sonuna yönetiyoruz.",
      },
      {
        icon: Users,
        title: "Müşteri Odaklılık",
        desc: "Proje gereksinimlerinizi dinler, üretim hattınıza uygun çözüm geliştiririz.",
      },
      {
        icon: Lightbulb,
        title: "Çözüm Geliştirme",
        desc: "Üretim hattı ihtiyaçlarınıza yönelik, uygulanabilir çözümler tasarlıyoruz.",
      },
    ],
  },

  production: {
    eyebrow: "Üretim",
    heading: "Makine Üretim Sürecimiz",
    paragraphs: [
      "KGT Ambalaj, streç film sarma makinelerinden karton masura üretim hatlarına kadar geniş bir makine yelpazesi üretmektedir.",
      "Her makine, kullanılacağı ortam ve kapasite gereksinimlerine göre yapılandırılır; montaj ve devreye alma süreçleri müşteri lokasyonunda gerçekleştirilir.",
    ],
    image: "/images/kgt/rewinding-workshop.webp",
  },

  ctaHeading: "Projeniz için Teklif Alın",
  ctaBody:
    "Makine ihtiyaçlarınızı paylaşın, size özel teknik değerlendirme ve fiyat teklifi hazırlayalım.",
}
