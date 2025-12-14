import React from "react";

const steps = [
  {
    label: "Discovery",
    text: "We start with a focused conversation about your sites, pain points, and priorities. This ensures our solution is perfectly aligned with your immediate needs and long-term goals.",
  },
  {
    label: "Site Assessment",
    text: "We conduct an on-site or virtual review of your existing setup, mapping cabling, equipment, and physical constraints. This guarantees our technical recommendations match your environment's reality.",
  },
  {
    label: "Clear Recommendations",
    text: "You receive straightforward options, clear costs, and honest trade-offs presented in plain language. We guarantee no technical jargon, no surprise line items, and absolutely no pressure to overspend.",
  },
  {
    label: "Project Scheduling",
    text: "Together we lock in the final scope, timeline, and logistical access details. Our priority is scheduling the work around your core business operations, ensuring minimal downtime and disruption.",
  },
  {
    label: "Installation & Verification",
    text: "We execute the plan, provide you with a full systematic equipment inventory, document your architecture, and conduct rigorous performance verification. You enjoy a powerful new network that is stable, secure, and meticulously built to accelerate your business growth.",
  },
  {
    label: "Documentation & Handoff",
    text: "We provide you with comprehensive mapping, network diagrams, and key reference documentation. Your new network will be clear, fully maintainable, and completely owned by your team.",
  },
  {
    label: "Ongoing Support",
    text: "We remain available with ongoing support, system updates, and performance tuning. We ensure your network stays stable, protected, and lightning fast, long after the installation is complete.",
  },
];

const NextStepsSidebar: React.FC = () => {
  return (
    <aside className="mt-12 hidden lg:block">
      <div className="bg-slate-50 border border-slate-200 px-10 py-12 w-[115%] -ml-6">

        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 text-center">
          Concept to Completion
        </h2>
        <p className="mt-4 text-base text-slate-600 text-center max-w-sm mx-auto">
          Our 7-step system for transforming complex visions into a clear, stable reality.
        </p>

        <ol className="mt-12 space-y-14">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className="grid grid-cols-[20px_1fr] gap-x-4"
            >
              <div className="flex flex-col items-center">
                {index !== 0 && (
                  <div className="flex-1 w-px bg-slate-200" />
                )}

                <div
                  className={`
                    h-3.5 w-3.5 rounded-full
                    ${index === 0 || index === steps.length - 1 ? 'bg-blue-600' : 'bg-slate-500'}
                  `}
                ></div>

                {index !== steps.length - 1 && (
                  <div className="flex-1 w-px bg-slate-200" />
                )}
              </div>

              <div>
                <div className="text-2xl font-bold text-slate-900">
                  <span className="mr-2 text-blue-600 font-extrabold">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  {step.label}
                </div>

                <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-xs">
                  {step.text}
                </p>

                {index !== steps.length - 1 && (
                  <div className="mt-2 w-12 h-0.5 bg-blue-600" />
                )}
              </div>
            </li>
          ))}
        </ol>

      </div>
    </aside>
  );
};

export default NextStepsSidebar;
