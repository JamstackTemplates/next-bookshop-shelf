import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bookClub, getCurrentBookClubEvent, getCurrentBookClubSelection } from '../content/book-club.ts';
import { business } from '../content/business.ts';
import { events } from '../content/events.ts';
import { shelves } from '../content/shelves.ts';
import { staff } from '../content/staff.ts';
import { staffPicks } from '../content/staff-picks.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, eventsStructuredData, jsonLd } from '../lib/structured-data.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_ISO = /^\d{4}-\d{2}-\d{2}$/;
const CLOCK = /^([01]\d|2[0-3]):[0-5]\d$/;

function hasAtMostTwoDecimals(value: number): boolean {
  return Number.isFinite(value) && Math.abs(Math.round(value * 100) - value * 100) < 1e-9;
}

test('business content has actionable required fields and valid opening hours', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  for (const key of ['street', 'locality', 'postcode', 'country', 'directionsNote', 'landmarkNote'] as const) {
    assert.ok(business.address[key].trim(), `business.address.${key}: required`);
  }
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(
    business.enquiries.confirmationNotice.includes('Nothing is held or ordered until a bookseller replies to confirm.'),
    'business.enquiries.confirmationNotice: must state confirmation rule',
  );
  assert.ok(business.enquiries.usefulToInclude.length >= 3, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assert.doesNotThrow(() => validateHours(business.openingHours));
});

test('shelves and staff have unique slugs and valid references', () => {
  const shelfIds = new Set<string>();
  for (const shelf of shelves) {
    assert.match(shelf.id, SLUG, `shelf "${shelf.id}": id must be a lowercase URL-safe slug`);
    assert.ok(!shelfIds.has(shelf.id), `shelf "${shelf.id}": duplicate shelf id`);
    shelfIds.add(shelf.id);
    assert.ok(shelf.label.trim(), `shelf "${shelf.id}": label required`);
    assert.ok(shelf.spineVar.startsWith('var(--spine-'), `shelf "${shelf.id}": spineVar must reference a spine token`);
  }

  const staffIds = new Set<string>();
  for (const member of staff) {
    assert.match(member.id, SLUG, `staff "${member.id}": id must be a lowercase URL-safe slug`);
    assert.ok(!staffIds.has(member.id), `staff "${member.id}": duplicate staff id`);
    staffIds.add(member.id);
    assert.ok(member.name.trim(), `staff "${member.id}": name required`);
    assert.ok(member.role.trim(), `staff "${member.id}": role required`);
    assert.ok(member.bio.trim(), `staff "${member.id}": bio required`);
    assert.ok(shelfIds.has(member.shelf), `staff "${member.id}": unknown shelf "${member.shelf}"`);
  }
});

test('staff picks have valid IDs, references, prices, stock, notes and six featured picks', () => {
  const shelfIds = new Set(shelves.map((s) => s.id));
  const staffIds = new Set(staff.map((m) => m.id));
  const pickIds = new Set<string>();
  const allowedStock = new Set(['in-stock', 'last-copy', 'order-in']);
  const allowedFormats = new Set(['paperback', 'hardback']);
  const allowedHeights = new Set(['short', 'medium', 'tall']);
  const allowedWidths = new Set(['slim', 'regular', 'thick']);

  let featuredCount = 0;

  for (const pick of staffPicks) {
    assert.match(pick.id, SLUG, `staffPick "${pick.id}": id must be a lowercase URL-safe slug`);
    assert.ok(!pickIds.has(pick.id), `staffPick "${pick.id}": duplicate pick id`);
    pickIds.add(pick.id);

    assert.ok(pick.title.trim(), `staffPick "${pick.id}": title required`);
    assert.ok(pick.author.trim(), `staffPick "${pick.id}": author required`);
    assert.ok(shelfIds.has(pick.shelf), `staffPick "${pick.id}": unknown shelf "${pick.shelf}"`);
    assert.ok(staffIds.has(pick.pickedBy), `staffPick "${pick.id}": unknown pickedBy "${pick.pickedBy}"`);
    assert.ok(allowedFormats.has(pick.format), `staffPick "${pick.id}": invalid format "${pick.format}"`);
    assert.ok(
      typeof pick.price === 'number' && pick.price > 0 && pick.price <= 60 && hasAtMostTwoDecimals(pick.price),
      `staffPick "${pick.id}": price ${pick.price} must be > 0, <= 60, and at most 2 decimals`,
    );
    assert.ok(allowedStock.has(pick.stock), `staffPick "${pick.id}": invalid stock "${pick.stock}"`);
    assert.ok(
      pick.note.length >= 60 && pick.note.length <= 220,
      `staffPick "${pick.id}": note length ${pick.note.length} must be 60–220 characters`,
    );
    assert.ok(allowedHeights.has(pick.spine.height), `staffPick "${pick.id}": invalid spine.height`);
    assert.ok(allowedWidths.has(pick.spine.width), `staffPick "${pick.id}": invalid spine.width`);

    if (pick.featured) featuredCount += 1;
  }

  assert.equal(featuredCount, 6, `staffPicks: expected exactly 6 featured picks, found ${featuredCount}`);
});

