import type { Sector } from "@/data/types"
import { Package, Shirt, FileText } from "lucide-react"

export const sectors: Sector[] = [
  {
    id: "ambalaj-endustrisi",
    name: "Packaging Industry",
    description:
      "Stretch film and aluminium foil rewinding solutions for production lines.",
    icon: Package,
  },
  {
    id: "tekstil",
    name: "Textile",
    description:
      "Specialised packaging machines and production line solutions for the textile sector.",
    icon: Shirt,
  },
  {
    id: "kagit-endustrisi",
    name: "Paper Industry",
    description:
      "Machine solutions tailored to the paper industry for roll cutting and slitting lines.",
    icon: FileText,
  },
]
