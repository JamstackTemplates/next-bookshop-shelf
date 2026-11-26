import { shelfById } from '../../content/shelves';
import type { StaffPick } from '../../content/staff-picks';

/**
 * Generated cloth-bound book cover drawn from a StaffPick's data:
 * shelf cloth colour, woven crosshatch, gilt corner tooling, visible page block and IM Fell typography.
 */
export function DrawnBookCover({
  book,
  className = '',
  tilted = false,
}: {
  book: StaffPick;
  className?: string;
  tilted?: boolean;
}) {
  const shelf = shelfById[book.shelf];
  return (
    <div
      className={`cloth-weave relative mx-auto aspect-[2/3] w-full max-w-[16.75rem] rounded-r-md rounded-l-[2px] border border-ink/40 p-5 text-[#F6E9CE] shadow-[4px_0_0_0_var(--paper),5px_0_0_0_var(--line),8px_14px_30px_rgba(0,0,0,0.3),2px_4px_10px_rgba(0,0,0,0.2)] ${
        tilted ? '-rotate-2 transition-transform duration-300 hover:rotate-0' : ''
      } ${className}`}
      style={{ backgroundColor: shelf.spineVar }}
    >
      {/* Spine crease highlight & raised bands */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-4 rounded-l-[2px] border-r border-black/28 bg-gradient-to-r from-black/28 via-white/12 to-transparent"
        aria-hidden="true"
      />
      {/* Gilt inner border frame */}
      <div className="relative ml-2.5 flex h-full flex-col justify-between border border-gilt/90 p-4 shadow-[inset_0_0_0_3px_rgba(0,0,0,0.12)]">
        {/* Corner flourishes */}
        <span className="pointer-events-none absolute top-1.5 left-1.5 h-3 w-3 border-t border-l border-lamp/90" aria-hidden="true" />
        <span className="pointer-events-none absolute top-1.5 right-1.5 h-3 w-3 border-t border-r border-lamp/90" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-3 w-3 border-b border-l border-lamp/90" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-3 w-3 border-b border-r border-lamp/90" aria-hidden="true" />

        <p className="text-center font-sc text-xs tracking-[0.16em] text-[#E6CE9E]">
          {shelf.label}
        </p>

        <div className="my-auto text-center">
          {/* Small gilt diamond fleuron above title */}
          <svg viewBox="0 0 40 12" className="mx-auto mb-3 h-3 w-10 text-lamp/85" fill="none" aria-hidden="true">
            <path d="M2 6 H14 M26 6 H38" stroke="currentColor" strokeWidth="1" />
            <path d="M20 1.5 L24 6 L20 10.5 L16 6 Z" fill="currentColor" />
          </svg>
          <p className="font-display text-2xl leading-tight text-[#FAF0DC]">
            {book.title}
          </p>
          <p className="mt-3 font-sc text-sm tracking-[0.08em] text-[#E6CE9E]">
            {book.author}
          </p>
          <div className="mx-auto mt-3 h-px w-12 bg-gilt/85" aria-hidden="true" />
        </div>

        <p className="text-center font-sc text-[0.7rem] tracking-[0.14em] text-[#E6CE9E]/85">
          {book.format} · £{book.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
