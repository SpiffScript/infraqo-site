import React from "react";
import FramedCard from "../ui/FramedCard";
import CtaButton from "../ui/CtaButton";

// (We no longer need InfraQoMark)

type FaqPreviewItem = {
  question: string;
  answer: string;
};

type FlipFaqCardProps = {
  question: string;
  answer: string;
};

const FlipFaqCard: React.FC<FlipFaqCardProps> = ({ question, answer }) => {
  return (
    <div className="group relative cursor-pointer [perspective:1200px] h-20 sm:h-24">
      {/* The card that flips */}
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
        {/* FRONT – question only */}
        <div className="absolute inset-0 border border-slate-300 bg-white px-5 py-3 shadow-sm [backface-visibility:hidden] flex items-center">
          <p className="text-lg font-semibold text-slate-900">{question}</p>
        </div>

        {/* BACK – answer only */}
        <div className="absolute inset-0 border border-slate-900 bg-slate-900 px-5 py-3 shadow-sm [transform:rotateX(180deg)] [backface-visibility:hidden] flex items-center">
          <p className="text-base text-slate-100">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const faqPreviewData: FaqPreviewItem[] = [
  {
    question: "What areas does InfraQo service?",
    answer:
      "InfraQo serves Denver, Colorado Springs, the Front Range, and Eastern Colorado, with statewide remote support available for ongoing IT, monitoring, and troubleshooting needs.",
  },
  {
    question: "Do you work with residential clients?",
    answer:
      "Yes. We support residential clients with installations, troubleshooting, cable management and clean-ups, network upgrades, managed services, and security system installs.",
  },
  {
    question: "Are estimates free?",
    answer:
      "Absolutely. Estimates and initial consultations are always free. No pressure. No commitments. Just clear answers and honest guidance.",
  },
  {
    question: "Do I need to know exactly what I want before reaching out?",
    answer:
      "Nope. Start with the problem—slow Wi-Fi, cameras down, messy racks—and we’ll help define a scope that fits your space and budget.",
  },
];

const FaqPreview: React.FC = () => {
  // Reuse your embed URL
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1572137.66255602!2d-104.22034294999999!3d39.681630549999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a1072f14d4311bb%3A0x5fcd31b7ca6e0bed!2sInfraQo!5e0!3m2!1sen!2sus!4v1764882412927!5m2!1sen!2sus";

  // Convert the embed URL into a proper Maps link with your pin + business panel
  const viewInMaps = mapSrc.replace("/embed?", "/?");

  return (
    <section className="py-16 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1.2fr] gap-8 items-start">
          {/* LEFT: HEADER + FLIP CARDS */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Common questions, clear results.
            </h2>
            <p className="mt-2 text-slate-600">
              Not sure where to start or whether your project is a fit? These
              cover most of what people ask us first.
            </p>

            <div className="mt-6 space-y-4">
              {faqPreviewData.map((item) => (
                <FlipFaqCard
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>

            <div className="mt-6">
              <CtaButton to="/why-infraqo#common-questions">
                View full FAQ
              </CtaButton>
            </div>
          </div>

          {/* RIGHT: MAP EMBED */}
          <div className="lg:self-center">
            <FramedCard className="p-4 h-full">
              <div className="border border-slate-200 bg-white flex flex-col">

                {/* MAP */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] lg:aspect-[16/9] overflow-hidden">
                  <iframe
                    src={mapSrc}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* SERVICE AREA */}
                <p className="text-xs text-slate-600 font-medium mt-3 px-3 text-center">
                  On-site coverage for Denver • Colorado Springs • Front Range • Eastern Colorado
                </p>
              </div>
            </FramedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqPreview;
