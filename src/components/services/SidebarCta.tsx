import React from "react";
import CtaButton from "../ui/CtaButton";

const SidebarCta: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white p-6 border border-slate-800 shadow-xl shadow-slate-900/20 w-[115%] -ml-6">
      <h3 className="text-xl font-semibold leading-tight">
        Have a project coming up?
      </h3>

      <p className="mt-3 text-sm text-slate-300 leading-relaxed">
        Whether it’s cabling, Wi-Fi, cameras, or a complete infrastructure
        refresh, InfraQo helps you build it cleanly, correctly, and ready for
        the long term.
      </p>

      <div className="mt-7 flex flex-col gap-3">
        <CtaButton href="#contact" variant="glow" className="w-full">
            Start Your Project
        </CtaButton>

        <CtaButton href="tel:7205154843" variant="glow" className="w-full">
            Call (720) 515-4843
        </CtaButton>
        </div>
    </div>
  );
};

export default SidebarCta;
