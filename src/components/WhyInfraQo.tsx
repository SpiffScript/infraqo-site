import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import WhyInfraQoIntro from "./why-infraqo/WhyInfraQoIntro";
import WhyInfraQoGrid from "./why-infraqo/WhyInfraQoGrid";
import WhyInfraQoFinalCta from "./why-infraqo/WhyInfraQoFinalCta";
import WhyInfraQoFaq from "./why-infraqo/WhyInfraQoFaq";

const WhyInfraQoPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // No hash in the URL → always go to the very top
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    // Hash present → scroll to that element if it exists
    const id = hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [hash]);

  return (
    <main className="bg-white text-slate-900">
      {/* explicit top anchor so /why-infraqo#top also works cleanly */}
      <div id="top" />

      <WhyInfraQoIntro />

      <WhyInfraQoGrid />

      <WhyInfraQoFinalCta />

      <WhyInfraQoFaq />
    </main>
  );
};

export default WhyInfraQoPage;