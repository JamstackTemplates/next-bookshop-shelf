'use client';

import { useId, useRef, useState } from 'react';
import { shelfById } from '../content/shelves';
import { staffById } from '../content/staff';
import {
  formatBookPrice,
  stockLabel,
  type SpineHeight,
  type SpineWidth,
  type StaffPick,
} from '../content/staff-picks';
import { SiteLink } from './site-link';

const HEIGHT_CLASS: Record<SpineHeight, string> = {
  short: 'h-48 sm:h-52',
  medium: 'h-56 sm:h-60',
  tall: 'h-64 sm:h-68',
};

const WIDTH_CLASS: Record<SpineWidth, string> = {
  slim: 'w-12 sm:w-14',
  regular: 'w-14 sm:w-16',
  thick: 'w-16 sm:w-[4.75rem]',
};

/** Small brass desk lamp sitting at one end of the walnut spine shelf. */
function ShelfLamp({ side }: { side: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 88 150"
      className={`hidden h-36 w-22 shrink-0 self-end sm:block ${side === 'right' ? '-scale-x-100' : ''}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`shelf-lamp-glow-${side}`} cx="62%" cy="32%" r="60%">
          <stop offset="0%" stopColor="var(--lamp)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--lamp)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="52" cy="48" r="46" fill={`url(#shelf-lamp-glow-${side})`} />
      {/* Brass base & stem */}
      <ellipse cx="30" cy="145" rx="22" ry="4.5" fill="var(--gilt)" stroke="#1a120c" strokeWidth="1.4" />
      <path d="M30 142 V54 C30 34 44 26 56 26" stroke="var(--gilt)" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M30 142 V54 C30 34 44 26 56 26" stroke="#1a120c" strokeWidth="1.2" strokeLinecap="round" />
      {/* Green banker's shade */}
      <path
        d="M34 48 C37 26 50 18 62 18 C74 18 82 28 84 48 Z"
        fill="var(--primary)"
        stroke="#1a120c"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M44 37 C48 26 54 23 62 23" stroke="var(--lamp)" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="59" cy="48" rx="24" ry="4.5" fill="var(--lamp)" stroke="#1a120c" strokeWidth="1.2" />
      {/* Pull chain */}
      <path d="M72 50 V72" stroke="var(--gilt)" strokeWidth="1.2" strokeDasharray="2 2" />
      <circle cx="72" cy="74" r="2.2" fill="var(--lamp)" />
    </svg>
  );
}

/** Single shelf-talker card clipped to the shelf edge with a brass clip. */
export function ShelfTalkerCard({
  pick,
  showAnchorId = false,
  className = '',
}: {
  pick: StaffPick;
  showAnchorId?: boolean;
  className?: string;
}) {
  const picker = staffById[pick.pickedBy];
  const shelf = shelfById[pick.shelf];
  const stockBadgeColor =
    pick.stock === 'last-copy'
      ? 'text-oxblood'
      : pick.stock === 'order-in'
        ? 'text-stamp'
        : 'text-primary';

  return (
    <article
      id={showAnchorId ? pick.id : undefined}
      className={`shelf-talker-card relative rounded-[2px] p-5 sm:p-6 ${className}`}
    >
      {/* Brass clip gripping the top edge */}
      <div className="pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2" aria-hidden="true">
        <svg viewBox="0 0 40 20" className="h-5 w-10" fill="none">
          <rect x="6" y="4" width="28" height="12" rx="2" fill="var(--gilt)" stroke="var(--ink)" strokeWidth="1.3" />
          <path d="M12 4 C14 0 26 0 28 4" stroke="var(--lamp)" strokeWidth="1.4" />
          <circle cx="20" cy="10" r="2" fill="var(--walnut)" />
        </svg>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2.5">
        <div>
          <h3 className="font-display text-2xl leading-tight text-ink">{pick.title}</h3>
          <p className="mt-0.5 font-sc text-sm tracking-[0.06em] text-ink-muted">
            {pick.author} · {shelf.label}
          </p>
        </div>
        <p className="font-sc text-base tracking-[0.04em] text-ink">
          {formatBookPrice(pick.price)}{' '}
          <span className="text-xs text-ink-muted">({pick.format})</span>
        </p>
      </div>

      <p className="mt-4 font-hand text-[1.18rem] leading-relaxed text-ink">
        “{pick.note}”
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-3 text-sm">
        <p className="font-sc tracking-[0.06em] text-ink-muted">
          Picked by <span className="text-ink">{picker.name}</span>
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`font-sc text-xs tracking-[0.08em] ${stockBadgeColor}`}>
            {stockLabel(pick.stock)}
          </span>
          <SiteLink href="/contact/" className="text-link font-sc text-xs tracking-[0.06em]">
            Ask to set aside
          </SiteLink>
        </div>
      </div>
    </article>
  );
}

/**
 * Signature element: cloth-bound book spines standing on a walnut shelf under a brass reading lamp.
 * Hovering, focusing or selecting a spine tips it forward and updates the clipped shelf-talker card.
 * Keyboard arrow keys move between spines. Without JavaScript, all shelf-talkers render below.
 */
export function SpineShelf({
  picks,
  lampSide = 'left',
  showInteractiveTalker = true,
  shelfLabel = 'Staff picks shelf',
}: {
  picks: readonly StaffPick[];
  lampSide?: 'left' | 'right';
  showInteractiveTalker?: boolean;
  shelfLabel?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const talkerRegionId = useId();

  if (picks.length === 0) return null;
  const activePick = picks[selectedIndex] ?? picks[0];

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLButtonElement>) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % picks.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + picks.length) % picks.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = picks.length - 1;
    else return;
    event.preventDefault();
    setSelectedIndex(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    <div className="w-full">
      {/* Standing spines row + brass lamp */}
      <div
        role="group"
        aria-label={shelfLabel}
        className={`flex items-end justify-start gap-2 overflow-x-auto px-3 pt-6 pb-0 sm:justify-center sm:overflow-visible ${
          lampSide === 'right' ? 'sm:flex-row-reverse' : ''
        }`}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <ShelfLamp side={lampSide} />

        <div className="flex items-end gap-1.5 sm:gap-2.5">
          {picks.map((pick, index) => {
            const shelf = shelfById[pick.shelf];
            const isSelected = index === selectedIndex;
            return (
              <button
                key={pick.id}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                type="button"
                aria-pressed={isSelected}
                aria-controls={showInteractiveTalker ? talkerRegionId : undefined}
                onClick={() => setSelectedIndex(index)}
                onFocus={() => setSelectedIndex(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{ backgroundColor: shelf.spineVar, scrollSnapAlign: 'center' }}
                className={`book-spine cloth-weave shrink-0 px-1 py-3 ${HEIGHT_CLASS[pick.spine.height]} ${WIDTH_CLASS[pick.spine.width]}`}
              >
                {/* Top gilt tooling band */}
                <span className="h-[3px] w-4/5 border-y border-gilt/90" aria-hidden="true" />

                {/* Vertical title & author running up the spine */}
                <span
                  className="my-1.5 flex max-h-[75%] items-center justify-center overflow-hidden font-sc text-[0.74rem] leading-tight tracking-[0.06em] text-[#FAF0DC] sm:text-[0.8rem]"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  <span className="truncate font-normal">{pick.title}</span>
                </span>

                {/* Bottom gilt tooling band */}
                <span className="h-[3px] w-4/5 border-y border-gilt/90" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Solid walnut shelf plank with carved bracket ends */}
      <div className="relative mx-auto max-w-4xl" aria-hidden="true">
        <div className="h-4 rounded-[2px] border-t border-gilt/45 bg-walnut-deep shadow-[0_6px_16px_rgba(0,0,0,0.45)]" />
        <div className="flex justify-between px-6">
          <div className="h-5 w-4 rounded-b-sm border-x border-b border-black/30 bg-walnut-deep" />
          <div className="h-5 w-4 rounded-b-sm border-x border-b border-black/30 bg-walnut-deep" />
        </div>
      </div>

      {/* Active shelf-talker card clipped beneath the shelf */}
      {showInteractiveTalker ? (
        <div id={talkerRegionId} aria-live="polite" className="mx-auto mt-3 max-w-xl">
          <ShelfTalkerCard key={activePick.id} pick={activePick} />
        </div>
      ) : null}

      {/* No-JS fallback: every pick's shelf-talker rendered visibly */}
      {showInteractiveTalker ? (
        <noscript>
          <div className="mx-auto mt-6 grid max-w-4xl gap-5 sm:grid-cols-2">
            {picks.map((pick) => (
              <ShelfTalkerCard key={pick.id} pick={pick} />
            ))}
          </div>
        </noscript>
      ) : null}
    </div>
  );
}
