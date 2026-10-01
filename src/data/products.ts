// GEÇİCİ — gerçek ürün/kategori datası temin edildiğinde bu dosya tamamen yeniden yazılacak.
// Model adı, teknik özellik, kapasite ve sertifika bilgisi kullanılmamıştır.

export interface ProductCategory {
  id: string
  slug: string
  name: string
  description: string
  href: string
}

export const productCategories: ProductCategory[] = [
  {
    id: "stretch-film",
    slug: "stretch-film",
    name: "GEÇİCİ — Ürün Kategorisi 1",
    description:
      "GEÇİCİ — bu kategorideki ürünlerin kısa tanımı buraya gelecek. Uygulama alanları ve avantajlar eklenecek.",
    href: "/urunler/stretch-film",
  },
  {
    id: "bant-sistemleri",
    slug: "bant-sistemleri",
    name: "GEÇİCİ — Ürün Kategorisi 2",
    description:
      "GEÇİCİ — bu kategorideki ürünlerin kısa tanımı buraya gelecek. Uygulama alanları ve avantajlar eklenecek.",
    href: "/urunler/bant-sistemleri",
  },
  {
    id: "koruyucu-ambalaj",
    slug: "koruyucu-ambalaj",
    name: "GEÇİCİ — Ürün Kategorisi 3",
    description:
      "GEÇİCİ — bu kategorideki ürünlerin kısa tanımı buraya gelecek. Uygulama alanları ve avantajlar eklenecek.",
    href: "/urunler/koruyucu-ambalaj",
  },
]