test('events have unique slugs, valid chronological same-day times, prices, seats and references', () => {
  const pickIds = new Set(staffPicks.map((p) => p.id));
  const eventIds = new Set<string>();
  const allowedKinds = new Set(['reading', 'signing', 'launch', 'story-hour', 'book-club']);
  const allowedSeats = new Set(['open', 'few-left', 'full']);

  let previousDateTime = '';

  for (const event of events) {
    assert.match(event.id, SLUG, `event "${event.id}": id must be a lowercase URL-safe slug`);
    assert.ok(!eventIds.has(event.id), `event "${event.id}": duplicate event id`);
    eventIds.add(event.id);

    assert.ok(event.title.trim(), `event "${event.id}": title required`);
    assert.ok(allowedKinds.has(event.kind), `event "${event.id}": invalid kind "${event.kind}"`);
    assert.match(event.date, DATE_ISO, `event "${event.id}": date "${event.date}" must be YYYY-MM-DD`);
    assert.match(event.start, CLOCK, `event "${event.id}": start "${event.start}" must be HH:MM`);
    assert.match(event.end, CLOCK, `event "${event.id}": end "${event.end}" must be HH:MM`);
    assert.ok(event.end > event.start, `event "${event.id}": end (${event.end}) must be after start (${event.start})`);

    const dateTimeKey = `${event.date}T${event.start}`;
    assert.ok(
      dateTimeKey >= previousDateTime,
      `event "${event.id}": out of chronological order (${dateTimeKey} follows ${previousDateTime})`,
    );
    previousDateTime = dateTimeKey;

    if (event.bookId !== undefined) {
      assert.ok(pickIds.has(event.bookId), `event "${event.id}": unknown bookId "${event.bookId}"`);
    }
    assert.ok(
      typeof event.price === 'number' && event.price >= 0 && event.price <= 15 && hasAtMostTwoDecimals(event.price),
      `event "${event.id}": price ${event.price} must be 0–15 GBP`,
    );
    assert.ok(allowedSeats.has(event.seats), `event "${event.id}": invalid seats "${event.seats}"`);
    assert.ok(
      event.description.length >= 80 && event.description.length <= 260,
      `event "${event.id}": description length ${event.description.length} must be 80–260 characters`,
    );
  }
});

test('book club references a valid book-club event and staff pick', () => {
  const current = getCurrentBookClubEvent();
  assert.equal(current.id, bookClub.currentEventId, 'bookClub.currentEventId: must resolve');
  assert.equal(current.kind, 'book-club', `bookClub.currentEventId "${current.id}": must be a book-club event`);
  const selection = getCurrentBookClubSelection();
  assert.equal(selection.id, current.bookId, `bookClub.currentEventId "${current.id}": bookId must resolve`);
  assert.equal(bookClub.discussionPrompts.length, 3, 'bookClub.discussionPrompts: expected three prompts');
  for (const prompt of bookClub.discussionPrompts) {
    assert.ok(prompt.trim().length > 10, 'bookClub.discussionPrompts: prompt must not be empty');
  }
  assert.ok(bookClub.memberDiscount > 0 && bookClub.memberDiscount <= 50, 'bookClub.memberDiscount: valid percent');
});

test('structured data emits BookStore and Events from content and escapes inline JSON', () => {
  const store = businessStructuredData();
  assert.equal(store['@type'], 'BookStore');
  assert.equal(store.name, business.name);
  assert.equal(store.email, business.email);
  assert.equal(store.telephone, business.phone);
  assert.equal(store.address.streetAddress, business.address.street);
  assert.equal(store.openingHoursSpecification.length, 7);

  const eventSchemas = eventsStructuredData();
  assert.equal(eventSchemas.length, events.length);
  for (let i = 0; i < events.length; i++) {
    assert.equal(eventSchemas[i]['@type'], 'Event');
    assert.equal(eventSchemas[i].name, events[i].title);
    assert.equal(eventSchemas[i].location.name, business.name);
    assert.equal(eventSchemas[i].offers.price, events[i].price);
    assert.equal(eventSchemas[i].offers.priceCurrency, 'GBP');
    assert.equal('availability' in eventSchemas[i].offers, false);
  }

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
