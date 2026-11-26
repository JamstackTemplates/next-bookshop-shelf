import type { ShopEvent } from '../content/events.ts';

const MONTHS_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'] as const;
const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export interface EventDateParts {
  year: number;
  monthIndex: number;
  monthNumber: string;
  monthShort: string;
  monthLong: string;
  monthKey: string;
  day: string;
  dayNumber: number;
  weekdayShort: string;
  weekdayLong: string;
  stampLabel: string;
  fullLabel: string;
}

export function parseEventDate(dateStr: string): EventDateParts {
  const [y, m, d] = dateStr.split('-').map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d));
  const weekdayIndex = utc.getUTCDay();
  const day = String(d).padStart(2, '0');
  const monthNumber = String(m).padStart(2, '0');
  const monthShort = MONTHS_SHORT[m - 1];
  const monthLong = MONTHS_LONG[m - 1];
  return {
    year: y,
    monthIndex: m - 1,
    monthNumber,
    monthShort,
    monthLong,
    monthKey: `${y}-${monthNumber}`,
    day,
    dayNumber: d,
    weekdayShort: WEEKDAYS_SHORT[weekdayIndex],
    weekdayLong: WEEKDAYS_LONG[weekdayIndex],
    stampLabel: `${day} ${monthShort}`,
    fullLabel: `${WEEKDAYS_LONG[weekdayIndex]} ${d} ${monthLong} ${y}`,
  };
}

function nowInTimeZone(timeZone: string, now: Date): { date: string; time: string } | null {
  if (!timeZone) return null;
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(now);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    const year = get('year');
    const month = get('month');
    const day = get('day');
    const hour = get('hour');
    const minute = get('minute');
    if (!year || !month || !day || !hour || !minute) return null;
    return { date: `${year}-${month}-${day}`, time: `${hour}:${minute}` };
  } catch {
    return null;
  }
}

/**
 * Returns true if an event's date and end time have passed in the shop's IANA time zone.
 * Static/no-JS callers should not call this; pass `new Date()` in the browser.
 */
export function isEventPast(event: Pick<ShopEvent, 'date' | 'end'>, timeZone: string, now = new Date()): boolean {
  const current = nowInTimeZone(timeZone, now);
  if (!current) return false;
  if (event.date < current.date) return true;
  if (event.date > current.date) return false;
  return event.end <= current.time;
}

/**
 * Returns the next `count` upcoming events in the shop's IANA time zone.
 * If timeZone is empty or invalid, returns the first `count` events in data order.
 */
export function upcomingEvents(
  list: readonly ShopEvent[],
  timeZone: string,
  now = new Date(),
  count = 3,
): readonly ShopEvent[] {
  const current = nowInTimeZone(timeZone, now);
  if (!current) return list.slice(0, count);
  return list.filter((event) => !isEventPast(event, timeZone, now)).slice(0, count);
}

export interface MonthGroup {
  monthKey: string;
  monthNumber: string;
  monthLong: string;
  year: number;
  events: readonly ShopEvent[];
}

export function groupEventsByMonth(list: readonly ShopEvent[]): readonly MonthGroup[] {
  const map = new Map<string, MonthGroup>();
  for (const event of list) {
    const parts = parseEventDate(event.date);
    const existing = map.get(parts.monthKey);
    if (existing) {
      map.set(parts.monthKey, { ...existing, events: [...existing.events, event] });
    } else {
      map.set(parts.monthKey, {
        monthKey: parts.monthKey,
        monthNumber: parts.monthNumber,
        monthLong: parts.monthLong,
        year: parts.year,
        events: [event],
      });
    }
  }
  return Array.from(map.values());
}
