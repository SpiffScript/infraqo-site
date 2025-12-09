import React from "react";
import FramedCard from "../ui/FramedCard";
import CtaButton from "../ui/CtaButton";
import SwitchImg from "../../assets/images/services/infraqo-network-switch-install.jpg";

const TrustedByTeamsPreview: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 md:items-start">
          {/* LEFT: STATIC IMAGE WITH MATCHING LIGHT FRAME */}
          <div className="md:w-1/2">
            <FramedCard className="p-4">
              <div className="border border-slate-200 p-2 bg-white flex-1">
                <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[26rem] overflow-hidden bg-slate-950">
                  <img
                    src={SwitchImg}
                    alt="Network switch installation"
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </FramedCard>
          </div>

          {/* RIGHT: TEXT + QUOTE + CTA */}
          <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Trusted by teams who cannot afford downtime.
            </h2>

            <p className="mt-4 text-slate-600">
              Disconnection doesn’t just slow things down — it breaks the rhythm
              of your day. InfraQo is here to solve your connectivity challenges
              so you can focus on what matters.
              <span className="block mt-2 font-semibold text-slate-900">
                Learn to take your internet connection for granted again.
              </span>
            </p>

            <div className="mt-8 bg-white border border-slate-300 pt-4 pb-6 px-6 shadow-sm">
              <p className="text-slate-800 text-base md:text-lg italic">
                "The network stability and POS system they installed has been a
                game-changer for our restaurant."
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                Maria Flores, La Serena Cocina
              </p>
            </div>

            <CtaButton to="/services" className="mt-6">
              See How We Can Help
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByTeamsPreview;