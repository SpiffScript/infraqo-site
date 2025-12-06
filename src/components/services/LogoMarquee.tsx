import React from "react";
import { equipmentLogos } from "../../data/equipmentLogos";

const LogoMarquee: React.FC = () => {
  return (
    <section className="py-12 bg-slate-100">
      <div className="w-full overflow-hidden">
        {/* Heading */}
        <div className="w-full flex flex-col items-center mb-12 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-500">
            You're in good company
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
            Deploying the best in computer infrastructure &amp; network security.
          </h2>
        </div>

        {/* Scrolling logo track */}
        <div className="logo-marquee">
          <div className="logo-track flex items-center gap-16 flex-nowrap">
            {[...equipmentLogos, ...equipmentLogos].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center px-8"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
