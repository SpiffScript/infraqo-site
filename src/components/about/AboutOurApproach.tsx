import React from "react";
import CardUnderline from "../ui/CardUnderline";
import FramedCard from "../ui/FramedCard";

const AboutWhyWeExist: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-blue-600 uppercase">
            Why we exist
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Built for long-term reliability.
          </h2>
          <CardUnderline />

          <p className="mt-3 text-slate-600">
            Most low-voltage and network projects are scoped around getting a
            site online as quickly as possible. That’s when shortcuts show up:
            unlabeled cables, messy racks, and no documentation. When the tech
            walks out the door, you’re left with a job that “works” but is
            painful to live with and expensive to fix later.
          </p>

          <p className="mt-3 text-slate-600">
            InfraQo was created to be the opposite of that. We care about cable
            paths, hardware choices, labeling, and documentation because those
            details are what keep a network stable and supportable five years
            from now, not just on the day it goes live.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FramedCard className="p-6 bg-white border border-slate-300">
            <h3 className="text-xl font-bold text-slate-900">
              Clean, predictable installs
            </h3>
            <CardUnderline />
            <p className="mt-3 text-sm text-slate-700">
              Thoughtful cable routing, tidy racks, and consistent labeling on
              every project. Easier for us to support today, and easier for you
              or another partner to maintain down the road.
            </p>
          </FramedCard>

          <FramedCard className="p-6 bg-white border border-slate-300">
            <h3 className="text-xl font-bold text-slate-900">
              Documentation that actually exists
            </h3>
            <CardUnderline />
            <p className="mt-3 text-sm text-slate-700">
              Diagrams, photos, and notes that match what was installed. When
              something breaks, you’re not starting from scratch or guessing at
              what’s in the walls or ceiling.
            </p>
          </FramedCard>

          <FramedCard className="p-6 bg-white border border-slate-300">
            <h3 className="text-xl font-bold text-slate-900">
              Support beyond “go live”
            </h3>
            <CardUnderline />
            <p className="mt-3 text-sm text-slate-700">
              InfraQo is built around ongoing relationships: proactive checks,
              remote monitoring options, and a clear path for future phases as
              your needs change or your footprint grows.
            </p>
          </FramedCard>
        </div>
      </div>
    </section>
  );
};

export default AboutWhyWeExist;