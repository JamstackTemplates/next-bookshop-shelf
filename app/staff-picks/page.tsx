import type { Metadata } from 'next';
import {
  BookmarkRibbon,
  GiltRule,
  LampMark,
  MarbledBand,
  StitchedSignatureBorder,
} from '../../components/art/marks';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { StaffPicksBrowser } from '../../components/staff-picks-browser';
import { shelfById, shelves } from '../../content/shelves';
import { staff } from '../../content/staff';
import { staffPicks } from '../../content/staff-picks';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Staff Picks',
  description:
    'Handwritten shelf-talkers from the booksellers of The Lamplit Page across fiction, crime, nonfiction, poetry, children’s and Scottish writing.',
  alternates: { canonical: absoluteUrl('/staff-picks/') },
};

export default function StaffPicksPage() {
  return (
    <>
      <PageHead
        section="Staff Picks"
        title="Read by us, recommended by hand"
        motif={<LampMark className="h-20 w-20" />}
      >
        <p>
          Every book on these shelves has been read by someone behind our counter. Choose a shelf
          below or browse them all — the notes are written just as they hang in the shop.
        </p>
      </PageHead>

      <StaffPicksBrowser shelves={shelves} picks={staffPicks} />

      {/* Meet the pickers: four oval ex-libris bookplates on endpaper diamond lattice */}
      <section aria-labelledby="meet-pickers" className="paper-deep-grain mt-12">
        <MarbledBand />
        <div className="wrap py-16">
          <p className="running-head text-center">Behind the counter</p>
          <h2 id="meet-pickers" className="mt-2 text-center font-display text-4xl text-ink sm:text-5xl">
            Meet the pickers
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-center text-lg italic text-ink-muted">
            Four readers with very different bedside stacks and one shared kettle.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((member) => {
              const favShelf = shelfById[member.shelf];
              return (
                <article
                  key={member.id}
                  className="bookplate-panel flex flex-col items-center rounded-[50%_50%_4px_4px/14%_14%_4px_4px] px-6 py-8 text-center"
                >
                  <p className="font-sc text-xs tracking-[0.18em] text-oxblood">Ex Libris</p>
                  <h3 className="mt-1 font-display text-2xl text-ink">{member.name}</h3>
                  <p className="mt-1 font-sc text-xs tracking-[0.1em] text-ink-muted">
                    {member.role}
                  </p>
                  <div className="my-3 h-px w-12 bg-gilt/80" aria-hidden="true" />
                  <p className="text-[0.98rem] leading-relaxed text-ink-muted">{member.bio}</p>
                  <p className="mt-auto pt-4 font-sc text-xs tracking-[0.08em] text-ink">
                    Favourite shelf:{' '}
                    <span
                      className="inline-block rounded-[2px] px-2 py-0.5 text-[#FAF0DC]"
                      style={{ backgroundColor: favShelf.spineVar }}
                    >
                      {favShelf.label}
                    </span>
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing enquiry prompt on paper with bookmark ribbon */}
      <section aria-labelledby="set-aside" className="paper-grain relative pt-8 pb-16">
        <StitchedSignatureBorder className="mb-10" />
        <div className="pointer-events-none absolute top-0 left-8 sm:left-16">
          <BookmarkRibbon />
        </div>
        <div className="wrap-narrow text-center">
          <h2 id="set-aside" className="font-display text-3xl text-ink sm:text-4xl">
            Ask us to set one aside
          </h2>
          <p className="mt-3 text-lg text-ink-muted">
            Spotted a last copy or a title we can order in? Send us a note and a bookseller will
            reply to confirm what we have on the shelf.
          </p>
          <p className="mt-6">
            <SiteLink href="/contact/" className="button-primary cloth-weave">
              Enquire about a book
            </SiteLink>
          </p>
          <GiltRule className="mt-12" />
        </div>
      </section>
    </>
  );
}
