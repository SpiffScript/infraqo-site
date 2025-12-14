import React, { useState } from "react";
import CtaButton from "../ui/CtaButton";
import MidlistSupportCta from "./MidlistSupportCta";

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

const ServiceContent: React.FC = () => {
  return (
    <div className="mt-12 space-y-12">
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
          <span>Rack installations, patch panel terminations and layout planning</span>
          <span>Network closet cleanups and reorganizations</span>
          <span>Clear labeling and documentation for future work</span>
          <span>Smart device and low-voltage hardware integration</span>
          <span>Testing to confirm performance and identify issues early</span>
        </BulletList>
      </section>

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
          <span>NAS and small server installations</span>
        </BulletList>
      </section>

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

      <MidlistSupportCta />

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
