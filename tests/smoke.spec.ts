/**
 * Smoke tests: every route loads, has an H1, no critical console errors.
 */
import { test, expect } from "@playwright/test"
import { ALL_ROUTES } from "./helpers/routes"

// Errors that are expected/acceptable on the dev server
const IGNORED_ERRORS = [
  "fast refresh",
  "HMR",
  "webpack",
  "__webpack",
  "/_next/",
  "net::ERR_ABORTED",           // HMR websocket on page close
  "WebSocket",
]

function isCritical(msg: string): boolean {
  return !IGNORED_ERRORS.some((pattern) => msg.toLowerCase().includes(pattern.toLowerCase()))
}

for (const route of ALL_ROUTES) {
  test(`SMOKE ${route}`, async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error" && isCritical(msg.text())) {
        errors.push(msg.text())
      }
    })
    page.on("pageerror", (err) => errors.push(`[pageerror] ${err.message}`))

    const response = await page.goto(route, { waitUntil: "domcontentloaded" })

    // 200 (or redirect that resolved to 200)
    expect(response?.status() ?? 200, `${route} → non-200`).toBe(200)

    // H1 present
    const h1 = page.locator("h1")
    await expect(h1).toBeVisible()

    // No critical runtime errors
    expect(errors, `Console errors on ${route}: ${errors.join(" | ")}`).toHaveLength(0)
  })
}
