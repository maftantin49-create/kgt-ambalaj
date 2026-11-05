const BASE = "https://kgtmak.com"

export function buildAlternates(
  locale: "tr" | "en",
  trPath: string,
  enPath: string
) {
  return {
    canonical: `${BASE}${locale === "tr" ? trPath : enPath}`,
    languages: {
      "tr":        `${BASE}${trPath}`,
      "en":        `${BASE}${enPath}`,
      "x-default": `${BASE}${trPath}`,
    },
  }
}
