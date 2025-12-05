import React from "react";
import CardUnderline from "../ui/CardUnderline";
import CtaButton from "../ui/CtaButton";

const AboutHowWeWork: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Left: process */}
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-blue-600 uppercase">
            How we work
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Straightforward scopes. No surprises.
          </h2>
          <CardUnderline />

          <p className="mt-3 text-slate-600">
            Every engagement starts with a quick conversation and a walkthrough
            – onsite or virtual – to understand your current environment and
            where it breaks. From there, we prioritize what matters most:
            reliability, coverage, security, or scalability. You get a clear
            scope, a realistic timeline, and pricing that lines up with what we
            actually do on site.
          </p>

          <ul className="mt-4 text-sm text-slate-700 space-y-2 list-disc list-inside">
            <li>Honest recommendations – even if the answer is “do less.”</li>
            <li>Respect for operating hours, guests, and customers.</li>
            <li>Coordination with other trades when the job calls for it.</li>
            <li>A single point of contact instead of a rotating cast.</li>
          </ul>

          <div className="mt-8">
            <CtaButton to="/contact">Talk through a project</CtaButton>
          </div>
        </div>

        {/* Right: fit card */}
        <div className="lg:pl-4">
          <div className="bg-white border border-slate-300 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Who we’re a good fit for
            </h3>
            <p className="mt-3 text-sm text-slate-700">
              InfraQo is designed for teams who care about uptime and
              presentation just as much as cost. If you’re trying to make your
              network invisible – it just works, and nobody has to think about
              it – we are probably a good match.
            </p>

            <ul className="mt-4 text-sm text-slate-700 space-y-2 list-disc list-inside">
              <li>Multi-site businesses that need consistency.</li>
              <li>Restaurants, hospitality, and retail with live guests.</li>
              <li>
                Offices and professional practices that can’t afford flaky WiFi.
              </li>
              <li>
                Homeowners who want strong, stable coverage without equipment
                clutter.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHowWeWork;