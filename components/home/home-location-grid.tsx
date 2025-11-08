"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Location } from "../../lib/data/locations";
import { searchLocations, buildPrefillQuery } from "../../lib/search";
import { SearchInput } from "../search-input";
import { getLocationImageBasePath } from "../../lib/utils/images-client";

type FeaturedLocationCard = {
  name: string;
  description: string;
  slug: string;
};

type HomeLocationGridProps = {
  featuredSlugs: string[];
  locations: Location[];
  featuredCards: FeaturedLocationCard[];
};

export function HomeLocationGrid({ featuredSlugs, locations, featuredCards }: HomeLocationGridProps) {
  const [query, setQuery] = useState("");

  const featured = useMemo(
    () =>
      featuredSlugs
        .map((slug) => locations.find((location) => location.slug === slug))
        .filter((location): location is NonNullable<typeof location> => Boolean(location)),
    [featuredSlugs, locations]
  );

  const filtered = useMemo(() => {
    if (!query) {
      return featured;
    }
    return searchLocations(query).slice(0, 8);
  }, [featured, query]);

  const hasResults = filtered.length > 0;

  return (
    <div className="space-y-6">
      <SearchInput
        label="Search service areas"
        placeholder="Search Philadelphia neighborhoods or suburbs..."
        defaultValue={query}
        onSearch={(value) => setQuery(value)}
      />
      {query ? (
        hasResults ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((location) => {
              const imageBasePath = getLocationImageBasePath(location.slug);
              return (
                <article key={location.slug} className="group overflow-hidden rounded-3xl border border-outline/15 bg-panel text-sm text-[#3F3F3F] transition-shadow hover:shadow-lg">
                  {imageBasePath && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={`${imageBasePath}.webp`}
                        alt={location.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const currentSrc = target.src;
                          const basePath = currentSrc.replace(/\.(webp|avif|jpg|jpeg|png)$/, '');
                          const extensions = ['.jpg', '.avif', '.jpeg', '.png'];
                          const currentExt = currentSrc.match(/\.(webp|avif|jpg|jpeg|png)$/)?.[0];
                          const currentIndex = extensions.indexOf(currentExt || '');
                          if (currentIndex < extensions.length - 1) {
                            target.src = `${basePath}${extensions[currentIndex + 1]}`;
                          }
                        }}
                      />
                    </div>
                  )}
                  <div className="p-5 lg:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Service area</p>
                    <h3 className="mt-2 text-lg font-semibold text-heading">{location.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3F3F3F]">{location.shortDescription}</p>
                    <div className="mt-4 flex items-center justify-between gap-4 text-xs font-semibold text-primary">
                      <Link href={`/locations/${location.slug}`} className="underline underline-offset-4">
                        View location
                      </Link>
                      <Link
                        href={`/contact?projectType=${buildPrefillQuery(location.name)}#contact-form`}
                        className="underline underline-offset-4"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 text-sm text-[#1B1B1B]">
            <p className="font-semibold text-heading">We can help with "{query}".</p>
            <p className="mt-2">
              Tell us which jurisdiction you are targeting and we will assign the appropriate Pennsylvania exchange advisor.
            </p>
            <Link
              href={`/contact?projectType=${buildPrefillQuery(query || "Other location")}#lead-form`}
              className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33]"
            >
              Contact advisor
            </Link>
          </div>
        )
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredCards.map((location) => {
            const imageBasePath = getLocationImageBasePath(location.slug);
            return (
              <article key={location.slug} className="group overflow-hidden rounded-3xl border border-outline/15 bg-panel text-sm text-[#3F3F3F] transition-shadow hover:shadow-lg">
                {imageBasePath && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={`${imageBasePath}.webp`}
                      alt={location.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const currentSrc = target.src;
                        const basePath = currentSrc.replace(/\.(webp|avif|jpg|jpeg|png)$/, '');
                        const extensions = ['.jpg', '.avif', '.jpeg', '.png'];
                        const currentExt = currentSrc.match(/\.(webp|avif|jpg|jpeg|png)$/)?.[0];
                        const currentIndex = extensions.indexOf(currentExt || '');
                        if (currentIndex < extensions.length - 1) {
                          target.src = `${basePath}${extensions[currentIndex + 1]}`;
                        }
                      }}
                    />
                  </div>
                )}
                <div className="p-5 lg:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Service area</p>
                  <h3 className="mt-2 text-lg font-semibold text-heading">{location.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3F3F3F]">{location.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-4 text-xs font-semibold text-primary">
                    <Link href={`/locations/${location.slug}`} className="underline underline-offset-4">
                      View location
                    </Link>
                    <Link
                      href={`/contact?projectType=${buildPrefillQuery(location.name)}#contact-form`}
                      className="underline underline-offset-4"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

