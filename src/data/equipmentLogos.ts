export interface EquipmentLogo {
  src: string;
  alt: string;
}

// Logos live in /public/images/brands
const orderedLogos: EquipmentLogo[] = [
  { src: "/images/brands/AcerIncLogo.svg", alt: "Acer" },
  { src: "/images/brands/AdvancedMicroDevicesLogo.svg", alt: "Advanced Micro Devices (AMD)" },
  { src: "/images/brands/AOCInternationalLogo.svg", alt: "AOC" },
  { src: "/images/brands/APCbySchneiderElectricLogo.svg", alt: "APC by Schneider Electric" },
  { src: "/images/brands/AppleIncLogo.svg", alt: "Apple" },
  { src: "/images/brands/AsusLogo.svg", alt: "Asus" },
  { src: "/images/brands/BenQLogo.svg", alt: "BenQ" },
  { src: "/images/brands/BrotherLogo.svg", alt: "Brother" },
  { src: "/images/brands/CiscoSystemsLogo.svg", alt: "Cisco Systems" },
  { src: "/images/brands/DellLogo.svg", alt: "Dell" },
  { src: "/images/brands/FortinetLogo.svg", alt: "Fortinet" },
  { src: "/images/brands/FujitsuLogo.svg", alt: "Fujitsu" },
  { src: "/images/brands/IBMLogo.svg", alt: "IBM" },
  { src: "/images/brands/IntelLogo.svg", alt: "Intel" },
  { src: "/images/brands/LenovoLogo.svg", alt: "Lenovo" },
  { src: "/images/brands/LGCorporationLogo.svg", alt: "LG Corporation" },
  { src: "/images/brands/LinksysLogo.svg", alt: "Linksys" },
  { src: "/images/brands/LogitechLogo.svg", alt: "Logitech" },
  { src: "/images/brands/NetgearLogo.svg", alt: "Netgear" },
  { src: "/images/brands/PaloAltoNetworksLogo.svg", alt: "Palo Alto Networks" },
  { src: "/images/brands/SamsungLogo.svg", alt: "Samsung" },
  { src: "/images/brands/SeagateTechnologyLogo.svg", alt: "Seagate Technology" },
  { src: "/images/brands/SynologyLogo.svg", alt: "Synology" },
  { src: "/images/brands/ThinkPadLogo.svg", alt: "ThinkPad" },
  { src: "/images/brands/TPLinkLogo.svg", alt: "TP-Link" },
  { src: "/images/brands/UbiquitiNetworksLogo.svg", alt: "Ubiquiti Networks" },
  { src: "/images/brands/VivoLogo.svg", alt: "Vivo" },
  { src: "/images/brands/WesternDigitalLogo.svg", alt: "Western Digital" },
];


// Fisher–Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Export a shuffled list
export const equipmentLogos = shuffle(orderedLogos);