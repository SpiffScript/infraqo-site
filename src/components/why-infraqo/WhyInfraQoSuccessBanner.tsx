import React, { useEffect, useState } from "react";

const WhyInfraQoSuccessBanner: React.FC = () => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [detailsText, setDetailsText] = useState("");

  useEffect(() => {
    const phrase = "is in the details.";
    let typeInterval: number | undefined;

    // Fade in "Success..." over a few seconds
    const fadeTimer = window.setTimeout(() => {
      setSuccessVisible(true);
    }, 200); // small delay before we start the fade

    // Start typing after a bit so they overlap nicely
    const typeTimer = window.setTimeout(() => {
      let i = 0;
      typeInterval = window.setInterval(() => {
        i += 1;
        setDetailsText(phrase.slice(0, i));
        if (i >= phrase.length && typeInterval !== undefined) {
          window.clearInterval(typeInterval);
        }
      }, 140); // adjust for how fast you want the typing
    }, 2200); // typing starts ~2.2s in

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(typeTimer);
      if (typeInterval !== undefined) {
        window.clearInterval(typeInterval);
      }
    };
  }, []);

  return (
    <section className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden bg-slate-900">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/9224680/pexels-photo-9224680.jpeg')", // swap this later if you want
        }}
      />

      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <p
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-blue-400 transition-opacity duration-[3500ms] ${
              successVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Success...
          </p>

          <p className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-50 min-h-[2.25rem] sm:min-h-[2.5rem]">
            {detailsText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyInfraQoSuccessBanner;
