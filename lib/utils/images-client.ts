/**
 * Client-safe utility functions for getting image paths
 * These don't use fs and can be used in client components
 */

/**
 * Get the verified image path for a location by slug (client-safe).
 * University City uses the closest available Philadelphia skyline asset until
 * a dedicated neighborhood image is added.
 */
export function getLocationImagePath(slug: string): string | null {
  const imageMap: Record<string, string> = {
    'center-city-philadelphia-pa': '/locations/1031-exchange-Center-City-Philadelphia-PA.jpg',
    'university-city-philadelphia-pa': '/locations/1031-exchange-Center-City-Philadelphia-PA.jpg',
    'fishtown-philadelphia-pa': '/locations/1031-exchange-Fishtown-Philadelphia-PA.avif',
    'manayunk-philadelphia-pa': '/locations/1031-exchange-Manayunk-Philadelphia-PA.jpg',
    'old-city-philadelphia-pa': '/locations/1031-exchange-Old-City-Philadelphia-PA.jpg',
    'society-hill-philadelphia-pa': '/locations/1031-exchange-Society-Hill-Philadelphia-PA.jpg',
    'bala-cynwyd-pa': '/locations/1031-exchange-Bala-Cynwyd-PA.jpg',
    'king-of-prussia-pa': '/locations/1031-exchange-King-of-Prussia-PA.jpg',
    'conshohocken-pa': '/locations/1031-exchange-Conshohocken-PA.jpg',
    'fort-washington-pa': '/locations/1031-exchange-Fort-Washington-PA.jpg',
    'wynnewood-pa': '/locations/1031-exchange-Wynnewood-PA.jpg',
    'ardmore-pa': '/locations/1031-exchange-Ardmore-PA.jpg',
    'narberth-pa': '/locations/1031-exchange-Narberth-PA.jpg',
    'haverford-pa': '/locations/1031-exchange-Haverford-PA.jpg',
    'bryn-mawr-pa': '/locations/1031-exchange-Bryn-Mawr-PA.jpg',
    'wayne-pa': '/locations/1031-exchange-Wayne-PA.jpg',
    'radnor-pa': '/locations/1031-exchange-Radnor-PA.jpg',
    'media-pa': '/locations/1031-exchange-Media-PA.jpg',
    'west-chester-pa': '/locations/1031-exchange-West-Chester-PA.jpg',
    'doylestown-pa': '/locations/1031-exchange-Doylestown-PA.jpg',
    'newtown-pa': '/locations/1031-exchange-Newtown-PA.jpg',
    'langhorne-pa': '/locations/1031-exchange-Langhorne-PA.jpg',
    'remote': '/locations/1031-exchange-Nationwide-Remote.webp',
    'wilmington-de': '/locations/1031-exchange-Wilmington-DE.jpg',
    'trenton-nj': '/locations/1031-exchange-Trenton-NJ.webp',
  };

  return imageMap[slug] ?? null;
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
