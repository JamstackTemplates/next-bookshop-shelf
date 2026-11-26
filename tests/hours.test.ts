import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

test('The Lamplit Page schedule boundaries and Europe/London DST transitions', () => {
  const shopAt = (isoUtc: string) => openingLabel(business.openingHours, 'Europe/London', new Date(isoUtc));

  // Thursday 2026-12-03 (GMT): late opening until 20:30
  assert.equal(shopAt('2026-12-03T20:29:00Z'), 'Open now · until 20:30');
  assert.equal(shopAt('2026-12-03T20:30:00Z'), 'Closed · opens Friday at 10:00');

  // Saturday 2026-12-05 (GMT): opens 09:30
  assert.equal(shopAt('2026-12-05T09:29:00Z'), 'Closed · opens today at 09:30');
  assert.equal(shopAt('2026-12-05T09:30:00Z'), 'Open now · until 18:00');

  // Sunday 2026-12-06 (GMT): closes 17:00
  assert.equal(shopAt('2026-12-06T16:59:00Z'), 'Open now · until 17:00');
  assert.equal(shopAt('2026-12-06T17:00:00Z'), 'Closed · opens Monday at 10:00');

  // Spring forward DST: Sunday 2027-03-28 (clocks forward to BST UTC+1 at 01:00 UTC)
  // 10:59 BST = 09:59 UTC (closed); 11:00 BST = 10:00 UTC (open); 16:59 BST = 15:59 UTC (open); 17:00 BST = 16:00 UTC (closed)
  assert.equal(shopAt('2027-03-28T09:59:00Z'), 'Closed · opens today at 11:00');
  assert.equal(shopAt('2027-03-28T10:00:00Z'), 'Open now · until 17:00');
  assert.equal(shopAt('2027-03-28T15:59:00Z'), 'Open now · until 17:00');
  assert.equal(shopAt('2027-03-28T16:00:00Z'), 'Closed · opens Monday at 10:00');

  // Fall back DST: Sunday 2027-10-31 (clocks back to GMT UTC+0 at 01:00 UTC)
  // 10:59 GMT = 10:59 UTC (closed); 11:00 GMT = 11:00 UTC (open); 16:59 GMT = 16:59 UTC (open); 17:00 GMT = 17:00 UTC (closed)
  assert.equal(shopAt('2027-10-31T10:59:00Z'), 'Closed · opens today at 11:00');
  assert.equal(shopAt('2027-10-31T11:00:00Z'), 'Open now · until 17:00');
  assert.equal(shopAt('2027-10-31T16:59:00Z'), 'Open now · until 17:00');
  assert.equal(shopAt('2027-10-31T17:00:00Z'), 'Closed · opens Monday at 10:00');
});
