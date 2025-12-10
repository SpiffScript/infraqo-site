import React from "react";
import { Link } from "react-router-dom";

const AcceptableUse: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Acceptable Use Policy
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Effective date: June 1, 2025
        </p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-800">
          <p>
            This Acceptable Use Policy (&quot;AUP&quot;) describes guidelines
            and restrictions for the use of networks, systems, cabling,
            equipment, and related services designed, installed, configured, or
            supported by InfraQo, LLC (&quot;InfraQo,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;).
          </p>
          <p>
            This AUP is intended to protect the reliability, security, and
            integrity of infrastructure we deploy or manage, as well as the
            businesses and people who rely on it. It applies to any customer,
            organization, or individual (&quot;you&quot; or &quot;Client&quot;)
            who uses networks, systems, or services provided by InfraQo, and to
            any employees, contractors, or guests who access those systems under
            your control.
          </p>
          <p>
            This AUP should be read together with our{" "}
            <Link
              to="/terms"
              className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            . In the event of a conflict, any written and fully executed
            agreement between you and InfraQo (such as a Master Services
            Agreement or Statement of Work) will control for the specific
            services it covers.

          </p>

          <h2 className="text-xl font-semibold mt-8">
            1. Authorized Use and Responsibility
          </h2>
          <p>
            You are responsible for all use of networks, cabling, systems, and
            services that InfraQo designs, installs, or supports on your behalf,
            including use by your employees, contractors, guests, and any other
            person who accesses your environment under your control.
          </p>
          <p>
            You agree to use these systems only for lawful business and
            operational purposes, consistent with applicable laws, regulations,
            and industry norms. You are responsible for communicating relevant
            rules to your internal teams and, where applicable, to your guests
            or customers who access your networks (such as guest Wi-Fi).
          </p>

          <h2 className="text-xl font-semibold mt-8">
            2. Prohibited Activities
          </h2>
          <p>
            The following activities are strictly prohibited on any network,
            system, or service designed, installed, or supported by InfraQo. You
            must not, and must not permit others to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Use the network or systems for any unlawful purpose, including
              transmitting, storing, or distributing material that is illegal,
              fraudulent, defamatory, harassing, or otherwise abusive.
            </li>
            <li>
              Interfere with or disrupt the normal operation of networks,
              devices, or services, including through flooding, overloading,
              denial-of-service attacks, or other disruptive activity.
            </li>
            <li>
              Attempt to gain unauthorized access to any system, network,
              account, or data, including through password guessing, exploiting
              vulnerabilities, or bypassing authentication or security controls.
            </li>
            <li>
              Perform unauthorized network scanning, traffic inspection, packet
              capture, or similar activities except as expressly approved in
              writing by InfraQo for troubleshooting or security assessment
              purposes.
            </li>
            <li>
              Introduce malware, ransomware, or other malicious code, or use the
              network to distribute such code to others.
            </li>
            <li>
              Use InfraQo-installed infrastructure to host illegal content, run
              command-and-control infrastructure, or facilitate attacks on third
              parties.
            </li>
            <li>
              Send unsolicited bulk email (spam), engage in mass messaging, or
              use the network for deceptive, misleading, or fraudulent outreach.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8">
            3. Equipment, Cabling, and Configuration Changes
          </h2>
          <p>
            To maintain network stability and security, the following
            limitations apply to equipment, cabling, and configuration changes
            in environments where InfraQo is responsible for design,
            installation, or support:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              You must not connect unmanaged switches, consumer-grade routers,
              or other unapproved networking hardware in ways that bypass or
              conflict with the designed topology provided by InfraQo.
            </li>
            <li>
              You must not modify or repurpose structured cabling, patch panels,
              or terminations installed by InfraQo without appropriate tools,
              knowledge, and, where required, prior approval.
            </li>
            <li>
              You must not alter critical network settings (such as VLANs, DHCP,
              routing, firewall rules, or wireless configurations) in a way that
              conflicts with the documented design or recommendations provided
              by InfraQo.
            </li>
            <li>
              Any third-party contractor or vendor who connects equipment to the
              network should do so in coordination with your internal
              leadership, and where appropriate, with InfraQo’s knowledge or
              involvement.
            </li>
          </ul>
          <p>
            Where you or your vendors make independent changes that conflict
            with the design or recommendations provided by InfraQo, InfraQo is
            not responsible for resulting downtime, degraded performance, or
            security exposure, and additional remediation work may be billed at
            our prevailing rates.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            4. Security, Access, and Credentials
          </h2>
          <p>
            You are responsible for basic security hygiene in your environment
            and for the conduct of your users. This includes:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Limiting administrative access to trusted personnel and updating
              access when roles change or staff leave.
            </li>
            <li>
              Protecting passwords, access tokens, and management credentials
              from unauthorized disclosure or sharing.
            </li>
            <li>
              Informing InfraQo promptly if you believe a system, account, or
              credential has been compromised in any way.
            </li>
            <li>
              Not disabling, tampering with, or bypassing security controls
              (such as firewalls, endpoint protections, or monitoring tools)
              that are in place to protect your environment.
            </li>
          </ul>
          <p>
            InfraQo may recommend or require certain minimum security practices
            (for example: password standards, network segmentation, or firmware
            updates) as a condition of providing ongoing support. If those
            recommendations are declined or not implemented, InfraQo may, where
            appropriate, limit or disclaim responsibility for related risk.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            5. Guest Wi-Fi and Public-Facing Networks
          </h2>
          <p>
            If InfraQo implements guest Wi-Fi or other public-facing networks at
            your location, those networks are ultimately under your operational
            control. You are responsible for:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Informing guests and end users that their use of the network must
              comply with applicable laws and this AUP.
            </li>
            <li>
              Ensuring that access credentials are distributed and rotated in a
              reasonable and secure manner.
            </li>
            <li>
              Not using guest networks as a substitute for secure internal
              networks for business-critical systems.
            </li>
          </ul>
          <p>
            InfraQo is not responsible for the content accessed by your guests
            or for their individual behavior on the network. However, if
            InfraQo becomes aware of use that is illegal, abusive, or presents a
            material security risk, we may recommend or implement mitigating
            measures, which may include temporarily restricting access, where
            permitted under our agreements with you.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            6. Monitoring, Logging, and Privacy
          </h2>
          <p>
            As part of designing, installing, or supporting your environment,
            InfraQo may implement or recommend logging, monitoring, alerting, or
            other visibility tools to help detect faults, performance issues, or
            security concerns.
          </p>
          <p>
            Any monitoring of your internal users or guests is performed for
            operational and security purposes and is subject to our{" "}
            <Link
              to="/privacy"
              className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Privacy Policy
            </Link>{" "}
            and to any written agreements between you and InfraQo. As the
            business owner or operator, you are responsible for meeting your own
            legal obligations regarding notification and privacy for your staff
            and customers.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            7. Misuse, Enforcement, and Suspension of Services
          </h2>
          <p>
            If InfraQo determines, in good faith, that your environment is being
            used in a way that violates this AUP, creates a material risk to
            network stability or security, or exposes InfraQo to undue
            liability, we may take one or more of the following actions, as
            appropriate and permitted by our agreements with you:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Notify you of the issue and request that it be corrected within a
              reasonable timeframe.
            </li>
            <li>
              Temporarily restrict or disable specific services, devices, or
              network segments that are causing or contributing to the issue.
            </li>
            <li>
              Implement technical workarounds to protect the broader
              environment, which may include emergency changes or isolation of
              systems.
            </li>
            <li>
              Decline to provide support for configurations or devices that
              materially violate this AUP or contradict documented
              recommendations.
            </li>
            <li>
              In serious or repeated cases, suspend or terminate services in
              accordance with our Terms of Service or your written agreement
              with InfraQo.
            </li>
          </ul>
          <p>
            Where feasible and appropriate, InfraQo will work with you in a
            practical, solutions-focused manner to resolve issues and restore
            normal operations. Our goal is to protect uptime, safety, and the
            integrity of your environment—not to punish honest mistakes.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            8. Reporting Concerns or Potential Violations
          </h2>
          <p>
            If you become aware of activity on your network that may violate
            this AUP, applicable law, or your own internal policies, you should
            notify InfraQo as soon as reasonably possible so that we can help
            you investigate and, where appropriate, mitigate the issue.
          </p>
          <p>
            You can contact us at{" "}
            <a
              href="mailto:support@infraqo.com"
              className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              support@infraqo.com
            </a>{" "}
            or by telephone at{" "}
            <span className="whitespace-nowrap">720-515-4843</span>.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            9. Changes to This Acceptable Use Policy
          </h2>
          <p>
            InfraQo may update this AUP from time to time to reflect changes in
            our services, applicable law, or industry practices. When we make
            material changes, we will update the effective date at the top of
            this page. Your continued use of networks or services designed,
            installed, or supported by InfraQo after an update becomes effective
            constitutes your acceptance of the revised AUP.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AcceptableUse;
