import React, { useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export type FaqItem = {
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    question: "What areas does InfraQo service?",
    answer:
      "InfraQo serves Denver, Colorado Springs, the Front Range, and Eastern Colorado, with statewide remote support available for ongoing IT, monitoring, and troubleshooting needs.",
  },
  {
    question: "Do you work with residential clients?",
    answer:
      "Yes. We support residential clients with installations, troubleshooting, cable management and clean-ups, network upgrades, managed services, and security system installs.",
  },
  {
    question: "Are estimates free?",
    answer:
      "Absolutely. Estimates and initial consultations are always free. No pressure, no commitments—just clear answers and honest guidance.",
  },
  {
    question: "Do I need to know exactly what I want before reaching out?",
    answer:
      "No. Start with the problem—slow Wi-Fi, cameras down, messy racks—and we’ll help define a scope that fits your space and budget.",
  },
  {
    question: "Do you only install certain brands of equipment?",
    answer:
      "No. We have preferred vendors based on reliability and support, but we can design around existing hardware or help you evaluate when an upgrade makes sense.",
  },
  {
    question: "Can you work around business hours or guest traffic?",
    answer:
      "Yes. We regularly schedule work during off-hours or slower periods to minimize impact on operations, guests, or customers.",
  },
  {
    question: "Is InfraQo a good fit for small businesses?",
    answer:
      "Yes. Many of our projects are for single-site businesses, professional practices, restaurants, and small teams that still need enterprise-grade stability.",
  },
  {
    question: "What types of projects do you take on?",
    answer:
      "We handle everything from small clean-ups and upgrades to full structured cabling, network redesigns, camera systems, and multi-site standardization.",
  },
];

const WhyInfraQoFaq: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className={`bg-slate-100 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="my-10 w-full h-[10px] bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900" />
      <div className="pt-12 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Common Questions
          </h2>
          <p className="mt-3 text-slate-600">
            A quick look at how we work, where we operate, and what you can
            expect.
          </p>
          <div className="mt-4 mx-auto w-20 h-1 bg-blue-600" />
        </div>

        <div className="bg-white/90 shadow-md border border-slate-200 px-4 py-4 sm:px-6 sm:py-6">
          <div className="space-y-3">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.question}
                  className={`border transition-colors ${
                    isOpen
                      ? "border-blue-700 bg-slate-50"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(index)}
                    className="w-full flex items-center justify-between px-4 py-4 text-left"
                  >
                    <span
                      className={
                        isOpen
                          ? "text-blue-700 font-semibold"
                          : "text-slate-900 font-semibold"
                      }
                    >
                      {item.question}
                    </span>
                    <span
                      className={`ml-4 transition-transform ${
                        isOpen ? "rotate-90 text-blue-700" : "text-slate-400"
                      }`}
                    >
                      ▸
                    </span>
                  </button>

                  <div
                    className={`px-4 text-sm text-slate-700 transition-[max-height,opacity,padding] duration-300 overflow-hidden ${
                      isOpen
                        ? "max-h-96 pb-4 opacity-100"
                        : "max-h-0 opacity-0 pb-0"
                    }`}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyInfraQoFaq;