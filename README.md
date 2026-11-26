# The Lamplit Page (`next-bookshop-shelf`)

A static Next.js website for **The Lamplit Page**, a cosy independent new-and-secondhand bookshop on Victoria Street in Edinburgh's Old Town. Built as a self-contained Jamstacks template with a lamplit cloth-bound spine shelf, handwritten staff picks, author readings, a children's story hour, a monthly Fireside Book Club and an optional hosted enquiry form.

All business details, staff, books, authors and events in this sample are fictitious. Replace them with your own shop's details before publishing.

## Local preview and checks

Requires Node 24 or later and npm.

```sh
npm ci
npm run dev      # local development server
npm run check    # unit/content/hours tests + Next typegen + tsc + static export
npm start        # preview the static export in out/
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: Window at dusk hero, featured spine shelf, upcoming date slips, current book club, shop details & map, closing letter, `BookStore` JSON-LD |
| `/staff-picks/` | Filterable cloth-bound spine shelves by genre, handwritten shelf-talkers, and bookseller ex-libris bookplates |
| `/events/` | Filterable programme grouped by month as perforated ticket stubs, seat notice, and `Event` JSON-LD |
| `/book-club/` | Current month's book with handwritten discussion prompts, borrowing card of upcoming meetings, and how it works |
| `/contact/` | Bookplate enquiry desk with hosted Jamstacks support form (or email fallback), phone, address, hours plaque and map |
| `/404.html` | "This page has been misshelved" illustration with Marginalia the shop cat |

## Frequent owner edits

| Task | File | Field(s) |
| --- | --- | --- |
| Mark a staff pick as sold out or order-in | `content/staff-picks.ts` | Set `stock` to `'order-in'` (displays *"We can order this in"*), `'last-copy'`, or `'in-stock'` |
| Swap which six picks appear on Home | `content/staff-picks.ts` | Toggle `featured: true` / `false` (tests enforce exactly six featured picks) |
| Add an event or mark one full | `content/events.ts` | Add a `ShopEvent` in chronological `date` order, or set `seats: 'full'` (displays *"Full — ask about the waiting list"*) |
| Move the Book Club to next month's read | `content/book-club.ts` | Change `currentEventId` to the next `book-club` event ID in `content/events.ts` and update `discussionPrompts` |
| Update opening hours, address, phone or email | `content/business.ts` | Edit `openingHours`, `address`, `phone`, `email` (and `name` alongside `site.config.json`) |
| Edit page headings, intros or calls to action | `app/**/page.tsx` | Edit the JSX copy directly in the route file |

After editing content, run `npm run check` to verify IDs, references, prices, note lengths, event ordering and opening-hour boundaries.

## File ownership

| Path | Owns |
| --- | --- |
| `content/business.ts` | Shop name, contact details, address, directions, weekly opening hours and enquiry guidance |
| `content/shelves.ts` | Genre shelves and their cloth-spine colour tokens |
| `content/staff.ts` | Bookseller profiles for ex-libris bookplates and pick attribution |
| `content/staff-picks.ts` | Staff picks, prices, stock status, shelf-talker notes and spine proportions |
| `content/events.ts` | Chronological events programme (readings, signings, launches, story hours, book club) |
| `content/book-club.ts` | Current book-club selection reference, discussion prompts, member discount and meeting pattern |
| `app/**/page.tsx` | Page composition and editable prose in visitor order |
| `app/tailwind.input.css` | Light ("afternoon reading room") and dark ("after hours") palette tokens, textures, print and motion rules |
| `components/art/*` | Inline SVG artwork (`HeroWindowArt`, `MisshelvedArt`, `DrawnBookCover`, `LampMark`, dividers, motifs and 24px icons) |
| `lib/hours.ts`, `lib/events.ts` | `Europe/London` opening-hours and past-event calculations |
| `lib/structured-data.ts` | `BookStore` and `Event` JSON-LD derived from content and safely escaped |
| `site.config.json` | Public site name, meta description, domain, `timeZone` and Jamstacks integration |

## Fonts and licences

All typefaces are self-hosted via npm Fontsource packages under the SIL Open Font License 1.1:

- Display: **IM Fell English** (`@fontsource/im-fell-english`) and **IM Fell English SC** (`@fontsource/im-fell-english-sc`)
- Body & UI: **Crimson Pro** (`@fontsource-variable/crimson-pro`)
- Shelf-talkers & margin notes: **Nothing You Could Do** (`@fontsource/nothing-you-could-do`)

## Public configuration and Contact form

`site.config.json` keeps the Jamstacks provisioner shape (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`). When `JAMSTACKS_SITE` (or `site.config.json`'s `jamstacks.siteId`) is set, `/contact/` renders `<jamstacks-support-form>` and loads `{cdn}/sites/{siteId}/embed.js`. Without a site ID, no embed script is loaded and visitors see the email fallback. Public email and telephone are always visible.

```sh
# Project-path build check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

## Gallery publishing assets

`jamstacks/` is optional gallery-only metadata and can be deleted by customer sites without affecting builds, tests or GitHub Pages deployment. For gallery verification:

```sh
node --test jamstacks/config.test.mjs
```
