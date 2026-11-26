'use client';

import { useEffect, useState } from 'react';
import type { Shelf, ShelfId } from '../content/shelves';
import type { StaffPick } from '../content/staff-picks';
import { WalnutMouldingBorder } from './art/marks';
import { ShelfTalkerCard, SpineShelf } from './spine-shelf';

/**
 * Filterable staff-picks browser.
 * Filter buttons render only after hydration in the browser, so without JavaScript
 * every shelf and pick is shown cleanly with no inert controls.
 */
export function StaffPicksBrowser({
  shelves,
  picks,
}: {
  shelves: readonly Shelf[];
  picks: readonly StaffPick[];
}) {
  const [hydrated, setHydrated] = useState(false);
  const [activeShelf, setActiveShelf] = useState<ShelfId | 'all'>('all');

  useEffect(() => {
    setHydrated(true);
  }, []);

  const visibleShelves =
    activeShelf === 'all' ? shelves : shelves.filter((shelf) => shelf.id === activeShelf);

  const visibleCount = visibleShelves.reduce(
    (sum, shelf) => sum + picks.filter((p) => p.shelf === shelf.id).length,
    0,
  );

  const announcement =
    activeShelf === 'all'
      ? `Showing all ${visibleCount} picks across ${shelves.length} shelves`
      : `Showing ${visibleCount} ${shelves.find((s) => s.id === activeShelf)?.label ?? ''} picks`;

  return (
    <div>
      {/* Cloth-tab shelf filter (rendered only in browser) */}
      {hydrated ? (
        <div className="no-print paper-grain py-6">
          <div className="wrap">
            <div
              role="group"
              aria-label="Filter picks by shelf"
              className="flex flex-wrap items-center gap-2.5"
            >
              <button
                type="button"
                aria-pressed={activeShelf === 'all'}
                onClick={() => setActiveShelf('all')}
                className={`min-h-10 rounded-ui border px-4 py-1.5 font-sc text-sm tracking-[0.06em] transition-colors ${
                  activeShelf === 'all'
                    ? 'border-ink bg-walnut text-walnut-ink'
                    : 'border-gilt/70 bg-surface text-ink hover:bg-paper-deep'
                }`}
              >
                All shelves ({picks.length})
              </button>
              {shelves.map((shelf) => {
                const count = picks.filter((p) => p.shelf === shelf.id).length;
                const isSelected = activeShelf === shelf.id;
                return (
                  <button
                    key={shelf.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveShelf(isSelected ? 'all' : shelf.id)}
                    style={
                      isSelected
                        ? { backgroundColor: shelf.spineVar, color: '#FAF0DC' }
                        : undefined
                    }
                    className={`cloth-weave inline-flex min-h-10 items-center gap-2 rounded-ui border px-3.5 py-1.5 font-sc text-sm tracking-[0.06em] transition-all ${
                      isSelected
                        ? 'border-lamp ring-2 ring-lamp/60'
                        : 'border-line bg-surface text-ink hover:border-gilt'
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-[2px] border border-black/25"
                      style={{ backgroundColor: shelf.spineVar }}
                      aria-hidden="true"
                    />
                    <span>
                      {shelf.label} ({count})
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

      {/* One full-bleed walnut shelf per genre, alternating lamp left and right */}
      <div className="space-y-12">
        {visibleShelves.map((shelf, index) => {
          const shelfPicks = picks.filter((p) => p.shelf === shelf.id);
          if (shelfPicks.length === 0) return null;
          const lampSide = index % 2 === 0 ? 'left' : 'right';

          return (
            <section
              key={shelf.id}
              aria-labelledby={`shelf-${shelf.id}`}
              className="pb-4"
            >
              {/* Full-bleed walnut shelf band with carved cornice borders */}
              <div className="walnut-band">
                <WalnutMouldingBorder />
                <div className="wrap py-10">
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <p className="font-sc text-xs tracking-[0.16em] text-walnut-muted">
                        Shelf 0{index + 1}
                      </p>
                      <h2
                        id={`shelf-${shelf.id}`}
                        className="mt-1 font-display text-3xl text-walnut-ink sm:text-4xl"
                      >
                        {shelf.label}
                      </h2>
                    </div>
                    <p className="max-w-[44ch] text-base italic text-walnut-muted">
                      {shelf.subtitle}
                    </p>
                  </div>

                  <SpineShelf
                    picks={shelfPicks}
                    lampSide={lampSide}
                    showInteractiveTalker={false}
                    shelfLabel={`${shelf.label} spine shelf`}
                  />
                </div>
                <WalnutMouldingBorder flip />
              </div>

              {/* Pinned shelf-talker cards in a row below this genre's shelf */}
              <div className="wrap mt-8">
                <div className="grid gap-6 md:grid-cols-2">
                  {shelfPicks.map((pick) => (
                    <ShelfTalkerCard key={pick.id} pick={pick} showAnchorId />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
