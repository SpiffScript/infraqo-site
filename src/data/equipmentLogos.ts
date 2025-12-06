// src/data/equipmentLogos.ts

export interface EquipmentLogo {
  src: string;
  alt: string;
}

// Base ordered list
const orderedBrandLogos: EquipmentLogo[] = [
  { src: "/images/brands/Acer-Inc-Logo.svg", alt: "Acer" },
  { src: "/images/brands/Advanced-Micro-Devices-Logo.svg", alt: "Advanced Micro Devices (AMD)" },
  { src: "/images/brands/AOC-International-Logo.svg", alt: "AOC" },
  { src: "/images/brands/APC-by-Schneider-Electric-Logo.svg", alt: "APC by Schneider Electric" },
  { src: "/images/brands/Apple-Inc-Logo.svg", alt: "Apple" },
  { src: "/images/brands/Asus-Logo.svg", alt: "Asus" },
  { src: "/images/brands/BenQ-Logo.svg", alt: "BenQ" },
  { src: "/images/brands/Brother-Logo.svg", alt: "Brother" },
  { src: "/images/brands/Cisco-Systems-Logo.svg", alt: "Cisco Systems" },
  { src: "/images/brands/Dell-Logo.svg", alt: "Dell" },
  { src: "/images/brands/Fortinet-Logo.svg", alt: "Fortinet" },
  { src: "/images/brands/Fujitsu-Logo.svg", alt: "Fujitsu" },
  { src: "/images/brands/IBM-Logo.svg", alt: "IBM" },
  { src: "/images/brands/Intel-Logo.svg", alt: "Intel" },
  { src: "/images/brands/Lenovo-Logo.svg", alt: "Lenovo" },
  { src: "/images/brands/LG-Corporation-Logo.svg", alt: "LG Corporation" },
  { src: "/images/brands/Linksys-Logo.svg", alt: "Linksys" },
  { src: "/images/brands/Netgear-Logo.svg", alt: "Netgear" },
  { src: "/images/brands/Palo-Alto-Networks-Logo.svg", alt: "Palo Alto Networks" },
  { src: "/images/brands/Samsung-Logo.svg", alt: "Samsung" },
  { src: "/images/brands/Seagate-Technology-Logo.svg", alt: "Seagate Technology" },  
  { src: "/images/brands/ThinkPad-Logo.svg", alt: "ThinkPad" },
  { src: "/images/brands/TP-Link-Logo.svg", alt: "TP-Link" },
  { src: "/images/brands/Synology-Logo.svg", alt: "Synology" },
  { src: "/images/brands/Ubiquiti-Networks-Logo.svg", alt: "Ubiquiti Networks" },
  { src: "/images/brands/Western-Digital-Logo.svg", alt: "Western Digital" },
  { src: "/images/brands/Vivo-Logo.svg", alt: "Vivo" },
];

// Fisher–Yates shuffle (non-mutating: returns a new array)
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Export a shuffled list
export const equipmentLogos: EquipmentLogo[] = shuffle(orderedBrandLogos);
