import React from "react";
import CtaButton from "../ui/CtaButton";

const WhyInfraQoFinalCta: React.FC = () => {
  return (
    <section className="pt-16 pb-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
          When real life depends on it. Network reliability, delivered.
        </p>

        <p className="mt-3 text-slate-600">
          We build every project with the mindset that someone relies on this
          working. With InfraQo, you're never alone when it matters most.
        </p>

        <p className="mt-6 inline-block font-semibold text-slate-900 hover:text-blue-700 transition">
          Ready to take control of your technology stack?
        </p>

        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
          <CtaButton
            href="tel:+17205154843"
            variant= ""
            className="min-w-[11rem]"
          >
            Call or Text
          </CtaButton>

          <CtaButton
            href="mailto:support@infraqo.com"
            variant= ""
            className="min-w-[11rem]"
          >
            Email
          </CtaButton>

          <CtaButton to="/contact" className="min-w-[11rem]">
            Just browsing
          </CtaButton>
        </div>
      </div>
    </section>
  );
};

export default WhyInfraQoFinalCta;
