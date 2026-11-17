"use client";

import * as React from "react";
import { Property } from "@/types/real-estate";
import { submitWebsiteLead } from "@/lib/services/lead-service";

interface VisitFormProps {
  properties: Property[];
  selectedPropertyId?: string;
  onSelectPropertyId?: (id: string) => void;
}

export function VisitForm({
  properties,
  selectedPropertyId,
  onSelectPropertyId,
}: VisitFormProps) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [project, setProject] = React.useState(selectedPropertyId || (properties[0]?.id ?? ""));
  const [day, setDay] = React.useState("This Saturday");
  const [consent, setConsent] = React.useState(true);
  const [honeypot, setHoneypot] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [okMsg, setOkMsg] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (selectedPropertyId) {
      setProject(selectedPropertyId);
    }
  }, [selectedPropertyId]);

  const validate = (): string | null => {
    const n = name.trim();
    const p = phone.replace(/\D/g, "");
    const cleanPhone = p.length === 12 && p.startsWith("91") ? p.slice(2) : p;

    if (n.length < 2) {
      setErrorMsg("Enter your full name.");
      return null;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMsg("Enter a valid 10-digit mobile number.");
      return null;
    }
    if (!consent) {
      setErrorMsg("Please tick the consent box so we can message you.");
      return null;
    }
    setErrorMsg("");
    return n;
  };

  const extractUtm = () => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") || "website",
      utmMedium: params.get("utm_medium") || "direct",
      utmCampaign: params.get("utm_campaign") || "home-landing",
      utmTerm: params.get("utm_term") || undefined,
      utmContent: params.get("utm_content") || undefined,
    };
  };

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validName = validate();
    if (!validName) return;

    setIsSubmitting(true);
    setOkMsg("");

    const chosenProp = properties.find((p) => p.id === project || p.slug === project);
    const utm = extractUtm();

    try {
      const res = await submitWebsiteLead({
        name: validName,
        mobile: phone,
        propertyId: chosenProp?.id || project,
        propertyTitle: chosenProp?.title || "Pune Property Inquiry",
        locality: chosenProp?.locality || "Pune",
        bhk: chosenProp?.bhk || "3 BHK",
        preferredDay: day,
        inquiryType: "visit",
        honeypot,
        ...utm,
      });

      if (res.success) {
        setOkMsg(
          `Thanks, ${validName.split(" ")[0]}. Your visit request for ${
            chosenProp?.title || "selected property"
          } is noted. We will confirm your AC cab slot on WhatsApp.`
        );
      } else {
        setErrorMsg(res.message);
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please contact us via phone or WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallbackClick = async () => {
    const validName = validate();
    if (!validName) return;

    setIsSubmitting(true);
    setOkMsg("");

    const chosenProp = properties.find((p) => p.id === project || p.slug === project);
    const utm = extractUtm();

    try {
      const res = await submitWebsiteLead({
        name: validName,
        mobile: phone,
        propertyId: chosenProp?.id || project,
        propertyTitle: chosenProp?.title || "General Property Inquiry",
        locality: chosenProp?.locality || "Pune",
        inquiryType: "callback",
        preferredDay: day,
        honeypot,
        ...utm,
      });

      if (res.success) {
        setOkMsg(`Thanks, ${validName.split(" ")[0]}. Your call back request is noted. An advisor will call you shortly.`);
      } else {
        setErrorMsg(res.message);
      }
    } catch {
      setErrorMsg("An error occurred. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="gh-band" id="visit" aria-label="Book a free site visit">
      <div className="gh-wrap gh-band-grid">
        <div>
          <span className="gh-eyebrow" style={{ color: "#5EE0B8" }}>
            Free site visit
          </span>
          <h2 style={{ marginTop: "8px" }}>See it in person before you decide.</h2>
          <p className="gh-lede">
            Tell us when you are free. We confirm on WhatsApp within the hour during working
            hours.
          </p>

          <ul className="gh-perks">
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 shrink-0"
                style={{ color: "#5EE0B8" }}
                aria-hidden="true"
              >
                <path d="m5 12 5 5 9-10" />
              </svg>
              <span>Free AC cab from your doorstep</span>
            </li>
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 shrink-0"
                style={{ color: "#5EE0B8" }}
                aria-hidden="true"
              >
                <path d="m5 12 5 5 9-10" />
              </svg>
              <span>Floor plans and price sheet before you go</span>
            </li>
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 shrink-0"
                style={{ color: "#5EE0B8" }}
                aria-hidden="true"
              >
                <path d="m5 12 5 5 9-10" />
              </svg>
              <span>No pressure and no brokerage</span>
            </li>
          </ul>
        </div>

        <form className="gh-form" id="visitForm" noValidate onSubmit={handleVisitSubmit}>
          {/* Honeypot Spam Trap */}
          <input
            type="text"
            name="website_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            aria-hidden="true"
            className="hidden pointer-events-none"
          />

          <div className="gh-field">
            <label htmlFor="v-name">Full name</label>
            <input
              id="v-name"
              autoComplete="name"
              placeholder="Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="gh-field">
            <label htmlFor="v-phone">WhatsApp number</label>
            <input
              id="v-phone"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98225 78324"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="gh-field">
            <label htmlFor="v-project">Home you want to see</label>
            <select
              id="v-project"
              value={project}
              onChange={(e) => {
                setProject(e.target.value);
                if (onSelectPropertyId) onSelectPropertyId(e.target.value);
              }}
            >
              {properties.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title}, {l.locality}
                </option>
              ))}
            </select>
          </div>

          <div className="gh-field">
            <label htmlFor="v-day">Preferred day</label>
            <select id="v-day" value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="This Saturday">This Saturday</option>
              <option value="This Sunday">This Sunday</option>
              <option value="A weekday evening">A weekday evening</option>
            </select>
          </div>

          <label className="gh-consent full">
            <input
              type="checkbox"
              id="v-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>
              I agree to receive floor plans, price sheets and visit schedules on WhatsApp or
              phone.
            </span>
          </label>

          {errorMsg && (
            <div className="gh-err full" id="v-err" role="alert">
              {errorMsg}
            </div>
          )}

          <div className="gh-form-acts full">
            <button
              className="gh-btn gh-btn-cta"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Booking visit..." : "Book my free visit"}
            </button>
            <button
              className="gh-btn gh-btn-ghost"
              type="button"
              id="callback"
              onClick={handleCallbackClick}
              disabled={isSubmitting}
            >
              Request a call back
            </button>
          </div>

          {okMsg && (
            <div className="gh-ok full" id="v-ok" role="status">
              {okMsg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
