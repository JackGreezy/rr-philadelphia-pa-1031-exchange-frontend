import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { propertyTypes } from "../../../lib/data/property-types";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { CTASection } from "../../../components/cta-section";
import { SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../../lib/config/site";
import { getPropertyTypeImagePath } from "../../../lib/utils/images";

type PropertyTypePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return propertyTypes.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: PropertyTypePageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = propertyTypes.find((item) => item.slug === slug);
  if (!property) {
    return {};
  }
  return {
    title: property.metadata.title,
    description: property.metadata.description,
    alternates: {
      canonical: `${SITE_URL}/property-types/${property.slug}`,
    },
  };
}

export default async function PropertyTypePage({ params }: PropertyTypePageProps) {
  const { slug } = await params;
  const property = propertyTypes.find((item) => item.slug === slug);
  if (!property) {
    notFound();
  }

  const imagePath = getPropertyTypeImagePath(property.slug);

  return (
    <div className="bg-[#F4F3EE]">
      <section className="container space-y-6 py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Property Types", href: "/property-types" },
            { label: property.name },
          ]}
        />
        {imagePath && (
          <div className="relative -mx-6 mb-8 h-64 overflow-hidden rounded-2xl sm:-mx-8 sm:rounded-3xl md:h-80 lg:h-96">
            <Image
              src={imagePath}
              alt={property.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B68F40]">Property Type</p>
          <h1 className="text-4xl font-semibold text-heading">{property.name}</h1>
          <p className="text-lg text-[#353535]">{property.summary}</p>
        </div>
      </section>
      <section className="container space-y-12 bg-white py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <article className="space-y-6">
            {/* Main Description */}
            {property.mainDescription ? (
              <div
                className="space-y-4 text-sm text-[#3F3F3F] prose prose-sm max-w-none prose-headings:text-heading prose-headings:font-semibold prose-p:text-[#3F3F3F] prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: property.mainDescription }}
              />
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[#3F3F3F]">{property.summary}</p>
              </div>
            )}

            {/* How we support section */}
            <div className="rounded-3xl border border-outline/15 bg-panel p-6">
              <h2 className="text-xl font-semibold text-heading">How we support this asset class in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.</h2>
              <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
                {property.highlights.map((highlight) => (
                  <li key={highlight}>• {highlight}</li>
                ))}
              </ul>
            </div>

            {/* Common Situations */}
            {property.commonSituations && property.commonSituations.length > 0 && (
              <div className="rounded-3xl border border-outline/15 bg-panel p-6">
                <h2 className="text-xl font-semibold text-heading">Common situations.</h2>
                <ul className="mt-4 space-y-3 text-sm text-[#3F3F3F]">
                  {property.commonSituations.map((situation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-[#B68F40]">•</span>
                      <span>{situation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Considerations */}
            {property.keyConsiderations && property.keyConsiderations.length > 0 && (
              <div className="rounded-3xl border border-outline/15 bg-panel p-6">
                <h2 className="text-xl font-semibold text-heading">Key considerations.</h2>
                <ul className="mt-4 space-y-3 text-sm text-[#3F3F3F]">
                  {property.keyConsiderations.map((consideration, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-[#B68F40]">•</span>
                      <span>{consideration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Market Insights */}
            {property.marketInsights && (
              <div className="rounded-3xl border border-outline/15 bg-panel p-6">
                <h2 className="text-xl font-semibold text-heading">Market insights.</h2>
                <p className="mt-4 text-sm text-[#3F3F3F] leading-relaxed">{property.marketInsights}</p>
              </div>
            )}
          </article>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <div className="rounded-3xl border border-outline/15 bg-panel p-6">
              <h2 className="text-lg font-semibold text-heading">Ready to explore {property.name.toLowerCase()}?</h2>
              <p className="mt-2 text-sm text-[#3F3F3F]">
                Connect with a Philadelphia exchange advisor to discuss replacement property opportunities and timeline coordination.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={`/contact?projectType=${encodeURIComponent(property.name)}#contact-form`}
                  className="inline-flex justify-center rounded-full bg-[#B68F40] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#8A6B2F]"
                >
                  Contact advisor
                </a>
                <p className="text-xs text-[#6B6B6B] text-center">
                  Educational content only. Not tax or legal advice. Coordinate with your qualified intermediary and tax counsel.
                </p>
              </div>
            </div>
          </aside>
        </div>
        <CTASection locationName={property.name} />
      </section>
    </div>
  );
}

