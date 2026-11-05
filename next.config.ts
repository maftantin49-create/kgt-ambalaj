import type { NextConfig } from "next"

const enSlugRedirects = [
  { trSlug: "strec-film-sarma-makineleri",               enSlug: "stretch-film-rewinding-machines" },
  { trSlug: "aluminyum-folyo-sarma-makineleri",           enSlug: "aluminium-foil-rewinding-machines" },
  { trSlug: "karton-rulo-masura-uretim-hatti-makineleri", enSlug: "cardboard-core-tube-production-line-machines" },
  { trSlug: "kagit-dilimleme-makineleri",                 enSlug: "paper-slitting-machines" },
]

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return enSlugRedirects.map(({ trSlug, enSlug }) => ({
      source:      `/en/products/${trSlug}`,
      destination: `/en/products/${enSlug}`,
      permanent:   true,
    }))
  },
}

export default nextConfig
