"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Location } from "../../lib/data/locations";
import { searchLocations, buildPrefillQuery } from "../../lib/search";
import { SearchInput } from "../search-input";
import { getLocationImagePath } from "../../lib/utils/images-client";

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
        <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((location) => {
            const imagePath = getLocationImagePath(location.slug);
            return (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group overflow-hidden bg-white text-center"
              >
                {imagePath && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={imagePath}
                      alt={location.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="py-4">
                  <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-[#5D5838]">{location.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="border border-[#5D5838]/20 bg-[#F8F7F4] p-8 text-sm text-[#1B1B1B]">
          <p className="font-semibold text-[#5D5838]">We can help with &ldquo;{query}&rdquo;.</p>
          <p className="mt-2 text-[#3F3F3F]">
            Provide the target jurisdiction and we will assign Pennsylvania counsel to confirm transfer tax and closing requirements.
          </p>
          <Link
            href={`/contact?projectType=${buildPrefillQuery(query || "Other")}#lead-form`}
            className="mt-6 inline-flex bg-[#5D5838] px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#454326]"
          >
            Contact advisor
          </Link>
        </div>
      )}
    </div>
  );
}
