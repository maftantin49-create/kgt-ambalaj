/**
 * V4-B Product detail: section nav, conditional sections, related products,
 * gallery, FAQ, CTA, language switch, responsive overflow.
 */
import { test, expect } from "@playwright/test"
import { TR_ROUTES, EN_ROUTES } from "./helpers/routes"

// ─── Section nav visible ──────────────────────────────────────────────────────

test("TR strec-film: section nav renders", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const nav = page.locator('[data-testid="product-section-nav"]')
  await expect(nav).toBeAttached()
  await expect(nav).toHaveCount(1)
})

test("EN stretch-film: section nav renders", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[0])
  const nav = page.locator('[data-testid="product-section-nav"]')
  await expect(nav).toHaveCount(1)
})

test("TR aluminyum-folyo: section nav renders", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[1])
  const nav = page.locator('[data-testid="product-section-nav"]')
  await expect(nav).toHaveCount(1)
})

test("TR karton-rulo: section nav renders", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[2])
  const nav = page.locator('[data-testid="product-section-nav"]')
  await expect(nav).toHaveCount(1)
})

// ─── Section nav has correct links ───────────────────────────────────────────

test("TR strec-film: section nav has at least 3 links", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const links = page.locator('[data-testid="product-section-nav"] a')
  const count = await links.count()
  expect(count, "Section nav should have at least 3 links").toBeGreaterThanOrEqual(3)
})

test("TR strec-film: section nav has overview link", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const link = page.locator('[data-testid="product-section-nav"] a[href="#overview"]')
  await expect(link).toHaveCount(1)
  await expect(link).toContainText("Genel Bakış")
})

test("TR strec-film: section nav has applications link", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const link = page.locator('[data-testid="product-section-nav"] a[href="#applications"]')
  await expect(link).toHaveCount(1)
  await expect(link).toContainText("Kullanım Alanları")
})

test("EN stretch-film: section nav has applications link", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[0])
  const link = page.locator('[data-testid="product-section-nav"] a[href="#applications"]')
  await expect(link).toHaveCount(1)
  await expect(link).toContainText("Applications")
})

test("TR strec-film: section nav has related-products link", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const link = page.locator('[data-testid="product-section-nav"] a[href="#related-products"]')
  await expect(link).toHaveCount(1)
})

// ─── Conditional section rendering ───────────────────────────────────────────

test("TR all products: Teknik Özellikler section not rendered (no specs data)", async ({ page }) => {
  for (const url of TR_ROUTES.productDetails) {
    await page.goto(url)
    // No section with id="specs" should exist since no product has spec data
    const specsSection = page.locator("#specs")
    await expect(specsSection, `Specs section should not render at ${url}`).toHaveCount(0)
  }
})

test("TR all products: Modeller section not rendered (no models data)", async ({ page }) => {
  for (const url of TR_ROUTES.productDetails) {
    await page.goto(url)
    const modelsSection = page.locator("#models")
    await expect(modelsSection, `Models section should not render at ${url}`).toHaveCount(0)
  }
})

test("TR section nav has no Teknik Özellikler link (no specs data)", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const specsLink = page.locator('[data-testid="product-section-nav"] a[href="#specs"]')
  await expect(specsLink).toHaveCount(0)
})

test("TR section nav has no Modeller link (no models data)", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const modelsLink = page.locator('[data-testid="product-section-nav"] a[href="#models"]')
  await expect(modelsLink).toHaveCount(0)
})

// ─── Overview section ─────────────────────────────────────────────────────────

test("TR strec-film: overview section visible", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  await page.locator("#overview").scrollIntoViewIfNeeded()
  await expect(page.locator("#overview")).toBeVisible()
})

test("EN stretch-film: overview section visible", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[0])
  await page.locator("#overview").scrollIntoViewIfNeeded()
  await expect(page.locator("#overview")).toBeVisible()
})

// ─── Gallery ─────────────────────────────────────────────────────────────────

test("TR strec-film: gallery section visible (has 2 gallery images)", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  await page.locator("#gallery").scrollIntoViewIfNeeded()
  await expect(page.locator("#gallery")).toBeVisible()
  const imgs = page.locator("#gallery img")
  await expect(imgs).toHaveCount(2)
})

