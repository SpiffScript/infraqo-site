import { useState } from "react";
import CheckIcon from "../ui/CheckIcon";

type TabKey = "TotalQo" | "PriorityQo";

export default function SolutionPlans() {
  const [activeTab, setActiveTab] = useState<TabKey>("TotalQo");
  const isPriority = activeTab === "PriorityQo";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState<"call" | "text" | "email">("call");

  const supportEmail = "support@infraqo.com";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const canSubmit =
    fullName.trim().length > 0 && (email.trim().length > 0 || phone.trim().length > 0);

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/solutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: activeTab,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          preferredContact,
          page: "SolutionsQo",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        let message = "Submission failed. Please try again.";
        try {
          const data = await res.json();
          if (data?.error) message = String(data.error);
        } catch {

        }
        throw new Error(message);
      }

      setSubmitSuccess(true);

      setFullName("");
      setEmail("");
      setPhone("");
    } catch (err: any) {
      setSubmitError(err?.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="handraise" className="w-full pb-16 pt-4">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">
            Managed support
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-50">
            Support engineered for margin-focused operators.
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Two clear options built to eliminate operational guesswork. Choose your framework
            for predictable growth: defined scope, assured stability, and complete clarity.
          </p>
        </div>

        <div className="overflow-hidden border border-slate-800 bg-slate-950/10">
          <div className="grid grid-cols-2 border-b border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab("TotalQo")}
              className={`px-6 py-5 text-left transition ${
                activeTab === "TotalQo"
                  ? "bg-slate-950/30 text-sky-400"
                  : "text-slate-400 hover:bg-slate-950/20 hover:text-slate-200"
              }`}
            >
              <div className="text-xl font-semibold">TotalQo</div>
              <div className="mt-1 text-xs text-slate-400">
                Defined Support. Controlled Risk.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("PriorityQo")}
              className={`px-6 py-5 text-left transition ${
                activeTab === "PriorityQo"
                  ? "bg-slate-950/30 text-sky-400"
                  : "text-slate-400 hover:bg-slate-950/20 hover:text-slate-200"
              }`}
            >
              <div className="text-xl font-semibold">PriorityQo</div>
              <div className="mt-1 text-xs text-slate-400">
                Assured Stability. Optimized for Revenue Generation.
              </div>
            </button>
          </div>

          <div className="h-[2px] w-full bg-slate-900 overflow-hidden">
            <div
              className={`h-full w-1/2 bg-sky-400 transition-transform duration-300 ${
                activeTab === "TotalQo" ? "translate-x-0" : "translate-x-full"
              }`}
            />
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-2 items-stretch">
            <div className="border border-slate-800 bg-slate-950/20 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                    {isPriority ? "Premium support plan" : "Core support plan"}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-50">
                    {activeTab}
                  </h3>
                </div>

                {isPriority && (
                  <span className="inline-flex items-center border border-sky-600/40 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-300">
                    Recommended
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm text-slate-300">
                {isPriority
                  ? "Unparalleled management and oversight for operators who want faster response, fewer surprises, and a true day-to-day technology partner."
                  : "Everything a margin-focused operator needs for stable, well-managed networks, minus the operational waste."}
              </p>

              <p className="mt-4 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Ideal for:</span>{" "}
                {isPriority
                  ? "High-stakes, multi-location environments and owners demanding complete IT certainty."
                  : "Small to mid-sized businesses prioritizing predictable support and clean infrastructure."}
              </p>

              <div className="my-6 h-px w-full bg-slate-800" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                What’s included
              </p>

              <ul className="mt-4 space-y-5 text-sm">
                {isPriority ? (
                  <>
                    <li className="flex gap-3">
                      <span className="mt-[2px]">
                        <CheckIcon className="h-4 w-4 text-emerald-500" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200">
                          Priority Response & Accelerated Resolution
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          Your requests bypass the queue. Dedicated, accelerated resolution minimizes operational downtime.
                        </div>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <span className="mt-[2px]">
                        <CheckIcon className="h-4 w-4 text-emerald-500" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200">
                          Complete Operational Recovery Access
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          Includes full on-site coverage and guaranteed rapid access for true operational emergencies that cannot wait for the next business day.
                        </div>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <span className="mt-[2px]">
                        <CheckIcon className="h-4 w-4 text-emerald-500" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200">
                          Strategic Planning & Quarterly Business Reviews
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          Regular, dedicated planning sessions to plan upgrades, address risk, and ensure complete business-IT alignment.
                        </div>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <span className="mt-[2px]">
                        <CheckIcon className="h-4 w-4 text-emerald-500" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200">
                          Continuous Environment Oversight
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          We maintain constant vigilance between requests, predicting patterns and identifying emerging risks before they become disruptions.
                        </div>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <span className="mt-[2px]">
                        <CheckIcon className="h-4 w-4 text-emerald-500" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200">
                          Complete Operational Escalation Ownership
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          When something breaks across vendors or systems, we own the resolution, eliminating vendor finger-pointing and stall.
                        </div>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex gap-3">
                      <span className="mt-[2px]">
                        <CheckIcon className="h-4 w-4 text-slate-200" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200">
                          Direct Remote Resolution
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          Day-to-day troubleshooting and adjustments handled remotely within standard response windows.
                        </div>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <span className="mt-[2px]">
                        <CheckIcon className="h-4 w-4 text-slate-200" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200">
                          Proactive System Health & Security
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          Core devices monitored and kept current so you avoid preventable outages and security issues.
                        </div>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <span className="mt-[2px]">
                        <CheckIcon className="h-4 w-4 text-slate-200" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200">
                          Guaranteed Response & Triage SLA
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          A specific, measurable commitment for initial response and triage times, clearly documented so you always know the service timeline for your operational issues.
                        </div>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <span className="mt-[2px]">
                        <CheckIcon className="h-4 w-4 text-slate-200" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200">
                          Network Documentation & Operational Ownership
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          Your infrastructure and changes are documented ensuring continuity over institutional knowledge.
                        </div>
                      </div>
                    </li>

                    <li className="flex gap-3">
                      <span className="mt-[2px]">
                        <CheckIcon className="h-4 w-4 text-slate-200" />
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200">
                          Preferred On-Site Investment
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          When physical service or emergency response is required, pay a fixed, reduced rate instead of variable, unexpected fees.
                        </div>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div
              id="request-consultation"
              className={`scroll-mt-16 border p-6 h-full flex flex-col bg-slate-950/10 transition-colors duration-300 ${
                isPriority
                  ? "border-sky-400 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
                  : "border-slate-800"
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Request a call
              </p>
              <h4 className="mt-2 text-lg font-semibold text-slate-50">
                Interested in {activeTab}?
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                Interested in predictable stability? Share your contact info for a conversation focused on clear scope and guaranteed uptime. No ticket queues, no vendor ambiguity.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Name
                  </label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="mt-2 w-full border border-slate-700 bg-slate-950/30 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="mt-2 w-full border border-slate-700 bg-slate-950/30 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Phone
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(720) 555-1234"
                      className="mt-2 w-full border border-slate-700 bg-slate-950/30 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Preferred contact
                  </label>

                  <div className="mt-2 grid grid-cols-3 gap-3">
                    {(["call", "text", "email"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPreferredContact(opt)}
                        className={`border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                          preferredContact === opt
                            ? "border-sky-500 bg-sky-500/10 text-slate-200"
                            : "border-slate-700 text-slate-300 hover:border-slate-500"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className={`mx-auto mt-10 flex h-[56px] w-[220px] items-center justify-center border px-6 text-[12px] font-semibold uppercase tracking-[0.22em] transition
                  ${
                    canSubmit && !isSubmitting
                      ? "border-sky-500 text-slate-200 hover:bg-sky-500/10"
                      : "border-slate-700 text-slate-500 cursor-not-allowed"
                  }`}
              >
                {isSubmitting
                  ? "SENDING..."
                  : isPriority
                    ? "REQUEST PRIORITYQO"
                    : "REQUEST TOTALQO"}
              </button>
              <div className="mt-6 space-y-2 text-center">
                <p className="text-xs text-slate-500">
                  Please add your name and either an email or phone number.
                </p>

                <p className="text-xs text-slate-500">
                  Your message is delivered directly to a principal decision-maker.
                </p>
              </div>
                <div className="mt-auto border border-slate-800 bg-slate-950/20 px-4 py-3 text-xs text-center text-slate-400 max-w-[400px] mx-auto">
                Ready to skip the guesswork?{" "}
                <a
                  href={`mailto:${supportEmail}?subject=${encodeURIComponent(
                    "SolutionsQo — direct request"
                  )}`}
                  className="text-sky-300 hover:text-sky-200"
                >
                  Call or text
                </a>{" "}
                now for a direct consultation and immediate plan alignment.
              </div>

              {submitError ? (
                <p className="mt-3 text-center text-xs text-rose-400">{submitError}</p>
              ) : submitSuccess ? (
                <p className="mt-3 text-center text-xs text-emerald-400">Received. We’ll reach out shortly.</p>
              ) : null}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
