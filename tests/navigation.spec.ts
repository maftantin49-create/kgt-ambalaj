/**
 * Navigation: active states, language switch, mobile menu.
 */
import { test, expect } from "@playwright/test"
import { TR_ROUTES, EN_ROUTES } from "./helpers/routes"

// ─── Active nav ───────────────────────────────────────────────────────────────

test("TR home: Ana Sayfa nav link is aria-current=page", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const link = page.locator('nav[aria-label="Ana menü"] a[aria-current="page"]')
  await expect(link).toHaveCount(1)
  await expect(link).toContainText("Ana Sayfa")
})

test("TR products: Ürünler nav link is aria-current=page", async ({ page }) => {
  await page.goto(TR_ROUTES.products)
  const link = page.locator('nav[aria-label="Ana menü"] a[aria-current="page"]')
  await expect(link).toContainText("Ürünler")
})

test("TR hakkimizda: Hakkımızda nav link is aria-current=page", async ({ page }) => {
  await page.goto(TR_ROUTES.about)
  const link = page.locator('nav[aria-label="Ana menü"] a[aria-current="page"]')
  await expect(link).toContainText("Hakkımızda")
})

test("TR iletisim: İletişim nav link is aria-current=page", async ({ page }) => {
  await page.goto(TR_ROUTES.contact)
  const link = page.locator('nav[aria-label="Ana menü"] a[aria-current="page"]')
  await expect(link).toContainText("İletişim")
})

test("TR product detail: Ürünler nav link is aria-current=page", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const link = page.locator('nav[aria-label="Ana menü"] a[aria-current="page"]')
  await expect(link).toContainText("Ürünler")
})

test("EN home: Home nav link is aria-current=page", async ({ page }) => {
  await page.goto(EN_ROUTES.home)
  const link = page.locator('nav[aria-label="Main navigation"] a[aria-current="page"]')
  await expect(link).toHaveCount(1)
  await expect(link).toContainText("Home")
})

test("EN products: Products nav link is aria-current=page", async ({ page }) => {
  await page.goto(EN_ROUTES.products)
  const link = page.locator('nav[aria-label="Main navigation"] a[aria-current="page"]')
  await expect(link).toContainText("Products")
})

test("EN product detail: Products nav link is aria-current=page", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[0])
  const link = page.locator('nav[aria-label="Main navigation"] a[aria-current="page"]')
  await expect(link).toContainText("Products")
})

// ─── Language switch ──────────────────────────────────────────────────────────

test("Language switch TR→EN from home", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const switchLink = page.locator('a[aria-label="EN – Switch to English"]').first()
  await expect(switchLink).toBeVisible()
  await switchLink.click()
  await expect(page).toHaveURL(EN_ROUTES.home)
})

test("Language switch EN→TR from home", async ({ page }) => {
  await page.goto(EN_ROUTES.home)
  const switchLink = page.locator('a[aria-label="TR – Switch to Türkçe"]').first()
  await expect(switchLink).toBeVisible()
  await switchLink.click()
  await expect(page).toHaveURL(TR_ROUTES.home)
})

test("Language switch TR→EN from product detail preserves equivalent slug", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const switchLink = page.locator('a[aria-label="EN – Switch to English"]').first()
  await switchLink.click()
  await page.waitForURL(/\/en\/products\//, { timeout: 5000 })
  await expect(page).toHaveURL("/en/products/stretch-film-rewinding-machines/")
})

test("Language switch EN→TR from product detail preserves equivalent slug", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[0])
  const switchLink = page.locator('a[aria-label="TR – Switch to Türkçe"]').first()
  await switchLink.click()
  await page.waitForURL(/\/tr\/urunler\//, { timeout: 5000 })
  await expect(page).toHaveURL("/tr/urunler/strec-film-sarma-makineleri/")
})

// ─── Mobile menu ──────────────────────────────────────────────────────────────

test.describe("Mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test("opens on button click", async ({ page }) => {
    await page.goto(TR_ROUTES.home)
    const trigger = page.locator('button[aria-label="Menüyü aç"]')
    await expect(trigger).toBeVisible()
    await trigger.click()
    // After click, aria-label changes to "Menüyü kapat" — check by aria-expanded on button
    const openedBtn = page.locator('button[aria-expanded="true"]')
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]')).toBeVisible()
    await expect(openedBtn).toHaveAttribute("aria-label", "Menüyü kapat")
  })

  test("closes on X button click", async ({ page }) => {
    await page.goto(TR_ROUTES.home)
    await page.locator('button[aria-label="Menüyü aç"]').click()
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]')).toBeVisible()
    const closeBtn = page.locator('button[aria-label="Menüyü kapat"]')
    await closeBtn.click()
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]')).not.toBeVisible()
  })

  test("closes on Escape key", async ({ page }) => {
    await page.goto(TR_ROUTES.home)
    await page.locator('button[aria-label="Menüyü aç"]').click()
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]')).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]')).not.toBeVisible()
  })

  test("mobile menu on EN page works", async ({ page }) => {
    await page.goto(EN_ROUTES.home)
    await page.locator('button[aria-label="Menüyü aç"]').click()
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]')).toBeVisible()
    // EN nav links should appear in menu
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]').getByText("Products")).toBeVisible()
  })
})
