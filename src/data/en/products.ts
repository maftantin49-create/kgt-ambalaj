import type { ProductCategory } from "@/data/types"

export const productCategories: ProductCategory[] = [
  {
    id: "strec-film-sarma-makineleri",
    slug: "stretch-film-rewinding-machines",
    name: "Stretch Film Rewinding Machines",
    shortDescription:
      "Stretch film rewinding machines for production lines and pallet wrapping processes.",
    overview:
      "KGT Mak Stretch Film Rewinding Machines are designed for rewinding large master stretch film rolls into smaller rolls of defined width and diameter. This rewinding process is a critical step in the production of end-use stretch film bobbins for packaging and pallet wrapping applications. KGT Ambalaj develops these machines according to the production line requirements of each customer.",
    image: "/images/kgt/stretch-film-machine-front.jpg",
    applications: [
      "Industrial stretch film bobbin manufacturing",
      "Rewinding of master rolls into smaller unit rolls",
      "Stretch film preparation for pallet wrapping operations",
    ],
    gallery: [
      {
        src: "/images/kgt/rewinding-machines-workshop.jpg",
        alt: "KGT Mak Rewinding Machines Workshop",
      },
      {
        src: "/images/kgt/rewinding-workshop.webp",
        alt: "KGT Mak Rewinding Workshop",
      },
    ],
    faq: [
      {
        question: "What is a stretch film rewinding machine used for?",
        answer:
          "It is used to rewind large master stretch film rolls into smaller rolls of defined dimensions for downstream packaging applications.",
      },
      {
        question: "What information is needed to request a quote?",
        answer:
          "Basic information about production capacity, roll dimensions and production line conditions allows an initial technical assessment. Please contact us by phone or through the contact form.",
      },
    ],
    relatedProducts: [
      "aluminium-foil-rewinding-machines",
      "cardboard-core-tube-production-line-machines",
      "paper-slitting-machines",
    ],
    sectors: ["ambalaj-endustrisi"],
    href: "/en/products/stretch-film-rewinding-machines",
  },
  {
    id: "aluminyum-folyo-sarma-makineleri",
    slug: "aluminium-foil-rewinding-machines",
    name: "Aluminium Foil Rewinding Machines",
    shortDescription:
      "Industrial packaging machines for aluminium foil roll rewinding operations.",
    overview:
      "KGT Mak Aluminium Foil Rewinding Machines are built for rewinding large master aluminium foil rolls into smaller rolls of defined dimensions. These machines occupy a critical position in the aluminium foil packaging production line, transforming master rolls into finished bobbins. KGT Ambalaj configures these machines to meet individual customer project requirements.",
    image: "/images/kgt/aluminum-foil-machine-side.jpg",
    applications: [
      "Industrial aluminium foil bobbin manufacturing",
      "Master roll slitting and rewinding operations",
      "Foil roll preparation in various width specifications",
    ],
    faq: [
      {
        question: "What does an aluminium foil rewinding machine do?",
        answer:
          "It rewinds large master aluminium foil rolls into smaller rolls of specified width and diameter for packaging production.",
      },
      {
        question: "What information is needed to request a quote?",
        answer:
          "Roll dimensions, production capacity and application conditions are the basis for an initial technical assessment.",
      },
    ],
    relatedProducts: [
      "stretch-film-rewinding-machines",
      "cardboard-core-tube-production-line-machines",
      "paper-slitting-machines",
    ],
    sectors: ["ambalaj-endustrisi"],
    href: "/en/products/aluminium-foil-rewinding-machines",
  },
  {
    id: "karton-rulo-masura-uretim-hatti-makineleri",
    slug: "cardboard-core-tube-production-line-machines",
    name: "Cardboard Core Tube Production Line Machines",
    shortDescription:
      "Production line solutions for cardboard core and tube manufacturing.",
    overview:
      "KGT Mak Cardboard Core Tube Production Line Machines are complete line solutions for manufacturing the cardboard cores and tubes placed inside stretch film, aluminium foil and paper rolls. These machines wind strips of cardboard material into cylindrical core profiles, producing an essential input for the packaging and paper industries. KGT Ambalaj configures the machine groups that form this line on a project basis.",
    image: "/images/kgt/cardboard-core-line.webp",
    applications: [
      "Stretch film core tube manufacturing",
      "Aluminium foil core tube manufacturing",
      "Paper roll core tube manufacturing",
    ],
    faq: [
      {
        question: "What products does the cardboard core production line cover?",
        answer:
          "It is the machine group used to produce cardboard cores and core tubes of different diameters and lengths.",
      },
      {
        question: "What information is needed to request a quote?",
        answer:
          "Target core diameter, length and production volume are sufficient for an initial technical assessment.",
      },
    ],
    relatedProducts: [
      "stretch-film-rewinding-machines",
      "aluminium-foil-rewinding-machines",
      "paper-slitting-machines",
    ],
    sectors: ["ambalaj-endustrisi", "kagit-endustrisi"],
    href: "/en/products/cardboard-core-tube-production-line-machines",
  },
  {
    id: "kagit-dilimleme-makineleri",
    slug: "paper-slitting-machines",
    name: "Paper Slitting Machines",
    shortDescription:
      "Slitting machines for roll cutting and slitting needs in the paper, packaging, and printing sectors.",
    overview:
      "KGT Mak Paper Slitting Machines are industrial machines designed to cut large paper rolls into smaller rolls of specified widths. Serving the paper, packaging and printing sectors, these machines perform roll cutting and slitting operations. KGT Ambalaj manufactures this machine group configured to individual customer requirements.",
    image: "/images/kgt/paper-slitting-machine.webp",
    applications: [
      "Paper roll cutting and converting operations",
      "Paper preparation for the packaging sector",
      "Paper roll preparation for the printing sector",
    ],
    faq: [
      {
        question: "What does a paper slitting machine do?",
        answer:
          "It cuts large paper rolls to specified widths and converts them into smaller rolls; used in the paper, packaging and printing sectors.",
      },
      {
        question: "What information is needed to request a quote?",
        answer:
          "Paper type, target slit widths and estimated production volume provide the basis for a technical assessment.",
      },
    ],
    relatedProducts: [
      "stretch-film-rewinding-machines",
      "aluminium-foil-rewinding-machines",
      "cardboard-core-tube-production-line-machines",
    ],
    sectors: ["ambalaj-endustrisi", "kagit-endustrisi"],
    href: "/en/products/paper-slitting-machines",
  },
]
