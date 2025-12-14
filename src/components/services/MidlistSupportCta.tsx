import React from "react";
import CtaButton from "../ui/CtaButton";

const MidlistSupportCta: React.FC = () => {
  return (
    <div className="mt-12 mb-6">
      <div className="bg-slate-900 text-slate-50 px-6 py-6 w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="max-w-3xl">
            <p className="text-4xl font-extrabold tracking-tight text-slate-50 text-center">
              Stability is your scaling engine.
            </p>

            <p className="mt-2 text-sm md:text-base text-slate-200">
                When your systems don’t work, neither do you. We understand what&apos;s at stake.
                <span className="block mt-1">
                    SolutionsQo converts reactive expense into intentional ROI.
                </span>
                </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <CtaButton
              href="tel:+17205154843"
              variant="blue"
              className="min-w-[11rem]"
            >
              TotalQo
            </CtaButton>

            <CtaButton
              href="mailto:support@infraqo.com"
              variant="blue"
              className="min-w-[11rem]"
            >
              PriorityQo
            </CtaButton>

            <CtaButton to="/contact"
              variant="blue"
              className="min-w-[11rem]"
            >
              Learn More
            </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidlistSupportCta;
