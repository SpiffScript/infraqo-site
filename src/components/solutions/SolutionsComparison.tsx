import React from "react";

const IconShieldCheck = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path
      d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 12.5l2.5 2.5 4.5-5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconShieldX = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path
      d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M9 9l6 6M15 9l-6 6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

type CompareRow = {
  label: string;
  mspText: string;
  totalText: string;
  priorityText: string;
};

const ROWS: CompareRow[] = [
  {
    label: "Support model",
    mspText: "Ticket-driven, queue-based",
    totalText: "Assigned environment, structured response",
    priorityText: "Strategic oversight, operator-led",
  },
  {
    label: "Who owns context",
    mspText: "Context lives in tickets",
    totalText: "Environment mapped & documented",
    priorityText: "Retained across systems & changes",
  },
  {
    label: "Response behavior",
    mspText: "Based on ticket priority",
    totalText: "Prioritized by operational impact",
    priorityText: "Treated as revenue risk",
  },
  {
    label: "Proactive work",
    mspText: "Mostly reactive",
    totalText: "Scheduled monitoring & maintenance",
    priorityText: "Continuous monitoring with intervention",
  },
  {
    label: "Change requests",
    mspText: "Scoped, quoted, scheduled separately",
    totalText: "Handled within normal workflow",
    priorityText: "Fast-tracked & coordinated",
  },
  {
    label: "On-site support",
    mspText: "Billable, availability-dependent",
    totalText: "Available when needed",
    priorityText: "Guaranteed preferred scheduling & rates",
  },
  {
    label: "After-hours situations",
    mspText: "Limited or premium emergency billing",
    totalText: "Optional, discounted coverage",
    priorityText: "Designed for revenue-critical operations",
  },
  {
    label: "Planning & reviews",
    mspText: "Reactive recommendations",
    totalText: "Periodic guidance as needed",
    priorityText: "Ongoing planning & risk review",
  },
  {
    label: "Billing posture",
    mspText: "Variable, ticket & rate driven",
    totalText: "Fixed, predictable monthly investment",
    priorityText: "All-inclusive, strategic risk management",
  },
  {
    label: "Relationship dynamic",
    mspText: "Vendor / client",
    totalText: "Support partner",
    priorityText: "Operational extension",
  },
];

export default function SolutionsComparison() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.28em] text-sky-400 font-semibold">
          COMPARISON
        </p>

        <h2 className="mt-2 text-xl sm:text-3xl font-extrabold text-slate-50">
          Choose Your Standard of Stability.
        </h2>

        <p className="mt-2 text-base text-slate-300/90 max-w-5xl">
          A transparent comparison of our strategic support models and the reactive cycle of the typical provider.
        </p>

        <div className="relative mt-6">
          <div className="pointer-events-none absolute -inset-6 rounded-xl bg-sky-500/10 blur-3xl opacity-95" />

          <div className="relative overflow-hidden border border-slate-800/70 bg-slate-950/90 shadow-[0_0_0_1px_rgba(59,130,246,0.06)]">
            <div className="overflow-x-auto">
              <div className="relative min-w-[980px]">
                <div className="pointer-events-none absolute inset-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-[24%] top-[82px] bottom-[36px] w-px bg-slate-800"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-[50%] top-[82px] bottom-[36px] w-px bg-slate-800"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute box-border left-[76%] right-[4px] top-[10px] bottom-[0px] border border-sky-400/35"
                  />
                </div>

                <table className="w-full min-w-[980px] table-fixed">
                  <colgroup>
                    <col style={{ width: "24%" }} />
                    <col style={{ width: "26%" }} />
                    <col style={{ width: "26%" }} />
                    <col style={{ width: "24%" }} />
                  </colgroup>

                  <thead>
                    <tr className="border-b border-slate-800/70 bg-slate-950/35">
                      <th className="px-6 py-4 text-left text-[11px] tracking-[0.22em] text-slate-400">
                        SUPPORT CATEGORY
                      </th>

                      <th className="px-6 py-4 text-center text-[11px] tracking-[0.22em] text-slate-400">
                        TYPICAL NATIONAL MSP
                      </th>

                      <th className="px-6 py-4 text-center text-[11px] tracking-[0.22em] text-slate-50">
                        TOTALQO
                      </th>

                      <th className="px-6 py-4 text-center text-[11px] tracking-[0.22em] text-sky-400">
                        PRIORITYQO
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {ROWS.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-slate-900/60 last:border-b-0"
                      >
                        <td className="px-6 py-5 text-sm font-semibold text-slate-100 whitespace-nowrap">
                          {row.label}
                        </td>

                        <td className="px-6 py-5 text-center align-middle">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <IconShieldX className="h-4 w-4 text-rose-400" />
                            <div className="text-xs text-slate-200/90 max-w-[220px]">
                              {row.mspText}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-center align-middle">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <IconShieldCheck className="h-4 w-4 text-slate-200" />
                            <div className="text-xs text-slate-200/90 max-w-[240px]">
                              {row.totalText}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-center align-middle">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <IconShieldCheck className="h-4 w-4 text-sky-400" />
                            <div className="text-xs text-slate-200/90 max-w-[260px]">
                              {row.priorityText}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-t border-slate-900/60 px-6 py-3 text-[11px] text-slate-500">
              Note: This table reflects our formalized operational structure and delivery methodology, not marketing claims.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
