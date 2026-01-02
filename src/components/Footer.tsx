import React from "react";
import { Link } from "react-router-dom";
import LogoMono from "../assets/logos/logo-light-mono.svg";
import { XIcon } from "./icons/XIcon";
import { FacebookIcon } from "./icons/FacebookIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <Link to="/" aria-label="Go to InfraQo home">
              <img
                src={LogoMono}
                alt="InfraQo Logo"
                className="h-10 w-auto mb-3 cursor-pointer"
              />
            </Link>
            <p className="text-sm text-slate-400">
              The Architecture of Continuity.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm font-semibold">
              <Link
                to="/services"
                className="hover:text-blue-400 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/solutions"
                className="hover:text-blue-400 transition-colors"
              >
                SolutionsQo
              </Link>
              <Link
                to="/case-studies"
                className="hover:text-blue-400 transition-colors"
              >
                Case Studies
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors"
              >
                About
              </Link>
              <Link
                to="/careers"
                className="hover:text-blue-400 transition-colors"
              >
                Careers
              </Link>
              <Link
                to="/blog"
                className="hover:text-blue-400 transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/infraqo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit InfraQo on LinkedIn"
                className="text-white hover:text-blue-400 transition-colors transform transition-transform duration-150 ease-out hover:scale-110"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://facebook.com/infraqo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit InfraQo on Facebook"
                className="text-white hover:text-blue-400 transition-colors transform transition-transform duration-150 ease-out hover:scale-110"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://x.com/infraqo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow InfraQo on X"
                className="text-white hover:text-blue-400 transition-colors transform transition-transform duration-150 ease-out hover:scale-110"
              >
                <XIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px bg-slate-800" />

          <div className="absolute left-6 bottom-12 translate-x-2 text-xs text-slate-400 leading-tight hidden md:block">
            <p>Infrastructure provides resilience.</p>
          <p>Leadership provides direction.</p>
          <p className="mt-1">
            <a
              href="https://signalqo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              SignalQo
            </a>
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500 space-y-2">
          <p className="text-slate-300">
            <a
              href="tel:17205154843"
              className="hover:text-blue-400 transition-colors"
            >
              (720) 515-4843
            </a>
            <span className="mx-2">·</span>
            <a
              href="mailto:support@infraqo.com"
              className="hover:text-blue-400 transition-colors"
            >
              support@infraqo.com
            </a>
          </p>

          <p className="text-slate-300">
            Serving Denver, Colorado Springs, the Front Range, and Eastern Colorado.
          </p>

          <p className="space-x-3">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-600">·</span>
            <Link to="/terms" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-600">·</span>
            <Link
              to="/acceptable-use"
              className="hover:text-blue-400 transition-colors"
            >
              Acceptable Use Policy
            </Link>
          </p>

          <p>© {new Date().getFullYear()} QoLogic, LLC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
