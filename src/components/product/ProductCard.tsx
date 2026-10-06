import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package } from "lucide-react"
import type { ProductCategory } from "@/data/products"

export default function ProductCard({ category }: { category: ProductCategory }) {
  return (
    <Link
      href={category.href}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
      style={{
        background: "#FFFFFF",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* ── Görsel alanı ────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "4/3",
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
        aria-hidden={category.image ? undefined : true}
      >
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <>
            {/* Nötr endüstriyel grid placeholder */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />
            <div
              className="absolute top-0 left-0 w-10 h-0.5"
              style={{ background: "var(--color-accent)" }}
            />
            <div
              className="absolute top-0 left-0 w-0.5 h-10"
              style={{ background: "var(--color-accent)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(200,38,26,0.06)",
                  border: "1px solid rgba(200,38,26,0.14)",
                }}
              >
                <Package size={22} style={{ color: "var(--color-accent)" }} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── İçerik ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3
          className="font-bold text-[16px] leading-snug transition-colors text-text group-hover:text-accent"
        >
          {category.name}
        </h3>
        <p
          className="text-[13px] leading-relaxed flex-1"
          style={{ color: "var(--color-muted)" }}
        >
          {category.shortDescription}
        </p>
        <div
          className="flex items-center gap-1.5 text-[13px] font-semibold mt-1 transition-colors"
          style={{ color: "var(--color-accent)" }}
        >
          Detayları İncele
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  )
}
