import React from "react";
import { equipmentLogos } from "../../data/equipmentLogos";

/**
 * ----------------------------------------------------------------------------
 *  Logo Component
 * ----------------------------------------------------------------------------
 *  NOTE TO SELF:
 *
 *  The marquee animation keyframes are injected INLINE because the Cloudflare
 *  local build environment does NOT reliably process external @keyframes rules 
 *  in index.css or other imported CSS.
 *
 *  Without injecting this style block directly into the DOM, the animation
 *  property is applied but never executed. This inline <style> block ensures 
 *  the animation always exists at runtime, regardless of how Cloudflare processes 
 *  CSS.
 * ----------------------------------------------------------------------------
 */

const customMarqueeStyles = `
  @keyframes logo-marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Pause animation when hovering the marquee */
  .logo-marquee:hover .logo-track {
    animation-play-state: paused !important;
  }
`;

const LogoMarquee: React.FC = () => {
  return (
    <section className="py-12 bg-slate-100">
      {/* Inject required animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: customMarqueeStyles }} />

      <div className="w-full overflow-hidden">
        {/* Section Heading */}
        <div className="w-full flex flex-col items-center mb-12 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-500">
            You're in good company
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
            Deploying the best in computer infrastructure &amp; network security.
          </h2>
        </div>

        {/* Scrolling Logo Marquee */}
        <div className="logo-marquee">
          <div
            className="logo-track flex items-center gap-12 flex-nowrap whitespace-nowrap"
            style={{
              width: "max-content",                   // ensures track spans full content width
              animation: "logo-marquee 65s linear infinite",
              willChange: "transform",
            }}
          >
            {[...equipmentLogos, ...equipmentLogos].map((logo, idx) => (
              <div key={idx} className="flex items-center justify-center px-8">
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
