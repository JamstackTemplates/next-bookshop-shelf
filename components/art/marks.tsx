import type { EventKind } from '../../content/events';

/** Brass banker's lamp over an open book — header wordmark & brand mark. */
export function LampMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lamp-mark-glow" cx="50%" cy="46%" r="48%">
          <stop offset="0%" stopColor="var(--lamp)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--lamp)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="23" r="20" fill="url(#lamp-mark-glow)" />
      {/* Green glass banker's shade */}
      <path
        d="M13 20.5C14.2 13.5 18.5 10.5 24 10.5C29.5 10.5 33.8 13.5 35 20.5Z"
        fill="var(--primary)"
        stroke="var(--gilt)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 16.2C19 13.5 21.5 12.6 24 12.6"
        stroke="var(--lamp)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Brass stem & pull chain */}
      <path d="M24 20.5V30.5M19 30.5H29" stroke="var(--gilt)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M29.5 20.5V26.2" stroke="var(--lamp)" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
      <circle cx="29.5" cy="27.4" r="1.4" fill="var(--lamp)" />
      {/* Open book */}
      <path
        d="M8.5 36.5C14 33 19.8 33.2 24 36C28.2 33.2 34 33 39.5 36.5L38 41.2C33.2 38.4 28 38.5 24 40.5C20 38.5 14.8 38.4 10 41.2Z"
        fill="var(--paper)"
        stroke="var(--gilt)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M24 36V40.5" stroke="var(--gilt)" strokeWidth="1.3" />
    </svg>
  );
}

/** Divider 1: Double gilt tooled rule with central printer's fleuron and flanking diamonds. */
export function GiltRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-[5px] flex-1 border-t border-b border-gilt/80" />
      <svg viewBox="0 0 88 20" className="h-5 w-22 shrink-0 text-gilt" fill="none">
        <path
          d="M44 2C46.2 6.2 49.4 8.2 54.5 10C49.4 11.8 46.2 13.8 44 18C41.8 13.8 38.6 11.8 33.5 10C38.6 8.2 41.8 6.2 44 2Z"
          fill="currentColor"
          stroke="var(--lamp)"
          strokeWidth="0.7"
        />
        <circle cx="44" cy="10" r="1.7" fill="var(--paper)" />
        {/* Flanking scrolled leaves */}
        <path d="M28 10 C24 6.5 19 6.5 15 10 C19 13.5 24 13.5 28 10 Z" stroke="currentColor" strokeWidth="1.1" />
        <path d="M60 10 C64 6.5 69 6.5 73 10 C69 13.5 64 13.5 60 10 Z" stroke="currentColor" strokeWidth="1.1" />
        <path d="M9 10 L5 7.5 L1 10 L5 12.5 Z" fill="currentColor" />
        <path d="M79 10 L83 7.5 L87 10 L83 12.5 Z" fill="currentColor" />
      </svg>
      <div className="h-[5px] flex-1 border-t border-b border-gilt/80" />
    </div>
  );
}

/** Divider 2: Full-bleed combed nonpareil marbled endpaper band in bottle-green, oxblood, gilt and paper. */
export function MarbledBand({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-full overflow-hidden border-y-2 border-gilt/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_6px_rgba(0,0,0,0.12)] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="block h-6 w-full sm:h-7"
        fill="none"
      >
        <rect width="1200" height="40" fill="var(--primary)" />
        {/* Deep walnut marbled veins */}
        <path
          d="M0 0 H1200 V14 Q1150 24 1100 12 T1000 15 T900 10 T800 16 T700 11 T600 15 T500 10 T400 16 T300 11 T200 15 T100 10 T0 14 Z"
          fill="var(--walnut-deep)"
          opacity="0.55"
        />
        {/* Oxblood combed ribbon */}
        <path
          d="M0 11 Q45 2 90 14 T180 12 T270 16 T360 11 T450 15 T540 10 T630 16 T720 12 T810 15 T900 10 T990 16 T1080 11 T1170 15 L1200 12 V28 Q1155 36 1110 25 T1020 29 T930 24 T840 30 T750 25 T660 29 T570 24 T480 30 T390 25 T300 29 T210 24 T120 30 T30 25 L0 28 Z"
          fill="var(--oxblood)"
          opacity="0.9"
        />
        {/* Cream rag-paper combed arcs */}
        <path
          d="M0 8 Q50 22 100 8 T200 10 T300 6 T400 11 T500 7 T600 11 T700 6 T800 11 T900 7 T1000 11 T1100 7 T1200 10"
          stroke="var(--paper)"
          strokeWidth="2.4"
          opacity="0.82"
        />
        {/* Gold-leaf nonpareil comb */}
        <path
          d="M0 20 Q30 9 60 21 T120 19 T180 23 T240 18 T300 22 T360 18 T420 23 T480 19 T540 22 T600 18 T660 23 T720 19 T780 22 T840 18 T900 23 T960 19 T1020 22 T1080 18 T1140 23 T1200 19"
          stroke="var(--gilt)"
          strokeWidth="2.1"
          opacity="0.95"
        />
        {/* Warm lamp highlight threads */}
        <path
          d="M0 32 Q60 22 120 33 T240 30 T360 34 T480 29 T600 34 T720 29 T840 33 T960 29 T1080 34 T1200 30"
          stroke="var(--lamp)"
          strokeWidth="1.4"
          opacity="0.85"
        />
        {/* Top & bottom gilt hairline trim */}
        <path d="M0 2.5 H1200 M0 37.5 H1200" stroke="var(--gilt)" strokeWidth="1" opacity="0.7" />
      </svg>
    </div>
  );
}

