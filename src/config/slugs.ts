export const trToEnSlug: Record<string, string> = {
  "strec-film-sarma-makineleri":               "stretch-film-rewinding-machines",
  "aluminyum-folyo-sarma-makineleri":           "aluminium-foil-rewinding-machines",
  "karton-rulo-masura-uretim-hatti-makineleri": "cardboard-core-tube-production-line-machines",
  "kagit-dilimleme-makineleri":                 "paper-slitting-machines",
}

export const enToTrSlug: Record<string, string> = Object.fromEntries(
  Object.entries(trToEnSlug).map(([tr, en]) => [en, tr])
)
