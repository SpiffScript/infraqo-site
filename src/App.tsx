import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import BlogPage from "./components/BlogPage";
import Services from "./components/Services";
import WhyInfraQo from "./components/WhyInfraQo";
import ContactForm from "./components/ContactForm";
import CaseStudies from "./components/CaseStudies";
import About from "./components/About";
import Privacy from "./components/legal/Privacy";
import Terms from "./components/legal/Terms";
import AcceptableUse from "./components/legal/AcceptableUse";
import CareersPage from "./components/careers/Careers";
import CookieBanner from "./components/ui/CookieBanner";
import NotFoundPage from "./NotFound";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

// --- Page title + meta description + JSON-LD manager ---
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
          "Explore InfraQo’s services: structured cabling, networking and Wi-Fi, security cameras, managed IT support, and more. One partner for your entire technology stack.";
        break;

      case "/why-infraqo":
        title = "Why InfraQo | Engineered Network Reliability";
        description =
          "Learn why operators choose InfraQo: reliability, clean installs, and an operations-first mindset built from years of running hotels, restaurants, and multi-site businesses and teams.";
        break;

      case "/case-studies":
        title = "Case Studies | InfraQo – Measurable Results";
        description =
          "See how InfraQo reduces downtime, stabilizes networks, and cleans up legacy cabling for real businesses across Colorado.";
        break;

      case "/contact":
        title = "Contact InfraQo | Start Your Project";
        description =
          "Ready to stabilize your network, plan an install, or troubleshoot a problem? Share a few details and InfraQo will follow up within one business day.";
        break;

      case "/blog":
        title = "InfraQo Insights | Technical Guides & Network Tips";
        description =
          "InfraQo’s upcoming articles will cover structured cabling, cameras, Wi-Fi design, and decision-making for operators who care about uptime.";
        break;

      case "/about":
        title = "About InfraQo | Our Mission & Experience";
        description =
          "InfraQo was founded by operators, not a help desk—bringing real-world hospitality and multi-site experience to structured cabling and network reliability.";
        break;

        case "/careers":
        title = "Careers | Join the InfraQo Team";
        description =
          "Share your details with InfraQo’s operations-first cabling and network support team to be considered for future field, project, and operations roles.";
        break;

      case "/privacy":
        title = "Privacy Policy | InfraQo";
        description =
          "Review how InfraQo collects, uses, and protects your information, including website data, contact details, and service-related information.";
        break;

      case "/terms":
        title = "Terms of Service | InfraQo";
        description =
          "Read the Terms of Service that govern your use of InfraQo’s website and services, including legal responsibilities, limitations of liability, and important conditions of access.";
        break;

        case "/acceptable-use":
        title = "Acceptable Use Policy | InfraQo";
        description =
          "Review the acceptable use guidelines for networks, systems, cabling, and services designed or supported by InfraQo, including security expectations, prohibited activities, and client responsibilities.";
        break;

      default:
        title = "404 | Page Not Found | InfraQo";
        description =
          "The page you’re looking for doesn’t exist. The internet still works—this link just doesn’t.";
        break;
    }

    // --- Document title ---
    document.title = title;

    // --- Meta description ---
    let metaDesc = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }

    metaDesc.content = description;

    // --- JSON-LD structured data for InfraQo (LocalBusiness) ---
    const ldId = "infraqo-localbusiness-jsonld";
    let existingLd = document.getElementById(ldId) as HTMLScriptElement | null;

    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://infraqo.com/#organization",
      name: "InfraQo",
      url: "https://infraqo.com/",
      description:
        "InfraQo provides structured cabling, managed network services, IT support, and low-voltage infrastructure for businesses and homeowners across Colorado’s Front Range.",
      telephone: "+1-720-515-4843",
      email: "support@infraqo.com",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Colorado Front Range",
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "CO",
        addressCountry: "US",
      },
      openingHours: "Mo-Fr 08:00-18:00",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "08:00",
          closes: "12:00",
          description: "By appointment only",
        },
      ],
      image: "https://infraqo.com/og-image.png",
      logo: "https://infraqo.com/og-image.png",
      sameAs: [
        "https://www.linkedin.com/company/infraqo",
        "https://facebook.com/infraqo",
        "https://x.com/InfraQo",
      ],
    };

    if (!existingLd) {
      existingLd = document.createElement("script");
      existingLd.type = "application/ld+json";
      existingLd.id = ldId;
      document.head.appendChild(existingLd);
    }

    existingLd.textContent = JSON.stringify(jsonLdData);
  }, [pathname]);

  return null;
};

// --- Global scroll reset on route change ---
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    // if there IS a hash, WhyInfraQo handles its own scrolling
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      {/* SEO title + description + JSON-LD */}
      <TitleManager />

      {/* runs on every route change */}
      <ScrollToTop />

      <Header />

      <Routes>
        {/* Home / main landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Services page */}
        <Route path="/services" element={<Services />} />

        {/* Why InfraQo page */}
        <Route path="/why-infraqo" element={<WhyInfraQo />} />

        {/* Case Studies page */}
        <Route path="/case-studies" element={<CaseStudies />} />

        {/* Contact page */}
        <Route path="/contact" element={<ContactForm />} />

        {/* Blog page */}
        <Route path="/blog" element={<BlogPage />} />

        {/* About page */}
        <Route path="/about" element={<About />} />

        {/* Privacy Policy page */}
        <Route path="/privacy" element={<Privacy />} />

        {/* Terms page */}
        <Route path="/terms" element={<Terms />} />

        {/* Acceptable Use page */}
        <Route path="/acceptable-use" element={<AcceptableUse />} />

        {/* Careers page */}
        <Route path="/careers" element={<CareersPage />} />

        {/* 404 Not Found page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <CookieBanner />
      <Footer />

      {/* Scroll button */}
      <ScrollToTopButton />
    </div>
  );
};

export default App;
