import React from "react";
import HeroSolutions from "./solutions/HeroSolutions";
import SolutionPlans from "./solutions/SolutionPlans";
import SolutionsSummary from "./solutions/SolutionsSummary";

export default function Solutions() {
  return (
    <main className="w-full bg-slate-950">
      <HeroSolutions />

      <SolutionPlans />

      <SolutionsSummary />
    </main>
  );
}
