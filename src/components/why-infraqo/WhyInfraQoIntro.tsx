import React from "react";

const WhyInfraQoIntro: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Built for Reliability. Designed Around You.
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          InfraQo exists for one reason: to make your technology invisible. When your 
          network, cabling, cameras, or systems slow down, disconnect, or fail, your 
          entire day derails. Whether you&apos;re managing a business or keeping your 
          home running smoothly, the cost and frustration is real — lost productivity, 
          missed orders, dissatisfied customers, or a house full of devices all 
          fighting for bandwidth. We eliminate those problems at the source.
        </p>

        <div className="mt-4 mx-auto w-24 h-1 bg-blue-600" />
      </div>
    </section>
  );
};

export default WhyInfraQoIntro;