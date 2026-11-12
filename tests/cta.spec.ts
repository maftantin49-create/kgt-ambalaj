/**
 * CTA integrity: link targets, tel: format, contact form passive state.
 */
import { test, expect } from "@playwright/test"
import { TR_ROUTES, EN_ROUTES, SITE_PHONE } from "./helpers/routes"

// ─── Header CTA ───────────────────────────────────────────────────────────────

test("TR header CTA 'Teklif Al' links to /tr/iletisim", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  // Desktop header CTA — trailingSlash:true may render href with or without slash
  const cta = page.locator(`a:not([aria-label]):text-is("Teklif Al")`).first()
  const href = await cta.getAttribute("href")
  expect(href?.replace(/\/$/, "")).toBe("/tr/iletisim")
})

test("EN header CTA 'Get a Quote' links to /en/contact", async ({ page }) => {
  await page.goto(EN_ROUTES.home)
  const cta = page.locator(`a:not([aria-label]):text-is("Get a Quote")`).first()
  const href = await cta.getAttribute("href")
  expect(href?.replace(/\/$/, "")).toBe("/en/contact")
})

// ─── Homepage hero CTA ────────────────────────────────────────────────────────

test("TR hero CTA navigates to contact page", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  // Hero section is first <section>
  const heroCta = page.locator("section").first().getByRole("link", { name: /teklif/i })
  await expect(heroCta).toBeVisible()
  const href = await heroCta.getAttribute("href")
  expect(href).toContain("/tr/iletisim")
})

test("EN hero CTA navigates to contact page", async ({ page }) => {
  await page.goto(EN_ROUTES.home)
  const heroCta = page.locator("section").first().getByRole("link", { name: /quote/i })
  await expect(heroCta).toBeVisible()
  const href = await heroCta.getAttribute("href")
  expect(href).toContain("/en/contact")
})

// ─── Product CTA buttons ──────────────────────────────────────────────────────

test("TR product detail hero CTA 'Teklif Al' links to contact", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const links = page.getByRole("link", { name: /teklif al/i })
  for (const link of await links.all()) {
    const href = await link.getAttribute("href")
    expect(href).toContain("/tr/iletisim")
  }
})

test("EN product detail hero CTA 'Get a Quote' links to contact", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[0])
  const links = page.getByRole("link", { name: /get a quote/i })
  for (const link of await links.all()) {
    const href = await link.getAttribute("href")
    expect(href).toContain("/en/contact")
  }
})

// ─── Footer product links ──────────────────────────────────────────────────────

test("TR footer product links all point to /tr/urunler/*", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const footer = page.locator("footer")
  const productLinks = await footer.locator("a[href*='/tr/urunler/']").all()
  expect(productLinks.length, "Footer has no TR product links").toBeGreaterThan(0)
  for (const link of productLinks) {
    const href = await link.getAttribute("href")
    expect(href).toMatch(/^\/tr\/urunler\//)
  }
})

test("EN footer product links all point to /en/products/*", async ({ page }) => {
  await page.goto(EN_ROUTES.home)
  const footer = page.locator("footer")
  const productLinks = await footer.locator("a[href*='/en/products/']").all()
  expect(productLinks.length, "Footer has no EN product links").toBeGreaterThan(0)
  for (const link of productLinks) {
    const href = await link.getAttribute("href")
    expect(href).toMatch(/^\/en\/products\//)
  }
})

// ─── Tel: link format ──────────────────────────────────────────────────────────

test("All tel: links use correct phone number format", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const telLinks = page.locator(`a[href^="tel:"]`)
  const count = await telLinks.count()
  expect(count, "No tel: links found on TR homepage").toBeGreaterThan(0)
  for (const link of await telLinks.all()) {
    const href = await link.getAttribute("href")
    expect(href, `Invalid tel: format: ${href}`).toBe(`tel:${SITE_PHONE}`)
  }
})

test("Mobile menu tel: link correct", async ({ page, browserName }) => {
  page.setViewportSize({ width: 390, height: 844 })
  await page.goto(TR_ROUTES.home)
  await page.locator('button[aria-label="Menüyü aç"]').click()
  const telLink = page.locator('nav[aria-label="Mobil navigasyon"] a[href^="tel:"]')
  await expect(telLink).toBeVisible()
  const href = await telLink.getAttribute("href")
  expect(href).toBe(`tel:${SITE_PHONE}`)
})

// ─── Contact form passive state ───────────────────────────────────────────────

test("TR contact page shows phone/passive state when isConfigured=false", async ({ page }) => {
  await page.goto(TR_ROUTES.contact)
  // Page should load without errors (no broken form submission)
  await expect(page.locator("h1")).toBeVisible()
  // Phone link should still be present and functional
  const telLink = page.locator('a[href^="tel:"]').first()
  await expect(telLink).toBeVisible()
})

test("EN contact page shows phone/passive state when isConfigured=false", async ({ page }) => {
  await page.goto(EN_ROUTES.contact)
  await expect(page.locator("h1")).toBeVisible()
  const telLink = page.locator('a[href^="tel:"]').first()
  await expect(telLink).toBeVisible()
})
