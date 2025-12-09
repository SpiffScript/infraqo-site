import React from "react";

const steps = [
  {
    label: "Discovery",
    text: "We start with a focused conversation about your sites, pain points, and priorities so we understand what actually matters to your business.",
  },
  {
    label: "Site Assessment",
    text: "We review your existing setup or walk the space in person, mapping out cabling, equipment, and constraints so recommendations match reality.",
  },
  {
    label: "Clear Recommendations",
    text: "You'll see straightforward options, costs, and trade-offs in plain language. No jargon, no surprise line items, and no pressure to overspend.",
  },
  {
    label: "Project Scheduling",
    text: "Together we lock in scope, timeline, and access details so work is scheduled around your operations, not the other way around.",
  },
  {
    label: "Installation & Verification",
    text: "We execute the plan, label and document your architecture, including verification of performance so your network is stable, supportable, and ready for what's next.",
  },
  {
    label: "Documentation & Handoff",
    text: "We deliver labeling, diagrams, and any reference documentation you need so your network is clear, maintainable, and fully yours.",
  },
  {
    label: "Ongoing Support",
    text: "We stay available after the install – handling updates, tuning, and support so your network remains stable, fast, and straightforward to manage.",
  },
];

const NextStepsSidebar: React.FC = () => {
  return (
    <aside className="mt-12 hidden lg:block">
      <div className="bg-slate-50 border border-slate-200 px-10 py-12 w-[115%] -ml-6">

        {/* Header */}
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 text-center">
          Next Steps
        </h2>
        <p className="mt-4 text-base text-slate-600 text-center max-w-sm mx-auto">
          A simple, predictable path from first conversation to a clean, stable install.
        </p>

        {/* Steps */}
        <ol className="mt-12 space-y-14">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className="grid grid-cols-[20px_1fr] gap-x-4"
            >
              {/* Left spine column */}
              <div className="flex flex-col items-center">
                {index !== 0 && (
                  <div className="flex-1 w-px bg-slate-200" />
                )}

                {/* Stylized DOT */}
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

              {/* Text column */}
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
