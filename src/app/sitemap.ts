import type { MetadataRoute } from "next"
import { productCategories } from "@/data/products"
import { site } from "@/config/site"

const base = site.url

export default function sitemap(): MetadataRoute.Sitemap {
  const slugRoutes: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: `${base}/tr/urunler/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [
    {
      url: `${base}/tr`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/tr/urunler`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...slugRoutes,
    {
      url: `${base}/tr/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/tr/iletisim`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ]
}
