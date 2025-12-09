import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Services from "./components/Services";
import WhyInfraQo from "./components/WhyInfraQo";
import ContactForm from "./components/ContactForm";
import CaseStudies from "./components/CaseStudies";
import About from "./components/About";
import Privacy from "./components/legal/Privacy";
import Terms from "./components/legal/Terms";
import AcceptableUse from "./components/legal/AcceptableUse";
import CareersPage from "./components/careers/Careers";
import NotFoundPage from "./NotFound";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

import BlogPage from "./components/BlogPage";
import TheDayEverythingWentDark from "./components/blog/TheDayEverythingWentDark";

//
// ────────────────────────────────────────────────────────────────────────────────
// TITLE MANAGER – Updates <title>, <meta>, and JSON-LD when route changes
// ────────────────────────────────────────────────────────────────────────────────
//
const TitleManager: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = "InfraQo";
    let description =
      "InfraQo provides structured cabling, IT support, and network infrastructure services across Colorado’s Front Range.";

    switch (pathname) {
      case "/":
        title =
          "InfraQo – Structured Cabling, IT Support & Network Infrastructure Services Across the Front Range";
        description =
          "InfraQo designs and installs structured cabling, Wi-Fi, security cameras, and managed IT support for businesses and homes along the Front Range. Clean work, clear communication, and networks built to last.";
        break;

      case "/services":
        title = "Services | InfraQo – Structured Cabling & IT Support";
        description =
          "Explore InfraQo’s services: structured cabling, networking and Wi-Fi, security cameras, managed IT support, and more.";
        break;

      case "/why-infraqo":
        title = "Why InfraQo | Engineered Network Reliability";
        description =
          "Learn why operators choose InfraQo: reliability, clean installs, and an operations-first mindset.";
        break;

      case "/case-studies":
        title = "Case Studies | InfraQo – Measurable Results";
        description = "See measurable improvements from real InfraQo projects.";
        break;

      case "/contact":
        title = "Contact InfraQo | Start Your Project";
        description =
          "Ready to stabilize your network, plan an install, or troubleshoot a problem?";
        break;

      case "/blog":
        title = "InfraQo Insights | Technical Guides & Network Tips";
        description =
          "Structured cabling insights, Wi-Fi design guides, and network reliability strategies.";
        break;

      case "/about":
        title = "About InfraQo | Our Mission & Experience";
        description =
          "InfraQo was founded by operators, not a help desk — bringing real-world multi-site experience to IT infrastructure.";
        break;

      case "/careers":
        title = "Careers | Join the InfraQo Team";
        description =
          "Share your details to be considered for future ops, field, or technical roles.";
        break;

      case "/privacy":
        title = "Privacy Policy | InfraQo";
        break;

      case "/terms":
        title = "Terms of Service | InfraQo";
        break;

      case "/acceptable-use":
        title = "Acceptable Use Policy | InfraQo";
        break;

      default:
        title = "404 | Page Not Found | InfraQo";
        description =
          "The page you're trying to reach doesn't exist. The internet still works — just not this link.";
        break;
    }

    document.title = title;

    let metaDesc = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }

    metaDesc.content = description;

    //
    // JSON-LD structured data (LocalBusiness)
    //
    const ldId = "infraqo-jsonld";
    let existingLd = document.getElementById(ldId) as HTMLScriptElement | null;

    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "InfraQo",
      url: "https://infraqo.com",
      telephone: "+1-720-515-4843",
      email: "support@infraqo.com",
      areaServed: "Colorado Front Range"
    };

    if (!existingLd) {
      existingLd = document.createElement("script");
      existingLd.id = ldId;
      existingLd.type = "application/ld+json";
      document.head.appendChild(existingLd);
    }

    existingLd.textContent = JSON.stringify(jsonLdData);
  }, [pathname]);

  return null;
};

//
// ────────────────────────────────────────────────────────────────────────────────
// SCROLL RESET
// ────────────────────────────────────────────────────────────────────────────────
//
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  return null;
};

//
// ────────────────────────────────────────────────────────────────────────────────
// REAL <App /> COMPONENT
// ────────────────────────────────────────────────────────────────────────────────
//
const App: React.FC = () => {
  
  //
  // Disable right-click ONLY on images (site-wide)
  //
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName.toLowerCase() === "img") {
        e.preventDefault(); // Prevent Save Image As, etc.
      }
    };

    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen">

      <TitleManager />
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/why-infraqo" element={<WhyInfraQo />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/blog" element={<BlogPage />} />

        {/* Blog Posts */}
        <Route
          path="/blog/the-day-everything-went-dark"
          element={<TheDayEverythingWentDark />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/acceptable-use" element={<AcceptableUse />} />
        <Route path="/careers" element={<CareersPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
