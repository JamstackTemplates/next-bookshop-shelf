import type { Metadata } from 'next';
import {
  BookClubBand,
  ClosingLetterBand,
  ComingUpBand,
  FindShopBand,
  Hero,
  StaffShelfBand,
} from '../components/home-sections';
import { business } from '../content/business';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  title: { absolute: `${business.name} — Independent Bookshop, Edinburgh` },
  description: business.introduction,
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <Hero>
        <Hero.RunningHead>
          Victoria Street · Edinburgh · Est. {business.established}
        </Hero.RunningHead>
        <Hero.Wordmark>{business.name}</Hero.Wordmark>
        <Hero.Lead>Good books, a warm lamp and someone who&apos;s read them.</Hero.Lead>
        <Hero.Supporting>
          A small shop on Victoria Street with handwritten staff picks, readings on Thursday nights
          and a book club by the fire.
        </Hero.Supporting>
        <Hero.Actions>
          <Hero.PrimaryAction href="/events/">See what&apos;s on</Hero.PrimaryAction>
          <Hero.SecondaryAction href="/staff-picks/">Browse staff picks</Hero.SecondaryAction>
        </Hero.Actions>
        <Hero.OpenSign />
      </Hero>

      <StaffShelfBand>
        <StaffShelfBand.Eyebrow>Six books we cannot stop pressing into readers&apos; hands</StaffShelfBand.Eyebrow>
        <StaffShelfBand.Heading>On the staff shelf</StaffShelfBand.Heading>
        <StaffShelfBand.Intro>
          Select any cloth spine under the lamp to read our handwritten shelf-talker card.
        </StaffShelfBand.Intro>
        <StaffShelfBand.Link href="/staff-picks/">See every pick →</StaffShelfBand.Link>
      </StaffShelfBand>

      <ComingUpBand>
        <ComingUpBand.Heading>Coming up</ComingUpBand.Heading>
        <ComingUpBand.Intro>
          Thursday readings after closing, Saturday story hour on the rug and our monthly fireside
          gathering in the back room.
        </ComingUpBand.Intro>
        <ComingUpBand.Link href="/events/">Full programme</ComingUpBand.Link>
      </ComingUpBand>

      <BookClubBand>
        <BookClubBand.Heading>This month&apos;s book club</BookClubBand.Heading>
        <BookClubBand.Intro>
          We meet on the first Tuesday of the month by the back-room fire with a pot of tea and ten
          percent off the club book.
        </BookClubBand.Intro>
        <BookClubBand.Action href="/book-club/">Join the club</BookClubBand.Action>
      </BookClubBand>

      <FindShopBand>
        <FindShopBand.Heading>Find the shop</FindShopBand.Heading>
      </FindShopBand>

      <ClosingLetterBand>
        <ClosingLetterBand.Salutation>Dear reader,</ClosingLetterBand.Salutation>
        <ClosingLetterBand.Heading>Looking for something?</ClosingLetterBand.Heading>
        <ClosingLetterBand.Body>
          If a title has slipped off our shelves, or you are hunting for an out-of-print paperback,
          write to the desk. We will gladly look it up or ask our wholesalers for you.
        </ClosingLetterBand.Body>
        <ClosingLetterBand.Action href="/contact/">Write to the shop</ClosingLetterBand.Action>
      </ClosingLetterBand>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
