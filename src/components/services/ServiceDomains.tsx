import React from "react";

const ServiceDomains: React.FC = () => {
  return (
    <div className="w-full flex justify-center mt-16">
  <div className="bg-white w-full max-w-3xl mx-auto text-center py-6 shadow-lg border border-slate-200">
    <h3 className="text-2xl font-bold text-slate-900">
      Domain & Email Administration
    </h3>

    <p className="text-sm text-slate-500 mt-1">powered by,</p>

    <div className="mt-6 flex justify-center items-center gap-24">
      <img
        src="/images/vendors/googleworkspace.svg"
        alt="Google Workspace"
        className="h-5 sm:h-5 md:h-7 lg:h-8 w-auto opacity-90"
      />
      <img
        src="/images/vendors/microsoft365.svg"
        alt="Microsoft"
        className="h-5 sm:h-5 md:h-7 lg:h-12 w-auto opacity-90"
      />
    </div>
  </div>
</div>
  );
};

export default ServiceDomains;
