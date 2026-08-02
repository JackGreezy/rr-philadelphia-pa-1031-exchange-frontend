import { ContactFormWrapper } from "./contact-form";
import { PHONE_DISPLAY, PHONE_E164 } from "../../lib/config/site";

export const metadata = {
  title: "Free 1031 Exchange Consultation | Philadelphia",
  description: "Talk with a Philadelphia 1031 exchange expert about your sale, deadlines, direct replacement property, or passive DST options.",
};

export default function ContactPage() {
  return (
    <main className="bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-12 text-center">
          <span className="subheading mb-4 block">Free Exchange Guidance</span>
          <h1 className="heading-display text-white">
            Talk to a 1031 Exchange Expert
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            Share what you are selling, where the transaction stands, and what you want from the replacement. The first conversation is free.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <aside className="border border-brand-copper/45 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-sm sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-copper">Prefer to talk now?</p>
            <h2 className="mt-4 text-2xl font-normal text-white">Speak directly with a Philadelphia 1031 expert.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">Get help organizing the sale, qualified intermediary introduction, replacement-property search, DST comparison, and deadline plan.</p>
            <a
              href={`tel:${PHONE_E164}`}
              className="mt-7 inline-flex w-full items-center justify-center gap-3 bg-brand-copper px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-brand-dark transition-colors hover:bg-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              Call Now {PHONE_DISPLAY}
            </a>
            <p className="mt-5 text-xs leading-relaxed text-white/60">No-cost introductory guidance. Tax, legal, securities, and qualified-intermediary services remain with the appropriate independent professionals.</p>
          </aside>
          <ContactFormWrapper />
        </div>
      </div>
    </main>
  );
}
