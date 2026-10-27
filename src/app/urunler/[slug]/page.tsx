import { permanentRedirect } from "next/navigation"
import { productCategories } from "@/data/products"

export function generateStaticParams() {
  return productCategories.map((cat) => ({ slug: cat.slug }))
}

export default async function UrunDetayRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  permanentRedirect(`/tr/urunler/${slug}`)
}
