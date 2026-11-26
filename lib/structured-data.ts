import { business } from '../content/business.ts';
import { events } from '../content/events.ts';
import { absoluteUrl } from './paths.ts';

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    postalCode: business.address.postcode,
    addressCountry: business.address.country,
  };
}

/** BookStore structured data derived from content/business.ts. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  return {
    '@context': 'https://schema.org',
    '@type': 'BookStore',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    address: postalAddress(),
    openingHoursSpecification: business.openingHours
      .filter((entry) => entry.opens && entry.closes)
      .map((entry) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: entry.day,
        opens: entry.opens,
        closes: entry.closes,
      })),
  };
}

/** Event structured data derived from content/events.ts; no availability or booking claims. */
export function eventsStructuredData() {
  const eventsUrl = absoluteUrl('/events/');
  return events.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: `${event.date}T${event.start}:00`,
    endDate: `${event.date}T${event.end}:00`,
    ...(eventsUrl ? { url: `${eventsUrl}#${event.id}` } : {}),
    location: {
      '@type': 'Place',
      name: business.name,
      address: postalAddress(),
    },
    ...(event.guest
      ? {
          performer: {
            '@type': 'Person',
            name: event.guest,
          },
        }
      : {}),
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'GBP',
    },
  }));
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
