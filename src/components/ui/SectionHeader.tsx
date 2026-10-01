interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  description?: string
  align?: "left" | "center"
  headingTag?: "h1" | "h2" | "h3"
  headingId?: string
}

export default function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "left",
  headingTag: Tag = "h2",
  headingId,
}: SectionHeaderProps) {
  const isCenter = align === "center"

  return (
    <div className={`flex flex-col gap-3 ${isCenter ? "items-center text-center" : "items-start"}`}>

      {eyebrow && (
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-px shrink-0"
            style={{ background: "var(--color-accent)" }}
            aria-hidden="true"
          />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--color-accent)" }}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <Tag
        id={headingId}
        className="font-black leading-tight tracking-tight"
        style={{
          color: "var(--color-text)",
          fontSize: "clamp(22px, 2.4vw, 36px)",
        }}
      >
        {heading}
      </Tag>

      {description && (
        <p
          className="text-[14px] lg:text-[15px] leading-relaxed max-w-[540px]"
          style={{ color: "var(--color-muted)" }}
        >
          {description}
        </p>
      )}

    </div>
  )
}
