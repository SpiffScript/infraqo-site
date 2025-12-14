import React from "react";
import CtaButton from "../ui/CtaButton";
import CardUnderline from "../ui/CardUnderline";

const FinalCtaPreview: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-slate-950 text-slate-50 px-8 pt-7 pb-10 shadow-lg relative overflow-hidden group">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            <span className="block text-blue-400 transform transition-all duration-200 group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.65)]">
              When real life depends on it.
            </span>
            <span className="block text-slate-50">
              The cost of 'good enough' is never just price.
            </span>
          </h2>

          <p className="mt-4 text-slate-300">
            Your operational stability is too important for guesswork. Let's start the conversation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <CtaButton
              href="tel:+17205154843"
              variant="blue"
              className="min-w-[11rem]"
            >
              Call or Text
            </CtaButton>

            <CtaButton
              href="mailto:support@infraqo.com"
              variant="blue"
              className="min-w-[11rem]"
            >
              Email
            </CtaButton>

            <CtaButton to="/contact" variant="blue" className="min-w-[11rem]">
              Get Started
            </CtaButton>
          </div>

          <CardUnderline />
        </div>
      </div>
    </section>
  );
};

export default FinalCtaPreview;
