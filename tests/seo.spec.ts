/**
 * SEO & static export: sitemap, robots.txt, canonical, hreflang, redirects.
 */
import { test, expect } from "@playwright/test"
import { TR_ROUTES, EN_ROUTES } from "./helpers/routes"

const EXPECTED_SITEMAP_URL_COUNT = 16

// ─── sitemap.xml ─────────────────────────────────────────────────────────────

test("sitemap.xml returns 200", async ({ request }) => {
  const res = await request.get("/sitemap.xml")
  expect(res.status()).toBe(200)
})

test(`sitemap.xml contains exactly ${EXPECTED_SITEMAP_URL_COUNT} <loc> entries`, async ({ request }) => {
  const res = await request.get("/sitemap.xml")
  const xml = await res.text()
  const matches = xml.match(/<loc>/g)
  expect(
    matches?.length ?? 0,
    `Expected ${EXPECTED_SITEMAP_URL_COUNT} URLs, got ${matches?.length ?? 0}`
  ).toBe(EXPECTED_SITEMAP_URL_COUNT)
})

test("sitemap.xml contains kgtmak.com domain", async ({ request }) => {
  const res = await request.get("/sitemap.xml")
  const xml = await res.text()
  expect(xml).toContain("kgtmak.com")
})

test("sitemap.xml includes TR home URL", async ({ request }) => {
  const res = await request.get("/sitemap.xml")
  const xml = await res.text()
  expect(xml).toContain("kgtmak.com/tr/")
})

test("sitemap.xml includes EN home URL", async ({ request }) => {
  const res = await request.get("/sitemap.xml")
  const xml = await res.text()
  expect(xml).toContain("kgtmak.com/en/")
})

test("sitemap.xml includes all 4 TR product detail URLs", async ({ request }) => {
  const res = await request.get("/sitemap.xml")
  const xml = await res.text()
  const trSlugs = [
    "strec-film-sarma-makineleri",
    "aluminyum-folyo-sarma-makineleri",
    "karton-rulo-masura-uretim-hatti-makineleri",
    "kagit-dilimleme-makineleri",
  ]
  for (const slug of trSlugs) {
    expect(xml, `Sitemap missing TR slug: ${slug}`).toContain(slug)
  }
})

test("sitemap.xml includes all 4 EN product detail URLs", async ({ request }) => {
  const res = await request.get("/sitemap.xml")
  const xml = await res.text()
  const enSlugs = [
    "stretch-film-rewinding-machines",
    "aluminium-foil-rewinding-machines",
    "cardboard-core-tube-production-line-machines",
    "paper-slitting-machines",
  ]
  for (const slug of enSlugs) {
    expect(xml, `Sitemap missing EN slug: ${slug}`).toContain(slug)
  }
})

// ─── robots.txt ───────────────────────────────────────────────────────────────

test("robots.txt returns 200", async ({ request }) => {
  const res = await request.get("/robots.txt")
  expect(res.status()).toBe(200)
})

test("robots.txt references sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt")
  const txt = await res.text()
  expect(txt.toLowerCase()).toContain("sitemap")
})

// ─── Canonical & hreflang ──────────────────────────────────────────────────────

const canonicalPages = [
  TR_ROUTES.home,
  EN_ROUTES.home,
  TR_ROUTES.products,
  EN_ROUTES.products,
  TR_ROUTES.productDetails[0],
  EN_ROUTES.productDetails[0],
  TR_ROUTES.about,
  EN_ROUTES.about,
]

for (const url of canonicalPages) {
  test(`${url}: canonical link present`, async ({ page }) => {
    await page.goto(url)
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveCount(1)
    const href = await canonical.getAttribute("href")
    expect(href?.length ?? 0, "canonical href is empty").toBeGreaterThan(0)
    expect(href).toContain("kgtmak.com")
  })

  test(`${url}: hreflang alternates present (TR + EN)`, async ({ page }) => {
    await page.goto(url)
    const hreflangLinks = page.locator('link[rel="alternate"][hreflang]')
    const count = await hreflangLinks.count()
    expect(count, `Expected at least 2 hreflang links at ${url}, got ${count}`).toBeGreaterThanOrEqual(2)

    const langs = new Set<string>()
    for (const link of await hreflangLinks.all()) {
      const lang = await link.getAttribute("hreflang")
      if (lang) langs.add(lang)
    }
    expect(langs.has("tr") || langs.has("tr-TR"), "Missing TR hreflang").toBe(true)
    expect(langs.has("en") || langs.has("en-US"), "Missing EN hreflang").toBe(true)
  })
}

// ─── Root redirect ────────────────────────────────────────────────────────────

test("Root / redirects to /tr/", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveURL("/tr/")
})

// ─── Legacy redirects ────────────────────────────────────────────────────────
// These work via Next.js redirects config (dev server) and .htaccess (production)

test("/hakkimizda redirects to /tr/hakkimizda/", async ({ page }) => {
  await page.goto("/hakkimizda")
  await expect(page).toHaveURL("/tr/hakkimizda/")
})

test("/iletisim redirects to /tr/iletisim/", async ({ page }) => {
  await page.goto("/iletisim")
  await expect(page).toHaveURL("/tr/iletisim/")
})

test("/urunler redirects to /tr/urunler/", async ({ page }) => {
  await page.goto("/urunler")
  await expect(page).toHaveURL("/tr/urunler/")
})
