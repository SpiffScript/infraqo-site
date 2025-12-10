import React from "react";
import CtaButton from "./CtaButton";

type ContactAction = {
  label: string;
  href?: string;
  to?: string;
  variant?: "light" | "dark" | "glow";
};

type CtaButtonRowProps = {
  headline: string;
  actions: ContactAction[];
  className?: string;
};

const CtaButtonRow: React.FC<CtaButtonRowProps> = ({
  headline,
  actions,
  className = "",
}) => {
  return (
    <section className={`mt-10 max-w-5xl mx-auto text-center ${className}`}>
      <p className="text-base md:text-lg font-semibold text-slate-100">
        {headline}
      </p>

      <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
        {actions.map((action, index) => (
          <CtaButton
            key={index}
            href={action.href}
            to={action.to}
            variant={action.variant ?? "dark"}
            className="min-w-[11rem]"
          >
            {action.label}
          </CtaButton>
        ))}
      </div>
    </section>
  );
};

export default CtaButtonRow;
