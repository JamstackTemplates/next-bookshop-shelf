import type { Metadata } from 'next';
import { BookplateCornerFlourish, GiltRule } from '../components/art/marks';
import { MisshelvedArt } from '../components/art/misshelved-art';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = {
  title: 'Page misshelved',
  description: 'This page could not be found on our shelves.',
};

export default function NotFound() {
  return (
    <section className="hero-stage relative overflow-hidden py-14 sm:py-20">
      <BookplateCornerFlourish
        corner="top-left"
        className="absolute top-4 left-4 hidden h-20 w-20 opacity-60 sm:block"
      />
      <BookplateCornerFlourish
        corner="top-right"
        className="absolute top-4 right-4 hidden h-20 w-20 opacity-60 sm:block"
      />
      <div className="wrap relative z-10 text-center">
        <MisshelvedArt />

        <p className="running-head mt-6">404 · Victoria Street</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
          This page has been misshelved
        </h1>
        <p className="mt-3 font-hand text-2xl text-ink-muted">
          Marginalia is looking into it.
        </p>

        <GiltRule className="mx-auto mt-8 max-w-md" />

        {/* Three links styled as cloth spine tabs */}
        <nav aria-label="Return to shelves" className="mt-8 flex flex-wrap justify-center gap-3.5">
          <SiteLink
            href="/"
            className="cloth-weave inline-flex min-h-11 items-center rounded-[2px] border border-gilt/80 px-5 py-2 font-sc text-base tracking-[0.06em] text-[#FAF0DC] no-underline shadow-sm transition-transform hover:-translate-y-0.5 hover:no-underline"
            style={{ backgroundColor: 'var(--spine-fiction)' }}
          >
            Home
          </SiteLink>
          <SiteLink
            href="/staff-picks/"
            className="cloth-weave inline-flex min-h-11 items-center rounded-[2px] border border-gilt/80 px-5 py-2 font-sc text-base tracking-[0.06em] text-[#FAF0DC] no-underline shadow-sm transition-transform hover:-translate-y-0.5 hover:no-underline"
            style={{ backgroundColor: 'var(--spine-crime)' }}
          >
            Staff Picks
          </SiteLink>
          <SiteLink
            href="/events/"
            className="cloth-weave inline-flex min-h-11 items-center rounded-[2px] border border-gilt/80 px-5 py-2 font-sc text-base tracking-[0.06em] text-[#FAF0DC] no-underline shadow-sm transition-transform hover:-translate-y-0.5 hover:no-underline"
            style={{ backgroundColor: 'var(--spine-nonfiction)' }}
          >
            Events
          </SiteLink>
        </nav>
      </div>
    </section>
  );
}