/** Divider 3: Carved walnut & brass dentil moulding border for bookcase band transitions. */
export function WalnutMouldingBorder({
  flip = false,
  className = '',
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 22"
        preserveAspectRatio="none"
        className="block h-4 w-full sm:h-5"
        fill="none"
      >
        <rect width="1200" height="22" fill="var(--walnut-deep)" />
        {/* Brass fillet bar */}
        <rect y="3" width="1200" height="2" fill="var(--gilt)" opacity="0.82" />
        {/* Carved dentil blocks */}
        <path
          d="M0 11 H1200"
          stroke="var(--gilt)"
          strokeWidth="6"
          strokeDasharray="12 10"
          opacity="0.42"
        />
        {/* Lower shadow bevel & gilt hairline */}
        <rect y="18" width="1200" height="1.5" fill="var(--gilt)" opacity="0.6" />
        <rect y="20" width="1200" height="2" fill="#000000" opacity="0.3" />
      </svg>
    </div>
  );
}

/** Divider 4: Linen bookbinding stitched-signature border between editorial paper sections. */
export function StitchedSignatureBorder({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden py-1 ${className}`} aria-hidden="true">
      <div className="wrap flex items-center gap-4">
        <div className="flex-1 border-t border-dashed border-gilt/75" />
        <svg viewBox="0 0 140 18" className="h-4 w-36 shrink-0 text-gilt" fill="none">
          {/* Stitched linen kettle stitches */}
          <path d="M4 9 H32 M108 9 H136" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
          <circle cx="38" cy="9" r="2" fill="var(--oxblood)" />
          <circle cx="102" cy="9" r="2" fill="var(--oxblood)" />
          {/* Tiny open book colophon */}
          <path
            d="M52 13 C58 9.5 64 9.5 70 12.5 C76 9.5 82 9.5 88 13 L86 5.5 C80.5 3.5 75 4 70 7 C65 4 59.5 3.5 54 5.5 Z"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M70 7 V12.5" stroke="currentColor" strokeWidth="1.1" />
        </svg>
        <div className="flex-1 border-t border-dashed border-gilt/75" />
      </div>
    </div>
  );
}

/** Background decoration: delicate Victorian printer's corner scrollwork for hero & editorial frames. */
export function BookplateCornerFlourish({
  corner = 'top-left',
  className = '',
}: {
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}) {
  const transformClass =
    corner === 'top-right'
      ? '-scale-x-100'
      : corner === 'bottom-left'
        ? '-scale-y-100'
        : corner === 'bottom-right'
          ? '-scale-x-100 -scale-y-100'
          : '';

  return (
    <svg
      viewBox="0 0 96 96"
      className={`pointer-events-none select-none text-gilt ${transformClass} ${className}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Outer & inner corner fillets */}
      <path d="M6 90 V6 H90" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      <path d="M13 82 V13 H82" stroke="currentColor" strokeWidth="0.9" opacity="0.38" />
      {/* Corner botanical scroll */}
      <path
        d="M13 42 C13 24 24 13 42 13 M13 28 C18 28 28 18 28 13"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <path
        d="M19 19 L25 22 L22 25 Z"
        fill="var(--oxblood)"
        opacity="0.48"
      />
      <circle cx="48" cy="13" r="1.6" fill="currentColor" opacity="0.5" />
      <circle cx="13" cy="48" r="1.6" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/** Background decoration: large, faint engraved open-book & compass colophon watermark. */
export function FolioColophonWatermark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={`pointer-events-none select-none text-gilt ${className}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Outer double colophon rings */}
      <circle cx="160" cy="160" r="144" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
      <circle cx="160" cy="160" r="132" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="160" cy="160" r="124" stroke="currentColor" strokeWidth="0.7" />
      {/* Cardinal fleurons */}
      <path d="M160 18 L165 30 L160 36 L155 30 Z" fill="currentColor" />
      <path d="M160 302 L165 290 L160 284 L155 290 Z" fill="currentColor" />
      <path d="M18 160 L30 155 L36 160 L30 165 Z" fill="currentColor" />
      <path d="M302 160 L290 155 L284 160 L290 165 Z" fill="currentColor" />
      {/* Arched window halo inside ring */}
      <path d="M96 220 V142 C96 102 125 78 160 78 C195 78 224 102 224 142 V220" stroke="currentColor" strokeWidth="1.1" />
      {/* Radiating lamplight rays */}
      <path
        d="M160 92 V112 M126 104 L136 120 M194 104 L184 120 M106 132 L122 140 M214 132 L198 140"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Open folio book in centre */}
      <path
        d="M84 196 C112 178 140 179 160 194 C180 179 208 178 236 196 L228 226 C202 210 178 211 160 222 C142 211 118 210 92 226 Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M160 194 V222" stroke="currentColor" strokeWidth="1.1" />
      <path d="M104 198 H144 M108 207 H142 M176 198 H216 M178 207 H212" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

/** Divider 5: Oxblood silk bookmark ribbon hanging into a section from its top edge. */
export function BookmarkRibbon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 88"
      className={`pointer-events-none h-18 w-8 drop-shadow-[0_4px_6px_rgba(0,0,0,0.28)] sm:h-22 sm:w-9 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 0H33V84L18 68L3 84V0Z"
        fill="var(--oxblood)"
        stroke="var(--ink)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8 0V74M28 0V74"
        stroke="var(--gilt)"
        strokeWidth="1.1"
        strokeDasharray="2.5 2.5"
        opacity="0.88"
      />
      {/* Central woven diamond motif */}
      <path d="M18 14 L22 20 L18 26 L14 20 Z" stroke="var(--lamp)" strokeWidth="1" opacity="0.7" />
      <path d="M18 32 V56" stroke="var(--lamp)" strokeWidth="0.9" opacity="0.55" />
    </svg>
  );
}

