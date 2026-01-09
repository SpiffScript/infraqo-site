# InfraQo Website

This repository contains the source code for **infraqo.com**, the public-facing site for InfraQo.

InfraQo is a brand and operating division of QoLogic LLC.

QoLogic is the holding and operating framework behind the Qo ecosystem. It exists to enforce coherence across infrastructure, communication, and leadership systems—ensuring that tools, decisions, and execution align under real operational conditions. QoLogic does not sell services directly; it provides the standards, architecture, and governance that allow InfraQo, IndexQo, and SignalQo to operate with discipline, consistency, and intent.

InfraQo exists to design, implement, and maintain physical and logical infrastructure that businesses rely on every day – networks, cabling, systems, and the environments they operate within. The site is intentionally practical and specific, reflecting the kind of work InfraQo does: foundational, durable, and outcome-driven.

This is infrastructure work, not marketing.

---

## Project Structure
* index.html: Core document head (meta tags, analytics, schema).
* /src/: Application source.
* /src/components/: Reusable UI and section components.
* /src/components/: Page-level assemblies (Home, Services, Solutions, Contact).
* /src/: Global styles and Tailwind configuration.
* /public/: Static assets (images, icons, verification files).

---

## Local Development
1. Install dependencies:
   npm install

2. Run development server:
   npm run dev

---

## Deployment
Deployment is handled automatically via Cloudflare Pages.
* Commits to the configured branch trigger builds.
* DNS is managed in Cloudflare.
* The apex domain uses Cloudflare’s proxied A-record setup for Pages.
No manual deployment steps are required.

---

## Notes on Intent
* InfraQo is not positioned as a commodity IT provider.
* The site emphasizes reliability, clarity, and system integrity over speed or scale.
* Language is intentionally direct and non-hype.
* The goal is informed inquiry, not volume lead generation.
* SEO is used to support discovery, not to dilute positioning.

If something reads as generic, it likely does not reflect InfraQo's standards.

---

## Status
* Initial public launch: November 2025
* Actively iterating copy, structure, and supporting content.
* No backwards-compatibility guarantees at this stage.

---

## Contact
support@infraqo.com

---

The Architecture of Continuity.

(c) 2026 QoLogic LLC. All Rights Reserved.
