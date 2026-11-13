/**
 * Navigation: active states, language switch, mobile menu, mega menu, dropdowns.
 */
import { test, expect } from "@playwright/test"
import { TR_ROUTES, EN_ROUTES } from "./helpers/routes"

// ─── Active nav — direct links ────────────────────────────────────────────────

test("TR home: Ana Sayfa nav link is aria-current=page", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const link = page.locator('nav[aria-label="Ana menü"] a[aria-current="page"]')
  await expect(link).toHaveCount(1)
  await expect(link).toContainText("Ana Sayfa")
})

test("TR hakkimizda: Hakkımızda nav link is aria-current=page", async ({ page }) => {
  await page.goto(TR_ROUTES.about)
  const link = page.locator('nav[aria-label="Ana menü"] a[aria-current="page"]')
  await expect(link).toContainText("Hakkımızda")
})

test("TR calisma-surecimiz: nav link is aria-current=page", async ({ page }) => {
  await page.goto(TR_ROUTES.workingProcess)
  const link = page.locator('nav[aria-label="Ana menü"] a[aria-current="page"]')
  await expect(link).toContainText("Çalışma Sürecimiz")
})

test("TR iletisim: İletişim nav link is aria-current=page", async ({ page }) => {
  await page.goto(TR_ROUTES.contact)
  const link = page.locator('nav[aria-label="Ana menü"] a[aria-current="page"]')
  await expect(link).toContainText("İletişim")
})

test("EN home: Home nav link is aria-current=page", async ({ page }) => {
  await page.goto(EN_ROUTES.home)
  const link = page.locator('nav[aria-label="Main navigation"] a[aria-current="page"]')
  await expect(link).toHaveCount(1)
  await expect(link).toContainText("Home")
})

test("EN working-process: nav link is aria-current=page", async ({ page }) => {
  await page.goto(EN_ROUTES.workingProcess)
  const link = page.locator('nav[aria-label="Main navigation"] a[aria-current="page"]')
  await expect(link).toContainText("Working Process")
})

// ─── Active nav — mega menu group trigger ────────────────────────────────────

test("TR products: Ürünler group trigger shows aria-current=true", async ({ page }) => {
  await page.goto(TR_ROUTES.products)
  const trigger = page.locator('nav[aria-label="Ana menü"] button[aria-current="true"]')
  await expect(trigger).toContainText("Ürünler")
})

test("TR product detail: Ürünler group trigger shows aria-current=true", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  const trigger = page.locator('nav[aria-label="Ana menü"] button[aria-current="true"]')
  await expect(trigger).toContainText("Ürünler")
})

test("EN products: Products group trigger shows aria-current=true", async ({ page }) => {
  await page.goto(EN_ROUTES.products)
  const trigger = page.locator('nav[aria-label="Main navigation"] button[aria-current="true"]')
  await expect(trigger).toContainText("Products")
})

test("EN product detail: Products group trigger shows aria-current=true", async ({ page }) => {
  await page.goto(EN_ROUTES.productDetails[0])
  const trigger = page.locator('nav[aria-label="Main navigation"] button[aria-current="true"]')
  await expect(trigger).toContainText("Products")
})

// ─── Active nav — corporate dropdown group trigger ────────────────────────────

test("TR hakkimizda: Kurumsal group trigger shows aria-current=true", async ({ page }) => {
  await page.goto(TR_ROUTES.about)
  const trigger = page.locator('nav[aria-label="Ana menü"] button[aria-current="true"]')
  await expect(trigger).toContainText("Kurumsal")
})

test("TR calisma-surecimiz: Kurumsal group trigger shows aria-current=true", async ({ page }) => {
  await page.goto(TR_ROUTES.workingProcess)
  const trigger = page.locator('nav[aria-label="Ana menü"] button[aria-current="true"]')
  await expect(trigger).toContainText("Kurumsal")
})

// ─── Mega menu interaction ────────────────────────────────────────────────────

test("TR home: Ürünler mega menu opens on click", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const trigger = page.locator('nav[aria-label="Ana menü"] button', { hasText: "Ürünler" })
  await expect(trigger).toBeVisible()
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await trigger.click()
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  // Product links appear
  await expect(page.locator('nav[aria-label="Ana menü"]').getByText("Streç Film Sarma Makineleri")).toBeVisible()
})

