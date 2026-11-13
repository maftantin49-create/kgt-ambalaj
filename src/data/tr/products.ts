import type { ProductCategory } from "@/data/types"

export const productCategories: ProductCategory[] = [
  {
    id: "strec-film-sarma-makineleri",
    slug: "strec-film-sarma-makineleri",
    name: "Streç Film Sarma Makineleri",
    shortDescription:
      "Üretim hatları ve palet sarma süreçleri için streç film sarma ve rewinding makineleri.",
    overview:
      "KGT Mak Streç Film Sarma Makineleri, endüstriyel üretim süreçlerinde büyük ana streç film rulolarının belirli en ve çap ölçülerine göre küçük ruloculara yeniden sarılması işlemi için tasarlanmıştır. Bu rewinding süreci, ambalaj üreticilerinin tedarik zincirinde kritik bir aşamayı oluşturur; nihai streç film bobinleri bu süreçle hazırlanır. KGT Ambalaj, bu makine grubu için müşteri üretim hattı gereksinimlerine göre çözümler geliştirmektedir.",
    image: "/images/kgt/stretch-film-machine-front.jpg",
    applications: [
      "Endüstriyel streç film bobini üretimi",
      "Üretim hattı çıktılarının küçük ruloculara sarılması",
      "Palet sarma süreçleri için streç film hazırlama",
    ],
    gallery: [
      {
        src: "/images/kgt/rewinding-machines-workshop.jpg",
        alt: "KGT Mak Sarma Makineleri Üretim Atölyesi",
      },
      {
        src: "/images/kgt/rewinding-workshop.webp",
        alt: "KGT Mak Rewinding Atölyesi",
      },
    ],
    faq: [
      {
        question: "Bu makine hangi işlem için kullanılır?",
        answer:
          "Büyük ana streç film rulolarının, belirli ölçülerde küçük ruloculara yeniden sarılması (rewinding) işlemi için kullanılır.",
      },
      {
        question: "Teklif almak için hangi bilgileri paylaşmam gerekir?",
        answer:
          "Üretim kapasitesi, rulo ölçüleri ve üretim hattı koşullarına ilişkin temel bilgiler üzerinden teknik değerlendirme yapılabilir. İletişim formunu veya telefonu kullanarak bizimle iletişime geçebilirsiniz.",
      },
    ],
    relatedProducts: [
      "aluminyum-folyo-sarma-makineleri",
      "karton-rulo-masura-uretim-hatti-makineleri",
      "kagit-dilimleme-makineleri",
    ],
    sectors: ["ambalaj-endustrisi"],
    href: "/tr/urunler/strec-film-sarma-makineleri",
  },
  {
    id: "aluminyum-folyo-sarma-makineleri",
    slug: "aluminyum-folyo-sarma-makineleri",
    name: "Alüminyum Folyo Sarma Makineleri",
    shortDescription:
      "Alüminyum folyo rulo sarma ve rewinding işlemleri için endüstriyel ambalaj makineleri.",
    overview:
      "KGT Mak Alüminyum Folyo Sarma Makineleri, büyük ana alüminyum folyo rulolarının belirli ölçülerde küçük ruloculara yeniden sarılması işlemi için üretilmiştir. Alüminyum folyo ambalaj ürünlerinin üretim hattında yer alan bu makineler, rewinding sürecini gerçekleştirerek nihai ürün bobinlerinin hazırlanmasını sağlar. KGT Ambalaj, bu ekipmanları müşteri projelerine göre yapılandırarak üretmektedir.",
    image: "/images/kgt/aluminum-foil-machine-side.jpg",
    applications: [
      "Endüstriyel alüminyum folyo bobini üretimi",
      "Ana rulo bölme ve yeniden sarma işlemleri",
      "Farklı en ölçülerinde folyo rulosu hazırlama",
    ],
    faq: [
      {
        question: "Alüminyum folyo sarma makinesi ne işe yarar?",
        answer:
          "Büyük ana alüminyum folyo rulolarını belirli en ve çap ölçülerine göre küçük ruloculara yeniden saran endüstriyel bir makinedir.",
      },
      {
        question: "Teklif için hangi bilgileri paylaşmam gerekir?",
        answer:
          "Rulo ölçüleri, üretim kapasitesi ve uygulama koşullarına ilişkin temel bilgilerle teknik değerlendirme yapılabilir.",
      },
    ],
    relatedProducts: [
      "strec-film-sarma-makineleri",
      "karton-rulo-masura-uretim-hatti-makineleri",
      "kagit-dilimleme-makineleri",
    ],
    sectors: ["ambalaj-endustrisi"],
    href: "/tr/urunler/aluminyum-folyo-sarma-makineleri",
  },
  {
    id: "karton-rulo-masura-uretim-hatti-makineleri",
    slug: "karton-rulo-masura-uretim-hatti-makineleri",
    name: "Karton Rulo Masura Üretim Hattı Makineleri",
    shortDescription:
      "Karton masura ve rulo çekirdek üretimi için tam üretim hattı çözümleri.",
    overview:
      "KGT Mak Karton Rulo Masura Üretim Hattı Makineleri, streç film, alüminyum folyo ve kağıt rulolarının içine yerleştirilen karton masura ve çekirdeklerin (core tube) üretildiği tam hat çözümleridir. Karton şeritler halindeki ham maddeyi sararak silindirik masura profiline dönüştüren bu hat, ambalaj ve kağıt sektörünün temel girdilerinden birini üretmektedir. KGT Ambalaj, bu hattı oluşturan makine gruplarını proje bazlı olarak yapılandırmaktadır.",
    image: "/images/kgt/cardboard-core-line.webp",
    applications: [
      "Streç film masurası üretimi",
      "Alüminyum folyo masurası üretimi",
      "Kağıt rulosu çekirdeği (core tube) üretimi",
    ],
    faq: [
      {
        question: "Karton masura üretim hattı hangi ürünleri kapsar?",
        answer:
          "Bu hat, farklı çap ve uzunluklarda karton masura ve core tube üretmek için kullanılan makine grubudur.",
      },
      {
        question: "Teklif için hangi bilgileri paylaşmam gerekir?",
        answer:
          "Üretilmesi hedeflenen masura çapı, uzunluğu ve üretim miktarına ilişkin temel bilgilerle başlangıç teknik değerlendirmesi yapılabilir.",
      },
    ],
    relatedProducts: [
      "strec-film-sarma-makineleri",
      "aluminyum-folyo-sarma-makineleri",
      "kagit-dilimleme-makineleri",
    ],
    sectors: ["ambalaj-endustrisi", "kagit-endustrisi"],
    href: "/tr/urunler/karton-rulo-masura-uretim-hatti-makineleri",
  },
  {
    id: "kagit-dilimleme-makineleri",
    slug: "kagit-dilimleme-makineleri",
    name: "Kağıt Dilimleme Makineleri",
    shortDescription:
      "Kağıt, ambalaj ve baskı sektöründe rulo kesim ve dilimleme ihtiyaçları için dilimleme makineleri.",
    overview:
      "KGT Mak Kağıt Dilimleme Makineleri, büyük kağıt rulolarını belirlenen en ölçülerine göre keserek küçük ruloculara dönüştürmek amacıyla tasarlanmış endüstriyel makinelerdir. Kağıt, ambalaj ve baskı sektörlerine hizmet eden bu makineler, rulo kesim ve dilimleme süreçlerini gerçekleştirir. KGT Ambalaj, bu makine grubunu müşteri ihtiyaçlarına göre yapılandırarak üretmektedir.",
    image: "/images/kgt/paper-slitting-machine.webp",
    applications: [
      "Kağıt rulosu kesim ve dönüştürme işlemleri",
      "Ambalaj sektörüne yönelik kağıt hazırlama",
      "Baskı sektörüne yönelik kağıt rulosu hazırlama",
    ],
    faq: [
      {
        question: "Kağıt dilimleme makinesi ne işe yarar?",
        answer:
          "Büyük kağıt rulolarını istenilen en ölçülerine göre keserek küçük ruloculara dönüştürür; kağıt, ambalaj ve baskı sektörlerinde kullanılır.",
      },
      {
        question: "Teklif için hangi bilgileri paylaşmam gerekir?",
        answer:
          "Kağıt türü, dilimlenecek en ölçüleri ve tahmini üretim miktarı gibi temel bilgilerle teknik değerlendirme başlatılabilir.",
      },
    ],
    relatedProducts: [
      "strec-film-sarma-makineleri",
      "aluminyum-folyo-sarma-makineleri",
      "karton-rulo-masura-uretim-hatti-makineleri",
    ],
    sectors: ["ambalaj-endustrisi", "kagit-endustrisi"],
    href: "/tr/urunler/kagit-dilimleme-makineleri",
  },
]
