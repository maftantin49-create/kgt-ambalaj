import type { MetadataRoute } from "next"
import { getProducts } from "@/data/index"
import { site } from "@/config/site"

const base = site.url

export default function sitemap(): MetadataRoute.Sitemap {
  const trProducts = getProducts("tr")
  const enProducts = getProducts("en")

  return [
    {
      url:             `${base}/tr`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        1.0,
    },
    {
      url:             `${base}/en`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.9,
    },
    {
      url:             `${base}/tr/urunler`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.9,
    },
    {
      url:             `${base}/en/products`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    ...trProducts.map((cat) => ({
      url:             `${base}/tr/urunler/${cat.slug}`,
      lastModified:    new Date(),
      changeFrequency: "monthly" as const,
      priority:        0.7,
    })),
    ...enProducts.map((cat) => ({
      url:             `${base}/en/products/${cat.slug}`,
      lastModified:    new Date(),
      changeFrequency: "monthly" as const,
      priority:        0.6,
    })),
    {
      url:             `${base}/tr/hakkimizda`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             `${base}/en/about`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.7,
    },
    {
      url:             `${base}/tr/iletisim`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.7,
    },
    {
      url:             `${base}/en/contact`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.6,
    },
  ]
}
