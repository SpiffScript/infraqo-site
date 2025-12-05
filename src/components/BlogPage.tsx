import React from "react";
import { Link } from "react-router-dom";
import QoMark from "../assets/icons/icon-qo-light.svg"; // watermark only

const BlogPage: React.FC = () => {
  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen pb-28">
      <section className="pt-28 pb-24 relative overflow-hidden">
        {/* Watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
          <img
            src={QoMark}
            alt="InfraQo watermark"
            className="max-w-xs md:max-w-md"
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* LABEL */}
          <div className="max-w-5xl mx-auto mb-10">
            <p className="text-xs font-semibold tracking-wide text-blue-400 uppercase text-left">
              InfraQo Blog
            </p>
          </div>

          {/* HEADER */}
          <div className="max-w-5xl mx-auto mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-50">
              Articles that focus on reliability, uptime, and clear decision-making.
            </h1>
            <p className="mt-4 text-slate-300 text-base md:text-lg">
              Welcome to the dark side. We are building out practical guides, case studies, and breakdowns
              of real-world infrastructure problems: cabling, cameras, Wi-Fi,
              and the operational decisions behind them.
            </p>
          </div>

          {/* PLACEHOLDER CONTENT */}
          <div className="max-w-5xl mx-auto mb-10">
            <div className="border border-slate-700 bg-slate-900/70 rounded-none p-6">
              <p className="text-sm font-semibold text-blue-300 uppercase tracking-widest mb-2">
                Coming soon
              </p>
              <p className="text-sm md:text-base text-slate-200">
                The first batch of InfraQo articles is in progress. In the
                meantime, if you have a specific question about your
                environment, we are happy to talk through it directly and give
                you a clear path forward.
              </p>
            </div>
          </div>

          {/* CTA ROW */}
          <div className="mt-10 max-w-5xl mx-auto text-center">
            <p className="text-base md:text-lg font-semibold text-slate-100">
              Need answers before the articles are live?
            </p>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:+17205154843"
                className="min-w-[11rem] inline-flex items-center justify-center rounded-none border-2 border-blue-600 bg-blue-600 px-5 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-sm transition-all duration-200 hover:bg-transparent hover:text-blue-400 hover:shadow-md"
              >
                Call or text
              </a>

              <a
                href="mailto:support@infraqo.com"
                className="min-w-[11rem] inline-flex items-center justify-center rounded-none border border-slate-500 bg-slate-900 px-5 py-3 text-sm font-bold uppercase tracking-widest text-slate-100 shadow-sm transition-all duration-200 hover:border-blue-600 hover:text-blue-400 hover:shadow-md"
              >
                Email
              </a>

              <Link
                to="/contact"
                className="min-w-[11rem] inline-flex items-center justify-center rounded-none border border-slate-500 bg-slate-900 px-5 py-3 text-sm font-bold uppercase tracking-widest text-slate-100 shadow-sm transition-all duration-200 hover:border-blue-600 hover:text-blue-400 hover:shadow-md"
              >
                Just browsing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
