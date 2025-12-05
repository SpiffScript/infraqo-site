import React from "react";

const WhyInfraQoGrid: React.FC = () => {
  return (
    <section className="mb-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Card 1 */}
        <div className="group relative bg-slate-50 p-6 h-full overflow-hidden border border-slate-200 transition-all hover:border-blue-500 hover:shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900">A Better Standard of Work</h3>
          <p className="mt-4 text-slate-600">
            Most failures with technology aren&apos;t caused by the equipment — they&apos;re caused by 
            how it was installed or maintained. We take a different approach:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            <li>Structured, labeled, and documented installs</li>
            <li>Clean cable management</li>
            <li>Enterprise-grade gear configured correctly</li>
            <li>Security-minded network design</li>
            <li>A focus on uptime and long-term performance</li>
          </ul>
          <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-0 group-hover:w-full transition-all duration-500" />
        </div>

        {/* Card 2 */}
        <div className="group relative bg-slate-50 p-6 h-full overflow-hidden border border-slate-200 transition-all hover:border-blue-500 hover:shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900">One Partner – Complete Solutions</h3>
          <p className="mt-4 text-slate-600">
            Miscommunication and split responsibilities create broken systems. InfraQo gives 
            you one dedicated partner who installs and supports the environment as a unified system.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            <li>Structured cabling</li>
            <li>Network installation &amp; Wi-Fi design</li>
            <li>Security cameras</li>
            <li>Managed IT support</li>
            <li>POS + device setup</li>
          </ul>
          <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-0 group-hover:w-full transition-all duration-500" />
        </div>

        {/* Card 3 */}
        <div className="group relative bg-slate-50 p-6 h-full overflow-hidden border border-slate-200 transition-all hover:border-blue-500 hover:shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900">Clear ROI for Businesses</h3>
          <p className="mt-4 text-slate-600">
            Technology isn&apos;t the expense — downtime is. We design systems that reduce lost sales, 
            slowdowns, and customer frustration.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            <li>Fewer outages &amp; slowdowns</li>
            <li>More reliable POS + systems</li>
            <li>Lower security risk</li>
            <li>Lower long-term maintenance costs</li>
          </ul>
          <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-0 group-hover:w-full transition-all duration-500" />
        </div>

        {/* Card 4 */}
        <div className="group relative bg-slate-50 p-6 h-full overflow-hidden border border-slate-200 transition-all hover:border-blue-500 hover:shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900">Peace of Mind for Homeowners</h3>
          <p className="mt-4 text-slate-600">
            Smart devices, cameras, and Wi-Fi should simply work. We design home systems 
            that stay connected and reliable.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            <li>Whole-home Wi-Fi coverage</li>
            <li>4K camera systems you can trust</li>
            <li>Smart devices that stay online</li>
            <li>Clean, professional installs</li>
          </ul>
          <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-0 group-hover:w-full transition-all duration-500" />
        </div>

      </div>
    </section>
  );
};

export default WhyInfraQoGrid;