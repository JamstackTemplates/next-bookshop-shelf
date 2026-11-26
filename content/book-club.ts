import { events, type ShopEvent } from './events.ts';
import { staffPickById, type StaffPick } from './staff-picks.ts';

export interface BookClub {
  /** ID of the current month's book-club event in content/events.ts (kind must be 'book-club'). */
  currentEventId: string;
  /** Three handwritten discussion prompts for the current selection. */
  discussionPrompts: readonly [string, string, string];
  /** Percentage discount off the current month's book-club title in the shop. */
  memberDiscount: number;
  /** Plain-language summary of when and where the club meets. */
  meetingPattern: string;
}

export const bookClub: BookClub = {
  currentEventId: 'book-club-december',
  discussionPrompts: [
    'Which sister did you trust least by the end, and when did that change?',
    'The inn is almost a fourth sister. What does it want?',
    'Would the story work anywhere other than the Fife coast?',
  ],
  memberDiscount: 10,
  meetingPattern: 'First Tuesday of the month, 18:30–20:00, in the back room',
};

export function getBookClubMeetings(): readonly ShopEvent[] {
  return events.filter((event) => event.kind === 'book-club');
}

export function getCurrentBookClubEvent(): ShopEvent {
  const match = events.find((event) => event.id === bookClub.currentEventId);
  if (!match) {
    throw new Error(`bookClub.currentEventId: unknown event "${bookClub.currentEventId}"`);
  }
  return match;
}

export function getCurrentBookClubSelection(): StaffPick {
  const current = getCurrentBookClubEvent();
  if (!current.bookId || !staffPickById[current.bookId]) {
    throw new Error(
      `bookClub.currentEventId: event "${current.id}" must reference a valid bookId in staff-picks.ts`,
    );
  }
  return staffPickById[current.bookId];
}
