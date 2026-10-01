// Doğrulanmış sektörler — https://kgtambalaj.com/ üzerinde Türkçe metinde geçen 3 sektör.
// Müşteri adı, proje sayısı veya hizmet yılı gibi doğrulanmamış bilgi kullanılmamıştır.
// Müşteri doğrulaması bekleyen sektörler (Baskı/Matbaa, Gıda, Lojistik) bu listede yer almaz.

import type { LucideIcon } from "lucide-react"
import { Package, Shirt, FileText } from "lucide-react"

export interface Sector {
  id: string
  name: string
  description: string
  icon: LucideIcon
}

export const sectors: Sector[] = [
  {
    id: "ambalaj-endustrisi",
    name: "Ambalaj Endüstrisi",
    description:
      "Üretim hatları için streç film ve alüminyum folyo sarma çözümleri.",
    icon: Package,
  },
  {
    id: "tekstil",
    name: "Tekstil",
    description:
      "Tekstil sektörüne yönelik özel ambalaj makineleri ve üretim hattı çözümleri.",
    icon: Shirt,
  },
  {
    id: "kagit-endustrisi",
    name: "Kağıt Endüstrisi",
    description:
      "Rulo kesim ve dilimleme hatları için kağıt endüstrisine özel makine çözümleri.",
    icon: FileText,
  },
]
