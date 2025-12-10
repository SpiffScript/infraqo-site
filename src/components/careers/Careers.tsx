import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Careers.css";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  howHeard: string;
  portfolioUrl: string;
  message: string;
  location: string;
  currentEmployer: string;
  availability: string;
  employmentStatus: string;
  workAuthorization: string;
  resume: File | null;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  howHeard: "",
  portfolioUrl: "",
  message: "",
  location: "",
  currentEmployer: "",
  availability: "",
  employmentStatus: "",
  workAuthorization: "",
  resume: null,
};

const CareersPage: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      const maxSizeMb = 5;
      if (file.size > maxSizeMb * 1024 * 1024) {
        setError("Please upload a file smaller than 5 MB.");
        setForm((prev) => ({ ...prev, resume: null }));
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a PDF or Word document.");
        setForm((prev) => ({ ...prev, resume: null }));
        return;
      }
    }

    setError(null);
    setForm((prev) => ({ ...prev, resume: file }));
  };

  const validate = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Please provide your first and last name.");
      return false;
    }

    if (!form.email.trim()) {
      setError("Please provide an email address.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!form.role.trim()) {
      setError("Please tell us what type of role you're interested in.");
      return false;
    }

    if (!form.employmentStatus) {
      setError("Please tell us if you are currently employed.");
      return false;
    }

    if (!form.workAuthorization) {
      setError("Please tell us your work authorization status.");
      return false;
    }

    if (!form.resume) {
      setError("Please upload your resume.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("role", form.role);
      formData.append("howHeard", form.howHeard);
      formData.append("portfolioUrl", form.portfolioUrl);
      formData.append("message", form.message);
      formData.append("location", form.location);
      formData.append("currentEmployer", form.currentEmployer);
      formData.append("availability", form.availability);
      formData.append("employmentStatus", form.employmentStatus);
      formData.append("workAuthorization", form.workAuthorization);
      if (form.resume) {
        formData.append("resume", form.resume);
      }

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong submitting your info. Please try again.");
    }
  };

  return (
    <main className="careers-page">
      <section className="careers-hero">
        <div className="careers-kicker-bar" />
        <p className="careers-kicker">WORK WITH INFRAQO</p>
        <h1 className="careers-title">The ops-first team for real businesses.</h1>
        <p className="careers-subtitle">
          We are building a small team of people who keep their word, think
          clearly under pressure, and respect the customer&apos;s day-to-day
          operations. If that sounds like you, we want to know who you are
          before we even post the job.
        </p>
      </section>

      <section className="careers-layout">
        <div className="careers-panel">
          <h2>What we care about</h2>
          <p>
            We care more about ownership, communication, and follow-through than
            buzzwords. You don&apos;t need a wall of certifications to impress
            us if you consistently protect the customer and the work.
          </p>
          <p>
            InfraQo is still small and growing on purpose. That means the people
            who join early will have a direct impact on how we operate and how
            we show up in the field.
          </p>

          <div className="careers-highlights">
            <div className="careers-highlight-card">
              <h3>Field &amp; project work</h3>
              <p>
                Structured cabling, Wi-Fi, small business networks, and clean,
                documented installs that don&apos;t turn into a mystery later.
              </p>
            </div>

            <div className="careers-highlight-card">
              <h3>Ops &amp; support</h3>
              <p>
                Scheduling, documentation, light accounting, and customer
                follow-up that keeps the work and the relationship tight.
              </p>
            </div>
          </div>

          <p className="careers-note">
            This is an interest form, not a formal application. We use it to get
            to know good people ahead of the curve so when a real position
            opens, we are not starting from zero.
          </p>
        </div>

        <div className="careers-form-wrapper">
          <div className="careers-form-card careers-form-with-watermark">
            <h2>Tell us about you</h2>
            <p className="careers-form-intro">
              A few details, a short note, and a resume are enough. No cover
              letter required.
            </p>

            {error && (
              <div className="form-alert form-alert-error" role="alert">
                {error}
              </div>
            )}

            {status === "success" && (
              <div className="form-alert form-alert-success" role="status">
                Thanks — we&apos;ve received your info and will reach out if
                there&apos;s a fit.
              </div>
            )}

            <form className="careers-form" onSubmit={handleSubmit}>
              <div className="form-row form-row-two">
                <div className="form-field">
                  <label htmlFor="firstName">First name *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="lastName">Last name *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row form-row-two">
                <div className="form-field">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row form-row-two">
                <div className="form-field">
                  <label htmlFor="location">Where are you based?</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, State or full address"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="currentEmployer">
                    Current or most recent employer
                  </label>
                  <input
                    id="currentEmployer"
                    name="currentEmployer"
                    type="text"
                    placeholder="Company name"
                    value={form.currentEmployer}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row form-row-two">
                <div className="form-field">
                  <label htmlFor="employmentStatus">Currently employed?</label>
                  <select
                    id="employmentStatus"
                    name="employmentStatus"
                    value={form.employmentStatus}
                    onChange={handleChange}
                  >
                    <option value="">Select one</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="workAuthorization">
                    Work authorization (sponsorship)
                  </label>
                  <select
                    id="workAuthorization"
                    name="workAuthorization"
                    value={form.workAuthorization}
                    onChange={handleChange}
                  >
                    <option value="">Select one</option>
                    <option value="authorized-no-sponsorship">
                      Authorized to work in the U.S. without sponsorship
                    </option>
                    <option value="requires-sponsorship">
                      Require sponsorship now or in the future
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="role">
                    What type of role are you interested in? *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="">Select one</option>
                    <option value="field-tech">
                      Field technician / installations
                    </option>
                    <option value="project">
                      Project coordination / operations
                    </option>
                    <option value="support">
                      Help desk / remote support
                    </option>
                    <option value="other">Something else</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="howHeard">
                    How did you hear about InfraQo?
                  </label>
                  <input
                    id="howHeard"
                    name="howHeard"
                    type="text"
                    placeholder="Referral, LinkedIn, job board, etc."
                    value={form.howHeard}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="portfolioUrl">
                    LinkedIn, portfolio, or GitHub (if relevant)
                  </label>
                  <input
                    id="portfolioUrl"
                    name="portfolioUrl"
                    type="url"
                    placeholder="https://"
                    value={form.portfolioUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="availability">
                    Availability / schedule notes
                  </label>
                  <textarea
                    id="availability"
                    name="availability"
                    rows={2}
                    placeholder="When could you start? Any schedule constraints?"
                    value={form.availability}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="message">
                    Briefly tell us what you do best and what you are looking
                    for
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="A few sentences is plenty."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="resume">
                    Upload your resume (PDF or Word, max 5 MB) *
                  </label>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="form-row form-actions">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full md:w-auto bg-slate-900 text-white font-semibold px-6 py-2 rounded-none shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending..." : "Submit interest"}
                </button>

                <p className="form-disclaimer">
                  By submitting this form, you agree that we may contact you
                  about potential roles at InfraQo. This is not an offer of
                  employment.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareersPage;
