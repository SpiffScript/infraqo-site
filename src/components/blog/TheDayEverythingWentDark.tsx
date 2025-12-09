import React, { useEffect, useRef, useState } from "react";
import QoMark from "../../assets/icons/icon-qo-light.svg";
import JustinPhoto from "../../assets/about/infraqo-founder.png";
import CulpritImage from "../../assets/images/blog/theculprit.jpg";
import CtaButton from "../ui/CtaButton";

// Fade-in wrapper for sections
const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
};

// Fullscreen image modal for zoomed view
const ImageModal: React.FC<{
  src: string;
  alt: string;
  onClose: () => void;
}> = ({ src, alt, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out"
    onClick={onClose}
  >
    <img
      src={src}
      alt={alt}
      className="max-h-[90vh] max-w-[90vw] object-contain"
    />
  </div>
);

const TheDayEverythingWentDark: React.FC = () => {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <main className="relative bg-slate-950 text-slate-50">
      {/* Qo watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center opacity-15">
        <img
          src={QoMark}
          alt=""
          className="mt-32 h-80 w-80 select-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-10 border-b border-slate-800 pb-8">
            <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-blue-400 uppercase">
              Origin Story
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-50">
              The Day Everything Went Dark – and Why Infrastructure Became My
              Life’s Work
            </h1>
            <p className="mt-2 text-xs text-slate-400">
              Published December 9, 2025 · Approx. 8–10 minute read
            </p>

            <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)]">
              {/* Left: summary + author */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mt-6">
                  <img
                    src={JustinPhoto}
                    alt="Justin Burch"
                    className="h-10 w-10 rounded-full border border-slate-700 object-cover"
                  />
                  <div className="text-xs text-slate-300">
                    <p className="font-semibold">Justin Burch</p>
                    <p className="text-slate-400">Founder, InfraQo</p>
                  </div>
                </div>

                <p className="pt-8 text-sm text-slate-200">
                  Two hotels, one busy restaurant, and a nine-dollar switch
                  holding everything together. The day it failed changed how I
                  think about infrastructure forever.
                </p>

                <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-blue-400 uppercase">
                  Real incidents. Real operators. The very real cost when
                  infrastructure only gets attention when it breaks.
                </p>
              </div>

              {/* Right: jump links + share */}
              <div className="space-y-5 text-xs text-slate-400">
                <div>
                  <h2 className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-slate-500">
                    Jump to
                  </h2>
                  <nav className="mt-2 space-y-1">
                    <a
                      href="#hit-the-wall"
                      className="block hover:text-blue-400"
                    >
                      Fifteen Minutes Later, I Hit the Wall
                    </a>
                    <a href="#closets" className="block hover:text-blue-400">
                      The Closets Were a Disaster
                    </a>
                    <a
                      href="#culprit-switch"
                      className="block hover:text-blue-400"
                    >
                      The $9.99 Switch
                    </a>
                    <a
                      href="#stayed-late"
                      className="block hover:text-blue-400"
                    >
                      I Stayed Until 1 AM
                    </a>
                    <a
                      href="#something-changed"
                      className="block hover:text-blue-400"
                    >
                      Something in Me Changed
                    </a>
                    <a
                      href="#exact-scenario"
                      className="block hover:text-blue-400"
                    >
                      How Close Most Businesses Really Are
                    </a>
                  </nav>
                </div>

                <div>
                  <h2 className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-slate-500">
                    Share
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <a
                      href="https://www.linkedin.com/shareArticle?mini=true&url=https://infraqo.com/blog/the-day-everything-went-dark"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-[0.7rem] hover:border-blue-400 hover:text-blue-400"
                    >
                      in
                    </a>
                    <a
                      href="https://twitter.com/intent/tweet?url=https://infraqo.com/blog/the-day-everything-went-dark"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-[0.7rem] hover:border-blue-400 hover:text-blue-400"
                    >
                      x
                    </a>
                    <a
                      href="mailto:?subject=The Day Everything Went Dark — and Why Infrastructure Became My Life’s Work&body=Check out this article: https://infraqo.com/blog/the-day-everything-went-dark"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-[0.7rem] hover:border-blue-400 hover:text-blue-400"
                    >
                      @
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main article body */}
          <div className="space-y-12 text-slate-100 leading-relaxed">
            {/* Intro block */}
            <FadeInSection>
              <div className="space-y-4">
                <p>I still remember the sound before anything else.</p>
                <p>
                  If you’ve ever been inside a busy restaurant when the music
                  suddenly stops, you know the feeling. A wide-open room full of
                  voices, clattering plates, silverware hitting porcelain,
                  glasses tapping together – and nothing to smooth it out. It
                  hits your ears like someone dumping a sack of marbles across a
                  tile floor.
                </p>
                <p>
                  At first, I didn’t think much of it. Just an oddly long pause
                  between songs.
                </p>
                <p>Then everything started breaking.</p>
                <p>
                  It was a little after noon during a heavy lunch rush. I was
                  meeting with a food purveyor at my desk, talking through their new
                  beef label I wasn’t actually interested in buying. Normal day, 
                  normal operations – two well-known hotels and a full-service 
                  restaurant all running at full steam.
                </p>
                <p>And then the POS system froze.</p>
                <p>
                  Servers came up telling me orders weren’t hitting the kitchen.
                  Some tickets went through, others didn’t. The expo window
                  stalled. The kitchen went silent waiting for the next round of
                  orders that never arrived. I jumped up to troubleshoot, trying
                  to find the first thread to pull.
                </p>
                <p>
                  Before I could even get to a terminal, someone else ran up:
                  “Phones are down too.”
                </p>
                <p>
                  A minute later: “The fire alarm panel isn’t communicating –
                  the monitoring company’s calling. They want to know if they
                  should dispatch the fire department.”
                </p>
                <p>
                  That was the moment I knew – this wasn’t small. This wasn’t
                  “restart the router” territory. This was something much
                  bigger, and it was unfolding fast.
                </p>
              </div>
            </FadeInSection>

            {/* Fifteen Minutes Later, I Hit the Wall */}
            <FadeInSection>
              <section className="space-y-4">
                <div className="inline-block">
                  <h2
                    id="hit-the-wall"
                    className="mt-6 text-xl md:text-2xl font-semibold tracking-wider uppercase text-slate-100"
                  >
                    Fifteen Minutes Later, I Hit the Wall
                  </h2>
                  <div className="mt-2 h-[2px] w-16 bg-blue-500/80" />
                </div>

                <p>
                  The most chaotic moment came on the restaurant side. I had
                  three separate tables standing at the host station, each
                  trying to pay. We couldn’t process a single card. They didn’t
                  understand – “What do you mean you can’t take my payment?” –
                  and honestly, I didn’t blame them.
                </p>
                <p>
                  I had no choice but to let them leave. One after another. We
                  handed out handwritten receipts and hoped people would come
                  back.
                </p>
                <p>
                  Some lived out of state. One guy from Missouri looked right at
                  me and said, “I can’t come back and pay. I’m heading home.”
                </p>
                <p>
                  I smiled and said, “I get it.” On the outside I held it
                  together. Inside, my heart was hitching a ride in his
                  backseat.
                </p>
                <p>
                  On the hotel side, it was the same story. Guests trying to
                  check out, corporate accounts needing receipts, arrivals
                  waiting in the lobby. We couldn’t take payments, couldn’t
                  manage reservations, couldn’t settle folios. I checked guests
                  in knowing I might not see a dollar from the room that night.
                  Folks had reservations made weeks, sometimes months, in
                  advance. They planned this trip. They held up their end. Even
                  if we couldn’t charge them, it didn’t feel right to turn them
                  away.
                </p>
                <p>
                  At the same time, staff were looking at me for direction –
                  rightfully so – and I didn’t have answers. My job as a leader
                  is to put people in a position to succeed. That day, nobody
                  could succeed. Not the staff. Not the guests. Not me.
                </p>
                <p>
                  The fire department still showed up, quietly, after the
                  monitoring company relayed my message. They told me to start
                  fire-watch. Another problem stacked on top of everything else.
                </p>
                <p>And all of this was within the first fifteen minutes.</p>
              </section>
            </FadeInSection>

            {/* The Closets Were a Disaster */}
            <FadeInSection>
              <section className="space-y-4">
                <div className="inline-block">
                  <h2
                    id="closets"
                    className="mt-6 text-xl md:text-2xl font-semibold tracking-wider uppercase text-slate-100"
                  >
                    The Closets Were a Disaster
                  </h2>
                  <div className="mt-2 h-[2px] w-16 bg-blue-500/80" />
                </div>

                <p>
                  What made this whole thing even worse was how little
                  information existed.
                </p>
                <p>We had:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-200">
                  <li>no documentation</li>
                  <li>no diagrams</li>
                  <li>no map of what was connected to what</li>
                  <li>no understanding of which device did which job</li>
                  <li>no vendor to call</li>
                  <li>
                    and the original installer had gone out
                    of business, who knows how many years earlier
                  </li>
                </ul>
                <p>Whatever knowledge had once existed died with them.</p>
                <p>
                  The infrastructure closets were spread across the property –
                  two hotels and a large restaurant, three different locations. I
                  was sprinting back and forth trying to figure out where the
                  problem started. The rooms themselves were a mess. Switches
                  hanging off concrete pillars. Dust. Heat. Cables looped,
                  tangled, unlabeled, abandoned. Nothing standardized. Nothing
                  maintained. Nothing that made sense.
                </p>
                <p>
                  I’d open a closet, stare at the equipment, and think: “What
                  the hell am I even looking at? What’s supposed to be happening
                  here?”
                </p>
                <p>I felt helpless – and I hated that feeling.</p>
                <p>
                  I wasn’t blamed for the failure itself; I inherited the mess.
                  But I felt responsible for my people. My staff lost tips.
                  Guests were angry. Owners were bewildered. And I was standing
                  in the middle of it trying to hold the line.
                </p>
                <p>
                  I don’t get embarrassed easily. But that day? I was more than
                  embarrassed. Humiliated.
                </p>
              </section>
            </FadeInSection>

            {/* The Culprit: A $9.99 Switch */}
            <FadeInSection>
              <section className="space-y-4">
                <div className="inline-block">
                  <h2
                    id="culprit-switch"
                    className="mt-6 text-xl md:text-2xl font-semibold tracking-wider uppercase text-slate-100"
                  >
                    The Culprit: A $9.99 Switch... Controlling a Multi-Million
                    Dollar Business
                  </h2>
                  <div className="mt-2 h-[2px] w-16 bg-blue-500/80" />
                </div>

                {/* Framed, clickable image floated on the right */}
                <div
                  className="
                    float-none md:float-right
                    ml-0 md:ml-6
                    mb-4
                    w-full md:w-[260px]
                    border border-blue-500/80
                    bg-slate-950/80
                    p-2
                    cursor-zoom-in
                  "
                  onClick={() => setShowImageModal(true)}
                >
                  <img
                    src={CulpritImage}
                    alt="The four-port unmanaged switch that took down two hotels and a busy restaurant."
                    className="w-full object-cover select-none"
                    draggable={false}
                    />
                  <p className="mt-2 text-[0.7rem] text-slate-400">
                    The actual four-port unmanaged switch that took down two
                    hotels and a busy restaurant in the middle of lunch rush.
                  </p>
                </div>

                <p>
                  When the technician finally arrived, he walked into one of the
                  closets, stared at the rack, and said, “What is this thing?”
                </p>
                <p>
                  He pointed at a small, plain, plastic white box… a four-port
                  unmanaged TP-Link switch you could buy at Walmart for about
                  the same price as a hangover curing, Hot-N-Ready pizza.
                </p>
                <p>
                  No lights. No indicators. No data. No business being anywhere
                  near commercial infrastructure.
                </p>
                <p>
                  It had been daisy-chained through a couple other cheap
                  switches, quietly sitting at the root of almost everything.
                  And when it died, everything above it died with it… the
                  phones, the POS system, the servers, the cameras, the fire
                  panel connectivity, the whole operation.
                </p>
                <p>
                  A multi-million-dollar hospitality company was running on a
                  nine-dollar switch.
                </p>
                <p>If it wasn’t so painful, it would’ve been funny.</p>
              </section>
            </FadeInSection>

            {/* I Stayed Until 1am */}
            <FadeInSection>
              <section className="space-y-4 clear-both">
                <div className="inline-block">
                  <h2
                    id="stayed-late"
                    className="mt-6 text-xl md:text-2xl font-semibold tracking-wider uppercase text-slate-100"
                  >
                    I Stayed Until 1am
                  </h2>
                  <div className="mt-2 h-[2px] w-16 bg-blue-500/80" />
                </div>

                <p>
                  I remember staying until one in the morning trying anything I
                  could think of. Calling anyone who might know something.
                  Labeling what I could identify. Rebooting. Tracing.
                  Re-tracing. Trying to understand which building had partial
                  service through a third-party provider and which didn’t.
                </p>
                <p>
                  I hugged every staff member I could find before I left that
                  night. They went through it just as much as I did. Maybe more.
                </p>
                <p>
                  When I finally walked outside, I wasn’t relieved, I was
                  drained. Not from the hours, but from the weight of knowing we
                  still had a problem, and I was miles from a solution.
                </p>
                <p>
                  We lost thousands that day. I’ve never had the heart to
                  calculate the exact number.
                </p>
              </section>
            </FadeInSection>

            {/* That Night, Something in Me Changed */}
            <FadeInSection>
              <section className="space-y-4">
                <div className="inline-block">
                  <h2
                    id="something-changed"
                    className="mt-6 text-xl md:text-2xl font-semibold tracking-wider uppercase text-slate-100"
                  >
                    That Night, Something in Me Changed
                  </h2>
                  <div className="mt-2 h-[2px] w-16 bg-blue-500/80" />
                </div>

                <p>
                  After everything calmed down and I had a moment to think, I
                  made myself a promise.
                </p>
                <p>
                  I would never let this happen again. Not to me. Not to my
                  staff. Not to my business.
                </p>
                <p>
                  I didn’t have the budget to fix it overnight. I didn’t have
                  the tools or training yet. But I knew one thing: nobody was
                  coming to save us. No one in Denver cared enough to drive an
                  hour to help. No vendor knew our setup. No documentation
                  existed.
                </p>
                <p>So I started learning.</p>
                <p>
                  And over the next eight or nine months… nights, weekends,
                  between shifts and on days off, I rebuilt the entire network
                  while the business stayed open and operating.
                </p>
                <p>I tore out abandoned cables.</p>
                <p>Replaced cheap switches.</p>
                <p>Re-terminated lines.</p>
                <p>Ran new cable.</p>
                <p>Mapped the entire property.</p>
                <p>Designed new diagrams.</p>
                <p>Redid the POS network.</p>
                <p>Rebuilt the camera system.</p>
                <p>Corrected years of bad installs and indifferent attitudes.</p>
                <p>
                  Piece by piece, I rebuilt a system that made sense – something
                  stable, consistent, and reliable enough to handle the demands
                  of real business, day after day.
                </p>
                <p>And that infrastructure I built? It’s still running today.</p>
                <p>It hasn’t had a catastrophic failure since.</p>
              </section>
            </FadeInSection>

            {/* Most Small Businesses Don't Realize... */}
            <FadeInSection>
              <section className="space-y-4">
                <div className="inline-block">
                  <h2
                    id="exact-scenario"
                    className="mt-6 text-xl md:text-2xl font-semibold tracking-wider uppercase text-slate-100"
                  >
                    Most Small Businesses Don't Realize How Close They Are To
                    This Exact Scenario
                  </h2>
                  <div className="mt-2 h-[2px] w-16 bg-blue-500/80" />
                </div>

                <p>
                  When I look back now, I don’t think of that day as a fluke. I
                  think of it as typical.
                </p>
                <p>
                  Most small businesses don’t truly understand how fragile their
                  network is; how one cheap piece of equipment, one bad cable
                  run, one abandoned switch, one poorly installed panel, can
                  bring their entire operation to its knees.
                </p>
                <p>
                  And even worse, most operators don’t know what they don’t
                  know. They don’t know where their equipment is, what it does,
                  what’s critical, or who installed it. They just hope
                  everything works until the day it doesn’t.
                </p>
                <p>That’s why I started InfraQo.</p>
                <p>
                  Because I’ve lived the reality of standing in the middle of a
                  storm without a map. I’ve lived the helplessness of watching
                  customers walk out because I couldn’t take their payment. I’ve
                  lived the embarrassment of not having the right answers for my
                  staff, my company, and my customers when they needed me most.
                </p>
                <p>
                  And I’ve lived the relief of building a system the right way –
                  clean, documented, labeled, stable, and built for actual
                  business operations.
                </p>
                <p>
                  No small business owner should have to find out how important
                  infrastructure is in the middle of a crisis. I did, and it
                  changed my life.
                </p>
                <p>
                  If this sounds familiar – if your closets look like a pile of
                  unlabeled cables, random devices, and equipment you can’t
                  explain or if you’re one pin-drop away from your own,
                  terribly expensive bad day, let’s talk. I can help you avoid
                  the version of this story you don’t want to live through.
                </p>
              </section>
            </FadeInSection>
          </div>

          {/* CTA at the bottom of the post */}
          <div className="mt-12 border-t border-slate-800 pt-8">
            <p className="text-sm text-center text-slate-300 mb-4">
              Want help avoiding a failure like this in your own environment?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <CtaButton
                href="tel:+17205154843"
                variant="glow"
                className="min-w-[11rem]"
              >
                Call or Text
              </CtaButton>
              <CtaButton
                href="mailto:support@infraqo.com"
                variant="glow"
                className="min-w-[11rem]"
              >
                Email
              </CtaButton>
              <CtaButton
                to="/contact"
                variant="dark"
                className="min-w-[11rem]"
              >
                On-Site Review
              </CtaButton>
            </div>
          </div>
        </article>
      </div>

      {/* Zoomed image modal */}
      {showImageModal && (
        <ImageModal
          src={CulpritImage}
          alt="The four-port unmanaged switch that took down two hotels and a busy restaurant."
          onClose={() => setShowImageModal(false)}
        />
      )}
    </main>
  );
};

export default TheDayEverythingWentDark;
