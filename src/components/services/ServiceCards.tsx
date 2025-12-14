import React from "react";
import type { Service } from "../../types";
import {
  CableIcon,
  WifiIcon,
  SecurityCameraIcon,
  ManagedItIcon,
  PosIcon,
  InstallIcon,
  CybersecurityIcon,
  ConsultingIcon,
} from "../icons/ServiceIcons";

type ServiceWithTarget = Service & { targetId: string };

const servicesData: ServiceWithTarget[] = [
  {
    icon: CableIcon,
    title: "Structured Cabling",
    description:
      "Precision-engineered data and voice cabling for maximum network performance and reliability.",
    targetId: "structured-cabling",
  },
  {
    icon: WifiIcon,
    title: "Networking & Wi-Fi",
    description:
      "Robust, secure, and high-performance network solutions designed for seamless business operations.",
    targetId: "networking-wifi",
  },
  {
    icon: SecurityCameraIcon,
    title: "Security Cameras",
    description:
      "High-definition surveillance systems providing critical monitoring and asset protection.",
    targetId: "security-cameras",
  },
  {
    icon: ManagedItIcon,
    title: "Managed IT Support",
    description:
      "Proactive, comprehensive IT management to ensure your systems run at peak efficiency.",
    targetId: "managed-it-support",
  },
  {
    icon: PosIcon,
    title: "Point-of-Sale Systems",
    description:
      "Reliable POS solutions for retail and hospitality, ensuring smooth transactions and inventory management.",
    targetId: "point-of-sale",
  },
  {
    icon: InstallIcon,
    title: "Installations & Configuration",
    description:
      "Expert deployment and configuration of hardware and software, done right the first time.",
    targetId: "installations-configuration",
  },
  {
    icon: CybersecurityIcon,
    title: "Cybersecurity",
    description:
      "Multi-layered security strategies to protect your critical data from emerging threats.",
    targetId: "cybersecurity",
  },
  {
    icon: ConsultingIcon,
    title: "Operational Consulting",
    description:
      "Strategic guidance to optimize your technology infrastructure for business growth and ROI.",
    targetId: "operational-consulting",
  },
];

const HEADER_OFFSET = 96;
const smoothScrollTo = (targetY: number, duration = 500) => {
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetY - startY;
  const startTime = performance.now();

  const easeInOut = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeInOut(t);

    window.scrollTo(0, startY + distance * eased);

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const scrollToSection = (targetId: string) => {
  const el = document.getElementById(targetId);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const offsetTop = rect.top + scrollTop - HEADER_OFFSET;

  smoothScrollTo(offsetTop, 450);
};

const ServiceCard: React.FC<{ service: ServiceWithTarget }> = ({ service }) => {
  const Icon = service.icon;

  return (
    <button
      type="button"
      onClick={() => scrollToSection(service.targetId)}
      className="
        group block h-full text-left
        bg-white border border-slate-200
        p-6
        transition-all duration-300
        hover:border-blue-500 hover:shadow-lg
        relative overflow-hidden cursor-pointer
        appearance-none focus:outline-none
      "
    >
      <div className="relative h-12 w-12 text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
        <Icon />
      </div>

      <h3 className="mt-4 mb-2 text-xl font-bold text-slate-900">
        {service.title}
      </h3>

      <p className="text-sm text-slate-600">
        {service.description}
      </p>

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-500 ease-out group-hover:w-full" />
    </button>
  );
};

const ServiceCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-300">
      {servicesData.map((service) => (
        <ServiceCard key={service.title} service={service} />
      ))}
    </div>
  );
};

export default ServiceCards;
