import type { Sector } from "@/data/types"
import { Package, Shirt, FileText } from "lucide-react"

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