/* --- 24px shared-style icons (1.5px warm ink strokes) --- */

type IconProps = { className?: string };

export function ClockIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function MapPinIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export function EnvelopeIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

export function PhoneIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 4.5h3l1.3 4-2 1.5a12.5 12.5 0 0 0 5.2 5.2l1.5-2 4 1.3v3A2 2 0 0 1 17.5 19.5C10.5 19.5 4.5 13.5 4.5 6.5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function BookIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 6.5C6.5 5 9.5 5.2 12 7c2.5-1.8 5.5-2 8.5-.5v11.5c-3-1.5-6-1.3-8.5.5-2.5-1.8-5.5-2-8.5-.5V6.5z" />
      <path d="M12 7v11.5" />
    </svg>
  );
}

export function MicrophoneIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="3.5" width="6" height="10" rx="3" />
      <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5v3M9 20.5h6" />
    </svg>
  );
}

export function PenNibIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5 5.5 11.5 9 4.5h6l3.5 7L12 20.5z" />
      <path d="M12 20.5v-7" />
      <circle cx="12" cy="12" r="1.4" />
    </svg>
  );
}

export function LaunchIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 18.5h14M7 18.5V9l5-3 5 3v9.5" />
      <path d="M12 6v12.5M4 6l2 1M20 6l-2 1M12 2.5v1.5" />
    </svg>
  );
}

export function PictureBookIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="1.5" />
      <path d="M12 5v14M7 10.5l1.5-1.5 1.5 1.5M14.5 13l1.5-2 1.5 2" />
      <circle cx="8.5" cy="14" r="1" />
    </svg>
  );
}

export function TeacupIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 10h11v4a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-4z" />
      <path d="M16 11h2a2 2 0 0 1 0 4h-2M4 19.5h13" />
      <path d="M8.5 7c0-1 .8-1.5.8-2.5M12 7c0-1 .8-1.5.8-2.5" />
    </svg>
  );
}

export function TicketIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7.5h16v3a1.5 1.5 0 0 0 0 3v3H4v-3a1.5 1.5 0 0 0 0-3v-3z" />
      <path d="M9.5 7.5v9" strokeDasharray="2 2" />
    </svg>
  );
}

export function EventKindIcon({ kind, className = 'h-4 w-4' }: { kind: EventKind; className?: string }) {
  switch (kind) {
    case 'reading':
      return <MicrophoneIcon className={className} />;
    case 'signing':
      return <PenNibIcon className={className} />;
    case 'launch':
      return <LaunchIcon className={className} />;
    case 'story-hour':
      return <PictureBookIcon className={className} />;
    case 'book-club':
      return <TeacupIcon className={className} />;
  }
}
