import React, { useEffect, useMemo, useRef, useState } from "react";
import CheckIcon from "../ui/CheckIcon";

type IndustryTickerProps = {
  title?: string;
  subtitle?: string;
  items?: string[];
  className?: string;
  speedSeconds?: number;
};

const defaultItems = [
  "Bars & Restaurants",
  "Medical & Dental Offices",
  "Mechanic Shops & Service Centers",
  "Salons & Spas",
  "High-Demand Home Offices",
  "Daycares & Childcare Centers",
  "Pet Boarding & Kennels",
  "Accounting & Financial Firms",
  "Real Estate & Title Offices",
  "Boutiques & Specialty Retail",
  "Gyms & Fitness Studios",
  "Non-Profits & Community Centers",
  "Hybrid Teams & Distributed Workforces",
  "Small Offices & Mixed-Use Spaces",
  "Retail & POS Environments",
  "Any Business with Guest Wi-Fi",
];

const IndustryTicker: React.FC<IndustryTickerProps> = ({
  title = "Common environments we support",
  subtitle = "If flawless operational performance drives your top line, meet your new infrastructure standard.",
  items = defaultItems,
  className = "",
  speedSeconds = 26,
}) => {
  const loopItems = useMemo(() => [...items, ...items], [items]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    const listEl = listRef.current;
    if (!viewportEl || !listEl) return;

    const firstRow = listEl.firstElementChild as HTMLElement | null;
    const rowH = firstRow?.offsetHeight ?? 28;

    const originalCount = items.length;
    const halfHeight = originalCount * rowH; // scroll through one "set" because list is duplicated
    const pxPerMs = halfHeight / (speedSeconds * 1000);

    let raf = 0;
    let start = 0;
    let lastActive = -1;

    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;

      const offset = (elapsed * pxPerMs) % halfHeight;
      listEl.style.transform = `translateY(-${offset}px)`;

      const viewportH = viewportEl.clientHeight;
      const centerY = offset + viewportH / 2;

      const idx = Math.round((centerY - rowH / 2) / rowH);
      const normalized = ((idx % loopItems.length) + loopItems.length) % loopItems.length;

      if (normalized !== lastActive) {
        lastActive = normalized;
        setActiveIndex(normalized);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [items.length, loopItems.length, speedSeconds]);

  return (
    <div
      className={[
        "border border-slate-800/70 bg-slate-950/90",
        "shadow-[0_14px_40px_rgba(0,0,0,0.45)]",
        className,
      ].join(" ")}
    >
      <div className="px-5 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400">
          {title}
        </p>
        <p className="mt-2 text-sm text-slate-300">{subtitle}</p>

        <div className="mt-4 relative overflow-hidden border border-slate-800 bg-slate-950/40">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-slate-950/95 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/95 to-transparent z-10" />

          <div ref={viewportRef} className="h-36">
            <div ref={listRef} className="will-change-transform">
              {loopItems.map((label, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={`${label}-${idx}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-200 transition-transform duration-150 ease-out"
                    style={{
                      transform: isActive ? "scale(1.035)" : "scale(1)",
                    }}
                  >
                    <CheckIcon
                      className="h-4 w-4 text-emerald-500 transition-transform duration-150 ease-out"
                      style={{
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                      }}
                    />
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Any public-facing business relying on point-of-sale, high-traffic Wi-Fi, or any revenue-critical operating system.
        </p>
      </div>
    </div>
  );
};

export default IndustryTicker;
