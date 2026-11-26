import type { Metadata } from 'next';
import { TeacupBookMotif } from '../../components/art/motifs';
import {
  BorrowingCardSection,
  CurrentSelectionSection,
  HowItWorksSection,
  MarginNote,
} from '../../components/book-club-sections';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { bookClub } from '../../content/book-club';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Book Club',
  description:
    'The Fireside Book Club meets on the first Tuesday of every month in the back room of The Lamplit Page on Victoria Street.',
  alternates: { canonical: absoluteUrl('/book-club/') },
};

export default function BookClubPage() {
  return (
    <>
      <PageHead
        section="Book Club"
        title="The Fireside Book Club"
        motif={<TeacupBookMotif className="h-24 w-36" />}
      >
        <p>
          One book a month, a warm back room, a pot of tea and no homework required if you didn&apos;t
          quite reach the last chapter.
        </p>
      </PageHead>

      <CurrentSelectionSection>
        <p>
          Each month a different bookseller picks a paperback they want to argue about beside the
          fire. Pick up a copy from the front counter and mention the club for {bookClub.memberDiscount}% off.
        </p>
      </CurrentSelectionSection>

      <BorrowingCardSection>
        <p>
          Meetings are free, with chairs for sixteen around the back table. Ask ahead if you would
          like to join a particular month so we know how many mugs to set out.
        </p>
      </BorrowingCardSection>

      <HowItWorksSection>
        <MarginNote number="i." title="Meet the first Tuesday">
          We gather from 18:30 to 20:00 in the back room once the shop door closes for the evening.
        </MarginNote>
        <MarginNote number="ii." title="Read the month’s book" offsetClass="md:mt-6">
          Every selection is chosen from our own shelves — mostly paperback fiction and nonfiction
          that rewards a lively table.
        </MarginNote>
        <MarginNote number="iii." title={`${bookClub.memberDiscount}% off the club book`} offsetClass="md:mt-12">
          Club readers receive {bookClub.memberDiscount}% off the current month&apos;s selection in
          the shop. No subscription or joining fee.
        </MarginNote>
      </HowItWorksSection>

      <section aria-labelledby="ask-to-join" className="paper-grain pb-16">
        <div className="wrap-narrow text-center">
          <h2 id="ask-to-join" className="font-display text-3xl text-ink sm:text-4xl">
            Ask to join the next evening
          </h2>
          <p className="mt-3 text-lg text-ink-muted">
            Write to let us know which month you would like to start. A bookseller will reply to
            confirm there is a chair free.
          </p>
          <p className="mt-6">
            <SiteLink href="/contact/" className="button-primary cloth-weave">
              Ask to join
            </SiteLink>
          </p>
        </div>
      </section>
    </>
  );
}
