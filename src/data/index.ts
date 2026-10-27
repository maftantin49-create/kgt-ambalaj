import type { Locale } from "@/config/i18n"
import type { HomeData, AboutData, ProductCategory, Sector } from "@/data/types"

import { home as homeTr } from "@/data/tr/home"
import { home as homeEn } from "@/data/en/home"
import { about as aboutTr } from "@/data/tr/about"
import { about as aboutEn } from "@/data/en/about"
import { productCategories as productsTr } from "@/data/tr/products"
import { productCategories as productsEn } from "@/data/en/products"
import { sectors as sectorsTr } from "@/data/tr/sectors"
import { sectors as sectorsEn } from "@/data/en/sectors"

export function getHomeData(locale: Locale): HomeData {
  return locale === "en" ? homeEn : homeTr
}

export function getAboutData(locale: Locale): AboutData {
  return locale === "en" ? aboutEn : aboutTr
}

export function getProducts(locale: Locale): ProductCategory[] {
  return locale === "en" ? productsEn : productsTr
}

export function getSectors(locale: Locale): Sector[] {
  return locale === "en" ? sectorsEn : sectorsTr
}
