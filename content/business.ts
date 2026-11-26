import type { OpeningHours } from '../lib/hours.ts';

export interface ShopOpeningHours extends OpeningHours {
  /** Optional short note shown alongside the day's hours (e.g. late opening). */
  note?: string;
}

export interface ShopAddress {
  /** Street number and name. */
  street: string;
  /** Town or city. */
  locality: string;
  /** Postal code. */
  postcode: string;
  /** Country name. */
  country: string;
  /** Note for template owners explaining the demo pin. */
  landmarkNote: string;
  /** Practical walking and step-free access note for visitors. */
  directionsNote: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by metadata and structured data. */
  introduction: string;
  /** Year the shop opened, shown in the running head. */
  established: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public telephone number; blank hides it. */
  phone: string;
  /** Physical shopfront address and directions. */
  address: ShopAddress;
  /** Seven same-day weekly opening hours records (Monday through Sunday). */
  openingHours: readonly ShopOpeningHours[];
  /** IANA time zone matching site.config.json `timeZone`. */
  timeZone: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Warm enquiry introduction; no booking, payment or delivery promises. */
    introduction: string;
    /** Explicit confirmation notice shown near the form and notices. */
    confirmationNotice: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'The Lamplit Page',
  tagline: "Good books, a warm lamp and someone who's read them.",
  introduction:
    "The Lamplit Page is a cosy independent bookshop on Victoria Street, Edinburgh, with handwritten staff picks, author readings, a children's story hour and a monthly book club by the fire.",
  established: '2011',
  email: 'hello@example.com',
  phone: '0131 496 0732',
  address: {
    street: '41 Victoria Street',
    locality: 'Edinburgh',
    postcode: 'EH1 2JL',
    country: 'Scotland',
    landmarkNote:
      'Demo pin on the curve of Victoria Street below Edinburgh Castle, a short walk from the Grassmarket. Replace with your own shopfront when adapting this site.',
    directionsNote:
      'Two minutes downhill from George IV Bridge; the shop has one step at the door and a portable ramp on request.',
  },
  openingHours: [
    { day: 'Monday', opens: '10:00', closes: '18:00' },
    { day: 'Tuesday', opens: '10:00', closes: '18:00' },
    { day: 'Wednesday', opens: '10:00', closes: '18:00' },
    { day: 'Thursday', opens: '10:00', closes: '20:30', note: 'late opening for readings' },
    { day: 'Friday', opens: '10:00', closes: '18:00' },
    { day: 'Saturday', opens: '09:30', closes: '18:00' },
    { day: 'Sunday', opens: '11:00', closes: '17:00' },
  ],
  timeZone: 'Europe/London',
  enquiries: {
    title: 'Write to the shop',
    introduction:
      'Looking for a particular book, a seat on Thursday night or a place at the book club? Write to us and a bookseller will reply, usually within a day.',
    confirmationNotice: 'Nothing is held or ordered until a bookseller replies to confirm.',
    usefulToInclude: [
      "the title, author or ISBN you're after, and whether you'd prefer new or secondhand",
      'for events: which event and how many seats',
      "for the book club: which month you'd like to start",
      "a phone number if you'd rather we rang you",
    ],
  },
};

export function formattedAddress(address: ShopAddress = business.address): string {
  return `${address.street}, ${address.locality} ${address.postcode}, ${address.country}`;
}
