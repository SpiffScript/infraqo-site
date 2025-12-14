import React from "react";

const SolutionsSummary: React.FC = () => {
  return (
    <section className="mt-8 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2">
          <div className="border border-slate-800/70 bg-slate-950/50 p-6">
            <h3 className="text-base font-semibold text-slate-50">
              Projects & Ongoing Support: Engineered for Predictability.
            </h3>
            <p className="mt-3 text-sm text-slate-400/90">
              Most providers force a choice: one-off installs or rigid, bloated contracts.
              InfraQo is purpose-built for operators who demand both clean, accountable
              project work and guaranteed, predictable support.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400/90 list-disc pl-5">
              <li>One-time cabling, Wi-Fi, camera, or network installs</li>
              <li>Layer on TotalQo or PriorityQo when ready</li>
              <li>Documentation, uptime, and accountability under one roof</li>
            </ul>
          </div>

          <div className="border border-slate-800/70 bg-slate-950/90 p-6">
            <h3 className="text-base font-semibold text-slate-50">
              Why SolutionsQo Exists: Formalizing Accountability
            </h3>
            <p className="mt-3 text-sm text-slate-400/90">
              A good install is only half the story. The rest is who manages issues,
              how changes are controlled, and who ensures long-term stability.
            </p>
            <p className="mt-3 text-sm text-slate-400/90">
              InfraQo formalizes accountability through defined response times, rigorous
              process, and forward-looking planning – so you always know exactly what
              "done right" looks like, even at 2 PM on a Friday.
            </p>
            <p className="mt-3 text-sm text-sky-400">
              With InfraQo, success is in the details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSummary;
