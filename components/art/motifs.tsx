/** Rubber date stamp and open ink pad — Events page motif. */
export function DateStampMotif({ className = 'h-24 w-32' }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 110" className={className} fill="none" aria-hidden="true">
      {/* Open ink pad */}
      <rect x="64" y="68" width="72" height="24" rx="4" fill="var(--walnut)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="70" y="72" width="60" height="14" rx="2" fill="var(--stamp)" stroke="var(--ink)" strokeWidth="1.2" />
      {/* Open lid */}
      <path d="M66 68 L74 42 L132 42 L134 68 Z" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M78 52 H122 M84 59 H116" stroke="var(--gilt)" strokeWidth="1.2" />
      {/* Turned walnut stamp handle */}
      <path
        d="M36 52 C33 38 28 32 28 24 C28 16 34 11 41 11 C48 11 54 16 54 24 C54 32 49 38 46 52 Z"
        fill="var(--walnut)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M35 21 C37 16 40 15 43 15" stroke="var(--gilt)" strokeWidth="1.2" strokeLinecap="round" />
      {/* Brass collar & rubber base */}
      <rect x="33" y="52" width="16" height="6" rx="1" fill="var(--gilt)" stroke="var(--ink)" strokeWidth="1.4" />
      <path d="M18 58 H64 L68 72 H14 Z" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="15" y="72" width="52" height="6" fill="var(--oxblood)" stroke="var(--ink)" strokeWidth="1.4" />
      {/* Stamped impression on paper */}
      <g transform="rotate(-6 48 96)">
        <rect x="14" y="86" width="56" height="17" rx="2" stroke="var(--stamp)" strokeWidth="1.3" strokeDasharray="3 1.5" opacity="0.85" />
        <text x="42" y="98" textAnchor="middle" fill="var(--stamp)" fontSize="9.5" fontFamily="var(--font-sc)" letterSpacing="1.2">
          03 DEC
        </text>
      </g>
    </svg>
  );
}

/** Teacup beside an open book with curling steam — Book Club motif. */
export function TeacupBookMotif({ className = 'h-24 w-36' }: { className?: string }) {
  return (
    <svg viewBox="0 0 165 108" className={className} fill="none" aria-hidden="true">
      {/* Open book on the left */}
      <path
        d="M12 78 C28 69 47 70 60 78 C73 70 92 69 108 78 L103 94 C89 86 73 86 60 93 C47 86 31 86 17 94 Z"
        fill="var(--surface)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M60 78 V93" stroke="var(--gilt)" strokeWidth="1.4" />
      {/* Lines of type on open pages */}
      <path d="M24 80 H50 M26 84 H48 M70 80 H95 M71 84 H92" stroke="var(--ink-muted)" strokeWidth="1" opacity="0.7" />
      {/* Oxblood bookmark ribbon */}
      <path d="M60 78 L55 102 L60 98 L65 102 Z" fill="var(--oxblood)" stroke="var(--ink)" strokeWidth="1.1" />
      {/* Saucer */}
      <ellipse cx="124" cy="88" rx="30" ry="7" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Teacup */}
      <path
        d="M104 58 H144 V72 C144 82 135 87 124 87 C113 87 104 82 104 72 Z"
        fill="var(--surface)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M106 64 H142" stroke="var(--gilt)" strokeWidth="1.4" />
      <path d="M144 63 H151 C156 63 157 74 150 76 H143" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Tea surface */}
      <ellipse cx="124" cy="58" rx="20" ry="3.5" fill="var(--lamp)" opacity="0.65" stroke="var(--ink)" strokeWidth="1.2" />
      {/* Steam curls */}
      <path d="M116 49 C112 42 120 37 115 29" stroke="var(--gilt)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M126 46 C122 38 131 32 125 22" stroke="var(--gilt)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M135 50 C132 44 139 39 135 32" stroke="var(--gilt)" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/** Brass shop bell on a scrolled bracket — Find the shop motif. */
export function ShopBellMotif({ className = 'h-20 w-28' }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 92" className={className} fill="none" aria-hidden="true">
      {/* Door arch lintel */}
      <path d="M14 26 Q65 6 116 26" stroke="var(--walnut)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 30 Q65 13 108 30" stroke="var(--gilt)" strokeWidth="1.2" strokeLinecap="round" />
      {/* Scrolled iron spring bracket */}
      <path
        d="M65 18 C65 28 82 28 82 38 C82 46 66 44 66 52"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Brass bell */}
      <path
        d="M52 72 C54 57 58 51 66 51 C74 51 78 57 80 72 Z"
        fill="var(--gilt)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M58 64 C59 57 62 54 66 54" stroke="var(--lamp)" strokeWidth="1.3" strokeLinecap="round" />
      <ellipse cx="66" cy="72" rx="14" ry="3.2" fill="var(--walnut)" stroke="var(--ink)" strokeWidth="1.4" />
      <circle cx="66" cy="75" r="3" fill="var(--lamp)" stroke="var(--ink)" strokeWidth="1.3" />
      {/* Gentle sound lines */}
      <path d="M44 62 C41 65 41 69 44 72 M88 62 C91 65 91 69 88 72" stroke="var(--gilt)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** Fountain pen and wax-sealed folded letter — Contact & Home closing letter motif. */
export function FountainPenMotif({ className = 'h-24 w-36' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 105" className={className} fill="none" aria-hidden="true">
      {/* Folded letter envelope */}
      <rect x="20" y="34" width="96" height="58" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M21 35 L68 68 L115 35" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M21 91 L54 60 M115 91 L82 60" stroke="var(--line)" strokeWidth="1.2" />
      {/* Oxblood wax seal */}
      <circle cx="68" cy="67" r="9" fill="var(--oxblood)" stroke="var(--ink)" strokeWidth="1.4" />
      <circle cx="68" cy="67" r="5.5" stroke="var(--gilt)" strokeWidth="1" />
      {/* Fountain pen lying diagonally */}
      <g transform="rotate(-24 108 50)">
        <path d="M72 48 L138 45 C144 45 147 48 147 51 C147 54 144 57 138 57 L72 54 Z" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.5" />
        <rect x="92" y="47" width="6" height="8" fill="var(--gilt)" stroke="var(--ink)" strokeWidth="1.2" />
        {/* Gold nib */}
        <path d="M72 48 L56 51 L72 54 Z" fill="var(--gilt)" stroke="var(--ink)" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M56 51 H67" stroke="var(--ink)" strokeWidth="1" />
        <circle cx="66" cy="51" r="1.2" fill="var(--ink)" />
      </g>
    </svg>
  );
}