test("TR home: Ürünler mega menu closes on Escape", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const trigger = page.locator('nav[aria-label="Ana menü"] button', { hasText: "Ürünler" })
  await trigger.click()
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await page.keyboard.press("Escape")
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
})

test("EN home: Products mega menu opens on click", async ({ page }) => {
  await page.goto(EN_ROUTES.home)
  const trigger = page.locator('nav[aria-label="Main navigation"] button', { hasText: "Products" })
  await trigger.click()
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(page.locator('nav[aria-label="Main navigation"]').getByText("Stretch Film Rewinding Machines", { exact: true })).toBeVisible()
})

// ─── Dropdown interaction ─────────────────────────────────────────────────────

test("TR home: Kurumsal dropdown opens on click", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const trigger = page.locator('nav[aria-label="Ana menü"] button', { hasText: "Kurumsal" })
  await trigger.click()
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(page.locator('nav[aria-label="Ana menü"]').getByText("Hakkımızda")).toBeVisible()
  await expect(page.locator('nav[aria-label="Ana menü"]').getByText("Çalışma Sürecimiz")).toBeVisible()
})

test("TR home: Kurumsal dropdown link navigates correctly", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const trigger = page.locator('nav[aria-label="Ana menü"] button', { hasText: "Kurumsal" })
  await trigger.click()
  await page.locator('nav[aria-label="Ana menü"]').getByRole("link", { name: "Çalışma Sürecimiz" }).click()
  await expect(page).toHaveURL(TR_ROUTES.workingProcess)
})

// ─── Logo — no Indsro placeholder ────────────────────────────────────────────

test("TR home: header contains no placeholder logo image", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const indsroImg = page.locator('header img[src*="logo-kgt"]')
  await expect(indsroImg).toHaveCount(0)
})

test("TR home: footer contains no placeholder logo image", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const indsroImg = page.locator('footer img[src*="logo-kgt"]')
  await expect(indsroImg).toHaveCount(0)
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

test("Language switch TR→EN from hakkimizda goes to about", async ({ page }) => {
  await page.goto(TR_ROUTES.about)
  const switchLink = page.locator('a[aria-label="EN – Switch to English"]').first()
  await switchLink.click()
  await expect(page).toHaveURL(EN_ROUTES.about)
})

test("Language switch TR→EN from calisma-surecimiz goes to working-process", async ({ page }) => {
  await page.goto(TR_ROUTES.workingProcess)
  const switchLink = page.locator('a[aria-label="EN – Switch to English"]').first()
  await switchLink.click()
  await expect(page).toHaveURL(EN_ROUTES.workingProcess)
})

test("Language switch EN→TR from working-process goes to calisma-surecimiz", async ({ page }) => {
  await page.goto(EN_ROUTES.workingProcess)
  const switchLink = page.locator('a[aria-label="TR – Switch to Türkçe"]').first()
  await switchLink.click()
  await expect(page).toHaveURL(TR_ROUTES.workingProcess)
})

// ─── Mobile menu ──────────────────────────────────────────────────────────────

test.describe("Mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test("opens on button click", async ({ page }) => {
    await page.goto(TR_ROUTES.home)
    const trigger = page.locator('button[aria-label="Menüyü aç"]')
    await expect(trigger).toBeVisible()
    await trigger.click()
    const openedBtn = page.locator('button[aria-expanded="true"]').first()
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
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]').getByText("Products")).toBeVisible()
  })

  test("mobile Ürünler accordion expands and shows product links", async ({ page }) => {
    await page.goto(TR_ROUTES.home)
    await page.locator('button[aria-label="Menüyü aç"]').click()
    const accordion = page.locator('nav[aria-label="Mobil navigasyon"] button', { hasText: "Ürünler" })
    await expect(accordion).toBeVisible()
    await accordion.click()
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]').getByText("Streç Film Sarma Makineleri")).toBeVisible()
  })

  test("mobile Kurumsal accordion expands and shows dropdown links", async ({ page }) => {
    await page.goto(TR_ROUTES.home)
    await page.locator('button[aria-label="Menüyü aç"]').click()
    const accordion = page.locator('nav[aria-label="Mobil navigasyon"] button', { hasText: "Kurumsal" })
    await accordion.click()
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]').getByText("Hakkımızda")).toBeVisible()
    await expect(page.locator('nav[aria-label="Mobil navigasyon"]').getByText("Çalışma Sürecimiz")).toBeVisible()
  })
})
