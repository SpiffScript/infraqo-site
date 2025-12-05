import React from "react";
import Hero from "./landing/Hero";
import ServicesPreview from "./landing/ServicesPreview";
import WhyInfraQoPreview from "./landing/WhyInfraQoPreview";
import BuiltOnResultsPreview from "./landing/BuiltOnResultsPreview";
import TrustedByTeamsPreview from "./landing/TrustedByTeamsPreview";
import FaqPreview from "./landing/FaqPreview";
import FinalCtaPreview from "./landing/FinalCtaPreview";

const LandingPage: React.FC = () => {
  return (
    <main className="bg-slate-100 text-slate-900">
      {/* Hero */}
      <Hero />

      {/* SERVICES PREVIEW */}
      <ServicesPreview />

      {/* WHY INFRAQO PREVIEW */}
      <WhyInfraQoPreview />

      {/* GRADIENT DIVIDER LINE */}
      <div className="mt-6 mb-7 w-full h-[8px] bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900" />

      {/* BUILT ON RESULTS PREVIEW */}
      <BuiltOnResultsPreview />

      {/* TRUSTED BY TEAMS PREVIEW */}
      <TrustedByTeamsPreview />

      {/* FINAL CTA PREVIEW */}
      <FinalCtaPreview />

      {/* FAQ PREVIEW */}
      <FaqPreview />
    </main>
  );
};

export default LandingPage;
