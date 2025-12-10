import React from "react";
import CtaButton from "../ui/CtaButton";
import FramedCard from "../ui/FramedCard";
import JustinPhoto from "../../assets/about/infraqo-founder.png"; 
import InfraQoMark from "../../assets/icons/icon-qo-light.svg";

const AboutIntro: React.FC = () => {
  return (
    <section className="relative py-16 lg:py-20 bg-slate-100 overflow-hidden">
      
      <img
      src={InfraQoMark}
      alt=""
      className="
        pointer-events-none
        absolute
        opacity-[0.06]
        left-[43%]
        bottom-[0.25rem]
        w-[480px]
        md:w-[560px]
        lg:w-[620px]
        select-none
      "
      style={{ zIndex: 1 }}
    />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center relative z-10">
        
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-blue-600 uppercase">
            About InfraQo
          </p>

          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            A network company built by operators,<br/>not a help desk.
          </h1>

          <p className="mt-3 text-slate-600 max-w-2xl">
            Started by local folks who have lived on the other side of the radio 
            for years — running hotels, restaurants, and multi-site teams where 
            downtime isn’t an annoyance, it’s lost revenue and angry guests — we 
            understand the pressure small and mid-sized operators face. That same 
            operations-first mindset now drives how we deliver structured cabling 
            installs, network stability, and camera systems across the state.
          </p>

          <p className="mt-3 text-slate-600 max-w-2xl">
            InfraQo was built with an understanding: success is in the details. 
            We lead with clean work, clear communication, and support that stays 
            consistent long after the install is finished. Too many small 
            businesses are treated as targets for upsells instead of partners in 
            success. We reject that completely. Our job is simple: stabilize your 
            environment, protect your operations, and make sure your network 
            becomes one less thing competing for your attention.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CtaButton to="/contact">Schedule a walkthrough</CtaButton>

            <span className="text-sm text-slate-600">
              Or{" "}
              <a
                href="/services"
                className="underline decoration-blue-500/70 underline-offset-4 hover:text-blue-700"
              >
                see what we can help with
              </a>
            </span>
          </div>
        </div>

        <div className="max-w-md md:justify-self-end w-full relative z-10">
          <FramedCard className="p-4">
            <div className="border border-slate-200 bg-white p-0 overflow-hidden h-96 sm:h-[26rem] rounded-md">
              <img
                src={JustinPhoto}
                alt="InfraQo founder"
                className="w-full h-full object-center opacity-80 select-none"
                draggable={false}
              />
            </div>
          </FramedCard>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
