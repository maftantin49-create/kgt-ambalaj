/**
 * Responsive layout: no horizontal overflow at 5 viewports, no broken layouts.
 */
import { test, expect } from "@playwright/test"
import { TR_ROUTES, EN_ROUTES } from "./helpers/routes"

const VIEWPORTS = [
  { name: "mobile-sm",  width: 375,  height: 812  },
  { name: "mobile-lg",  width: 390,  height: 844  },
  { name: "tablet",     width: 768,  height: 1024 },
  { name: "desktop",    width: 1440, height: 900  },
  { name: "wide",       width: 1920, height: 1080 },
]

const TEST_PAGES = [
  { name: "TR home",          url: TR_ROUTES.home },
  { name: "EN home",          url: EN_ROUTES.home },
  { name: "TR products",      url: TR_ROUTES.products },
  { name: "EN products",      url: EN_ROUTES.products },
  { name: "TR product detail",url: TR_ROUTES.productDetails[0] },
  { name: "EN product detail",url: EN_ROUTES.productDetails[0] },
  { name: "TR hakkimizda",    url: TR_ROUTES.about },
  { name: "EN about",         url: EN_ROUTES.about },
]

for (const vp of VIEWPORTS) {
  test.describe(`Viewport: ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    for (const pg of TEST_PAGES) {
      test(`${pg.name} — no horizontal overflow`, async ({ page }) => {
        await page.goto(pg.url, { waitUntil: "domcontentloaded" })

        const overflow = await page.evaluate(() => {
          const scrollW = document.documentElement.scrollWidth
          const clientW = document.documentElement.clientWidth
          return { scrollW, clientW, overflows: scrollW > clientW }
        })

        expect(
          overflow.overflows,
          `Horizontal overflow at ${pg.url}: scrollWidth=${overflow.scrollW} clientWidth=${overflow.clientW}`
        ).toBe(false)
      })
    }

    // Mobile-specific: nav should not overlap content on small viewports
    if (vp.width < 768) {
      test("desktop nav hidden, mobile trigger visible", async ({ page }) => {
        await page.goto(TR_ROUTES.home)
        // Desktop nav (hidden on mobile)
        const desktopNav = page.locator('nav[aria-label="Ana menü"]')
        await expect(desktopNav).toBeHidden()
        // Mobile menu button visible
        const mobileBtn = page.locator('button[aria-label="Menüyü aç"]')
        await expect(mobileBtn).toBeVisible()
      })
    }

    // Desktop-specific: desktop nav visible, no hamburger
    if (vp.width >= 768) {
      test("desktop nav visible, mobile trigger hidden", async ({ page }) => {
        await page.goto(TR_ROUTES.home)
        const desktopNav = page.locator('nav[aria-label="Ana menü"]')
        await expect(desktopNav).toBeVisible()
        const mobileBtn = page.locator('button[aria-label="Menüyü aç"]')
        await expect(mobileBtn).toBeHidden()
      })
    }

    test("H1 is visible and not clipped on ${pg.name}", async ({ page }) => {
      await page.goto(TR_ROUTES.home)
      const h1 = page.locator("h1")
      await expect(h1).toBeVisible()
      const box = await h1.boundingBox()
      expect(box, "H1 has no bounding box (possibly clipped)").not.toBeNull()
      expect(box!.height, "H1 height is 0 (clipped)").toBeGreaterThan(0)
      expect(box!.width, "H1 width is 0 (clipped)").toBeGreaterThan(0)
    })

    test("Footer visible and not truncated", async ({ page }) => {
      await page.goto(TR_ROUTES.home)
      const footer = page.locator("footer")
      await footer.scrollIntoViewIfNeeded()
      await expect(footer).toBeVisible()
      const box = await footer.boundingBox()
      expect(box!.height, "Footer height is too small").toBeGreaterThan(60)
    })
  })
}
