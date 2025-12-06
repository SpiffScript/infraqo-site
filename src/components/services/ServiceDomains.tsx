// src/components/services/ServiceDomains.tsx
import React from "react";

import GoogleLogo from "../../assets/images/services/partners/google-workspace.svg";
import MicrosoftLogo from "../../assets/images/services/partners/microsoft-365.svg";

const ServiceDomains: React.FC = () => {
  return (
    <div className="w-full flex justify-center mt-12">
  <div className="bg-white w-full max-w-3xl mx-auto text-center py-6 shadow-lg border border-slate-200">
    <h3 className="text-2xl font-bold text-slate-900">
      Domain & Email Administration
    </h3>

    <p className="text-sm text-slate-500 mt-1">powered by,</p>

    <div className="mt-6 flex justify-center items-center gap-24">
      <img
        src={GoogleLogo}
        alt="Google Workspace"
        className="h-5 sm:h-5 md:h-7 lg:h-8 w-auto opacity-90"
      />
      <img
        src={MicrosoftLogo}
        alt="Microsoft"
        className="h-5 sm:h-5 md:h-7 lg:h-12 w-auto opacity-90"
      />
    </div>
  </div>
</div>
  );
};

export default ServiceDomains;
