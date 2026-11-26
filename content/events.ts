export type EventKind = 'reading' | 'signing' | 'launch' | 'story-hour' | 'book-club';
export type SeatStatus = 'open' | 'few-left' | 'full';

export interface ShopEvent {
  /** Stable, lowercase, URL-safe slug. */
  id: string;
  /** Event title shown on date slips, ticket stubs and schema. */
  title: string;
  /** Programme category used for filtering and icons. */
  kind: EventKind;
  /** Local date in Europe/London as YYYY-MM-DD. List events in chronological order. */
  date: string;
  /** Local start time in 24-hour HH:MM (Europe/London). */
  start: string;
  /** Local end time in 24-hour HH:MM (Europe/London), after start on the same day. */
  end: string;
  /** Visiting author or shop host (optional for story hours). */
  guest?: string;
  /** Optional reference to a staff-pick ID in content/staff-picks.ts. */
  bookId?: string;
  /** Ticket price in GBP (£); 0 means free, maximum £15. Paid in the shop. */
  price: number;
  /** Optional note about ticket redemption or refreshments. */
  ticketNote?: string;
  /** Current seat availability; 'full' invites readers to ask about the waiting list. */
  seats: SeatStatus;
  /** Warm, specific description (80–260 characters). */
  description: string;
}

export const events: readonly ShopEvent[] = [
  {
    id: 'book-club-december',
    title: 'Fireside Book Club: The Salt Road House',
    kind: 'book-club',
    date: '2026-12-01',
    start: '18:30',
    end: '20:00',
    guest: 'Morag Lennie',
    bookId: 'the-salt-road-house',
    price: 0,
    seats: 'open',
    description:
      'Morag leads December’s Fireside Book Club on Isla Mackintosh’s coastal novel. Pull up a chair in the back room for tea, biscuits and lively conversation.',
  },
  {
    id: 'reading-torin-abernethy',
    title: 'An evening with Torin Abernethy',
    kind: 'reading',
    date: '2026-12-03',
    start: '19:00',
    end: '20:15',
    guest: 'Torin Abernethy',
    bookId: 'a-quiet-matter-of-glass',
    price: 5,
    ticketNote: 'Redeemable against the book on the night',
    seats: 'few-left',
    description:
      'Torin reads from his new Leith-set mystery, then takes questions by the fire. Mulled apple juice and shortbread provided.',
  },
  {
    id: 'story-hour-winter-tales',
    title: 'Saturday Story Hour: Winter Tales',
    kind: 'story-hour',
    date: '2026-12-05',
    start: '10:00',
    end: '10:45',
    guest: 'Effie Douglas',
    bookId: 'wee-fox-and-the-lantern',
    price: 0,
    seats: 'open',
    description:
      'Effie reads snowy picture books for ages 3 to 6, starting with Wee Fox and the Lantern. Cushions on the rug and warm juice afterwards.',
  },
  {
    id: 'poetry-by-lamplight',
    title: 'Poetry by Lamplight with Fenella Grant',
    kind: 'reading',
    date: '2026-12-10',
    start: '19:00',
    end: '20:15',
    guest: 'Fenella Grant',
    bookId: 'small-hours',
    price: 5,
    ticketNote: 'Redeemable against the book on the night',
    seats: 'full',
    description:
      'A quiet Thursday night of poems from Small Hours, read by lamp and candlelight after the shop door locks. Signing to follow.',
  },
  {
    id: 'signing-mairi-cowan',
    title: 'Signing: Mairi Cowan',
    kind: 'signing',
    date: '2026-12-12',
    start: '11:00',
    end: '13:00',
    guest: 'Mairi Cowan',
    bookId: 'wee-fox-and-the-lantern',
    price: 0,
    seats: 'open',
    description:
      'Drop by the children’s table to meet Mairi Cowan, see her original ink sketches and have a copy of Wee Fox and the Lantern dedicated.',
  },
  {
    id: 'book-club-january',
    title: 'Fireside Book Club: North of the Close',
    kind: 'book-club',
    date: '2027-01-05',
    start: '18:30',
    end: '20:00',
    guest: 'Callum Reid',
    bookId: 'north-of-the-close',
    price: 0,
    seats: 'open',
    description:
      'Callum hosts January’s gathering on Ewan Baird’s Old Town tenement novel. New readers are always welcome — ask ahead so we can set out a chair.',
  },
  {
    id: 'launch-the-weight-of-rivers',
    title: 'Paperback launch: The Weight of Rivers',
    kind: 'launch',
    date: '2027-01-14',
    start: '19:00',
    end: '20:30',
    guest: 'Ada Okonkwo-Bell',
    bookId: 'the-weight-of-rivers',
    price: 0,
    seats: 'open',
    description:
      'Celebrate the paperback edition with Ada Okonkwo-Bell in conversation with Priya Nair about walking six British rivers and the towns along their banks.',
  },
  {
    id: 'story-hour-burns-night',
    title: 'Saturday Story Hour: Burns for Bairns',
    kind: 'story-hour',
    date: '2027-01-23',
    start: '10:00',
    end: '10:45',
    guest: 'Effie Douglas',
    price: 0,
    seats: 'open',
    description:
      'A cheerful morning of Scots rhymes, wee beasties and tall tales ahead of Burns Night. Best for ages 3 to 7, with oatcakes for everyone.',
  },
  {
    id: 'reading-catriona-hay',
    title: "Catriona Hay reads Under Arthur's Seat",
    kind: 'reading',
    date: '2027-01-28',
    start: '19:00',
    end: '20:15',
    guest: 'Catriona Hay',
    bookId: 'under-arthurs-seat',
    price: 5,
    ticketNote: 'Redeemable against the book on the night',
    seats: 'open',
    description:
      'Catriona reads from her five-generation Edinburgh family saga and talks about researching old tenement diaries from the south side of the hill.',
  },
  {
    id: 'book-club-february',
    title: 'Fireside Book Club: The Weight of Rivers',
    kind: 'book-club',
    date: '2027-02-02',
    start: '18:30',
    end: '20:00',
    guest: 'Priya Nair',
    bookId: 'the-weight-of-rivers',
    price: 0,
    seats: 'open',
    description:
      'Priya chairs February’s Fireside Book Club on Ada Okonkwo-Bell’s river journeys. Expect maps on the table, strong tea and lively detours.',
  },
];

export const eventKinds: readonly { id: EventKind; label: string }[] = [
  { id: 'reading', label: 'Readings' },
  { id: 'signing', label: 'Signings' },
  { id: 'launch', label: 'Launches' },
  { id: 'story-hour', label: 'Story hour' },
  { id: 'book-club', label: 'Book club' },
];

export function eventKindLabel(kind: EventKind): string {
  switch (kind) {
    case 'reading':
      return 'Reading';
    case 'signing':
      return 'Signing';
    case 'launch':
      return 'Launch';
    case 'story-hour':
      return 'Story hour';
    case 'book-club':
      return 'Book club';
  }
}

export function seatsLabel(seats: SeatStatus): string {
  switch (seats) {
    case 'open':
      return 'Seats open — ask to join';
    case 'few-left':
      return 'A few seats left';
    case 'full':
      return 'Full — ask about the waiting list';
  }
}

export function formatEventPrice(price: number): string {
  return price === 0 ? 'Free' : `£${Number.isInteger(price) ? price : price.toFixed(2)}`;
}
