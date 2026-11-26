export type ShelfId = 'fiction' | 'crime' | 'nonfiction' | 'poetry' | 'children' | 'scotland';

export interface Shelf {
  /** Stable, lowercase, URL-safe slug used to link picks and staff. */
  id: ShelfId;
  /** Display name shown on shelf tabs, headings and spine labels. */
  label: string;
  /** Short shelf description shown on the Staff Picks page. */
  subtitle: string;
  /** CSS custom property for the shelf's cloth binding colour. */
  spineVar: string;
}

export const shelves: readonly Shelf[] = [
  {
    id: 'fiction',
    label: 'Fiction',
    subtitle: 'Novels we press into friends’ hands on the way out the door.',
    spineVar: 'var(--spine-fiction)',
  },
  {
    id: 'crime',
    label: 'Crime & Mystery',
    subtitle: 'Sharp plots, foggy harbours and locked-room puzzles for long nights.',
    spineVar: 'var(--spine-crime)',
  },
  {
    id: 'nonfiction',
    label: 'Nonfiction',
    subtitle: 'Natural history, essays and curious books with generous footnotes.',
    spineVar: 'var(--spine-nonfiction)',
  },
  {
    id: 'poetry',
    label: 'Poetry',
    subtitle: 'Slim paperbacks and hardbacks meant for the kettle, the bus and the bedside.',
    spineVar: 'var(--spine-poetry)',
  },
  {
    id: 'children',
    label: "Children's",
    subtitle: 'Picture books and middle-grade favourites read aloud every Saturday morning.',
    spineVar: 'var(--spine-children)',
  },
  {
    id: 'scotland',
    label: 'Scottish Writing',
    subtitle: 'Stories rooted in Old Town closes, Fife coasts and weather off the Firth.',
    spineVar: 'var(--spine-scotland)',
  },
];

export const shelfById: Readonly<Record<ShelfId, Shelf>> = Object.fromEntries(
  shelves.map((shelf) => [shelf.id, shelf]),
) as Record<ShelfId, Shelf>;
