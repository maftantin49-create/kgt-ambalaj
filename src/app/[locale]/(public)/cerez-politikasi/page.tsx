import type { Metadata } from "next"
import { buildAlternates } from "@/lib/seo"

export function generateStaticParams() {
  return [{ locale: "tr" }]
}

export function generateMetadata(): Metadata {
  return {
    title: "Çerez Politikası — KGT Ambalaj",
    description: "KGT Ambalaj web sitesinde kullanılan çerezler hakkında bilgi.",
    alternates: buildAlternates("tr", "/tr/cerez-politikasi", "/en/cookie-policy"),
    robots: { index: false },
  }
}

export default function CerezPolitikasiPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[2px] shrink-0" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-accent-dark)" }}>
            Yasal
          </p>
        </div>
        <h1 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(26px,3.5vw,42px)" }}>
          Çerez Politikası
        </h1>
      </div>

      <div className="flex flex-col gap-10 text-[14px] leading-relaxed" style={{ color: "var(--color-text)" }}>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            Çerez Nedir?
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Çerezler, web siteleri tarafından tarayıcınıza yerleştirilen küçük metin dosyalarıdır.
            Sitenin teknik olarak düzgün çalışmasını sağlamak veya kullanıcı tercihlerini hatırlamak
            amacıyla kullanılabilirler.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            Bu Sitede Kullanılan Çerezler
          </h2>
          <p className="mb-4" style={{ color: "var(--color-muted)" }}>
            Bu site yalnızca sitenin çalışması için zorunlu olan teknik çerezleri kullanmaktadır.
          </p>
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--color-text)" }}>Çerez</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--color-text)" }}>Tür</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--color-text)" }}>Amaç</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>
                    <code className="text-[12px]">NEXT_LOCALE</code>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>
                    Zorunlu
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>
                    Seçilen dil tercihini hatırlar (TR/EN)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)" }}>Oturum çerezi</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)" }}>Zorunlu</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-muted)" }}>Tarayıcı oturumu boyunca teknik işleyiş</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            Analitik ve Pazarlama Çerezleri
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Bu site herhangi bir analitik araç (Google Analytics, vb.), pazarlama pikseli
            (Meta Pixel, vb.) veya üçüncü taraf izleme betiği kullanmamaktadır. Bu nedenle
            zorunlu olmayan çerezler için rıza mekanizması gerekmemektedir.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            Çerezleri Kontrol Etme
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Tarayıcı ayarlarınız üzerinden çerezleri silebilir veya engelleyebilirsiniz. Zorunlu
            çerezlerin engellenmesi halinde site bazı özelliklerini düzgün çalıştıramayabilir.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            Sorularınız
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Çerez kullanımına ilişkin sorularınız için{" "}
            <a href="/tr/iletisim" style={{ color: "var(--color-accent-dark)" }}>iletişim sayfamızı</a>{" "}
            ziyaret edebilirsiniz.
          </p>
        </section>

      </div>
    </main>
  )
}
