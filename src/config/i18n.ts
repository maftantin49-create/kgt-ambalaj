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
  product: (slug: string) => string
}

export const localePaths: Record<Locale, LocaleRoutes> = {
  tr: {
    home:     "/tr",
    products: "/tr/urunler",
    about:    "/tr/hakkimizda",
    contact:  "/tr/iletisim",
    product:  (slug) => `/tr/urunler/${slug}`,
  },
  en: {
    home:     "/en",
    products: "/en/products",
    about:    "/en/about",
    contact:  "/en/contact",
    product:  (slug) => `/en/products/${slug}`,
  },
}

// Eşdeğer locale route mapping — language switch için
const trToEnMap: Record<string, string> = {
  "/tr":              "/en",
  "/tr/urunler":      "/en/products",
  "/tr/hakkimizda":   "/en/about",
  "/tr/iletisim":     "/en/contact",
}
const enToTrMap: Record<string, string> = {
  "/en":              "/tr",
  "/en/products":     "/tr/urunler",
  "/en/about":        "/tr/hakkimizda",
  "/en/contact":      "/tr/iletisim",
}

export function getAlternatePath(pathname: string): string {
  // Exact match
  if (trToEnMap[pathname]) return trToEnMap[pathname]
  if (enToTrMap[pathname]) return enToTrMap[pathname]

  // Product detail: /tr/urunler/[slug] ↔ /en/products/[slug]
  if (pathname.startsWith("/tr/urunler/")) {
    return "/en/products/" + pathname.slice("/tr/urunler/".length)
  }
  if (pathname.startsWith("/en/products/")) {
    return "/tr/urunler/" + pathname.slice("/en/products/".length)
  }

  // Fallback to same-locale home
  if (pathname.startsWith("/en")) return "/tr"
  return "/en"
}
