import React from "react";

import IndustryTicker from "./IndustryTicker";
import SolutionsComparison from "./SolutionsComparison";
import CtaButtonRow from "../ui/CtaButtonRow";

export default function HeroSolutions() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="max-w-[50rem] lg:ml-6">
              <p className="text-xs tracking-[0.28em] text-sky-400 font-semibold">
                SOLUTIONSQO
              </p>

              <h1 className="mt-3 text-4xl sm:text-4xl lg:text-4xl font-extrabold text-slate-50 leading-tight">
                Reliability, Delivered.
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-200/90 leading-relaxed">
                Downtime isn’t an inconvenience – it's margin erosion, stalled teams, and revenue lost{" "}
                <span className="italic">right now</span>.
                We treat your environment like it’s tied to your top line, because it is. Our defense starts
                before the problem. SolutionsQo isn’t about reacting to tickets or checking boxes. It’s about
                proactive stability, fast, informed decision-making, and support that behaves like an operational
                partner who truly understands your profitability.
                <a
                  href="#request-consultation"
                  className="font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  {" "}We do.
                </a>
              </p>

              <p className="mt-3 text-xs text-slate-400">
                SupportQo by InfraQo. Built by operators, for operators.
              </p>
              <div className="mt-8 max-w-[48rem]">
                <div className="mt-8 max-w-[48rem] pl-16">
                  <CtaButtonRow
                    align="left"
                    actions={[
                      { label: "View Services", href: "/services", variant: "dark" },
                      { label: "Get Started", to: "/contact", variant: "dark" },
                    ]}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="hidden lg:block lg:col-span-5">
            <div className="ml-auto w-full max-w-[420px]">
              <IndustryTicker />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <SolutionsComparison />
        </div>
      </div>
    </section>
  );
}
