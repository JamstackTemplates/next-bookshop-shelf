/**
 * 404 "Misshelved" illustration:
 * A walnut shelf of cloth-bound books with a gap where one book was pulled;
 * Marginalia the grey tabby is curled up asleep in the gap, and the fallen book lies open below.
 */
export function MisshelvedArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 310"
      className={`mx-auto block w-full max-w-[38rem] ${className}`}
      fill="none"
      role="img"
      aria-label="A wooden bookshelf with a missing book. A grey tabby cat is curled asleep in the empty gap while the fallen book lies open on the floor below."
    >
      {/* Walnut shelf plank & brackets */}
      <rect x="34" y="182" width="572" height="18" rx="2" fill="var(--walnut)" stroke="var(--ink)" strokeWidth="1.6" />
      <path d="M72 200 H96 L72 224 Z M568 200 H544 L568 224 Z" fill="var(--walnut-deep)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Left group of standing cloth-bound spines */}
      <rect x="64" y="54" width="32" height="128" rx="2" fill="var(--spine-fiction)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M70 74 H90 M70 162 H90" stroke="var(--gilt)" strokeWidth="1.5" />

      <rect x="97" y="72" width="26" height="110" rx="2" fill="var(--spine-crime)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M102 88 H118 M102 164 H118" stroke="var(--gilt)" strokeWidth="1.5" />

      <rect x="124" y="48" width="34" height="134" rx="2" fill="var(--spine-nonfiction)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M130 68 H152 M130 164 H152" stroke="var(--gilt)" strokeWidth="1.5" />

      <rect x="159" y="82" width="24" height="100" rx="2" fill="var(--spine-poetry)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M164 96 H178 M164 166 H178" stroke="var(--gilt)" strokeWidth="1.5" />

      {/* Slightly leaning book next to the gap */}
      <g transform="rotate(9 196 182)">
        <rect x="184" y="64" width="28" height="118" rx="2" fill="var(--spine-scotland)" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M190 82 H206 M190 164 H206" stroke="var(--gilt)" strokeWidth="1.5" />
      </g>

      {/* Marginalia curled up asleep inside the empty gap */}
      <g transform="translate(248, 126)">
        <ellipse cx="64" cy="36" rx="50" ry="22" fill="var(--cat-coat)" stroke="var(--ink)" strokeWidth="1.6" />
        <path d="M44 17 C48 25 48 34 45 42 M62 15 C66 23 66 33 63 42 M80 17 C83 25 83 34 80 42" stroke="var(--cat-stripe)" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="34" cy="36" r="18" fill="var(--cat-coat)" stroke="var(--ink)" strokeWidth="1.6" />
        <path d="M22 24 L20 10 L33 18 Z M38 19 L48 9 L50 23 Z" fill="var(--cat-coat)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M26 36 Q30 40 34 36 M37 36 Q41 40 45 36" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="35" cy="41" r="1.6" fill="var(--oxblood)" />
        {/* Tail hanging over the walnut shelf edge */}
        <path d="M108 42 C124 44 128 66 116 84 C110 92 104 94 106 102" stroke="var(--cat-coat)" strokeWidth="9" strokeLinecap="round" />
        <path d="M108 42 C124 44 128 66 116 84 C110 92 104 94 106 102" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Right group of standing cloth-bound spines */}
      <g transform="rotate(-7 434 182)">
        <rect x="422" y="66" width="28" height="116" rx="2" fill="var(--spine-children)" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M428 84 H444 M428 164 H444" stroke="var(--gilt)" strokeWidth="1.5" />
      </g>

      <rect x="454" y="52" width="34" height="130" rx="2" fill="var(--spine-fiction)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M460 72 H482 M460 164 H482" stroke="var(--gilt)" strokeWidth="1.5" />

      <rect x="489" y="76" width="26" height="106" rx="2" fill="var(--spine-crime)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M494 92 H510 M494 166 H510" stroke="var(--gilt)" strokeWidth="1.5" />

      <rect x="516" y="58" width="32" height="124" rx="2" fill="var(--spine-nonfiction)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M522 76 H542 M522 164 H542" stroke="var(--gilt)" strokeWidth="1.5" />

      <rect x="549" y="80" width="24" height="102" rx="2" fill="var(--spine-poetry)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M554 96 H568 M554 166 H568" stroke="var(--gilt)" strokeWidth="1.5" />

      {/* Fallen open book on the floor below */}
      <g transform="translate(216, 224)">
        <path
          d="M12 46 C44 30 82 32 104 46 C126 32 164 30 196 46 L186 70 C158 56 126 57 104 68 C82 57 50 56 22 70 Z"
          fill="var(--surface)"
          stroke="var(--ink)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M104 46 V68" stroke="var(--gilt)" strokeWidth="1.5" />
        {/* Fluttered top page */}
        <path d="M104 46 C120 20 148 18 172 34" stroke="var(--ink)" strokeWidth="1.4" fill="var(--paper)" />
        {/* Page text lines */}
        <path d="M36 48 H88 M40 55 H84 M120 50 H170 M122 57 H164" stroke="var(--ink-muted)" strokeWidth="1.1" opacity="0.65" />
        {/* Oxblood bookmark ribbon */}
        <path d="M104 46 L98 78 L104 72 L110 78 Z" fill="var(--oxblood)" stroke="var(--ink)" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
