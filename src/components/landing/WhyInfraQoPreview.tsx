import React from "react";
import FramedCard from "../ui/FramedCard";
import CtaButton from "../ui/CtaButton";
import CardUnderline from "../ui/CardUnderline";
import SecureLockImg from "../../assets/images/landing-carousel/infraqo-secure-network-lock.jpg";

const WhyInfraQoSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Why teams choose InfraQo.
            </h2>
            <p className="mt-3 text-slate-600">
              Most technology issues come from how things were installed and
              maintained, not the equipment itself. We focus on clean design,
              structured installs, and long-term reliability instead of
              band-aid fixes.
            </p>

            <ul className="mt-4 text-sm text-slate-800 space-y-2 list-disc list-inside">
              <li className="transition-all duration-200 hover:text-blue-700 hover:font-semibold hover:scale-[1.03]">
                Structured, labeled, and documented work
              </li>
              <li className="transition-all duration-200 hover:text-blue-700 hover:font-semibold hover:scale-[1.03]">
                One accountable partner across cabling, networking, and
                security
              </li>
              <li className="transition-all duration-200 hover:text-blue-700 hover:font-semibold hover:scale-[1.03]">
                Design choices made with uptime and ROI in mind
              </li>
            </ul>
          </div>

          {/* DARK PANEL */}
          <div className="group relative overflow-hidden bg-slate-950 text-slate-50 border border-slate-900 p-6 flex flex-col shadow-sm">
            <p className="inline-block text-2xl font-bold text-blue-400 transform origin-left transition-all duration-200 group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.65)]">
              Real-world Impact
            </p>

            <p className="mt-2 text-slate-300">
              Whether you're running a restaurant during a weekend rush, a
              clinic with live patient data, or a home full of smart devices, we
              treat your environment like it’s our own.
            </p>

            <CtaButton to="/why-infraqo" variant="dark" className="mt-5">
              Learn more about our approach
            </CtaButton>

            <CardUnderline />
          </div>
        </div>

        {/* IMAGE CARD WITH BLUE UNDERLINE */}
        <FramedCard className="p-4">
          <div className="border border-slate-200 p-2 bg-white flex-1">
            <img
              src={SecureLockImg}
              alt="Secure network and protected systems"
              className="w-full h-full object-cover"
            />
          </div>
        </FramedCard>
      </div>
    </section>
  );
};

export default WhyInfraQoSection;