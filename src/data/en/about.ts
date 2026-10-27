import type { AboutData } from "@/data/types"
import { ShieldCheck, Wrench, Users, Lightbulb } from "lucide-react"

export const about: AboutData = {
  heroHeading: "About KGT Ambalaj",
  heroIntro:
    "Operating in the field of industrial packaging machinery, KGT Ambalaj designs and manufactures stretch film rewinding, aluminium foil rewinding, and paper slitting equipment.",

  intro: {
    eyebrow: "Who We Are",
    heading: "Industrial Packaging Machinery",
    paragraphs: [
      "KGT Ambalaj designs and manufactures stretch film rewinding, aluminium foil rewinding, and paper slitting machines for production lines.",
      "Offering project-based solutions for the packaging and textile industries, KGT develops customisable machines to meet each client's needs.",
      "Technical accuracy is our priority on every project.",
    ],
    image: "/images/kgt/production-line.jpeg",
  },

  valuesSection: {
    eyebrow: "Our Approach",
    heading: "How We Work",
    description:
      "We deliver reliable, technically sound, and practical solutions on every project.",
    items: [
      {
        icon: ShieldCheck,
        title: "Quality-Focused Manufacturing",
        desc: "Every machine is designed to meet the demands of industrial operating conditions.",
      },
      {
        icon: Wrench,
        title: "Technical Expertise",
        desc: "We manage projects from start to finish with experience in packaging machinery.",
      },
      {
        icon: Users,
        title: "Customer Focus",
        desc: "We listen to your project requirements and develop solutions suited to your production line.",
      },
      {
        icon: Lightbulb,
        title: "Solution Development",
        desc: "We design practical solutions for your production line needs.",
      },
    ],
  },

  production: {
    eyebrow: "Production",
    heading: "Our Machine Manufacturing Process",
    paragraphs: [
      "KGT Ambalaj produces a broad range of machines, from stretch film rewinding machines to cardboard core production lines.",
      "Every machine is configured to the environment and capacity requirements of its application; installation and commissioning are carried out at the customer's site.",
    ],
    image: "/images/kgt/rewinding-workshop.webp",
  },

  ctaHeading: "Get a Quote for Your Project",
  ctaBody:
    "Share your machine requirements and we will prepare a custom technical assessment and price quote.",
}
