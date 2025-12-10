import React from "react";
import { Link } from "react-router-dom";
import QoMark from "../assets/icons/icon-qo-light.svg";
import CtaButtonRow from "./ui/CtaButtonRow";

const BlogPage: React.FC = () => {
  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen pb-28">
      <section className="pt-28 pb-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
          <img
            src={QoMark}
            alt="InfraQo watermark"
            className="max-w-xs md:max-w-md"
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-10">
              <p className="text-xs font-semibold tracking-wide text-blue-400 uppercase">
                InfraQo Blog
              </p>
              <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-50">
                Stories from the wiring closet
              </h1>
              <p className="mt-4 text-sm md:text-base text-slate-300 max-w-4xl">
                Real incidents, real operators, and the very real cost of
                infrastructure that only gets attention when it breaks.
              </p>
            </header>

            <div className="space-y-6">
              <article className="border border-slate-700/70 bg-slate-900/60 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-sm hover:border-blue-500/70 transition-colors duration-200">
                <p className="text-xs uppercase tracking-wide text-blue-400">
                  Origin Story
                </p>
                <h2 className="mt-2 text-xl md:text-2xl font-semibold text-slate-50">
                  <Link
                    to="/blog/the-day-everything-went-dark"
                    className="hover:text-blue-400 transition-colors"
                  >
                    The Day Everything Went Dark — and Why Infrastructure Became
                    My Life’s Work
                  </Link>
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Approx. 8–10 minute read
                </p>
                <p className="mt-3 text-sm md:text-base text-slate-300">
                  Two hotels, one busy restaurant, and a nine-dollar switch
                  holding everything together. The day it failed changed how I
                  think about infrastructure forever.
                </p>
                
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <Link
                    to="/blog/the-day-everything-went-dark"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Read the full story
                  </Link>
                  <Link
                    to="/blog/the-day-everything-went-dark"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Continue reading →
                  </Link>
                </div>
              </article>
            </div>

            <CtaButtonRow
              headline="Need answers before the rest of the articles are live?"
              actions={[
                {
                  label: "Call or Text",
                  href: "tel:+17205154843",
                  variant: "glow",
                },
                {
                  label: "Email",
                  href: "mailto:support@infraqo.com",
                  variant: "glow",
                },
                {
                  label: "Just Browsing",
                  to: "/contact",
                  variant: "dark",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
