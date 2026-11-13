import { trToEnSlug, enToTrSlug } from "@/config/slugs"

export const locales = ["tr", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "tr"

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

type LocaleRoutes = {
  home: string
  products: string
  about: string
  contact: string
  workingProcess: string
  product: (slug: string) => string
}

export const localePaths: Record<Locale, LocaleRoutes> = {
  tr: {
    home:            "/tr",
    products:        "/tr/urunler",
    about:           "/tr/hakkimizda",
    contact:         "/tr/iletisim",
    workingProcess:  "/tr/calisma-surecimiz",
    product:         (slug) => `/tr/urunler/${slug}`,
  },
  en: {
    home:            "/en",
    products:        "/en/products",
    about:           "/en/about",
    contact:         "/en/contact",
    workingProcess:  "/en/working-process",
    product:         (slug) => `/en/products/${slug}`,
  },
}

// ── Gelecek rotalar (henüz sayfa bileşeni yok) ───────────────────────────────
// TR: /tr/sektorler/   EN: /en/industries/   (V4-C)
// TR: /tr/bilgi-merkezi/   EN: /en/knowledge/   (V4-D)
// ─────────────────────────────────────────────────────────────────────────────

// Eşdeğer locale route mapping — language switch için
const trToEnMap: Record<string, string> = {
  "/tr":                    "/en",
  "/tr/urunler":            "/en/products",
  "/tr/hakkimizda":         "/en/about",
  "/tr/iletisim":           "/en/contact",
  "/tr/calisma-surecimiz":  "/en/working-process",
}
const enToTrMap: Record<string, string> = {
  "/en":                   "/tr",
  "/en/products":          "/tr/urunler",
  "/en/about":             "/tr/hakkimizda",
  "/en/contact":           "/tr/iletisim",
  "/en/working-process":   "/tr/calisma-surecimiz",
}

export function getAlternatePath(pathname: string): string {
  // Normalize trailing slash before map lookup (trailingSlash:true appends it)
  const normalPath = pathname.replace(/\/$/, "")

  if (trToEnMap[normalPath]) return trToEnMap[normalPath]
  if (enToTrMap[normalPath]) return enToTrMap[normalPath]

  // Product detail: /tr/urunler/[tr-slug] ↔ /en/products/[en-slug]
  if (pathname.startsWith("/tr/urunler/")) {
    const trSlug = pathname.slice("/tr/urunler/".length).replace(/\/$/, "")
    return "/en/products/" + (trToEnSlug[trSlug] ?? trSlug)
  }
  if (pathname.startsWith("/en/products/")) {
    const enSlug = pathname.slice("/en/products/".length).replace(/\/$/, "")
    return "/tr/urunler/" + (enToTrSlug[enSlug] ?? enSlug)
  }

  // Fallback to same-locale home
  if (pathname.startsWith("/en")) return "/tr"
  return "/en"
}