test("TR aluminyum-folyo: gallery section NOT rendered (no gallery data)", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[1])
  await expect(page.locator("#gallery")).toHaveCount(0)
})

test("TR karton-rulo: gallery section NOT rendered (no gallery data)", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[2])
  await expect(page.locator("#gallery")).toHaveCount(0)
})

test("TR kagit-dilimleme: gallery section NOT rendered (no gallery data)", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[3])
  await expect(page.locator("#gallery")).toHaveCount(0)
})

// ─── Gallery section nav link only on strec-film ──────────────────────────────

test("TR strec-film: section nav has gallery link", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const galleryLink = page.locator('[data-testid="product-section-nav"] a[href="#gallery"]')
  await expect(galleryLink).toHaveCount(1)
})

test("TR aluminyum-folyo: section nav has no gallery link", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[1])
  const galleryLink = page.locator('[data-testid="product-section-nav"] a[href="#gallery"]')
  await expect(galleryLink).toHaveCount(0)
})

// ─── FAQ ─────────────────────────────────────────────────────────────────────

test("TR strec-film: FAQ section visible with 2 items", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  await page.locator("#faq").scrollIntoViewIfNeeded()
  await expect(page.locator("#faq")).toBeVisible()
  const items = page.locator("#faq details")
  await expect(items).toHaveCount(2)
})

test("TR aluminyum-folyo: FAQ section visible", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[1])
  await page.locator("#faq").scrollIntoViewIfNeeded()
  await expect(page.locator("#faq")).toBeVisible()
})

test("EN stretch-film: FAQ section visible", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[0])
  await page.locator("#faq").scrollIntoViewIfNeeded()
  await expect(page.locator("#faq")).toBeVisible()
})

test("TR strec-film: FAQ question expands on click", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  await page.locator("#faq").scrollIntoViewIfNeeded()
  const summary = page.locator("#faq details").first().locator("summary")
  await summary.click()
  const details = page.locator("#faq details").first()
  await expect(details).toHaveAttribute("open", "")
})

// ─── Related products ─────────────────────────────────────────────────────────

test("TR strec-film: related-products section has 3 cards", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  await page.locator("#related-products").scrollIntoViewIfNeeded()
  await expect(page.locator("#related-products")).toBeVisible()
  const cards = page.locator("#related-products a")
  await expect(cards).toHaveCount(3)
})

test("TR strec-film: related product links all point to /tr/urunler/*", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const links = page.locator("#related-products a")
  for (const link of await links.all()) {
    const href = await link.getAttribute("href")
    expect(href, `Related product link should be /tr/urunler/*: ${href}`).toMatch(/^\/tr\/urunler\//)
  }
})

test("EN stretch-film: related product links all point to /en/products/*", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[0])
  await page.locator("#related-products").scrollIntoViewIfNeeded()
  const links = page.locator("#related-products a")
  for (const link of await links.all()) {
    const href = await link.getAttribute("href")
    expect(href, `Related product link should be /en/products/*: ${href}`).toMatch(/^\/en\/products\//)
  }
})

test("TR karton-rulo: related-products section has 3 cards", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[2])
  await page.locator("#related-products").scrollIntoViewIfNeeded()
  const cards = page.locator("#related-products a")
  await expect(cards).toHaveCount(3)
})

// ─── Related sectors ──────────────────────────────────────────────────────────

test("TR strec-film: related sectors visible (Ambalaj Endüstrisi)", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const sectors = page.locator('[aria-labelledby="sectors-heading"]')
  await sectors.scrollIntoViewIfNeeded()
  await expect(sectors).toBeVisible()
  await expect(sectors).toContainText("Ambalaj Endüstrisi")
})

test("TR karton-rulo: related sectors includes Kağıt Endüstrisi", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[2])
  const sectors = page.locator('[aria-labelledby="sectors-heading"]')
  await sectors.scrollIntoViewIfNeeded()
  await expect(sectors).toContainText("Kağıt Endüstrisi")
})

test("EN paper-slitting: related sectors visible", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[3])
  const sectors = page.locator('[aria-labelledby="sectors-heading"]')
  await sectors.scrollIntoViewIfNeeded()
  await expect(sectors).toBeVisible()
  await expect(sectors).toContainText("Paper Industry")
})

