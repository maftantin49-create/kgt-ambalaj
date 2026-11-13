interface LogoProps {
  variant: "light" | "dark"
  size?: "sm" | "md"
}

export default function Logo({ variant, size = "md" }: LogoProps) {
  const baseColor = variant === "dark" ? "#E8E8E6" : "var(--color-text)"
  const subColor  = variant === "dark" ? "#5A5A58"  : "var(--color-muted)"

  return (
    <span
      style={{ display: "flex", flexDirection: "column", gap: "2px", lineHeight: 1 }}
    >
      <span
        style={{
          fontWeight: 900,
          fontSize: size === "md" ? "19px" : "16px",
          letterSpacing: "-0.025em",
          color: baseColor,
        }}
      >
        KGT{" "}
        <span style={{ color: "var(--color-accent)" }}>MAK</span>
      </span>
      <span
        style={{
          fontWeight: 600,
          fontSize: size === "md" ? "8px" : "7px",
          letterSpacing: "0.18em",
          color: subColor,
        }}
      >
        AMBALAJ MAKİNELERİ
      </span>
    </span>
  )
}
