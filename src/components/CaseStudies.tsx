import React, { useState, useEffect, useRef } from "react";
import type { CaseStudy, Testimonial } from "../types";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

// --- Metrics icons ---

const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="square"
      strokeLinejoin="miter"
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z"
    />
  </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="square"
      strokeLinejoin="miter"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const BriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="square" strokeLinejoin="miter" d="M3 8h18v11H3V8z" />
    <path strokeLinecap="square" strokeLinejoin="miter" d="M8 8V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v3" />
  </svg>
);

// --- Metrics ---

const metricsData = [
  { value: 99, unit: "%", label: "Uptime Reliability", icon: ShieldCheckIcon },
  { value: 60, unit: " min", label: "Response Time for Managed Clients", icon: ClockIcon },
  { value: 55, unit: "+ years", label: "Combined Experience Delivering Business Solutions", icon: BriefcaseIcon },
];

const CountUp: React.FC<{ target: number; duration?: number }> = ({ target, duration = 1000 }) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const progress = timestamp - startTimeRef.current;
      const pct = Math.min(progress / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 2);

      setCount(Math.floor(eased * target));

      if (pct < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => frameRef.current && cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return <>{count}</>;
};

// --- Case study data ---

const caseStudiesData: CaseStudy[] = [
  {
    client: "Oak & Ember Bistro",
    industry: "Restaurant & Hospitality",
    problem:
      "Frequent Wi-Fi outages and POS failures during peak service, causing lost revenue and guest frustration.",
    solution:
      "Enterprise Wi-Fi redesign, structured cabling cleanup, and dedicated POS segmentation.",
    result: "+40% Transaction Speed | 100% Network Uptime | -95% Support Calls",
  },
  {
    client: "Veridian Dental Clinic",
    industry: "Healthcare",
    problem:
      "Slow, unreliable access to digital patient records and imaging, creating bottlenecks and compliance concerns.",
    solution:
      "High-speed segmented network, enhanced firewall rules, and secure backup alignment with HIPAA.",
    result: "HIPAA Compliant | Instant Record Access | Zero Data Breaches",
  },
  {
    client: "Main Street Retail Co.",
    industry: "Retail",
    problem:
      "Outdated cameras with blind spots, no remote monitoring, and legacy POS inventory mismatches.",
    solution:
      "4K IP cameras, cloud access, and modern POS integration.",
    result: "-35% Inventory Shrinkage | Remote Monitoring | Faster Checkout",
  },
];

// --- Testimonials data (moved from Testimonials.tsx) ---

const testimonialsData: Testimonial[] = [
  {
    quote:
      "InfraQo is not an IT vendor; they are a strategic partner. Their proactive approach means we solve problems before they impact our business. The peace of mind is invaluable.",
    name: "Dr. Alistair Finch",
    company: "Finch Chiropractic Clinic",
    industry: "Healthcare",
  },
  {
    quote:
      "The network stability and POS system they installed has been a game-changer for our restaurant. Our weekend rushes are finally smooth. The investment paid for itself in three months.",
    name: "Maria Flores",
    company: "La Serena Cocina",
    industry: "Hospitality",
  },
  {
    quote:
      "As a multi-location retail business, uptime is everything. InfraQo's managed services have given us 100% reliability across all our stores. Their response time is incredible.",
    name: "Brian Chen",
    company: "Urban Supply Co.",
    industry: "Retail",
  },
];

const CaseStudies: React.FC = () => {
  // Always start this page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Case studies visibility
  const caseRef = useRef<HTMLElement>(null);
  const caseVisible = useIntersectionObserver(caseRef, { threshold: 0.1 });

  // Metrics visibility / trigger
  const metricsRef = useRef<HTMLElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => setMetricsVisible(entry.isIntersecting), {
      threshold: 0.3,
    });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Testimonials slider (moved over from Testimonials.tsx)
  const testimonialsSectionRef = useRef<HTMLElement>(null);
  const testimonialsVisible = useIntersectionObserver(testimonialsSectionRef, { threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        ),
      7000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <main>
      {/* TOP SECTION — Performance Snapshots */}
      <section
        id="casestudies"
        ref={caseRef}
        className={`py-20 bg-slate-100 transition-all duration-700 ease-out ${
          caseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Performance Snapshots
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Real-world problems, engineered solutions, and measurable results.
            </p>
            <div className="mt-4 mx-auto w-24 h-1 bg-blue-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudiesData.map((study, i) => (
              <div key={i} className="border border-slate-300 bg-white p-6 flex flex-col">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                  {study.industry}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {study.client}
                </h3>

                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900">Problem:</p>
                    <p>{study.problem}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Solution:</p>
                    <p>{study.solution}</p>
                  </div>
                </div>

                <p className="mt-4 pt-4 text-xs font-semibold text-blue-700 border-t border-slate-200">
                  Result: {study.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section
        ref={metricsRef}
        className="py-16 bg-slate-950"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-5xl mx-auto border border-slate-800 bg-slate-900 shadow-[0_25px_80px_rgba(15,23,42,0.95)] px-8 py-10 md:py-12 transform transition-all duration-500 ${
              metricsVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center md:text-left">
              {metricsData.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className="flex flex-col items-center md:items-start">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <Icon className="w-8 h-8 text-blue-400" />
                      <div className="flex items-baseline gap-1 text-white font-bold tracking-tight">
                        <span className="text-3xl md:text-4xl">
                          {metricsVisible ? <CountUp target={metric.value} /> : 0}
                        </span>
                        <span className="text-xl md:text-2xl">{metric.unit}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs md:text-sm font-semibold uppercase tracking-widest text-slate-300">
                      {metric.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        ref={testimonialsSectionRef}
        className={`py-20 bg-slate-100 transition-all duration-700 ease-out ${
          testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted By Businesses Like Yours
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We build long-term partnerships grounded in reliability and results.
            </p>
            <div className="mt-4 mx-auto w-24 h-1 bg-blue-600"></div>
          </div>

          <div
            className="max-w-4xl mx-auto relative"
            onMouseEnter={() => resetTimeout()}
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => nextSlide(), 7000);
            }}
          >
            <div className="relative h-80 overflow-hidden">
              {testimonialsData.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <figure>
                      <blockquote className="text-2xl font-semibold text-slate-800 italic">
                        <p>"{testimonial.quote}"</p>
                      </blockquote>
                      <figcaption className="mt-6">
                        <p className="text-lg font-bold text-slate-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {testimonial.company} /{" "}
                          <span className="font-semibold text-blue-700">
                            {testimonial.industry}
                          </span>
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 md:-left-16 transform -translate-y-1/2 p-2 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 md:-right-16 transform -translate-y-1/2 p-2 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 border-2 border-slate-400 transition-colors ${
                    index === currentIndex ? "bg-slate-700 border-slate-700" : "bg-transparent"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudies;
