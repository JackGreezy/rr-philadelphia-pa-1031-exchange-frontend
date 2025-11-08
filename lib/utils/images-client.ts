/**
 * Client-safe utility functions for getting image paths
 * These don't use fs and can be used in client components
 */

/**
 * Get the base image path for a location by slug (client-safe)
 * Returns the base path without extension - components should try multiple extensions
 */
export function getLocationImageBasePath(slug: string): string | null {
  const nameMap: Record<string, string> = {
    'center-city-philadelphia-pa': 'Center-City-Philadelphia-PA',
    'university-city-philadelphia-pa': 'University-City-Philadelphia-PA',
    'fishtown-philadelphia-pa': 'Fishtown-Philadelphia-PA',
    'manayunk-philadelphia-pa': 'Manayunk-Philadelphia-PA',
    'old-city-philadelphia-pa': 'Old-City-Philadelphia-PA',
    'society-hill-philadelphia-pa': 'Society-Hill-Philadelphia-PA',
    'bala-cynwyd-pa': 'Bala-Cynwyd-PA',
    'king-of-prussia-pa': 'King-of-Prussia-PA',
    'conshohocken-pa': 'Conshohocken-PA',
    'fort-washington-pa': 'Fort-Washington-PA',
    'wynnewood-pa': 'Wynnewood-PA',
    'ardmore-pa': 'Ardmore-PA',
    'narberth-pa': 'Narberth-PA',
    'haverford-pa': 'Haverford-PA',
    'bryn-mawr-pa': 'Bryn-Mawr-PA',
    'wayne-pa': 'Wayne-PA',
    'radnor-pa': 'Radnor-PA',
    'media-pa': 'Media-PA',
    'west-chester-pa': 'West-Chester-PA',
    'doylestown-pa': 'Doylestown-PA',
    'newtown-pa': 'Newtown-PA',
    'langhorne-pa': 'Langhorne-PA',
    'remote': 'Nationwide-Remote',
    'wilmington-de': 'Wilmington-DE',
    'trenton-nj': 'Trenton-NJ',
  };

  const displayName = nameMap[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
  return `/locations/1031-exchange-${displayName}`;
}

/**
 * Get the base image path for a property type by slug (client-safe)
 */
export function getPropertyTypeImageBasePath(slug: string): string | null {
  const nameMap: Record<string, string> = {
    'multifamily-communities': 'Multifamily-Communities',
    'triple-net-retail': 'Triple-Net-Retail',
    'industrial-flex-buildings': 'Industrial-Flex-Buildings',
    'medical-office': 'Medical-Office',
    'hospitality-assets': 'Hospitality-Assets',
    'land-for-development': 'Land-for-Development',
    'self-storage-facilities': 'Self-Storage-Facilities',
    'office-buildings': 'Office-Buildings',
    'mixed-use-properties': 'Mixed-Use-Properties',
    'student-housing': 'Student-Housing',
  };

  const displayName = nameMap[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
  return `/property-types/1031-exchange-${displayName}`;
}

