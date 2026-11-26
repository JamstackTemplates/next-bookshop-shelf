'use client';

import { useEffect, useState } from 'react';
import type { ShopOpeningHours } from '../content/business';
import { currentWeekday, type Day } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Brass opening-hours plaque with engraved small caps.
 * Highlights today's row in the business time zone only in the browser, refreshed every minute.
 */
export function HoursPlaque({
  hours,
  className = '',
}: {
  hours: readonly ShopOpeningHours[];
  className?: string;
}) {
  const [today, setToday] = useState<Day | null>(null);

  useEffect(() => {
    const update = () => setToday(currentWeekday(site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`brass-plaque p-6 sm:p-7 ${className}`}>
      {/* Corner brass rivets */}
      <span className="pointer-events-none absolute top-2.5 left-2.5 h-1.5 w-1.5 rounded-full bg-gilt" aria-hidden="true" />
      <span className="pointer-events-none absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-gilt" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-1.5 w-1.5 rounded-full bg-gilt" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-gilt" aria-hidden="true" />

      <h3 className="text-center font-sc text-lg tracking-[0.14em] text-ink">
        Opening Hours
      </h3>
      <div className="mx-auto my-3 h-px w-16 bg-gilt/75" aria-hidden="true" />

      <dl className="space-y-2 text-[0.98rem]">
        {hours.map((entry) => {
          const isToday = today === entry.day;
          return (
            <div
              key={entry.day}
              className={`flex items-baseline justify-between gap-3 rounded-ui px-2 py-1 ${
                isToday ? 'bg-paper-deep font-semibold text-ink ring-1 ring-gilt/60' : 'text-ink'
              }`}
            >
              <dt className="font-sc tracking-[0.05em]">
                {entry.day}
                {isToday ? <span className="ml-1.5 text-xs text-primary">(Today)</span> : null}
              </dt>
              <dd className="text-right tabular-nums">
                {entry.opens && entry.closes ? `${entry.opens}–${entry.closes}` : 'Closed'}
                {entry.note ? (
                  <span className="block text-xs font-normal italic text-ink-muted">
                    {entry.note}
                  </span>
                ) : null}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
