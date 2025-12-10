import React from "react";

const ServiceAreaMapEmbed: React.FC = () => {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1584944.8888714286!2d-102.03092498020186!3d39.115678758142934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b80aa231f17cf%3A0x118ef4f8278a36d6!2sDenver%2C%20CO!5e0!3m2!1sen!2sus!4v1764881918539!5m2!1sen!2sus";

  return (
    <section
      id="service-area"
      className="w-full bg-slate-950/90 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold tracking-wide text-sky-400 uppercase">
            Service Area
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-slate-50">
            Based in Parker. Serving Colorado on-site.
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Most on-site work is focused on the Front Range, with project-based
            coverage available for the right installs. If you are close to the
            areas shown on this map, there is a good chance we can help.
          </p>
        </div>

        <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-xl shadow-sky-900/30 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-sky-500/20 blur-3xl opacity-70 pointer-events-none" />

          <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-xs font-medium tracking-wide text-sky-400 uppercase">
                  On-site coverage
                </p>
                <p className="text-sm text-slate-300">
                  Zoom and pan the map to see where we typically work.
                </p>
              </div>
              <a
                href={mapSrc.replace("/embed?", "/?")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-sky-500/70 bg-slate-950 px-3 py-1 text-xs font-medium text-sky-100 hover:bg-sky-500/10 transition-colors"
              >
                Open in Google Maps
              </a>
            </div>

            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <div className="aspect-[4/3] sm:aspect-[16/9]">
                <iframe
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Not sure if your address is in range? Send it with a quick note
              about your project and we will confirm availability before you
              commit to anything.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMapEmbed;
