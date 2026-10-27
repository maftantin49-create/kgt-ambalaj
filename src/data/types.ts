import type { LucideIcon } from "lucide-react"

// ── Home ─────────────────────────────────────────────────────────────────────

export interface TrustItem {
  icon: LucideIcon
  title: string
  desc: string
}

export interface WorkStep {
  number: string
  icon: LucideIcon
  title: string
  description: string
}

export interface HomeData {
  hero: {
    eyebrow: string
    headingBefore: string
    headingAccent: string
    headingAfter: string
    description: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
    image?: string
  }
  trustBar: TrustItem[]
  productsSection: {
    eyebrow: string
    heading: string
    description?: string
    viewAllLabel: string
  }
  sectorsSection: {
    eyebrow: string
    heading: string
    description?: string
  }
  aboutTeaser: {
    eyebrow: string
    heading: string
    paragraphs: string[]
    ctaLabel: string
    image?: string
  }
  howItWorks: {
    eyebrow: string
    heading: string
    description?: string
    steps: WorkStep[]
  }
  ctaBanner: {
    eyebrow: string
    heading: string
    description: string
    primaryCta: { label: string; href: string }
    secondaryCta?: { label: string; href: string }
  }
  contactTeaser: {
    eyebrow: string
    heading: string
    description?: string
  }
}

// ── About ────────────────────────────────────────────────────────────────────

export interface AboutValue {
  icon: LucideIcon
  title: string
  desc: string
}

export interface AboutData {
  heroHeading: string
  heroIntro: string
  intro: {
    eyebrow: string
    heading: string
    paragraphs: string[]
    image?: string
  }
  valuesSection: {
    eyebrow: string
    heading: string
    description?: string
    items: AboutValue[]
  }
  production: {
    eyebrow: string
    heading: string
    paragraphs: string[]
    image?: string
  }
  ctaHeading: string
  ctaBody: string
}

// ── Products ─────────────────────────────────────────────────────────────────

export interface ProductModel {
  name: string
  description?: string
}

export interface TechnicalSpec {
  label: string
  value: string
}

export interface ProductSolutionCard {
  title: string
  description: string
}

export interface ProductCategory {
  id: string
  slug: string
  name: string
  shortDescription: string
  description?: string
  image?: string
  features?: string[]
  applications?: string[]
  models?: ProductModel[]
  specs?: TechnicalSpec[]
  solutionCards?: ProductSolutionCard[]
  href: string
}

// ── Sectors ──────────────────────────────────────────────────────────────────

export interface Sector {
  id: string
  name: string
  description: string
  icon: LucideIcon
}
