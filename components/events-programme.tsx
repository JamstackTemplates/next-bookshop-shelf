'use client';

import { useEffect, useState } from 'react';
import {
  eventKindLabel,
  eventKinds,
  formatEventPrice,
  seatsLabel,
  type EventKind,
  type ShopEvent,
} from '../content/events';
import { staffPickById } from '../content/staff-picks';
import { groupEventsByMonth, isEventPast, parseEventDate } from '../lib/events';
import { site } from '../lib/site';
import { EventKindIcon } from './art/marks';
import { SiteLink } from './site-link';

/**
 * Filterable events programme grouped by month.
 * Kind filter renders as rubber-stamp buttons in the browser only.
 * Past events in Europe/London are dimmed and labelled "This event has passed"
 * in the browser, recomputed every minute.
 */
export function EventsProgramme({ events }: { events: readonly ShopEvent[] }) {
  const [hydrated, setHydrated] = useState(false);
  const [activeKind, setActiveKind] = useState<EventKind | 'all'>('all');
  const [pastIds, setPastIds] = useState<ReadonlySet<string>>(() => new Set());

  useEffect(() => {
    setHydrated(true);
    const computePast = () => {
      const now = new Date();
      const next = new Set<string>();
      for (const event of events) {
        if (isEventPast(event, site.timeZone, now)) {
          next.add(event.id);
        }
      }
      setPastIds(next);
    };
    computePast();
    const timer = setInterval(computePast, 60_000);
    return () => clearInterval(timer);
  }, [events]);

  const filtered =
    activeKind === 'all' ? events : events.filter((event) => event.kind === activeKind);
  const months = groupEventsByMonth(filtered);

  const activeLabel =
    activeKind === 'all'
      ? 'events'
      : (eventKinds.find((k) => k.id === activeKind)?.label.toLowerCase() ?? 'events');
  const announcement = `Showing ${filtered.length} ${activeLabel}`;

  return (
    <div>
      {/* Rubber-stamp kind filter (browser only) */}
      {hydrated ? (
        <div className="no-print paper-grain py-6">
          <div className="wrap">
            <div
              role="group"
              aria-label="Filter programme by event kind"
              className="flex flex-wrap items-center gap-2.5"
            >
              <button
                type="button"
                aria-pressed={activeKind === 'all'}
                onClick={() => setActiveKind('all')}
                className={`min-h-10 rounded-[2px] border-2 border-dashed px-4 py-1.5 font-sc text-sm tracking-[0.08em] transition-colors ${
                  activeKind === 'all'
                    ? 'border-stamp bg-stamp text-paper'
                    : 'border-stamp/50 bg-surface text-stamp hover:border-stamp'
                }`}
              >
                All ({events.length})
              </button>
              {eventKinds.map((kind) => {
                const count = events.filter((e) => e.kind === kind.id).length;
                const isSelected = activeKind === kind.id;
                return (
                  <button
                    key={kind.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveKind(isSelected ? 'all' : kind.id)}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-[2px] border-2 border-dashed px-3.5 py-1.5 font-sc text-sm tracking-[0.08em] transition-colors ${
                      isSelected
                        ? 'border-stamp bg-stamp text-paper'
                        : 'border-stamp/45 bg-surface text-ink hover:border-stamp hover:text-stamp'
                    }`}
                  >
                    <EventKindIcon kind={kind.id} className="h-4 w-4" />
                    <span>
                      {kind.label} ({count})
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 font-sc text-xs tracking-[0.1em] text-ink-muted" aria-live="polite">
              {announcement}
            </p>
          </div>
        </div>
      ) : null}

      {/* Programme grouped by month on archival ledger paper */}
      <div className="paper-ledger">
        <div className="wrap space-y-14 py-10">
          {months.map((group) => (
            <section
              key={group.monthKey}
              aria-labelledby={`month-${group.monthKey}`}
              className="grid gap-8 md:grid-cols-12"
            >
              {/* Left margin: oversized IM Fell numeral and month name */}
              <div className="md:col-span-3 md:border-r md:border-gilt/35 md:pr-6">
              <div className="md:sticky md:top-8">
                <p className="folio-numeral text-[5rem] leading-none sm:text-[6.25rem]" aria-hidden="true">
                  {group.monthNumber}
                </p>
                <h2
                  id={`month-${group.monthKey}`}
                  className="-mt-2 font-display text-3xl text-ink"
                >
                  {group.monthLong}
                </h2>
                <p className="font-sc text-sm tracking-[0.14em] text-ink-muted">{group.year}</p>
              </div>
            </div>

            {/* Right column: vertical stack of perforated ticket stubs */}
            <ol className="space-y-5 md:col-span-9">
              {group.events.map((event) => {
                const parts = parseEventDate(event.date);
                const isPast = pastIds.has(event.id);
                const linkedBook = event.bookId ? staffPickById[event.bookId] : undefined;
                const seatColor =
                  event.seats === 'full'
                    ? 'text-oxblood'
                    : event.seats === 'few-left'
                      ? 'text-stamp'
                      : 'text-primary';

                return (
                  <li
                    key={event.id}
                    id={event.id}
                    className={`ticket-stub rounded-r-[3px] p-5 sm:p-6 ${
                      isPast ? 'opacity-65' : ''
                    }`}
                  >
                    <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
                      {/* Left stub: stamped date & time */}
                      <div className="flex items-center justify-between border-b border-dashed border-line pb-3 sm:col-span-3 sm:flex-col sm:items-start sm:border-r sm:border-b-0 sm:pr-4 sm:pb-0">
                        <div className="inline-flex flex-col border-2 border-dashed border-stamp/70 px-2.5 py-1 -rotate-1">
                          <span className="font-sc text-[0.68rem] tracking-[0.14em] text-stamp">
                            {parts.weekdayLong}
                          </span>
                          <span className="font-display text-2xl leading-tight text-stamp">
                            {parts.stampLabel}
                          </span>
                        </div>
                        <div className="text-right sm:mt-3 sm:text-left">
                          <p className="font-sc text-sm tracking-[0.06em] text-ink tabular-nums">
                            {event.start}–{event.end}
                          </p>
                          <p className="mt-0.5 font-sc text-sm text-ink">
                            {formatEventPrice(event.price)}
                          </p>
                        </div>
                      </div>

                      {/* Main ticket body */}
                      <div className="sm:col-span-9">
                        <div className="flex flex-wrap items-center gap-2 font-sc text-xs tracking-[0.1em] text-ink-muted">
                          <EventKindIcon kind={event.kind} className="h-4 w-4 text-gilt" />
                          <span>{eventKindLabel(event.kind)}</span>
                          {event.guest ? (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>With {event.guest}</span>
                            </>
                          ) : null}
                          {isPast ? (
                            <span className="ml-auto rounded-[2px] border border-line bg-paper-deep px-2 py-0.5 text-ink-muted">
                              This event has passed
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-2 font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
                          {event.title}
                        </h3>

                        <p className="mt-2 max-w-(--measure) text-base text-ink-muted">
                          {event.description}
                        </p>

                        {event.ticketNote ? (
                          <p className="mt-2 text-sm italic text-ink-muted">{event.ticketNote}.</p>
                        ) : null}

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-3 text-sm">
                          <span className={`font-sc text-xs tracking-[0.08em] ${seatColor}`}>
                            {isPast ? 'Past event' : seatsLabel(event.seats)}
                          </span>

                          <div className="flex flex-wrap items-center gap-4">
                            {linkedBook ? (
                              <SiteLink
                                href={`/staff-picks/#${linkedBook.id}`}
                                className="text-link font-sc text-xs tracking-[0.06em]"
                              >
                                Read staff note on {linkedBook.title}
                              </SiteLink>
                            ) : null}
                            {!isPast ? (
                              <SiteLink
                                href="/contact/"
                                className="text-link font-sc text-xs tracking-[0.06em]"
                              >
                                {event.seats === 'full' ? 'Ask about waiting list' : 'Ask for a seat'}
                              </SiteLink>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
