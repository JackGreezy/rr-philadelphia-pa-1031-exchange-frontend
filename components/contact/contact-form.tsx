"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { PHONE_DISPLAY, CONTACT_EMAIL } from "../../lib/config/site";
import { isTurnstileEnabled, TURNSTILE_SITE_KEY } from "../../lib/turnstile";

type ContactFormProps = {
  variant?: "default" | "dark";
};

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hasCompleted1031: false,
    notes: "",
  });

  const updateField = (field: "name" | "email" | "phone" | "notes") => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const updateHasCompleted1031 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, hasCompleted1031: event.target.checked }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email.";
    if (!formData.phone.trim()) errors.phone = "Phone is required.";
    return errors;
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isTurnstileEnabled()) {
      setTurnstileLoaded(true);
      return;
    }

    const checkTurnstile = () => {
      if (typeof window !== "undefined" && window.turnstile && turnstileRef.current) {
        try {
          const widgetId = window.turnstile.render(turnstileRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            callback: () => {},
            "error-callback": () => {
              setStatus("Captcha verification failed. Please try again.");
            },
          });
          turnstileWidgetIdRef.current = widgetId;
          setTurnstileLoaded(true);
        } catch (error) {
          console.error("Turnstile render error:", error);
        }
      }
    };

    if (typeof window !== "undefined" && window.turnstile) {
      checkTurnstile();
    } else {
      const interval = setInterval(() => {
        if (typeof window !== "undefined" && window.turnstile) {
          clearInterval(interval);
          checkTurnstile();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("Please resolve the highlighted fields before submitting.");
      return;
    }

    if (isTurnstileEnabled() && (!turnstileLoaded || !turnstileWidgetIdRef.current)) {
      setStatus("Please wait for security verification to load.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("hasCompleted1031", formData.hasCompleted1031 ? "Yes" : "No");
      formDataToSend.append("notes", formData.notes);

      if (isTurnstileEnabled() && turnstileWidgetIdRef.current && window.turnstile && window.turnstile.getResponse) {
        const token = window.turnstile.getResponse(turnstileWidgetIdRef.current);
        if (!token) {
          setStatus("Please complete the security verification.");
          setIsSubmitting(false);
          return;
        }
        formDataToSend.append("cf-turnstile-response", token);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed.");
      }

      setStatus("Thank you. A Philadelphia exchange advisor will respond shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        hasCompleted1031: false,
        notes: "",
      });
      formRef.current?.reset();

      if (isTurnstileEnabled() && turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We could not submit your request. Please try again.");
      if (isTurnstileEnabled() && turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = variant === "dark";
  const formClassName = isDark
    ? "space-y-6 border border-white/20 bg-white/5 p-8 backdrop-blur"
    : "space-y-6 border border-[#5D5838]/10 bg-white p-8";
  const labelClassName = isDark
    ? "flex flex-col text-sm font-medium text-white"
    : "flex flex-col text-sm font-medium text-[#5D5838]";
  const inputClassName = (hasError: boolean) =>
    isDark
      ? `mt-2 border px-4 py-3 text-sm text-white outline-none transition focus:border-white focus:ring-0 ${
          hasError ? "border-red-400 bg-white/10" : "border-white/30 bg-white/10"
        }`
      : `mt-2 border px-4 py-3 text-sm text-[#1B1B1B] outline-none transition focus:border-[#5D5838] focus:ring-0 ${
          hasError ? "border-red-400" : "border-[#5D5838]/20"
        }`;
  const errorClassName = isDark ? "mt-2 text-xs text-red-300" : "mt-2 text-xs text-red-500";
  const statusClassName = (isSuccess: boolean) =>
    isDark
      ? `text-sm font-medium ${isSuccess ? "text-green-300" : "text-red-300"}`
      : `text-sm font-medium ${isSuccess ? "text-green-600" : "text-red-600"}`;

  return (
    <form
      id="contact-form"
      ref={formRef}
      className={formClassName}
      onSubmit={handleSubmit}
      noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClassName}>
          Name
          <input
            type="text"
            value={formData.name}
            onChange={updateField("name")}
            className={inputClassName(!!errors.name)}
            autoComplete="name"
            placeholder="Full name" name="name" required/>
          {errors.name ? <span className={errorClassName}>{errors.name}</span> : null}
        </label>
        <label className={labelClassName}>
          Phone Number
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              // Only allow numbers, spaces, parentheses, hyphens, and plus sign
              const value = e.target.value.replace(/[^\d\s()\-+]/g, "");
              setFormData((prev) => ({ ...prev, phone: value }));
            }}
            className={inputClassName(!!errors.phone)}
            autoComplete="tel"
            placeholder="(###) ###-####" name="phone" required/>
          {errors.phone ? <span className={errorClassName}>{errors.phone}</span> : null}
        </label>
        <label className={labelClassName}>
          Email
          <input
            type="email"
            value={formData.email}
            onChange={updateField("email")}
            className={inputClassName(!!errors.email)}
            autoComplete="email"
            placeholder="name@example.com" name="email" required/>
          {errors.email ? <span className={errorClassName}>{errors.email}</span> : null}
        </label>
      </div>
      <label className={`${labelClassName} flex-row items-center gap-3`}>
        <input type="hidden" name="hasCompleted1031" value="No" />
        <input
          type="checkbox"
          name="hasCompleted1031"
          value="Yes"
          checked={formData.hasCompleted1031}
          onChange={updateHasCompleted1031}
          className="h-4 w-4 shrink-0"
        />
        Have you completed a 1031 exchange before?
      </label>
      <label className={labelClassName}>
        Notes
        <textarea
          className={inputClassName(false)}
          name="notes"
          rows={5}
          value={formData.notes}
          onChange={updateField("notes")}
          placeholder="Share any exchange questions or context"></textarea>
      </label>

      <div className={`flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between ${isDark ? "text-white/80" : "text-[#3F3F3F]"}`}>
        <button
          type="submit"
          className={`inline-flex px-8 py-3 text-xs font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed ${
            isDark
              ? "border border-white bg-transparent text-white hover:bg-white hover:text-[#5D5838] focus-visible:outline-white"
              : "bg-[#5D5838] text-white hover:bg-[#454326] focus-visible:outline-[#5D5838]"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Get Started Today"}
        </button>
        <p className={isDark ? "text-xs text-white/60" : "text-xs text-[#6B6B6B]"}>
          Educational content only. Not tax or legal advice. You may also reach us at {PHONE_DISPLAY} or {CONTACT_EMAIL}.
        </p>
      </div>
      {status ? <p className={statusClassName(status.includes("Thank you"))}>{status}</p> : null}

    </form>
  );
}


