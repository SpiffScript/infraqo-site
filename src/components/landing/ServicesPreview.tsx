import React from "react";
import CtaButton from "../ui/CtaButton";
import CardUnderline from "../ui/CardUnderline";

type ServicePreviewCard = {
  title: string;
  description: string;
  bulletPoints: string[];
};

const services: ServicePreviewCard[] = [
  {
    title: "Business Networks & Wi-Fi",
    description:
      "Reliable wired and wireless networks for offices, restaurants, clinics, and retail spaces.",
    bulletPoints: [
      "Structured network design",
      "Segmented POS and guest networks",
      "Proactive troubleshooting and cleanup",
    ],
  },
  {
    title: "Cloud-based Video Security",
    description:
      "4K IP cameras, clean installs, and secure remote access so you see what matters when it matters.",
    bulletPoints: [
      "Coverage planning and placement",
      "Cloud or on-premise recording",
      "Clean cable routing and labeling",
    ],
  },
  {
    title: "Structured Cabling & Cleanup",
    description:
      "From new construction pulls to “fix what the last contractor left,” we bring order to the chaos.",
    bulletPoints: [
      "New drops and retrofit work",
      "Rack buildouts and re-terminations",
      "Documented, labeled, and verified",
    ],
  },
];

const ServicesPreview: React.FC = () => {
  return (
    <section className="py-16 border-t border-slate-200 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              One Partner. Complete Solutions.
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl">
              Cabling, networking, cameras, and support under one roof. InfraQo
              designs and maintains the infrastructure your business and home
              depend on every day.
            </p>
          </div>

          <CtaButton to="/services">Explore services</CtaButton>
        </div>

        {/* SERVICE PREVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white border border-slate-300 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-lg relative overflow-hidden"
            >
              <div className="pt-4 pb-6 px-6">
                <h3 className="text-xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm text-slate-700">
                  {service.description}
                </p>

                <ul className="mt-3 text-sm space-y-1">
                  {service.bulletPoints.map((point) => (
                    <li
                      key={point}
                      className="service-line flex items-center gap-2"
                    >
                      <span className="service-dot h-1.5 w-1.5 rounded-full bg-slate-400 transition-all duration-200" />
                      <span className="service-text transition-all duration-200">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <CardUnderline />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
