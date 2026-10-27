import type { HomeData } from "@/data/types"
import {
  Settings2,
  MessageSquare,
  Factory,
  FileText,
  ClipboardList,
  PackageCheck,
} from "lucide-react"

export const home: HomeData = {

  hero: {
    eyebrow: "Packaging Machinery",
    headingBefore: "Shaping the",
    headingAccent: "Future",
    headingAfter: "of Packaging",
    description:
      "Stretch film and aluminium foil rewinding machines that bring speed and precision to your production lines.",
    primaryCta: { label: "Explore Products", href: "/en/products" },
    secondaryCta: { label: "Get a Quote", href: "/en/contact" },
    image: "/images/kgt/rewinding-workshop.webp",
  },

  trustBar: [
    {
      icon: Settings2,
      title: "Project-Based Solutions",
      desc: "Custom packaging design and manufacturing for your application",
    },
    {
      icon: MessageSquare,
      title: "Technical Consulting",
      desc: "Communication and support throughout the project process",
    },
    {
      icon: Factory,
      title: "Industrial Applications",
      desc: "Solutions for heavy industry applications",
    },
    {
      icon: FileText,
      title: "Quote Support",
      desc: "Custom pricing and technical proposal for your project",
    },
  ],

  productsSection: {
    eyebrow: "Products",
    heading: "Our Product Categories",
    viewAllLabel: "All Products",
  },

  sectorsSection: {
    eyebrow: "Industries",
    heading: "Industries We Serve",
  },

  aboutTeaser: {
    eyebrow: "About Us",
    heading: "KGT Ambalaj",
    paragraphs: [
      "KGT Ambalaj designs and manufactures industrial stretch film rewinding, aluminium foil rewinding, and paper slitting machines.",
      "Offering project-based solutions for packaging and textile industries, KGT develops machines tailored to specific production line requirements.",
    ],
    ctaLabel: "Learn More About Us",
    image: "/images/kgt/production-line.jpeg",
  },

  howItWorks: {
    eyebrow: "How We Work",
    heading: "Our Process",
    steps: [
      {
        number: "01",
        icon: MessageSquare,
        title: "Share Your Requirements",
        description:
          "Tell us about your project requirements and expectations.",
      },
      {
        number: "02",
        icon: ClipboardList,
        title: "Technical Assessment",
        description:
          "We evaluate your needs technically and identify the right machine and solution options.",
      },
      {
        number: "03",
        icon: FileText,
        title: "Quote & Planning",
        description:
          "A custom proposal is prepared and a production and delivery plan is created.",
      },
      {
        number: "04",
        icon: PackageCheck,
        title: "Production & Delivery",
        description:
          "The machine is manufactured to the approved plan, with installation and commissioning on-site.",
      },
    ],
  },

  ctaBanner: {
    eyebrow: "Get a Quote",
    heading: "The right packaging solution for your project",
    description:
      "Share your machine requirements and we will prepare a custom technical assessment and quote.",
    primaryCta: { label: "Get a Quote", href: "/en/contact" },
    secondaryCta: { label: "Explore Products", href: "/en/products" },
  },

  contactTeaser: {
    eyebrow: "Contact",
    heading: "Get in Touch",
  },
}
