import React from "react";
import CtaButton from "../ui/CtaButton";

const BulletList = ({ children }) => (
  <ul className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
    {React.Children.map(children, (child, i) => (
      <li
        key={i}
        className="flex items-start before:content-['•'] before:mr-2 before:text-blue-600"
      >
        {child}
      </li>
    ))}
  </ul>
);

// Mid-list CTA panel (replaces the micro CTAs)
const MidlistCTA = () => (
  <div className="mt-12 mb-6">
    <div
      className="
        bg-slate-900 text-slate-50 px-5 py-4
        w-full max-w-4xl
        flex flex-col gap-4
        md:flex-row md:items-center md:justify-between
      "
    >
      <p className="text-base md:text-lg font-semibold">
        Talk with InfraQo about your next project.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-nowrap">
        <CtaButton
          href="#contact"
          variant="glow"
          size="sm"
          className="shrink-0"
        >
          Start your project
        </CtaButton>
        <CtaButton
          href="tel:7205154843"
          variant="glow"
          size="sm"
          className="shrink-0"
        >
          Call (720) 515-4843
        </CtaButton>
      </div>
    </div>
  </div>
);

const ServiceContent: React.FC = () => {
  return (
    <div className="mt-12 space-y-12">
      {/* Structured Cabling */}
      <section id="structured-cabling">
        <h3 className="text-2xl font-bold text-slate-900">Structured Cabling</h3>
        <div className="mt-2 h-0.5 w-20 bg-blue-600" />

        <p className="mt-3 text-slate-600 max-w-3xl">
          Clean, well-organized cabling is the part of your network nobody sees – but everyone
          feels when it’s done wrong. We build structured cabling that is easy to service,
          simple to understand, and ready for whatever your business needs next.
        </p>

        <BulletList>
          <span>Cat6 data and voice runs for offices and mixed-use spaces</span>
          <span>Patch panel terminations and rack layout planning</span>
          <span>Network closet cleanups and rework of spaghetti cabling</span>
          <span>Clear labeling and documentation for future work</span>
          <span>Coordination with electricians and other trades</span>
          <span>Testing to confirm performance and identify issues early</span>
        </BulletList>
      </section>

      {/* Networking & Wi-Fi */}
      <section id="networking-wifi">
        <h3 className="text-2xl font-bold text-slate-900">Networking & Wi-Fi</h3>
        <div className="mt-2 h-0.5 w-20 bg-blue-600" />

        <p className="mt-3 text-slate-600 max-w-3xl">
          We design and tune networks that feel fast, stay stable, and scale with your
          business – whether it's a small office or a busy, high-density environment.
        </p>

        <BulletList>
          <span>Switch installation, configuration, and PoE planning</span>
          <span>Router and gateway configuration for stability & speed</span>
          <span>VLANs and basic segmentation for secure environments</span>
          <span>Access point placement and real-world coverage tuning</span>
          <span>Mesh and controller-based Wi-Fi deployments</span>
          <span>Right-sized network design for growing businesses</span>
        </BulletList>
      </section>

      {/* Security Cameras */}
      <section id="security-cameras">
        <h3 className="text-2xl font-bold text-slate-900">Security Cameras</h3>
        <div className="mt-2 h-0.5 w-20 bg-blue-600" />

        <p className="mt-3 text-slate-600 max-w-3xl">
          We design camera systems around entrances, blind spots, and high-value areas to give
          you visibility when it matters most.
        </p>

        <BulletList>
          <span>IP camera planning for meaningful coverage</span>
          <span>NVR-based recording systems with smart retention</span>
          <span>Cloud-connected viewing when appropriate</span>
          <span>Synology NAS hybrid recording environments</span>
          <span>Cleanup and stabilization of existing camera installs</span>
          <span>Secure remote access without unnecessary exposure</span>
        </BulletList>
      </section>

      {/* Managed IT Support */}
      <section id="managed-it-support">
        <h3 className="text-2xl font-bold text-slate-900">Managed IT Support</h3>
        <div className="mt-2 h-0.5 w-20 bg-blue-600" />

        <p className="mt-3 text-slate-600 max-w-3xl">
          We provide ongoing IT support, maintenance, and monitoring built around clear
          communication and predictable uptime.
        </p>

        <BulletList>
          <span>Day-to-day support for workstations & laptops</span>
          <span>Device updates, OS patching, and basic security upkeep</span>
          <span>Credential management, onboarding & offboarding</span>
          <span>Remote support for fast resolutions; onsite when needed</span>
          <span>Backup checks so restores aren’t guesswork</span>
          <span>Light monitoring for availability and device health</span>
        </BulletList>
      </section>

      {/* Mid-list CTA panel */}
      <MidlistCTA />

      {/* Point-of-Sale Systems */}
      <section id="point-of-sale">
        <h3 className="text-2xl font-bold text-slate-900">Point-of-Sale Systems</h3>
        <div className="mt-2 h-0.5 w-20 bg-blue-600" />

        <p className="mt-3 text-slate-600 max-w-3xl">
          In hospitality and retail, your POS can’t fail. We support and optimize the technology
          that keeps your service moving.
        </p>

        <BulletList>
          <span>POS hardware installation and network integration</span>
          <span>Terminal, printer, and KDS setup & troubleshooting</span>
          <span>Menu programming assistance and configuration updates</span>
          <span>Network cleanup to eliminate POS disconnects</span>
          <span>Vendor coordination during setup or migration</span>
          <span>Staff guidance on workflows and hardware basics</span>
        </BulletList>
      </section>

      {/* Installations & Configuration */}
      <section id="installations-configuration">
        <h3 className="text-2xl font-bold text-slate-900">
          Installations & Configuration
        </h3>
        <div className="mt-2 h-0.5 w-20 bg-blue-600" />

        <p className="mt-3 text-slate-600 max-w-3xl">
          We take the hands-on projects most companies rush through and do them cleanly,
          correctly, and with attention to detail.
        </p>

        <BulletList>
          <span>Rack and cabinet installation with professional cable routing</span>
          <span>Access point mounting (surface & in-ceiling)</span>
          <span>Router, gateway & firewall configuration</span>
          <span>Network closet cleanups and reorganizations</span>
          <span>NAS and small server installations</span>
          <span>Smart device and low-voltage hardware integration</span>
        </BulletList>
      </section>

      {/* Cybersecurity */}
      <section id="cybersecurity">
        <h3 className="text-2xl font-bold text-slate-900">Cybersecurity</h3>
        <div className="mt-2 h-0.5 w-20 bg-blue-600" />

        <p className="mt-3 text-slate-600 max-w-3xl">
          Practical, foundational security steps that protect your people, your data, and your
          operations without unnecessary complexity.
        </p>

        <BulletList>
          <span>Firewall configuration and secure rule planning</span>
          <span>VPN setup and secure remote access</span>
          <span>MFA adoption where it matters most</span>
          <span>Endpoint protections for workstations & laptops</span>
          <span>Password policies people can actually follow</span>
          <span>Staff awareness around phishing and social tactics</span>
        </BulletList>
      </section>

      {/* Operational Consulting */}
      <section id="operational-consulting">
        <h3 className="text-2xl font-bold text-slate-900">Operational Consulting</h3>
        <div className="mt-2 h-0.5 w-20 bg-blue-600" />

        <p className="mt-3 text-slate-600 max-w-3xl">
          We align your technology with the way your team actually works – reducing friction,
          avoiding rework, and making daily operations smoother.
        </p>

        <BulletList>
          <span>Technology assessments for existing sites</span>
          <span>Low-voltage planning for new builds & remodels</span>
          <span>Vendor & platform evaluations (practical, not hype-driven)</span>
          <span>SOPs & simple playbooks for recurring IT tasks</span>
          <span>Budgeting guidance to phase upgrades correctly</span>
          <span>Coordination with GCs, electricians, and other trades</span>
        </BulletList>
      </section>
    </div>
  );
};

export default ServiceContent;
