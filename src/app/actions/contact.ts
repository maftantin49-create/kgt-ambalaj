"use server"

import type { FormState } from "@/components/contact/types"

export async function submitContact(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Gate: both env vars must be set before real submission is allowed.
  // While RESEND_API_KEY / CONTACT_TO_EMAIL are absent the form renders as
  // inactive in the UI, but this server-side check is the authoritative guard.
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    return { status: "not_configured", fieldErrors: {}, message: "" }
  }

  // Honeypot: a bot filled the hidden "website" field — return silent success
  // so the bot receives no signal that it was caught.
  const honeypot = formData.get("website")
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success", fieldErrors: {}, message: "Mesajınız iletildi." }
  }

  // Extract and sanitise
  const name    = String(formData.get("name")    ?? "").trim()
  const company = String(formData.get("company") ?? "").trim()
  const email   = String(formData.get("email")   ?? "").trim()
  const phone   = String(formData.get("phone")   ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  const fieldErrors: FormState["fieldErrors"] = {}

  // name: required, 2–100
  if (name.length < 2) {
    fieldErrors.name =
      name.length === 0
        ? "Ad Soyad zorunludur."
        : "Ad Soyad en az 2 karakter olmalıdır."
  } else if (name.length > 100) {
    fieldErrors.name = "Ad Soyad 100 karakteri aşamaz."
  }

  // company: optional, max 150
  if (company.length > 150) {
    fieldErrors.company = "Firma adı 150 karakteri aşamaz."
  }

  // email: required, max 254, basic format
  if (!email) {
    fieldErrors.email = "E-posta adresi zorunludur."
  } else if (email.length > 254) {
    fieldErrors.email = "E-posta adresi 254 karakteri aşamaz."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Geçerli bir e-posta adresi girin."
  }

  // phone: optional, max 20, allows digits / spaces / + ( ) -
  // At least 7 digits required when present (covers landlines and GSM alike).
  if (phone.length > 0) {
    if (phone.length > 20) {
      fieldErrors.phone = "Telefon numarası 20 karakteri aşamaz."
    } else if (!/^[0-9 +()\-]+$/.test(phone)) {
      fieldErrors.phone = "Telefon numarası yalnızca rakam, boşluk ve + ( ) - içerebilir."
    } else if ((phone.match(/[0-9]/g) ?? []).length < 7) {
      fieldErrors.phone = "Telefon numarası en az 7 rakam içermelidir."
    }
  }

  // message: required, 10–2000
  if (message.length < 10) {
    fieldErrors.message =
      message.length === 0
        ? "Mesaj zorunludur."
        : "Mesaj en az 10 karakter olmalıdır."
  } else if (message.length > 2000) {
    fieldErrors.message = `Mesaj 2000 karakteri aşamaz. (Şu an: ${message.length})`
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, message: "" }
  }

  // ── Resend entegrasyonu buraya gelecek ────────────────────────────────────
  // Env vars mevcut olduğunda bu noktaya ulaşılır.
  // Gerçek gönderim kodu şu formatta eklenecek:
  //
  //   const res = await fetch("https://api.resend.com/emails", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       from:    "KGT Ambalaj Web <noreply@kgtambalaj.com>",
  //       to:      process.env.CONTACT_TO_EMAIL,
  //       subject: `Teklif Talebi — ${name}`,
  //       html:    `<p><b>Ad:</b> ${name}</p>...`,
  //     }),
  //   })
  //   if (!res.ok) return { status: "error", fieldErrors: {}, message: "Mesaj gönderilemedi. Lütfen tekrar deneyin." }
  //
  // ─────────────────────────────────────────────────────────────────────────

  return {
    status: "success",
    fieldErrors: {},
    message: "Mesajınız iletildi. En kısa sürede size dönüş yapacağız.",
  }
}
