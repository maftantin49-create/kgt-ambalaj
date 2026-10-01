import type { MetadataRoute } from "next"
import { productCategories } from "@/data/products"
import { site } from "@/config/site"

const base = site.url

export default function sitemap(): MetadataRoute.Sitemap {
  const slugRoutes: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: `${base}/urunler/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/urunler`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...slugRoutes,
    {
      url: `${base}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ]
}
