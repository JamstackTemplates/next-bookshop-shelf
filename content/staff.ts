import type { ShelfId } from './shelves.ts';

export type StaffId = 'morag' | 'callum' | 'priya' | 'effie';

export interface StaffMember {
  /** Stable, lowercase, URL-safe slug referenced by staff picks. */
  id: StaffId;
  /** Bookseller's full name. */
  name: string;
  /** Role in the shop. */
  role: string;
  /** Favourite shelf (must match a shelf ID in content/shelves.ts). */
  shelf: ShelfId;
  /** One-sentence bio printed on their ex-libris bookplate. */
  bio: string;
}

export const staff: readonly StaffMember[] = [
  {
    id: 'morag',
    name: 'Morag Lennie',
    role: 'Owner',
    shelf: 'fiction',
    bio: 'Opened the shop in 2011 and still reads the first page of everything that comes in.',
  },
  {
    id: 'callum',
    name: 'Callum Reid',
    role: 'Bookseller & events',
    shelf: 'crime',
    bio: 'Runs Thursday readings and keeps the crime shelf alarmingly well stocked.',
  },
  {
    id: 'priya',
    name: 'Priya Nair',
    role: 'Bookseller',
    shelf: 'nonfiction',
    bio: 'Reads history, nature writing and anything with good footnotes.',
  },
  {
    id: 'effie',
    name: 'Effie Douglas',
    role: "Children's books",
    shelf: 'children',
    bio: 'Hosts Saturday story hour and does all the voices.',
  },
];

export const staffById: Readonly<Record<StaffId, StaffMember>> = Object.fromEntries(
  staff.map((member) => [member.id, member]),
) as Record<StaffId, StaffMember>;
