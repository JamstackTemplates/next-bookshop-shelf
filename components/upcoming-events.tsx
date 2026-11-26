'use client';

import { useEffect, useState } from 'react';
import {
  eventKindLabel,
  formatEventPrice,
  seatsLabel,
  type ShopEvent,
} from '../content/events';
import { parseEventDate, upcomingEvents } from '../lib/events';
import { site } from '../lib/site';
import { EventKindIcon } from './art/marks';
import { SiteLink } from './site-link';

const SLIP_TILTS = ['md:-rotate-1', 'md:rotate-[1.1deg] md:-mt-2', 'md:-rotate-[0.7deg] md:-mt-2'] as const;

/**
 * Displays the next three upcoming events as overlapping library date-due slips.
 * Static output renders the first three in data order; in the browser it recomputes
 * every minute in Europe/London so past events drop out automatically.
 */
export function UpcomingEventSlips({ events }: { events: readonly ShopEvent[] }) {
  const [visible, setVisible] = useState<readonly ShopEvent[]>(() => events.slice(0, 3));

  useEffect(() => {
    const update = () => setVisible(upcomingEvents(events, site.timeZone, new Date(), 3));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [events]);

  if (visible.length === 0) {
    return (
      <div className="date-slip rounded-[2px] p-6">
        <p className="font-display text-2xl text-ink">New season programme coming soon</p>
        <p className="mt-2 text-ink-muted">
          Our next Thursday readings and book-club dates are being set. Write to us to hear first.
        </p>
      </div>
    );
  }

  return (
    <ol className="space-y-4">
      {visible.map((event, index) => {
        const parts = parseEventDate(event.date);
        const seatColor =
          event.seats === 'full'
            ? 'text-oxblood'
            : event.seats === 'few-left'
              ? 'text-stamp'
              : 'text-primary';

        return (
          <li
            key={event.id}
            className={`date-slip rounded-[2px] p-5 sm:p-6 ${SLIP_TILTS[index % SLIP_TILTS.length]}`}
          >
            {/* Ruled library-slip header line */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line/80 pb-3">
              {/* Oversized violet rubber-stamped date */}
              <div className="inline-flex flex-col border-2 border-dashed border-stamp/70 px-3 py-1 -rotate-2">
                <span className="font-sc text-[0.68rem] tracking-[0.16em] text-stamp">
                  {parts.weekdayShort} · {event.start}–{event.end}
                </span>
                <span className="font-display text-2xl leading-none tracking-wide text-stamp sm:text-[1.75rem]">
                  {parts.stampLabel}
                </span>
              </div>

              <div className="flex items-center gap-2 font-sc text-xs tracking-[0.1em] text-ink-muted">
                <EventKindIcon kind={event.kind} className="h-4 w-4 text-gilt" />
                <span>{eventKindLabel(event.kind)}</span>
                <span aria-hidden="true">·</span>
                <span className="text-ink">{formatEventPrice(event.price)}</span>
              </div>
            </div>

            <div className="mt-3.5">
              <h3 className="font-display text-2xl leading-snug text-ink">
                <SiteLink
                  href={`/events/#${event.id}`}
                  className="text-ink no-underline hover:text-primary hover:underline"
                >
                  {event.title}
                </SiteLink>
              </h3>
              {event.guest ? (
                <p className="mt-1 font-sc text-sm tracking-[0.05em] text-ink-muted">
                  With {event.guest}
                </p>
              ) : null}
              <p className="mt-2 text-[0.98rem] text-ink-muted">{event.description}</p>
            </div>

            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-2.5 text-sm">
              <span className={`font-sc text-xs tracking-[0.08em] ${seatColor}`}>
                {seatsLabel(event.seats)}
              </span>
              {event.ticketNote ? (
                <span className="text-xs italic text-ink-muted">{event.ticketNote}</span>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
