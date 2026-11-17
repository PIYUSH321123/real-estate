"use client";

import * as React from "react";
import { Property } from "@/types/real-estate";
import { submitWebsiteLead } from "@/lib/services/lead-service";
import { toast } from "sonner";

interface VisitModalProps {
  open: boolean;
  onClose: () => void;
  properties: Property[];
  selectedPropertyId?: string;
  onSelectPropertyId?: (id: string) => void;
}

export function VisitModal({
  open,
  onClose,
  properties,
  selectedPropertyId,
  onSelectPropertyId,
}: VisitModalProps) {
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
    } else if (properties.length > 0 && !project) {
      setProject(properties[0].id);
    }
  }, [selectedPropertyId, properties, project]);

  // Reset messages when opened
  React.useEffect(() => {
    if (open) {
      setErrorMsg("");
      setOkMsg("");
    }
  }, [open]);

  // Close on Escape key
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

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
      utmCampaign: params.get("utm_campaign") || "home-landing-modal",
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
        const msg = `Thanks, ${validName.split(" ")[0]}. Your visit request for ${
          chosenProp?.title || "the selected property"
        } is noted. We will confirm your AC cab slot on WhatsApp.`;
        setOkMsg(msg);
        toast.success("Free Site Visit Booked!", { description: msg });
      } else {
        setErrorMsg(res.message);
      }
    } catch (err) {
      console.error("Site visit booking error:", err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please contact us via phone or WhatsApp."
      );
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
        const msg = `Thanks, ${validName.split(" ")[0]}. Your call back request is noted. An advisor will call you shortly.`;
        setOkMsg(msg);
        toast.success("Callback Requested!", { description: msg });
      } else {
        setErrorMsg(res.message);
      }
    } catch (err) {
      console.error("Callback request error:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "An error occurred. Please call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="visit-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
        style={{
          background: "var(--surface)",
          color: "var(--ink)",
          borderColor: "var(--line)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Band */}
        <div
          className="px-6 py-5 flex items-start justify-between gap-4"
          style={{
            background: "var(--band)",
            color: "var(--band-ink)",
          }}
        >
          <div>
            <span className="gh-eyebrow" style={{ color: "#E5D4B7" }}>
              Free site visit · Free AC cab
            </span>
            <h2
              id="visit-modal-title"
              style={{
                fontSize: "24px",
                fontWeight: 800,
                marginTop: "6px",
                color: "var(--band-ink)",
              }}
            >
              Book your free site visit
            </h2>
            <p
              style={{
                fontSize: "13px",
                marginTop: "6px",
                color: "var(--band-muted)",
              }}
            >
              Floor plans &amp; price sheet before you go. 0% buyer brokerage.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close site visit booking card"
            className="size-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#FFFFFF",
              border: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form
          className="gh-form"
          style={{ borderRadius: 0 }}
          noValidate
          onSubmit={handleVisitSubmit}
        >
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
            <label htmlFor="modal-v-name">Full name</label>
            <input
              id="modal-v-name"
              autoComplete="name"
              placeholder="Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="gh-field">
            <label htmlFor="modal-v-phone">WhatsApp number</label>
            <input
              id="modal-v-phone"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98225 78324"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="gh-field">
            <label htmlFor="modal-v-project">Home you want to see</label>
            <select
              id="modal-v-project"
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
            <label htmlFor="modal-v-day">Preferred day</label>
            <select
              id="modal-v-day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="This Saturday">This Saturday</option>
              <option value="This Sunday">This Sunday</option>
              <option value="A weekday evening">A weekday evening</option>
            </select>
          </div>

          <label className="gh-consent full">
            <input
              type="checkbox"
              id="modal-v-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>
              I agree to receive floor plans, price sheets and visit schedules on WhatsApp or
              phone.
            </span>
          </label>

          {errorMsg && (
            <div className="gh-err full" role="alert">
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
              onClick={handleCallbackClick}
              disabled={isSubmitting}
            >
              Request a call back
            </button>
          </div>

          {okMsg && (
            <div className="gh-ok full" role="status">
              {okMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
