import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-16">
      <div className="relative max-w-3xl w-full text-center">
        <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center">
          <span className="text-9xl font-semibold tracking-tight text-slate-700/10">
            Qo
          </span>
        </div>

        <div className="relative bg-slate-900/70 border border-slate-800/80 px-8 py-10 shadow-xl backdrop-blur">
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-500" />

          <p className="text-sm font-mono uppercase tracking-[0.3em] text-blue-300/70 mb-3">
            Error 404<br/>
            Got lost eh??
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
            Well hell… that's not supposed to happen.
          </h1>

          <p className="text-base sm:text-lg text-slate-300/90 mb-4">
            Look at that! You've found a page that doesn't even exist. Which is wild, because we
            triple-check everything around here too. It's like finding the ‘server room’ 
            is just a $49 router on top of the break room fridge. 
          </p>

          <p className="text-sm sm:text-base text-slate-400 mb-8">
            Maybe the link broke. Maybe the internet hiccuped. Maybe one of our
            cables was not labeled correctly... ya right. That would never happen.<br/>
            Either way, let us get you back where things actually make sense.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-slate-50 bg-blue-500/90 hover:bg-blue-500 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 
              shadow-[0_0_18px_rgba(59,130,246,0.7)] transition"
            >
              Take me home
            </a>

            <a
              href="/services"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-slate-100 border border-slate-600 bg-slate-900/60 hover:bg-slate-800/80 hover:border-blue-400 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 
              shadow-[0_0_18px_rgba(15,23,42,0.8)] transition"
            >
              View services
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-blue-300 border border-blue-500/60 bg-slate-900/40 hover:bg-blue-500/10 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 
              shadow-[0_0_18px_rgba(59,130,246,0.7)] transition"
            >
              Contact support
            </a>
          </div>

          <p className="mt-8 text-xs sm:text-sm text-slate-500">
            If you're seeing this, don't worry: The internet still works.
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
