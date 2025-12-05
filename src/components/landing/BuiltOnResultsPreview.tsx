import React from "react";
import CtaButton from "../ui/CtaButton";
import CardUnderline from "../ui/CardUnderline";

type ResultCard = {
  tag: string;
  title: string;
  description: string;
};

const results: ResultCard[] = [
  {
    tag: "Restaurant & Hospitality",
    title: "Weekend rush without system crashes",
    description:
      "From dropped tickets and offline POS to smooth, stable operations at peak volume.",
  },
  {
    tag: "Healthcare",
    title: "Fast, secure access to patient data.",
    description:
      "Redesigned clinic networks for speed, segregation, and compliance-minded security.",
  },
  {
    tag: "Multi-site Retail",
    title: "Visibility & control across locations.",
    description:
      "Upgraded cameras and infrastructure so you can see inventory, staff, and customers in real time.",
  },
];

const BuiltOnResultsPreview: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Built on measurable results.
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl">
              Every project is engineered around uptime, performance, and user
              clarity. Your clarity. We document what we do and track the impact
              so you see system improvements, not just new hardware.
            </p>
          </div>

          {/* CTA */}
          <CtaButton to="/case-studies">View case studies</CtaButton>
        </div>

        {/* RESULTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((card) => (
            <div
              key={card.tag}
              className="group bg-white border border-slate-300 pt-4 pb-6 px-6 shadow-sm hover:border-blue-500 hover:shadow-lg relative overflow-hidden"
            >
              <div className="relative">
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-widest">
                  {card.tag}
                </p>

                <p className="mt-2 text-base font-bold text-slate-900 uppercase tracking-widest">
                  {card.title}
                </p>

                <p className="mt-3 text-sm text-slate-700">
                  {card.description}
                </p>
              </div>

              <CardUnderline />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltOnResultsPreview;
