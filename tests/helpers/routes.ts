export const TR_PRODUCTS = [
  "strec-film-sarma-makineleri",
  "aluminyum-folyo-sarma-makineleri",
  "karton-rulo-masura-uretim-hatti-makineleri",
  "kagit-dilimleme-makineleri",
] as const

export const EN_PRODUCTS = [
  "stretch-film-rewinding-machines",
  "aluminium-foil-rewinding-machines",
  "cardboard-core-tube-production-line-machines",
  "paper-slitting-machines",
] as const

export const TR_ROUTES = {
  home:    "/tr/",
  products: "/tr/urunler/",
  about:   "/tr/hakkimizda/",
  contact: "/tr/iletisim/",
  productDetails: TR_PRODUCTS.map((s) => `/tr/urunler/${s}/`) as string[],
}

export const EN_ROUTES = {
  home:    "/en/",
  products: "/en/products/",
  about:   "/en/about/",
  contact: "/en/contact/",
  productDetails: EN_PRODUCTS.map((s) => `/en/products/${s}/`) as string[],
}

export const ALL_ROUTES: string[] = [
  TR_ROUTES.home,
  TR_ROUTES.products,
  TR_ROUTES.about,
  TR_ROUTES.contact,
  ...TR_ROUTES.productDetails,
  EN_ROUTES.home,
  EN_ROUTES.products,
  EN_ROUTES.about,
  EN_ROUTES.contact,
  ...EN_ROUTES.productDetails,
]

export const SITE_PHONE     = "+90 531 523 77 22"
export const SITE_PHONE_TEL = "tel:+90 531 523 77 22"

export const TR_NAV_LABELS = ["Ana Sayfa", "Ürünler", "Hakkımızda", "İletişim"] as const
export const EN_NAV_LABELS = ["Home", "Products", "About Us", "Contact"] as const
