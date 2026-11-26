import type { Metadata } from 'next';
import { MarbledBand, StitchedSignatureBorder } from '../../components/art/marks';
import { DateStampMotif } from '../../components/art/motifs';
import { EventsProgramme } from '../../components/events-programme';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { events } from '../../content/events';
import { absoluteUrl } from '../../lib/paths';
import { eventsStructuredData, jsonLd } from '../../lib/structured-data';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Author readings by lamplight, signings, paperback launches, Saturday children’s story hour and monthly Fireside Book Club evenings.',
  alternates: { canonical: absoluteUrl('/events/') },
};

export default function EventsPage() {
  return (
    <>
      <PageHead
        section="Events"
        title="Readings by lamplight"
        motif={<DateStampMotif className="h-24 w-32" />}
      >
        <p>
          On Thursdays we stay open late for readings and launches; on Saturdays the front rug
          belongs to story hour. Pull up a chair in the back room.
        </p>
      </PageHead>

      <EventsProgramme events={events} />

      {/* "How seats work" printed notice with gilt border */}
      <section aria-labelledby="how-seats-work" className="paper-deep-grain">
        <MarbledBand />
        <div className="wrap-narrow py-14">
          <div className="bookplate-panel p-7 text-center sm:p-9">
            <p className="running-head">Notice to visitors</p>
            <h2 id="how-seats-work" className="mt-2 font-display text-3xl text-ink">
              How seats work
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-lg leading-relaxed text-ink-muted">
              Free events still need a seat — just ask. Ticketed readings are £5, paid in the shop
              and redeemable against the book on the night. Nothing is held until we reply.
            </p>
          </div>
        </div>
      </section>

      {/* Closing enquiry prompt */}
      <section aria-labelledby="suggest-event" className="paper-grain pt-8 pb-14">
        <StitchedSignatureBorder className="mb-10" />
        <div className="wrap-narrow text-center">
          <h2 id="suggest-event" className="font-display text-3xl text-ink sm:text-4xl">
            Suggest an author or ask for a seat
          </h2>
          <p className="mt-3 text-lg text-ink-muted">
            Tell us which evening you would like to attend and how many seats you are asking for, or
            write to Callum if you would like to pitch a launch or reading.
          </p>
          <p className="mt-6">
            <SiteLink href="/contact/" className="button-primary cloth-weave">
              Write to the shop
            </SiteLink>
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(eventsStructuredData()) }}
      />
    </>
  );
}
