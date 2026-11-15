interface LogoProps {
  variant: "light" | "dark"
  size?: "sm" | "md"
}

export default function Logo({ variant, size = "md" }: LogoProps) {
  const baseColor = variant === "dark" ? "#E8E8E6" : "var(--color-text)"
  const subColor  = variant === "dark" ? "#5A5A58"  : "var(--color-muted)"

  return (
    <span style={{ display: "flex", flexDirection: "column", gap: "2px", lineHeight: 1 }}>
      <span
        style={{
          fontWeight: 900,
          fontSize: size === "md" ? "22px" : "17px",
          letterSpacing: "-0.03em",
          color: baseColor,
        }}
      >
        KGT{" "}
        <span style={{ color: "var(--color-accent-dark)" }}>MAK</span>
      </span>
      <span
        style={{
          fontWeight: 600,
          fontSize: size === "md" ? "9px" : "7.5px",
          letterSpacing: "0.20em",
          color: subColor,
        }}
      >
        AMBALAJ MAKİNELERİ
      </span>
    </span>
  )
}
