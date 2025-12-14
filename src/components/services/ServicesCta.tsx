import React from "react";
import CtaButton from "../ui/CtaButton";

const ServicesCTA: React.FC = () => {
  return (
    <div className="mt-12 bg-slate-900 px-8 py-10 text-white flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">
          Ready to plan your next project?
        </h3>
        <p className="mt-2 text-slate-300 max-w-xl">
          Whether you&apos;re cleaning up an old network, building out a new
          space, or looking for a long-term support partner, InfraQo can help
          you design a solution that holds up over time.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <CtaButton href="#contact" variant="blue">
          Let&apos;s Talk
        </CtaButton>

        <CtaButton href="tel:17205154843" variant="blue">
          Call (720) 515-4843
        </CtaButton>
      </div>
    </div>
  );
};

export default ServicesCTA;
