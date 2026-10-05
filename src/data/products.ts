// Ürün kategorileri — https://kgtmak.com üzerinden doğrulanmış gerçek makine kategorileri.
// Teknik kapasite, hız, ölçü, motor gücü, sertifika veya model bilgisi
// müşteri tarafından verildiğinde ilgili alanlara eklenir.

export interface ProductModel {
  name: string
  description?: string
}

export interface TechnicalSpec {
  label: string
  value: string
}

export interface ProductSolutionCard {
  title: string
  description: string
}

export interface ProductCategory {
  id: string
  slug: string
  name: string
  /** Kart ve meta description için — 1 cümle, her zaman dolu. */
  shortDescription: string
  /** Detay sayfası için uzun açıklama — opsiyonel. */
  description?: string
  /** public/ altındaki görsel yolu: "/images/products/xxx.jpg" — opsiyonel. */
  image?: string
  /** Temel Özellikler bullet listesi — opsiyonel. */
  features?: string[]
  /** Kullanım alanları listesi — opsiyonel. */
  applications?: string[]
  /** Makine modelleri — opsiyonel. */
  models?: ProductModel[]
  /** Teknik özellik tablosu — opsiyonel. */
  specs?: TechnicalSpec[]
  /** Çözüm kartları — opsiyonel. */
  solutionCards?: ProductSolutionCard[]
  href: string
}

export const productCategories: ProductCategory[] = [
  {
    id: "strec-film-sarma-makineleri",
    slug: "strec-film-sarma-makineleri",
    name: "Streç Film Sarma Makineleri",
    shortDescription:
      "Üretim hatları ve palet sarma süreçleri için yüksek performanslı streç film sarma ve rewinding makineleri.",
    href: "/urunler/strec-film-sarma-makineleri",
  },
  {
    id: "aluminyum-folyo-sarma-makineleri",
    slug: "aluminyum-folyo-sarma-makineleri",
    name: "Alüminyum Folyo Sarma Makineleri",
    shortDescription:
      "Alüminyum folyo rulo sarma ve rewinding işlemleri için endüstriyel ambalaj makineleri.",
    href: "/urunler/aluminyum-folyo-sarma-makineleri",
  },
  {
    id: "karton-rulo-masura-uretim-hatti-makineleri",
    slug: "karton-rulo-masura-uretim-hatti-makineleri",
    name: "Karton Rulo Masura Üretim Hattı Makineleri",
    shortDescription:
      "Karton masura ve rulo çekirdek üretimi için eksiksiz üretim hattı çözümleri.",
    href: "/urunler/karton-rulo-masura-uretim-hatti-makineleri",
  },
  {
    id: "kagit-dilimleme-makineleri",
    slug: "kagit-dilimleme-makineleri",
    name: "Kağıt Dilimleme Makineleri",
    shortDescription:
      "Kağıt, ambalaj ve baskı sektöründe rulo kesim ve dilimleme ihtiyaçları için hassas dilimleme makineleri.",
    href: "/urunler/kagit-dilimleme-makineleri",
  },
]
