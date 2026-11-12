/**
 * Content integrity: product counts, no duplicate names, no label cross-contamination.
 */
import { test, expect } from "@playwright/test"
import { TR_ROUTES, EN_ROUTES, TR_NAV_LABELS, EN_NAV_LABELS } from "./helpers/routes"

// ─── Product counts ───────────────────────────────────────────────────────────

test("TR products listing: exactly 4 items in catalogue list", async ({ page }) => {
  await page.goto(TR_ROUTES.products)
  const items = page.locator("ol li")
  await expect(items).toHaveCount(4)
})

test("EN products listing: exactly 4 items in catalogue list", async ({ page }) => {
  await page.goto(EN_ROUTES.products)
  const items = page.locator("ol li")
  await expect(items).toHaveCount(4)
})

// ─── No duplicate product names ───────────────────────────────────────────────

test("TR products: no duplicate h3 names in listing", async ({ page }) => {
  await page.goto(TR_ROUTES.products)
  const names = await page.locator("ol li h3").allTextContents()
  const unique = new Set(names.map((n) => n.trim()))
  expect(unique.size, `Duplicate product names: ${names.join(", ")}`).toBe(names.length)
})

test("EN products: no duplicate h3 names in listing", async ({ page }) => {
  await page.goto(EN_ROUTES.products)
  const names = await page.locator("ol li h3").allTextContents()
  const unique = new Set(names.map((n) => n.trim()))
  expect(unique.size, `Duplicate product names: ${names.join(", ")}`).toBe(names.length)
})

// ─── No label cross-contamination ────────────────────────────────────────────

test("TR home: EN nav labels not present in desktop nav", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const desktopNav = page.locator('nav[aria-label="Ana menü"]')
  for (const label of EN_NAV_LABELS) {
    await expect(desktopNav.getByText(label, { exact: true })).toHaveCount(0)
  }
})

test("EN home: TR nav labels not present in desktop nav", async ({ page }) => {
  await page.goto(EN_ROUTES.home)
  const desktopNav = page.locator('nav[aria-label="Main navigation"]')
  // Check specific TR-only labels (not "Home" which appears in English too)
  const trOnly = ["Ana Sayfa", "Ürünler", "Hakkımızda", "İletişim"]
  for (const label of trOnly) {
    await expect(desktopNav.getByText(label, { exact: true })).toHaveCount(0)
  }
})

// ─── Product names are non-empty strings ──────────────────────────────────────

test("TR product detail pages have non-empty H1", async ({ page }) => {
  for (const url of TR_ROUTES.productDetails) {
    await page.goto(url)
    const h1Text = await page.locator("h1").textContent()
    expect(h1Text?.trim().length ?? 0, `Empty H1 at ${url}`).toBeGreaterThan(5)
  }
})

test("EN product detail pages have non-empty H1", async ({ page }) => {
  for (const url of EN_ROUTES.productDetails) {
    await page.goto(url)
    const h1Text = await page.locator("h1").textContent()
    expect(h1Text?.trim().length ?? 0, `Empty H1 at ${url}`).toBeGreaterThan(5)
  }
})

// ─── Catalogue list items all have linked detail pages ────────────────────────

test("TR products: all 4 catalogue items link to /tr/urunler/*", async ({ page }) => {
  await page.goto(TR_ROUTES.products)
  const links = await page.locator("ol li a").evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).href)
  )
  expect(links).toHaveLength(4)
  for (const href of links) {
    expect(href).toContain("/tr/urunler/")
  }
})

test("EN products: all 4 catalogue items link to /en/products/*", async ({ page }) => {
  await page.goto(EN_ROUTES.products)
  const links = await page.locator("ol li a").evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).href)
  )
  expect(links).toHaveLength(4)
  for (const href of links) {
    expect(href).toContain("/en/products/")
  }
})
