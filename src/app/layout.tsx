import type { Metadata } from "next"
import { site } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    siteName: site.name,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
