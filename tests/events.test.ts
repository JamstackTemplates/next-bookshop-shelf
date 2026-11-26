import assert from 'node:assert/strict';
import { test } from 'node:test';
import { events } from '../content/events.ts';
import { isEventPast, upcomingEvents } from '../lib/events.ts';

test('past-event detection and upcoming selection in Europe/London', () => {
  const torin = events.find((e) => e.id === 'reading-torin-abernethy')!;
  assert.ok(torin, 'reading-torin-abernethy must exist');

  // 2026-12-03 20:14 GMT — one minute before Torin's reading ends (20:15)
  const duringReading = new Date('2026-12-03T20:14:00Z');
  assert.equal(isEventPast(torin, 'Europe/London', duringReading), false);

  // 2026-12-03 20:16 GMT — one minute after Torin's reading ends
  const afterReading = new Date('2026-12-03T20:16:00Z');
  assert.equal(isEventPast(torin, 'Europe/London', afterReading), true);

  const nextThree = upcomingEvents(events, 'Europe/London', afterReading, 3);
  assert.equal(nextThree.length, 3);
  assert.deepEqual(
    nextThree.map((e) => e.id),
    ['story-hour-winter-tales', 'poetry-by-lamplight', 'signing-mairi-cowan'],
  );
});
