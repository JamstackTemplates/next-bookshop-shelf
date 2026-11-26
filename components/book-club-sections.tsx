import type { ReactNode } from 'react';
import {
  bookClub,
  getBookClubMeetings,
  getCurrentBookClubEvent,
  getCurrentBookClubSelection,
} from '../content/book-club';
import { parseEventDate } from '../lib/events';
import { DrawnBookCover } from './art/book-cover';
import { GiltRule, MarbledBand, StitchedSignatureBorder } from './art/marks';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

export function CurrentSelectionSection({ children }: ContentProps) {
  const currentBook = getCurrentBookClubSelection();
  const currentEvent = getCurrentBookClubEvent();
  const parts = parseEventDate(currentEvent.date);

  return (
    <section aria-labelledby="club-current" className="paper-grain py-10 sm:py-14">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <DrawnBookCover book={currentBook} tilted />
        </div>
        <div className="lg:col-span-7">
          <p className="running-head">
            Current selection · Meeting {parts.fullLabel}, {currentEvent.start}–{currentEvent.end}
          </p>
          <h2 id="club-current" className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            {currentBook.title}
          </h2>
          <p className="mt-1 font-sc text-base tracking-[0.08em] text-ink-muted">
            by {currentBook.author} · {currentBook.format} · £{currentBook.price.toFixed(2)} ({bookClub.memberDiscount}% off for club readers)
          </p>
          <div className="mt-4 max-w-(--measure) text-lg text-ink-muted">{children}</div>

          {/* Handwritten margin notes for the three discussion prompts */}
          <div className="mt-7 border-l-2 border-gilt pl-5">
            <p className="font-sc text-xs tracking-[0.14em] text-ink-muted">
              Margin notes to bring to the fire
            </p>
            <ol className="mt-3 space-y-3">
              {bookClub.discussionPrompts.map((prompt, index) => (
                <li key={prompt} className="flex gap-3">
                  <span className="font-display text-xl italic text-oxblood">{index + 1}.</span>
                  <span className="font-hand text-[1.2rem] leading-snug text-ink">{prompt}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BorrowingCardSection({ children }: ContentProps) {
  const meetings = getBookClubMeetings();
  const currentEvent = getCurrentBookClubEvent();

  return (
    <section aria-labelledby="club-schedule" className="paper-deep-grain">
      <MarbledBand />
      <div className="wrap py-14 sm:py-16">
        <div className="max-w-(--measure)">
          <h2 id="club-schedule" className="font-display text-3xl text-ink sm:text-4xl">
            Upcoming meetings
          </h2>
          <div className="mt-2 text-lg text-ink-muted">{children}</div>
        </div>

        <div className="borrowing-card mt-8 rounded-[2px] p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-gilt pb-3">
            <p className="font-sc text-sm tracking-[0.16em] text-ink-muted">
              The Lamplit Page · Library Borrowing Card
            </p>
            <p className="font-sc text-xs tracking-[0.1em] text-ink-muted">
              {bookClub.meetingPattern}
            </p>
          </div>

          <div className="mt-2 divide-y divide-line">
            {meetings.map((meeting) => {
              const parts = parseEventDate(meeting.date);
              const isCurrent = meeting.id === currentEvent.id;
              return (
                <div
                  key={meeting.id}
                  className="grid gap-3 py-4 sm:grid-cols-12 sm:items-baseline"
                >
                  <div className="sm:col-span-3">
                    <span className="inline-block border-2 border-dashed border-stamp/70 px-2.5 py-0.5 font-sc text-xs tracking-[0.12em] text-stamp">
                      {parts.stampLabel} {parts.year}
                    </span>
                    <span className="ml-2 font-sc text-xs text-ink-muted">
                      {meeting.start}–{meeting.end}
                    </span>
                  </div>
                  <div className="sm:col-span-6">
                    <p className="font-hand text-2xl text-ink">
                      {meeting.title.replace(/^Fireside Book Club:\s*/i, '')}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-muted">{meeting.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:col-span-3 sm:justify-end">
                    <span className="font-sc text-xs tracking-[0.08em] text-ink-muted">
                      {isCurrent ? 'Current month' : `Host: ${meeting.guest}`}
                    </span>
                    <SiteLink
                      href={`/events/#${meeting.id}`}
                      className="text-link font-sc text-xs tracking-[0.06em]"
                    >
                      Details
                    </SiteLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="club-how" className="paper-grain pt-8 pb-14 sm:pt-10 sm:pb-16">
      <StitchedSignatureBorder className="mb-10" />
      <div className="wrap">
        <h2 id="club-how" className="font-display text-3xl text-ink sm:text-4xl">
          How it works
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">{children}</div>
        <GiltRule className="mt-14" />
      </div>
    </section>
  );
}

export function MarginNote({
  number,
  title,
  offsetClass = '',
  children,
}: {
  number: string;
  title: string;
  offsetClass?: string;
  children: ReactNode;
}) {
  return (
    <article className={`border-l-2 border-gilt bg-surface p-6 shadow-sm ${offsetClass}`}>
      <p className="folio-numeral text-5xl" aria-hidden="true">
        {number}
      </p>
      <h3 className="mt-2 font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2 text-base text-ink-muted">{children}</p>
    </article>
  );
}
