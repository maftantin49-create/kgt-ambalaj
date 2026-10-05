import Link from "next/link"
import { ArrowRight, Home } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6" style={{ minHeight: "60vh" }}>
        <div className="max-w-md w-full text-center flex flex-col gap-6">

          <div
            className="font-black leading-none select-none"
            style={{
              fontSize: "clamp(64px, 12vw, 96px)",
              color: "rgba(200,38,26,0.10)",
              letterSpacing: "-0.04em",
            }}
            aria-hidden="true"
          >
            404
          </div>

          <div className="flex flex-col gap-3">
            <h1
              className="font-black leading-tight tracking-tight"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(22px, 2.8vw, 32px)",
              }}
            >
              Sayfa Bulunamadı
            </h1>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--color-accent)" }}
            >
              <Home size={15} aria-hidden="true" />
              Ana Sayfa
            </Link>
            <Link
              href="/urunler"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold transition-opacity hover:opacity-75"
              style={{
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
            >
              Ürünler
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