// ─── CTA ─────────────────────────────────────────────────────────────────────

test("TR strec-film: CTA section visible and links to /tr/iletisim", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const ctaSection = page.locator('section[aria-label="Teklif al"]')
  await ctaSection.scrollIntoViewIfNeeded()
  await expect(ctaSection).toBeVisible()
  const ctaLink = ctaSection.getByRole("link", { name: /Teklif Al/i })
  const href = await ctaLink.getAttribute("href")
  expect(href).toContain("/tr/iletisim")
})

test("EN stretch-film: CTA section visible and links to /en/contact", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[0])
  const ctaSection = page.locator('section[aria-label="Get a quote"]')
  await ctaSection.scrollIntoViewIfNeeded()
  await expect(ctaSection).toBeVisible()
  const ctaLink = ctaSection.getByRole("link", { name: /Get a Quote/i })
  const href = await ctaLink.getAttribute("href")
  expect(href).toContain("/en/contact")
})

// ─── Language switch ──────────────────────────────────────────────────────────

test("TR strec-film: language switch goes to EN equivalent", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const switchLink = page.locator('a[aria-label="EN – Switch to English"]').first()
  await switchLink.click()
  await page.waitForURL(/\/en\/products\//, { timeout: 5000 })
  await expect(page).toHaveURL("/en/products/stretch-film-rewinding-machines/")
})

test("EN aluminium-foil: language switch goes to TR equivalent", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[1])
  const switchLink = page.locator('a[aria-label="TR – Switch to Türkçe"]').first()
  await switchLink.click()
  await page.waitForURL(/\/tr\/urunler\//, { timeout: 5000 })
  await expect(page).toHaveURL("/tr/urunler/aluminyum-folyo-sarma-makineleri/")
})

// ─── Hero catalog number ──────────────────────────────────────────────────────

test("TR strec-film: hero shows catalog number 01 / 04", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const hero = page.locator("section").first()
  await expect(hero).toContainText("01")
  await expect(hero).toContainText("04")
})

test("TR kagit-dilimleme: hero shows catalog number 04 / 04", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[3])
  const hero = page.locator("section").first()
  await expect(hero).toContainText("04")
})

// ─── No horizontal page overflow on product detail ───────────────────────────

test.describe("Product detail: no horizontal overflow", () => {
  for (const { name, url } of [
    { name: "TR strec-film",          url: TR_ROUTES.productDetails[0] },
    { name: "TR aluminyum-folyo",     url: TR_ROUTES.productDetails[1] },
    { name: "TR karton-rulo",         url: TR_ROUTES.productDetails[2] },
    { name: "TR kagit-dilimleme",     url: TR_ROUTES.productDetails[3] },
    { name: "EN stretch-film",        url: EN_ROUTES.productDetails[0] },
    { name: "EN aluminium-foil",      url: EN_ROUTES.productDetails[1] },
    { name: "EN cardboard-core",      url: EN_ROUTES.productDetails[2] },
    { name: "EN paper-slitting",      url: EN_ROUTES.productDetails[3] },
  ]) {
    test(`${name} — no horizontal overflow at 1440`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto(url, { waitUntil: "domcontentloaded" })
      const overflow = await page.evaluate(() => ({
        overflows: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      }))
      expect(overflow.overflows, `Horizontal overflow at ${url}`).toBe(false)
    })
  }
})

// ─── Mobile: section nav has overflow-x auto ─────────────────────────────────

test.describe("Mobile section nav", () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test("TR strec-film: section nav container is horizontally scrollable", async ({ page }) => {
    await page.goto(TR_ROUTES.productDetails[0])
    // The inner div of the section nav should have overflow-x: auto
    const navContainer = page.locator('[data-testid="product-section-nav"] > div')
    const overflowX = await navContainer.evaluate((el) => getComputedStyle(el).overflowX)
    expect(overflowX, "Section nav container should have overflow-x: auto").toBe("auto")
  })

  test("TR strec-film: no horizontal page overflow on mobile", async ({ page }) => {
    await page.goto(TR_ROUTES.productDetails[0], { waitUntil: "domcontentloaded" })
    const overflow = await page.evaluate(() => ({
      overflows: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }))
    expect(overflow.overflows, "Horizontal overflow on mobile product detail").toBe(false)
  })
})
