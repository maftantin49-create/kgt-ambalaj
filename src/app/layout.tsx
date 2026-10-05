import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { site } from "@/config/site"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    // GEÇİCİ: OG görseli temin edildiğinde `images` alanı eklenecek
  },
}

// Organization JSON-LD — yalnızca doğrulanmış alanlar dahil edildi.
// telephone, email, address: site.ts'te GEÇİCİ olduğu için omit edildi.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  )
}
