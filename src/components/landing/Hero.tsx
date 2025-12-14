import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CtaButton from "../ui/CtaButton";

const headlines = [
  "Solving Your Operational Headaches.",
  "Protecting Your Business Uptime.",
  "Delivering Measurable ROI.",
  "Engineered For Your Peace of Mind."
];

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % headlines.length);
        setFade(true);
      }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/9224680/pexels-photo-9224680.jpeg')"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/40 to-transparent"></div>

      <div className="relative z-10 text-center px-4 mb-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter">
          <span
            className={
              ctaHovered
                ? "block text-blue-400 uppercase drop-shadow-[0_0_18px_rgba(96,165,250,0.85)]"
                : "block text-blue-400 uppercase drop-shadow-[0_0_8px_rgba(96,165,250,0.45)]"
            }
          >
            IT SUPPORT
          </span>
          <span className="block mt-2 text-white">
            Like your revenue depends on it.
          </span>
        </h1>


        <div className="h-12 md:h-16 mt-10 overflow-hidden">
          <div
            className={`transition-all duration-500 ease-in-out ${
              fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <p className="text-xl md:text-3xl text-slate-200">
              {headlines[index]}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          >
            <CtaButton to="/services" variant="glow">
              Find Your Solution
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
