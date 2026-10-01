// Ürün kategorileri — https://kgtambalaj.com/ üzerinden doğrulanmış gerçek makine kategorileri.
// Teknik kapasite, hız, ölçü, motor gücü, sertifika veya model bilgisi eklenmemiştir.

export interface ProductCategory {
  id: string
  slug: string
  name: string
  description: string
  href: string
}

export const productCategories: ProductCategory[] = [
  {
    id: "strec-film-sarma-makineleri",
    slug: "strec-film-sarma-makineleri",
    name: "Streç Film Sarma Makineleri",
    description:
      "Üretim hatları ve palet sarma süreçleri için yüksek performanslı streç film sarma ve rewinding makineleri.",
    href: "/urunler/strec-film-sarma-makineleri",
  },
  {
    id: "aluminyum-folyo-sarma-makineleri",
    slug: "aluminyum-folyo-sarma-makineleri",
    name: "Alüminyum Folyo Sarma Makineleri",
    description:
      "Alüminyum folyo rulo sarma ve rewinding işlemleri için endüstriyel ambalaj makineleri.",
    href: "/urunler/aluminyum-folyo-sarma-makineleri",
  },
  {
    id: "karton-rulo-masura-uretim-hatti-makineleri",
    slug: "karton-rulo-masura-uretim-hatti-makineleri",
    name: "Karton Rulo Masura Üretim Hattı Makineleri",
    description:
      "Karton masura ve rulo çekirdek üretimi için eksiksiz üretim hattı çözümleri.",
    href: "/urunler/karton-rulo-masura-uretim-hatti-makineleri",
  },
  {
    id: "kagit-dilimleme-makineleri",
    slug: "kagit-dilimleme-makineleri",
    name: "Kağıt Dilimleme Makineleri",
    description:
      "Kağıt, ambalaj ve baskı sektöründe rulo kesim ve dilimleme ihtiyaçları için hassas dilimleme makineleri.",
    href: "/urunler/kagit-dilimleme-makineleri",
  },
]
