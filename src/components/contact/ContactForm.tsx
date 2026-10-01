"use client"

import { useActionState } from "react"
import { submitContact } from "@/app/actions/contact"
import { initialFormState } from "./types"
import type { FormState } from "./types"

interface ContactFormProps {
  isConfigured: boolean
}

function fieldStyle(error: string | undefined): React.CSSProperties {
  return {
    border: error ? "1px solid rgba(200,38,26,0.6)" : "1px solid var(--color-border)",
    background: "var(--color-surface)",
    color: "var(--color-text)",
    outline: "none",
  }
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-[11px]" style={{ color: "var(--color-accent)" }} role="alert">
      {message}
    </p>
  )
}

export default function ContactForm({ isConfigured }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitContact,
    initialFormState,
  )

  return (
    <div
      className="rounded-2xl p-7 lg:p-8"
      style={{
        background: "var(--background)",
        border: "1px solid var(--color-border)",
      }}
    >
      <p
        className="text-[13px] font-semibold mb-6 pb-4"
        style={{
          color: "var(--color-muted)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        Teklif / Bilgi Talebi
      </p>

      {/* ── Form aktif değil ─────────────────────────────────────────── */}
      {!isConfigured && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <p className="text-[14px] font-medium" style={{ color: "var(--color-text)" }}>
            İletişim formu yakında aktif olacak.
          </p>
          <p className="text-[13px] leading-relaxed max-w-[280px]" style={{ color: "var(--color-muted)" }}>
            Teklif veya bilgi almak için lütfen telefon ya da
            e-posta ile iletişime geçin.
          </p>
        </div>
      )}

      {/* ── Başarı durumu ────────────────────────────────────────────── */}
      {isConfigured && state.status === "success" && (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(200,38,26,0.08)",
              border: "1px solid rgba(200,38,26,0.2)",
            }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10l4.5 4.5L16 6"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-[15px] font-semibold" style={{ color: "var(--color-text)" }}>
            Mesajınız İletildi
          </p>
          <p className="text-[13px]" style={{ color: "var(--color-muted)" }}>
            {state.message}
          </p>
        </div>
      )}

      {/* ── Aktif form ───────────────────────────────────────────────── */}
      {isConfigured && state.status !== "success" && (
        <form action={formAction} aria-label="İletişim formu" noValidate>
          {/* Honeypot — botlar için tuzak alan, kullanıcıya görünmez */}
          <input
            name="website"
            type="text"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
          />

          <div className="flex flex-col gap-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Ad Soyad */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="cf-name"
                  className="text-[12px] font-semibold"
                  style={{ color: "var(--color-muted)" }}
                >
                  Ad Soyad <span aria-hidden="true">*</span>
                </label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  placeholder="Ad Soyad"
                  autoComplete="name"
                  required
                  maxLength={100}
                  disabled={isPending}
                  aria-required="true"
                  aria-invalid={!!state.fieldErrors.name}
                  aria-describedby={state.fieldErrors.name ? "cf-name-error" : undefined}
                  className="w-full rounded-lg px-3.5 py-2.5 text-[14px]"
                  style={fieldStyle(state.fieldErrors.name)}
                />
                <FieldError id="cf-name-error" message={state.fieldErrors.name} />
              </div>

              {/* Firma */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="cf-company"
                  className="text-[12px] font-semibold"
                  style={{ color: "var(--color-muted)" }}
                >
                  Firma
                </label>
                <input
                  id="cf-company"
                  name="company"
                  type="text"
                  placeholder="Firma adı"
                  autoComplete="organization"
                  maxLength={150}
                  disabled={isPending}
                  aria-invalid={!!state.fieldErrors.company}
                  aria-describedby={state.fieldErrors.company ? "cf-company-error" : undefined}
                  className="w-full rounded-lg px-3.5 py-2.5 text-[14px]"
                  style={fieldStyle(state.fieldErrors.company)}
                />
                <FieldError id="cf-company-error" message={state.fieldErrors.company} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* E-posta */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="cf-email"
                  className="text-[12px] font-semibold"
                  style={{ color: "var(--color-muted)" }}
                >
                  E-posta <span aria-hidden="true">*</span>
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  placeholder="ornek@firma.com"
                  autoComplete="email"
                  required
                  maxLength={254}
                  disabled={isPending}
                  aria-required="true"
                  aria-invalid={!!state.fieldErrors.email}
                  aria-describedby={state.fieldErrors.email ? "cf-email-error" : undefined}
                  className="w-full rounded-lg px-3.5 py-2.5 text-[14px]"
                  style={fieldStyle(state.fieldErrors.email)}
                />
                <FieldError id="cf-email-error" message={state.fieldErrors.email} />
              </div>

              {/* Telefon */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="cf-phone"
                  className="text-[12px] font-semibold"
                  style={{ color: "var(--color-muted)" }}
                >
                  Telefon
                </label>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  placeholder="+90 5xx xxx xx xx"
                  autoComplete="tel"
                  maxLength={20}
                  disabled={isPending}
                  aria-invalid={!!state.fieldErrors.phone}
                  aria-describedby={state.fieldErrors.phone ? "cf-phone-error" : undefined}
                  className="w-full rounded-lg px-3.5 py-2.5 text-[14px]"
                  style={fieldStyle(state.fieldErrors.phone)}
                />
                <FieldError id="cf-phone-error" message={state.fieldErrors.phone} />
              </div>
            </div>

            {/* Mesaj */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="cf-message"
                className="text-[12px] font-semibold"
                style={{ color: "var(--color-muted)" }}
              >
                Mesaj <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                placeholder="Proje ihtiyacınızı kısaca açıklayın..."
                required
                minLength={10}
                maxLength={2000}
                disabled={isPending}
                aria-required="true"
                aria-invalid={!!state.fieldErrors.message}
                aria-describedby={state.fieldErrors.message ? "cf-message-error" : undefined}
                className="w-full rounded-lg px-3.5 py-2.5 text-[14px] resize-none"
                style={fieldStyle(state.fieldErrors.message)}
              />
              <FieldError id="cf-message-error" message={state.fieldErrors.message} />
            </div>

            {/* Genel hata mesajı (alan hatası yoksa) */}
            {state.status === "error" &&
              Object.keys(state.fieldErrors).length === 0 &&
              state.message && (
                <p
                  className="text-[12px] text-center"
                  style={{ color: "var(--color-accent)" }}
                  role="alert"
                >
                  {state.message}
                </p>
              )}

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 rounded-lg text-[14px] font-semibold text-white transition-opacity"
                style={{
                  background: "var(--color-accent)",
                  opacity: isPending ? 0.65 : 1,
                  cursor: isPending ? "wait" : "pointer",
                }}
              >
                {isPending ? "Gönderiliyor…" : "Gönder"}
              </button>
            </div>

          </div>
        </form>
      )}
    </div>
  )
}
