import type { ShelfId } from './shelves.ts';
import type { StaffId } from './staff.ts';

export type BookFormat = 'paperback' | 'hardback';
export type StockStatus = 'in-stock' | 'last-copy' | 'order-in';
export type SpineHeight = 'short' | 'medium' | 'tall';
export type SpineWidth = 'slim' | 'regular' | 'thick';

export interface StaffPick {
  /** Stable, lowercase, URL-safe slug (also used as anchor ID on /staff-picks/). */
  id: string;
  /** Book title. */
  title: string;
  /** Author name. */
  author: string;
  /** Genre shelf ID from content/shelves.ts. */
  shelf: ShelfId;
  /** Bookseller ID from content/staff.ts. */
  pickedBy: StaffId;
  /** Binding format. */
  format: BookFormat;
  /** Price in GBP (£), positive, up to £60, two decimal places. */
  price: number;
  /** Current shop stock status. Change to 'order-in' when sold out. */
  stock: StockStatus;
  /** Handwritten shelf-talker note (60–220 characters). */
  note: string;
  /** Set true on exactly six picks to display them on the Home spine shelf. */
  featured: boolean;
  /** Physical spine proportions used to draw the cloth-bound spine on the shelf. */
  spine: {
    height: SpineHeight;
    width: SpineWidth;
  };
}

export const staffPicks: readonly StaffPick[] = [
  {
    id: 'the-salt-road-house',
    title: 'The Salt Road House',
    author: 'Isla Mackintosh',
    shelf: 'fiction',
    pickedBy: 'morag',
    format: 'paperback',
    price: 10.99,
    stock: 'in-stock',
    featured: true,
    note: 'Three sisters, one crumbling inn on the Fife coast, and a winter none of them saw coming. I read it in two sittings by the fire.',
    spine: { height: 'tall', width: 'thick' },
  },
  {
    id: 'a-quiet-matter-of-glass',
    title: 'A Quiet Matter of Glass',
    author: 'Torin Abernethy',
    shelf: 'crime',
    pickedBy: 'callum',
    format: 'hardback',
    price: 18.99,
    stock: 'last-copy',
    featured: true,
    note: 'A glassblower is found dead in his own furnace room. Clever, cold and very Leith. Last hardback in the shop — grab it.',
    spine: { height: 'tall', width: 'regular' },
  },
  {
    id: 'the-weight-of-rivers',
    title: 'The Weight of Rivers',
    author: 'Ada Okonkwo-Bell',
    shelf: 'nonfiction',
    pickedBy: 'priya',
    format: 'paperback',
    price: 12.99,
    stock: 'in-stock',
    featured: true,
    note: 'A walk down six rivers and the towns that grew around them. Gentle, curious, and the footnotes are a joy.',
    spine: { height: 'medium', width: 'thick' },
  },
  {
    id: 'small-hours',
    title: 'Small Hours',
    author: 'Fenella Grant',
    shelf: 'poetry',
    pickedBy: 'morag',
    format: 'paperback',
    price: 9.99,
    stock: 'in-stock',
    featured: true,
    note: 'Poems for the time between midnight and the kettle. Short enough for the bus, good enough to read twice.',
    spine: { height: 'short', width: 'slim' },
  },
  {
    id: 'wee-fox-and-the-lantern',
    title: 'Wee Fox and the Lantern',
    author: 'Mairi Cowan',
    shelf: 'children',
    pickedBy: 'effie',
    format: 'hardback',
    price: 12.99,
    stock: 'in-stock',
    featured: true,
    note: 'A fox borrows the moon to light his way home. Our most-requested story-hour book, ages 3 to 6.',
    spine: { height: 'medium', width: 'regular' },
  },
  {
    id: 'north-of-the-close',
    title: 'North of the Close',
    author: 'Ewan Baird',
    shelf: 'scotland',
    pickedBy: 'callum',
    format: 'paperback',
    price: 11.99,
    stock: 'in-stock',
    featured: true,
    note: "Old Town tenement life over one long summer, told by the kids on the stair. Funny, then it isn't, then it is again.",
    spine: { height: 'tall', width: 'regular' },
  },
  {
    id: 'the-cartographers-daughter',
    title: "The Cartographer's Daughter",
    author: 'Leonie Marsh',
    shelf: 'fiction',
    pickedBy: 'priya',
    format: 'paperback',
    price: 10.99,
    stock: 'order-in',
    featured: false,
    note: "A map with one island too many and a daughter determined to find it. We sold out twice; we'll happily order it in.",
    spine: { height: 'medium', width: 'thick' },
  },
  {
    id: 'the-last-train-to-oban',
    title: 'The Last Train to Oban',
    author: 'R. J. Sinclair',
    shelf: 'crime',
    pickedBy: 'callum',
    format: 'paperback',
    price: 9.99,
    stock: 'in-stock',
    featured: false,
    note: 'Locked-room mystery on a sleeper train. Perfect for a wet weekend.',
    spine: { height: 'short', width: 'regular' },
  },
  {
    id: 'a-field-guide-to-moss',
    title: 'A Field Guide to Moss',
    author: 'Hamish Tait',
    shelf: 'nonfiction',
    pickedBy: 'priya',
    format: 'hardback',
    price: 22.0,
    stock: 'in-stock',
    featured: false,
    note: 'Beautifully illustrated and quietly obsessive. You will never walk past a wall the same way again.',
    spine: { height: 'tall', width: 'thick' },
  },
  {
    id: 'the-lighthouse-tables',
    title: 'The Lighthouse Tables',
    author: 'Saoirse Byrne',
    shelf: 'poetry',
    pickedBy: 'morag',
    format: 'hardback',
    price: 14.99,
    stock: 'last-copy',
    featured: false,
    note: 'Sea poems about keepers, weather and the people waiting on shore. One signed copy left.',
    spine: { height: 'short', width: 'slim' },
  },
  {
    id: 'the-book-that-ate-my-homework',
    title: 'The Book That Ate My Homework',
    author: 'Rory Patel',
    shelf: 'children',
    pickedBy: 'effie',
    format: 'paperback',
    price: 7.99,
    stock: 'in-stock',
    featured: false,
    note: 'A hungry library book with a taste for maths. Laugh-out-loud for ages 7 to 10.',
    spine: { height: 'short', width: 'regular' },
  },
  {
    id: 'under-arthurs-seat',
    title: "Under Arthur's Seat",
    author: 'Catriona Hay',
    shelf: 'scotland',
    pickedBy: 'morag',
    format: 'paperback',
    price: 10.99,
    stock: 'in-stock',
    featured: false,
    note: 'Five generations of one family living in the shadow of the hill. Big, warm and full of weather.',
    spine: { height: 'medium', width: 'thick' },
  },
];

export const staffPickById: Readonly<Record<string, StaffPick>> = Object.fromEntries(
  staffPicks.map((pick) => [pick.id, pick]),
);

export const featuredStaffPicks: readonly StaffPick[] = staffPicks.filter((pick) => pick.featured);

export function stockLabel(stock: StockStatus): string {
  switch (stock) {
    case 'in-stock':
      return 'In stock';
    case 'last-copy':
      return 'Last copy in the shop';
    case 'order-in':
      return 'We can order this in';
  }
}

export function formatBookPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}
