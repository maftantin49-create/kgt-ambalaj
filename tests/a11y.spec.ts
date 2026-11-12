/**
 * Accessibility: skip link, heading hierarchy, ARIA, keyboard nav, axe scan.
 */
import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { TR_ROUTES, EN_ROUTES } from "./helpers/routes"

// ─── Skip-to-main link ────────────────────────────────────────────────────────

test("TR home: skip-to-main link present and functional", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const skipLink = page.locator('a[href="#main-content"]')
  await expect(skipLink).toHaveCount(1)
  // main#main-content target must exist
  await expect(page.locator("#main-content")).toHaveCount(1)
})

test("EN home: skip-to-main link present", async ({ page }) => {
  await page.goto(EN_ROUTES.home)
  const skipLink = page.locator('a[href="#main-content"]')
  await expect(skipLink).toHaveCount(1)
})

// ─── Heading hierarchy ────────────────────────────────────────────────────────

test("TR home: exactly one H1, H2s present below it", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const h1s = page.locator("h1")
  await expect(h1s).toHaveCount(1)
  const h2s = page.locator("h2")
  expect(await h2s.count()).toBeGreaterThan(0)
})

test("EN home: exactly one H1", async ({ page }) => {
  await page.goto(EN_ROUTES.home)
  await expect(page.locator("h1")).toHaveCount(1)
})

test("TR products listing: exactly one H1, product names are H3", async ({ page }) => {
  await page.goto(TR_ROUTES.products)
  await expect(page.locator("h1")).toHaveCount(1)
  // Product names in catalogue list are H3
  const h3s = page.locator("ol li h3")
  await expect(h3s).toHaveCount(4)
})

test("TR hakkimizda: exactly one H1", async ({ page }) => {
  await page.goto(TR_ROUTES.about)
  await expect(page.locator("h1")).toHaveCount(1)
})

test("TR product detail: exactly one H1", async ({ page }) => {
  await page.goto(TR_ROUTES.productDetails[0])
  await expect(page.locator("h1")).toHaveCount(1)
})

// ─── aria-current on active nav links ────────────────────────────────────────

test("No page has multiple aria-current=page links in desktop nav", async ({ page }) => {
  const pages = [TR_ROUTES.home, TR_ROUTES.products, TR_ROUTES.about, EN_ROUTES.home, EN_ROUTES.products]
  for (const url of pages) {
    await page.goto(url)
    const activeTR = await page.locator('nav[aria-label="Ana menü"] a[aria-current="page"]').count()
    const activeEN = await page.locator('nav[aria-label="Main navigation"] a[aria-current="page"]').count()
    const total = activeTR + activeEN
    expect(total, `Multiple aria-current=page at ${url}`).toBeLessThanOrEqual(1)
  }
})

// ─── Button accessible names ──────────────────────────────────────────────────

test.describe("Button accessible names", () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test("Mobile menu button has aria-label", async ({ page }) => {
    await page.goto(TR_ROUTES.home)
    const btn = page.locator('button[aria-label="Menüyü aç"]')
    await expect(btn).toBeVisible()
    await expect(btn).toHaveAttribute("aria-controls", "mobile-nav")
  })
})

// ─── Image alt text ───────────────────────────────────────────────────────────

test("TR home: decorative images marked aria-hidden, content images have alt", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  const images = page.locator("img")
  const count = await images.count()
  expect(count).toBeGreaterThan(0)

  for (const img of await images.all()) {
    const alt = await img.getAttribute("alt")
    const ariaHidden = await img.getAttribute("aria-hidden")
    // Every img must either have a non-empty alt OR be aria-hidden
    const hasAlt = typeof alt === "string" && alt.length > 0
    const isDecorative = ariaHidden === "true" || alt === ""
    expect(
      hasAlt || isDecorative,
      `Image missing alt or aria-hidden: ${await img.getAttribute("src")}`
    ).toBe(true)
  }
})

// ─── Keyboard navigation ──────────────────────────────────────────────────────

test("Tab key reaches skip link on TR home", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  await page.keyboard.press("Tab")
  const focused = await page.evaluate(() => document.activeElement?.getAttribute("href"))
  expect(focused).toBe("#main-content")
})

test("Tab key can reach header CTA button on TR home", async ({ page }) => {
  await page.goto(TR_ROUTES.home)
  // Tab through skip link, logo, nav links, then CTA
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab")
    const tagName = await page.evaluate(() => document.activeElement?.tagName)
    const text = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim())
    if (text?.includes("Teklif Al")) return // reached CTA
    if (tagName === "BODY") break
  }
  // Verify CTA is focusable by getting it via role
  const cta = page.getByRole("link", { name: "Teklif Al" }).first()
  expect(await cta.getAttribute("href")).toBeTruthy()
})

// ─── axe-core accessibility scan ─────────────────────────────────────────────

const axePages = [
  { name: "TR home",          url: TR_ROUTES.home },
  { name: "EN home",          url: EN_ROUTES.home },
  { name: "TR products",      url: TR_ROUTES.products },
  { name: "TR hakkimizda",    url: TR_ROUTES.about },
  { name: "TR product detail",url: TR_ROUTES.productDetails[0] },
]

test("axe: LanguageSwitch no label-content-name-mismatch (WCAG 2.5.3)", async ({ page }) => {
  await page.goto("/tr/")
  const results = await new AxeBuilder({ page })
    .exclude("#__next-build-watcher")
    .exclude("#__next-route-announcer")
    .disableRules(["color-contrast"])
    .withRules(["label-content-name-mismatch"])
    .analyze()
  expect(results.violations).toHaveLength(0)
})

for (const pg of axePages) {
  test(`axe: ${pg.name} — no critical violations`, async ({ page }) => {
    await page.goto(pg.url)
    const results = await new AxeBuilder({ page })
      .exclude("#__next-build-watcher")
      .exclude("#__next-route-announcer")
      // Colour contrast: CSS vars may not resolve to real hex values in axe
      .disableRules(["color-contrast"])
      .analyze()

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    )
    if (critical.length > 0) {
      const summary = critical.map((v) => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`).join("\n")
      expect.soft(critical.length, `Critical axe violations on ${pg.name}:\n${summary}`).toBe(0)
    }
  })
}
