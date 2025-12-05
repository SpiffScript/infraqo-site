// Equipment / vendor logos
import AcerLogo from "../assets/images/equipment/Acer-Inc-Logo.svg";
import AmdLogo from "../assets/images/equipment/Advanced-Micro-Devices-Logo.svg";
import AocLogo from "../assets/images/equipment/AOC-International-Logo.svg";
import ApcLogo from "../assets/images/equipment/APC-by-Schneider-Electric-Logo.svg";
import AppleLogo from "../assets/images/equipment/Apple-Inc-Logo.svg";
import AsusLogo from "../assets/images/equipment/Asus-Logo.svg";
import BenqLogo from "../assets/images/equipment/BenQ-Logo.svg";
import CiscoLogo from "../assets/images/equipment/Cisco-Systems-Logo.svg";
import DellLogo from "../assets/images/equipment/Dell-Logo.svg";
import FortinetLogo from "../assets/images/equipment/Fortinet-Logo.svg";
import FujitsuLogo from "../assets/images/equipment/Fujitsu-Logo.svg";
import IbmLogo from "../assets/images/equipment/IBM-Logo.svg";
import LinksysLogo from "../assets/images/equipment/Linksys-Logo.svg";
import NetgearLogo from "../assets/images/equipment/Netgear-Logo.svg";
import PaloAltoLogo from "../assets/images/equipment/Palo-Alto-Networks-Logo.svg";
import SeagateLogo from "../assets/images/equipment/Seagate-Technology-Logo.svg";
import TpLinkLogo from "../assets/images/equipment/TP-Link-Logo.svg";
import UbiquitiLogo from "../assets/images/equipment/Ubiquiti-Networks-Logo.svg";
import WesternDigitalLogo from "../assets/images/equipment/Western-Digital-Logo.svg";
import SamsungLogo from "../assets/images/equipment/Samsung-Logo.svg";
import BrotherLogo from "../assets/images/equipment/Brother-Logo.svg";
import HpEnterpriseLogo from "../assets/images/equipment/HP-Enterprise-Logo.svg";
import IntelLogo from "../assets/images/equipment/Intel-Logo.svg";
import LegrandLogo from "../assets/images/equipment/Legrand-Logo.svg";
import LenovoLogo from "../assets/images/equipment/Lenovo-Logo.svg";
import LGCorporationLogo from "../assets/images/equipment/LG-Corporation-Logo.svg";
import LogitechLogo from "../assets/images/equipment/Logitech-Logo.svg";
import SynologyLogo from "../assets/images/equipment/Synology-Logo.svg";
import ThinkPadLogo from "../assets/images/equipment/ThinkPad-Logo.svg";
import VivoLogo from "../assets/images/equipment/Vivo-Logo.svg";

const orderedLogos = [
  { src: AcerLogo, alt: "Acer" },
  { src: AmdLogo, alt: "Advanced Micro Devices (AMD)" },
  { src: AocLogo, alt: "AOC" },
  { src: ApcLogo, alt: "APC by Schneider Electric" },
  { src: AppleLogo, alt: "Apple" },
  { src: AsusLogo, alt: "Asus" },
  { src: BenqLogo, alt: "BenQ" },
  { src: CiscoLogo, alt: "Cisco Systems" },
  { src: DellLogo, alt: "Dell" },
  { src: FortinetLogo, alt: "Fortinet" },
  { src: FujitsuLogo, alt: "Fujitsu" },
  { src: IbmLogo, alt: "IBM" },
  { src: LinksysLogo, alt: "Linksys" },
  { src: NetgearLogo, alt: "Netgear" },
  { src: PaloAltoLogo, alt: "Palo Alto Networks" },
  { src: SeagateLogo, alt: "Seagate Technology" },
  { src: TpLinkLogo, alt: "TP-Link" },
  { src: UbiquitiLogo, alt: "Ubiquiti Networks" },
  { src: WesternDigitalLogo, alt: "Western Digital" },
  { src: SamsungLogo, alt: "Samsung" },
  { src: BrotherLogo, alt: "Brother" },
  { src: HpEnterpriseLogo, alt: "HP Enterprise" },
  { src: IntelLogo, alt: "Intel" },
  { src: LegrandLogo, alt: "Legrand" },
  { src: LenovoLogo, alt: "Lenovo" },
  { src: LGCorporationLogo, alt: "LG Corporation" },
  { src: LogitechLogo, alt: "Logitech" },
  { src: SynologyLogo, alt: "Synology" },
  { src: ThinkPadLogo, alt: "ThinkPad" },
  { src: VivoLogo, alt: "Vivo" },
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