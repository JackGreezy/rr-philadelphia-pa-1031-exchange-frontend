"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Location } from "../../lib/data/locations";
import { searchLocations, buildPrefillQuery } from "../../lib/search";
import { SearchInput } from "../search-input";
import { getLocationImageBasePath } from "../../lib/utils/images-client";

type LocationsBrowserProps = {
  locations: Location[];
};

export function LocationsBrowser({ locations }: LocationsBrowserProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) {
      return locations;
    }
    const results = searchLocations(query);
    return results.filter((location) => locations.some((item) => item.slug === location.slug));
  }, [locations, query]);
  const hasResults = filtered.length > 0;

  return (
    <div className="space-y-8">
      <SearchInput
        label="Location search"
        placeholder="Search by neighborhood or county..."
        defaultValue={query}
        onSearch={(value) => setQuery(value)}
      />
      {hasResults ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((location) => {
            const imageBasePath = getLocationImageBasePath(location.slug);
            // Try common extensions - webp, jpg, avif
            const imagePaths = imageBasePath ? [
              `${imageBasePath}.webp`,
              `${imageBasePath}.jpg`,
              `${imageBasePath}.avif`,
              `${imageBasePath}.jpeg`,
              `${imageBasePath}.png`,
            ] : [];
            return (
              <article key={location.slug} className="group overflow-hidden rounded-3xl border border-outline/15 bg-white shadow-sm transition-shadow hover:shadow-lg">
                {imageBasePath && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={imagePaths[0]}
                      alt={location.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
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
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Service area</p>
                  <h3 className="mt-2 text-xl font-semibold text-heading">{location.name}</h3>
                  <p className="mt-3 text-sm text-[#3F3F3F]">{location.shortDescription}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[#3F3F3F]">
                    {location.highlights.slice(0, 3).map((highlight) => (
                      <li key={highlight}>• {highlight}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
                    <Link href={`/locations/${location.slug}`} className="underline underline-offset-4">
                      View location
                    </Link>
                    <Link
                      href={`/contact?projectType=${buildPrefillQuery(location.name)}#contact-form`}
                      className="underline underline-offset-4"
                    >
                      Contact advisor
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 text-sm text-[#1B1B1B]">
          <p className="font-semibold text-heading">We can help with “{query}”.</p>
          <p className="mt-2">
            Provide the target jurisdiction and we will assign Pennsylvania counsel to confirm transfer tax and closing requirements.
          </p>
          <Link
            href={`/contact?projectType=${buildPrefillQuery(query || "Other")}#lead-form`}
            className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33]"
          >
            Contact advisor
          </Link>
        </div>
      )}
    </div>
  );
}

