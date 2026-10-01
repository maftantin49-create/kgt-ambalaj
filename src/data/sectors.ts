// GEÇİCİ — gerçek sektör listesi ve açıklamaları temin edildiğinde bu dosya güncellenecek.
// Müşteri adı, proje sayısı veya hizmet yılı gibi doğrulanmamış bilgi kullanılmamıştır.

import type { LucideIcon } from "lucide-react"

export interface Sector {
  id: string
  name: string
  description: string
  icon: LucideIcon
}

import {
  UtensilsCrossed,
  Truck,
  Car,
  FlaskConical,
  Shirt,
  ShoppingCart,
} from "lucide-react"

export const sectors: Sector[] = [
  {
    id: "gida-icecek",
    name: "GEÇİCİ — Sektör 1",
    description: "GEÇİCİ — bu sektör için kısa bir açıklama buraya gelecek.",
    icon: UtensilsCrossed,
  },
  {
    id: "lojistik-depolama",
    name: "GEÇİCİ — Sektör 2",
    description: "GEÇİCİ — bu sektör için kısa bir açıklama buraya gelecek.",
    icon: Truck,
  },
  {
    id: "otomotiv",
    name: "GEÇİCİ — Sektör 3",
    description: "GEÇİCİ — bu sektör için kısa bir açıklama buraya gelecek.",
    icon: Car,
  },
  {
    id: "kimya-ilac",
    name: "GEÇİCİ — Sektör 4",
    description: "GEÇİCİ — bu sektör için kısa bir açıklama buraya gelecek.",
    icon: FlaskConical,
  },
  {
    id: "tekstil",
    name: "GEÇİCİ — Sektör 5",
    description: "GEÇİCİ — bu sektör için kısa bir açıklama buraya gelecek.",
    icon: Shirt,
  },
  {
    id: "e-ticaret",
    name: "GEÇİCİ — Sektör 6",
    description: "GEÇİCİ — bu sektör için kısa bir açıklama buraya gelecek.",
    icon: ShoppingCart,
  },
]
