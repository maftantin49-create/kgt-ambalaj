import type { Metadata } from "next"
import { buildAlternates } from "@/lib/seo"
import { site } from "@/config/site"

export function generateStaticParams() {
  return [{ locale: "tr" }]
}

export function generateMetadata(): Metadata {
  return {
    title: "Gizlilik Politikası ve KVKK Aydınlatma Metni — KGT Ambalaj",
    description:
      "KGT Ambalaj kişisel verilerin işlenmesine ilişkin gizlilik politikası ve KVKK kapsamındaki aydınlatma metni.",
    alternates: buildAlternates("tr", "/tr/gizlilik", "/en/privacy"),
    robots: { index: false },
  }
}

export default function GizlilikPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

      {/* Başlık */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[2px] shrink-0" style={{ background: "var(--color-accent)" }} aria-hidden="true" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-accent-dark)" }}>
            Yasal
          </p>
        </div>
        <h1 className="font-black leading-tight tracking-tight" style={{ color: "var(--color-text)", fontSize: "clamp(26px,3.5vw,42px)" }}>
          Gizlilik Politikası ve<br />KVKK Aydınlatma Metni
        </h1>
        <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında hazırlanmıştır.
        </p>
      </div>

      <div className="flex flex-col gap-10 text-[14px] leading-relaxed" style={{ color: "var(--color-text)" }}>

        {/* 1 — Veri Sorumlusu */}
        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            1. Veri Sorumlusu
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Bu web sitesi KGT Ambalaj tarafından işletilmektedir. Kişisel verilerinizin işlenmesinden
            sorumlu veri sorumlusu hakkındaki bilgilere{" "}
            <a href="/tr/iletisim" style={{ color: "var(--color-accent-dark)" }}>iletişim sayfasından</a>{" "}
            ulaşabilirsiniz.
          </p>
        </section>

        {/* 2 — Toplanan Veriler */}
        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            2. Toplanan Kişisel Veriler
          </h2>
          <p className="mb-3" style={{ color: "var(--color-muted)" }}>
            Bu web sitesi aracılığıyla yalnızca iletişim formu kullanımında kişisel veri toplanmaktadır.
            Toplanan veriler:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5" style={{ color: "var(--color-muted)" }}>
            <li>Ad Soyad</li>
            <li>Telefon numarası</li>
            <li>E-posta adresi</li>
            <li>İletişim mesajı içeriği</li>
          </ul>
          <p className="mt-3" style={{ color: "var(--color-muted)" }}>
            Bu veriler yalnızca gönderilen form aracılığıyla ve ilgili kişinin açık iradesiyle sağlanmaktadır.
            Site pasif olarak (çerez, izleme betiği veya analitik araçlar aracılığıyla) herhangi bir kişisel
            veri toplamamaktadır.
          </p>
        </section>

        {/* 3 — İşleme Amaçları */}
        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            3. İşleme Amaçları ve Hukuki Dayanaklar
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            İletişim formu aracılığıyla iletilen veriler yalnızca talep veya soruya yanıt verilmesi
            amacıyla işlenmektedir. KVKK md. 5/2(f) kapsamında veri sorumlusunun meşru menfaati
            ile md. 5/1 kapsamında ilgili kişinin açık rızası hukuki dayanaktır.
          </p>
        </section>

        {/* 4 — Saklama ve Aktarım */}
        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            4. Saklama Süresi ve Veri Aktarımı
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Kişisel veriler, işleme amacı ortadan kalktığında silinmekte veya anonim hale getirilmektedir.
            Veriler üçüncü taraflara satılmamakta, kiralanmamakta ya da ticari amaçla aktarılmamaktadır.
            Yalnızca yasal zorunluluk halinde yetkili kamu kurumlarıyla paylaşılabilir.
          </p>
        </section>

        {/* 5 — KVKK Hakları */}
        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            5. KVKK Madde 11 Kapsamındaki Haklarınız
          </h2>
          <p className="mb-3" style={{ color: "var(--color-muted)" }}>
            KVKK md. 11 uyarınca aşağıdaki haklara sahipsiniz:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5" style={{ color: "var(--color-muted)" }}>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>Eksik veya yanlış verilerin düzeltilmesini talep etme</li>
            <li>KVKK md. 7 kapsamında silinmesini veya yok edilmesini talep etme</li>
            <li>Aktarılan üçüncü kişilerin bildirilmesini talep etme</li>
            <li>Otomatik sistemle oluşan kararların itirazını yapma</li>
            <li>Zararın tazminini talep etme</li>
          </ul>
          <p className="mt-3" style={{ color: "var(--color-muted)" }}>
            Bu haklarınızı kullanmak için{" "}
            {site.phone && (
              <a href={`tel:${site.phone}`} style={{ color: "var(--color-accent-dark)" }}>
                {site.phoneDisplay}
              </a>
            )}{" "}
            numaralı telefon veya{" "}
            <a href="/tr/iletisim" style={{ color: "var(--color-accent-dark)" }}>iletişim formu</a>{" "}
            aracılığıyla bize ulaşabilirsiniz.
          </p>
        </section>

        {/* 6 — Çerezler */}
        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            6. Çerezler
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Bu site yalnızca sitenin teknik olarak düzgün çalışması için zorunlu olan çerezleri
            kullanmaktadır. Google Analytics, Meta Pixel, GTM veya benzer herhangi bir izleme
            aracı aktif değildir. Ayrıntılar için{" "}
            <a href="/tr/cerez-politikasi" style={{ color: "var(--color-accent-dark)" }}>
              Çerez Politikamıza
            </a>{" "}
            bakabilirsiniz.
          </p>
        </section>

        {/* 7 — Politika Güncellemeleri */}
        <section>
          <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--color-text)" }}>
            7. Politika Güncellemeleri
          </h2>
          <p style={{ color: "var(--color-muted)" }}>
            Bu metin yasal düzenlemeler veya site işleyişindeki değişiklikler doğrultusunda
            güncellenebilir. Güncel metin her zaman bu sayfada yayımlanır.
          </p>
        </section>

      </div>
    </main>
  )
}
