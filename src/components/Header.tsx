import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoColor from "../assets/logos/logo-light.svg";
import LogoMono from "../assets/logos/logo-light-mono.svg";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClasses = `text-sm font-semibold transition-colors duration-300 ${
    isScrolled
      ? "text-slate-700 hover:text-blue-600"
      : "text-slate-100 hover:text-white"
  }`;

  const ctaClasses = `hidden md:inline-flex items-center justify-center px-5 py-2 border text-sm font-bold transition-all duration-300 ${
    isScrolled
      ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
      : "border-slate-100 text-slate-100 hover:bg-slate-100 hover:text-slate-900"
  }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-md text-slate-900"
          : "bg-slate-900/95 backdrop-blur-sm text-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" aria-label="InfraQo Home" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src={isScrolled ? LogoColor : LogoMono}
              alt="InfraQo Logo"
              className="h-10 w-auto transition-all duration-300"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="hidden md:flex items-center space-x-8"
            aria-label="Main navigation"
          >
            <Link to="/services" className={navLinkClasses}>
              Services
            </Link>
            <Link to="/why-infraqo" className={navLinkClasses}>
              Why InfraQo
            </Link>
            <Link to="/case-studies" className={navLinkClasses}>
              Case Studies
            </Link>
            <Link to="/about" className={navLinkClasses}>
              About
            </Link>
            <Link to="/blog" className={navLinkClasses}>
              Blog
            </Link>
          </nav>

          {/* DESKTOP CTA BUTTON */}
          <Link to="/contact" className={ctaClasses}>
            Free Consultation
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden flex flex-col justify-center items-center space-y-1.5 p-2 border 
              ${
                isScrolled
                  ? "border-slate-400 text-slate-900"  // dark lines on white header
                  : "border-slate-600 text-slate-200"  // light lines on dark header
              }
            `}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] w-5 bg-current transition-all duration-200 ${
                isMobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-current transition-all duration-200 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-current transition-all duration-200 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700 px-4 pb-6 pt-3 space-y-4">
          <Link
            to="/services"
            className="block text-slate-200 text-sm font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/why-infraqo"
            className="block text-slate-200 text-sm font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Why InfraQo
          </Link>
          <Link
            to="/case-studies"
            className="block text-slate-200 text-sm font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Case Studies
          </Link>
          <Link
            to="/about"
            className="block text-slate-200 text-sm font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/blog"
            className="block text-slate-200 text-sm font-semibold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className="block text-blue-400 border border-blue-500 px-4 py-2 text-center text-sm font-semibold hover:bg-blue-500 hover:text-slate-950 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Free Consultation
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
