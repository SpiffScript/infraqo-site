import React from "react";
import ServiceCards from "./services/ServiceCards";
import ServiceDomains from "./services/ServiceDomains";
import ServiceContent from "./services/ServiceContent";
import NextStepsSidebar from "./services/NextStepsSidebar";
import ServicesCta from "./services/ServicesCta";
import SidebarCta from "./services/SidebarCta";
import LogoMarquee from "./services/LogoMarquee";

const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="relative py-20 bg-slate-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            One Partner. Complete Solutions.
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            From installation to ongoing uptime management, we provide a single,
            reliable solution for your entire business infrastructure.
          </p>
          <div className="mt-4 mx-auto w-24 h-1 bg-blue-600" />
        </div>

        <ServiceCards />

        <ServicesCta />

        <LogoMarquee />

        <div className="mt-0 lg:grid lg:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <ServiceContent />
            <ServiceDomains />
          </div>

          <div className="mt-12 lg:mt-0 space-y-8">
            
        <NextStepsSidebar />
            
        <SidebarCta />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
