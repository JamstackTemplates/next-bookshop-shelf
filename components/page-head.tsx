import type { ReactNode } from 'react';
import { business } from '../content/business';
import { BookplateCornerFlourish, GiltRule } from './art/marks';

/**
 * Book-style page head for inner routes:
 * running head ("The Lamplit Page · Section"), large IM Fell heading,
 * italic standfirst, bespoke section motif on the right, corner flourishes and a gilt tooled rule.
 */
export function PageHead({
  section,
  title,
  children,
  motif,
  id,
}: {
  section: string;
  title: ReactNode;
  children?: ReactNode;
  motif?: ReactNode;
  id?: string;
}) {
  return (
    <header className="hero-stage relative overflow-hidden pt-10 pb-6 sm:pt-14 sm:pb-8">
      <BookplateCornerFlourish
        corner="top-left"
        className="absolute top-3 left-3 hidden h-16 w-16 opacity-60 sm:block"
      />
      <BookplateCornerFlourish
        corner="top-right"
        className="absolute top-3 right-3 hidden h-16 w-16 opacity-60 sm:block"
      />
      <div className="wrap relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-(--measure)">
            <p className="running-head">
              {business.name} · {section}
            </p>
            <h1
              id={id}
              className="mt-3 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.06] text-ink"
            >
              {title}
            </h1>
            {children ? (
              <div className="mt-4 text-lg italic leading-relaxed text-ink-muted sm:text-xl">
                {children}
              </div>
            ) : null}
          </div>
          {motif ? (
            <div className="shrink-0 self-start md:self-end" aria-hidden="true">
              {motif}
            </div>
          ) : null}
        </div>
        <GiltRule className="mt-8" />
      </div>
    </header>
  );
}
