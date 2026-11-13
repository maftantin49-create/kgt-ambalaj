import { getProducts } from "@/data/index"
import { localePaths, type Locale } from "@/config/i18n"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NavLinkItem {
  type: "link"
  href: string
  label: string
  hidden?: boolean
}

export interface MegaProduct {
  number: string
  href: string
  name: string
  desc: string
}

export interface NavMegaItem {
  type: "mega"
  key: string
  label: string
  activePrefixes: string[]
  products: MegaProduct[]
  viewAllHref: string
  viewAllLabel: string
  ctaHref: string
  ctaLabel: string
  hidden?: boolean
}

export interface NavDropdownChild {
  href: string
  label: string
  hidden?: boolean
}

export interface NavDropdownItem {
  type: "dropdown"
  key: string
  label: string
  activePrefixes: string[]
  children: NavDropdownChild[]
  hidden?: boolean
}

export type NavItem = NavLinkItem | NavMegaItem | NavDropdownItem

// ── Data ──────────────────────────────────────────────────────────────────────

export function getNavItems(locale: Locale): NavItem[] {
  const products = getProducts(locale)
  const p = localePaths[locale]

  if (locale === "tr") {
    return [
      { type: "link", href: p.home, label: "Ana Sayfa" },
      {
        type: "mega",
        key: "products",
        label: "Ürünler",
        activePrefixes: ["/tr/urunler"],
        products: products.map((cat, i) => ({
          number: String(i + 1).padStart(2, "0"),
          href: p.product(cat.slug),
          name: cat.name,
          desc: cat.shortDescription,
        })),
        viewAllHref: p.products,
        viewAllLabel: "Tüm Ürünleri İncele",
        ctaHref: p.contact,
        ctaLabel: "Teklif Al",
      },
      {
        type: "dropdown",
        key: "sectors",
        label: "Sektörler",
        activePrefixes: ["/tr/sektorler"],
        hidden: true, // V4-C
        children: [],
      },
      {
        type: "dropdown",
        key: "corporate",
        label: "Kurumsal",
        activePrefixes: ["/tr/hakkimizda", "/tr/calisma-surecimiz"],
        children: [
          { href: p.about, label: "Hakkımızda" },
          { href: p.workingProcess, label: "Çalışma Sürecimiz" },
        ],
      },
      { type: "link", href: "/tr/bilgi-merkezi", label: "Bilgi Merkezi", hidden: true }, // V4-D
      { type: "link", href: p.contact, label: "İletişim" },
    ]
  }

  return [
    { type: "link", href: p.home, label: "Home" },
    {
      type: "mega",
      key: "products",
      label: "Products",
      activePrefixes: ["/en/products"],
      products: products.map((cat, i) => ({
        number: String(i + 1).padStart(2, "0"),
        href: p.product(cat.slug),
        name: cat.name,
        desc: cat.shortDescription,
      })),
      viewAllHref: p.products,
      viewAllLabel: "All Products",
      ctaHref: p.contact,
      ctaLabel: "Get a Quote",
    },
    {
      type: "dropdown",
      key: "sectors",
      label: "Industries",
      activePrefixes: ["/en/industries"],
      hidden: true, // V4-C
      children: [],
    },
    {
      type: "dropdown",
      key: "corporate",
      label: "Corporate",
      activePrefixes: ["/en/about", "/en/working-process"],
      children: [
        { href: p.about, label: "About" },
        { href: p.workingProcess, label: "Working Process" },
      ],
    },
    { type: "link", href: "/en/knowledge", label: "Knowledge", hidden: true }, // V4-D
    { type: "link", href: p.contact, label: "Contact" },
  ]
}
