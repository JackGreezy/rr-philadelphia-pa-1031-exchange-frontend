"use client";

import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_E164 } from "../lib/config/site";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 180);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-full max-w-[320px] -translate-x-1/2 sm:max-w-lg sm:translate-x-0 sm:left-auto sm:right-6">
      {/* Mobile: Collapsible CTA */}
      <div className="sm:hidden">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full rounded-full border border-outline/15 bg-white px-4 py-3 shadow-2xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Need guidance?</p>
                <p className="text-sm font-semibold text-[#1B1B1B]">{PHONE_DISPLAY}</p>
              </div>
              <span className="text-2xl text-primary">+</span>
            </div>
          </button>
        ) : (
          <div className="rounded-2xl border border-outline/15 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Need guidance?</p>
                <p className="text-sm font-semibold text-[#1B1B1B]">{PHONE_DISPLAY}</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-2xl text-primary transition-colors hover:text-[#0f1c33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${PHONE_E164}`}
                className="flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                href="/contact#contact-form"
                className="flex items-center justify-center rounded-full border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get In Touch
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden sm:block rounded-full border border-outline/15 bg-white px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Need guidance?</p>
            <p className="text-sm text-[#1B1B1B]">Schedule your 1031 consultation today.</p>
          </div>
          <a
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            href="/contact#contact-form"
          >
            Contact Advisor
          </a>
        </div>
      </div>
    </div>
  );
}

