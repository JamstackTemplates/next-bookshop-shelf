import type { ReactNode } from 'react';
import { business, formattedAddress } from '../content/business';
import { getBookClubMeetings, getCurrentBookClubEvent, getCurrentBookClubSelection } from '../content/book-club';
import { events } from '../content/events';
import { featuredStaffPicks } from '../content/staff-picks';
import { parseEventDate } from '../lib/events';
import { mapDirectionsUrl } from '../lib/maps';
import { DrawnBookCover } from './art/book-cover';
import { HeroWindowArt } from './art/hero-window';
import {
  BookmarkRibbon,
  BookplateCornerFlourish,
  FolioColophonWatermark,
  GiltRule,
  MarbledBand,
  StitchedSignatureBorder,
  WalnutMouldingBorder,
} from './art/marks';
import { FountainPenMotif, ShopBellMotif, TeacupBookMotif } from './art/motifs';
import { GoogleMap } from './google-map';
import { HoursPlaque } from './hours-plaque';
import { OpenSign } from './open-sign';
import { SiteLink } from './site-link';
import { SpineShelf } from './spine-shelf';
import { UpcomingEventSlips } from './upcoming-events';

type ContentProps = { children: ReactNode };

/* --- 1. Hero ("Window at dusk") --- */

function HeroRoot({ children }: ContentProps) {
  return (
    <section className="hero-stage relative overflow-hidden">
      {/* Delicate bookplate corner flourishes & engraved colophon watermark */}
      <BookplateCornerFlourish
        corner="top-left"
        className="absolute top-4 left-4 hidden h-20 w-20 opacity-65 sm:block"
      />
      <BookplateCornerFlourish
        corner="bottom-left"
        className="absolute bottom-4 left-4 hidden h-20 w-20 opacity-55 lg:block"
      />
      <FolioColophonWatermark className="absolute -bottom-24 -left-20 h-80 w-80 opacity-[0.075] sm:h-96 sm:w-96" />

      <div className="wrap relative z-10 grid items-center gap-8 pt-7 pb-10 lg:min-h-[min(calc(100vh-5rem),48rem)] lg:grid-cols-12 lg:gap-10 lg:py-10">
        <div className="relative z-10 lg:col-span-5">{children}</div>
        <div className="relative lg:col-span-7 lg:-mr-10 xl:-mr-16">
          {/* Warm lamplight halo behind the bay window */}
          <div
            className="pointer-events-none absolute -inset-x-8 -inset-y-4 rounded-full opacity-35 blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--lamp) 0%, transparent 66%)' }}
            aria-hidden="true"
          />
          <HeroWindowArt className="relative z-10" />
        </div>
      </div>
    </section>
  );
}

function HeroRunningHead({ children }: ContentProps) {
  return (
    <p className="running-head flex items-center gap-2.5">
      <span className="hidden h-px w-6 shrink-0 bg-gilt/85 sm:inline-block" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

function HeroWordmark({ children }: ContentProps) {
  return (
    <h1 className="mt-3 font-display text-[3rem] leading-[0.96] tracking-tight text-ink sm:text-[4.25rem] lg:text-[5.5rem] xl:text-[6.5rem]">
      {children}
    </h1>
  );
}

function HeroLead({ children }: ContentProps) {
  return (
    <p className="mt-4 font-display text-2xl italic leading-snug text-ink sm:text-[1.7rem]">
      {children}
    </p>
  );
}

function HeroSupporting({ children }: ContentProps) {
  return <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-ink-muted">{children}</p>;
}

function HeroActions({ children }: ContentProps) {
  return <div className="mt-6 flex flex-wrap items-center gap-3.5">{children}</div>;
}

function HeroPrimaryAction({ children, href }: { children: ReactNode; href: string }) {
  return (
    <SiteLink href={href} className="button-primary cloth-weave">
      {children}
    </SiteLink>
  );
}

function HeroSecondaryAction({ children, href }: { children: ReactNode; href: string }) {
  return (
    <SiteLink href={href} className="button-secondary">
      {children}
    </SiteLink>
  );
}

function HeroOpenSign() {
  return (
    <div className="mt-5">
      <OpenSign />
    </div>
  );
}

export const Hero = Object.assign(HeroRoot, {
  RunningHead: HeroRunningHead,
  Wordmark: HeroWordmark,
  Lead: HeroLead,
  Supporting: HeroSupporting,
  Actions: HeroActions,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
  OpenSign: HeroOpenSign,
});

/* --- 2. "On the staff shelf" (full-bleed walnut band with carved cornice borders) --- */

function StaffShelfRoot({ children }: ContentProps) {
  return (
    <section
      aria-labelledby="home-staff-shelf"
      className="walnut-band relative"
    >
      <WalnutMouldingBorder />
      {/* Hanging oxblood bookmark ribbon draped over the upper cornice */}
      <div className="pointer-events-none absolute top-0 right-8 z-10 sm:right-16">
        <BookmarkRibbon />
      </div>
      <div className="wrap pt-12 pb-14 sm:pt-14 sm:pb-16">
        <div className="mx-auto mb-8 max-w-2xl text-center">{children}</div>
        <SpineShelf
          picks={featuredStaffPicks}
          lampSide="left"
          showInteractiveTalker
          shelfLabel="Featured staff picks"
        />
      </div>
      <WalnutMouldingBorder flip />
    </section>
  );
}

function StaffShelfEyebrow({ children }: ContentProps) {
  return <p className="font-sc text-sm tracking-[0.16em] text-walnut-muted">{children}</p>;
}

function StaffShelfHeading({ children }: ContentProps) {
  return (
    <h2
      id="home-staff-shelf"
      className="mt-2 font-display text-4xl text-walnut-ink sm:text-5xl"
    >
      {children}
    </h2>
  );
}

function StaffShelfIntro({ children }: ContentProps) {
  return <p className="mt-3 text-lg italic text-walnut-muted">{children}</p>;
}

function StaffShelfLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <p className="mt-4">
      <SiteLink
        href={href}
        className="font-sc text-base tracking-[0.06em] text-lamp underline decoration-gilt/70 underline-offset-4 hover:text-walnut-ink"
      >
        {children}
      </SiteLink>
    </p>
  );
}

export const StaffShelfBand = Object.assign(StaffShelfRoot, {
  Eyebrow: StaffShelfEyebrow,
  Heading: StaffShelfHeading,
  Intro: StaffShelfIntro,
  Link: StaffShelfLink,
});

/* --- 3. "Coming up" (archival ledger paper, asymmetric grid with folio numeral iii) --- */

function ComingUpRoot({ children }: ContentProps) {
  return (
    <section aria-labelledby="home-coming-up" className="paper-ledger relative overflow-hidden py-16 sm:py-20">
      <FolioColophonWatermark className="absolute -bottom-24 -left-16 h-72 w-72 opacity-[0.065]" />
      <div className="wrap relative z-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:border-r lg:border-gilt/40 lg:pr-8">
          <p className="folio-numeral text-[6rem] sm:text-[7.5rem]" aria-hidden="true">
            iii
          </p>
          <div className="-mt-4">{children}</div>
        </div>
        <div className="lg:col-span-8">
          <UpcomingEventSlips events={events} />
        </div>
      </div>
    </section>
  );
}

function ComingUpHeading({ children }: ContentProps) {
  return (
    <h2 id="home-coming-up" className="font-display text-4xl text-ink sm:text-5xl">
      {children}
    </h2>
  );
}

function ComingUpIntro({ children }: ContentProps) {
  return <p className="mt-3 text-lg text-ink-muted">{children}</p>;
}

function ComingUpLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <p className="mt-6">
      <SiteLink href={href} className="button-secondary">
        {children}
      </SiteLink>
    </p>
  );
}

export const ComingUpBand = Object.assign(ComingUpRoot, {
  Heading: ComingUpHeading,
  Intro: ComingUpIntro,
  Link: ComingUpLink,
});

/* --- 4. "This month's book club" (endpaper diamond lattice with combed marbled band above) --- */

function BookClubBandRoot({ children }: ContentProps) {
  const currentBook = getCurrentBookClubSelection();
  const currentMeeting = getCurrentBookClubEvent();
  const meetings = getBookClubMeetings().slice(0, 3);
  const currentParts = parseEventDate(currentMeeting.date);

  return (
    <section aria-labelledby="home-book-club" className="paper-deep-grain relative overflow-hidden">
      <MarbledBand />
      <BookplateCornerFlourish
        corner="top-right"
        className="absolute top-10 right-4 hidden h-20 w-20 opacity-50 lg:block"
      />
      <div className="wrap relative z-10 grid items-center gap-10 py-16 lg:grid-cols-12 lg:py-20">
        {/* Left: large drawn cloth-bound book cover */}
        <div className="lg:col-span-5">
          <DrawnBookCover book={currentBook} tilted />
        </div>

        {/* Right: borrowing card with ruled lines, stamped dates, teacup motif */}
        <div className="lg:col-span-7">
          <div className="flex items-end justify-between gap-4">
            <div>{children}</div>
            <TeacupBookMotif className="hidden h-22 w-32 shrink-0 sm:block" />
          </div>

          <div className="borrowing-card mt-6 rounded-[2px] p-5 pt-6 sm:p-6 sm:pt-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-gilt/75 pb-3">
              <p className="font-sc text-sm tracking-[0.14em] text-ink-muted">
                Borrowing Card · Fireside Book Club
              </p>
              <p className="font-sc text-xs tracking-[0.1em] text-stamp">
                Next: {currentParts.stampLabel} · {currentMeeting.start}
              </p>
            </div>

            <ol className="mt-3 divide-y divide-line">
              {meetings.map((meeting) => {
                const parts = parseEventDate(meeting.date);
                const isCurrent = meeting.id === currentMeeting.id;
                return (
                  <li
                    key={meeting.id}
                    className="flex flex-wrap items-baseline justify-between gap-3 py-3"
                  >
                    <span className="inline-block border border-dashed border-stamp/70 px-2 py-0.5 font-sc text-xs tracking-[0.12em] text-stamp">
                      {parts.stampLabel} {parts.year}
                    </span>
                    <span className="flex-1 font-hand text-xl text-ink">
                      {meeting.title.replace(/^Fireside Book Club:\s*/i, '')}
                    </span>
                    <span className="font-sc text-xs tracking-[0.08em] text-ink-muted">
                      {isCurrent ? 'Current read' : `Host: ${meeting.guest}`}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookClubHeading({ children }: ContentProps) {
  return (
    <h2 id="home-book-club" className="font-display text-4xl text-ink sm:text-[2.85rem]">
      {children}
    </h2>
  );
}

function BookClubIntro({ children }: ContentProps) {
  return <p className="mt-3 max-w-[48ch] text-lg text-ink-muted">{children}</p>;
}

function BookClubAction({ children, href }: { children: ReactNode; href: string }) {
  return (
    <p className="mt-5">
      <SiteLink href={href} className="button-primary cloth-weave">
        {children}
      </SiteLink>
    </p>
  );
}

export const BookClubBand = Object.assign(BookClubBandRoot, {
  Heading: BookClubHeading,
  Intro: BookClubIntro,
  Action: BookClubAction,
});

/* --- 5. "Find the shop" (three-column on desktop with stitched-signature border above) --- */

function FindShopRoot({ children }: ContentProps) {
  const fullAddress = formattedAddress();
  return (
    <section aria-labelledby="home-find-shop" className="paper-grain relative pt-8 pb-16 sm:pt-10 sm:pb-20">
      <StitchedSignatureBorder className="mb-10 sm:mb-12" />
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Col 1: Letterhead address, directions & open-now sign */}
          <div className="lg:col-span-4">
            <ShopBellMotif className="-ml-2 mb-2 h-18 w-24" />
            {children}
            <address className="mt-4 not-italic">
              <p className="font-display text-2xl text-ink">{business.address.street}</p>
              <p className="text-lg text-ink-muted">
                {business.address.locality} {business.address.postcode}, {business.address.country}
              </p>
            </address>
            <p className="mt-3 text-base text-ink-muted">{business.address.directionsNote}</p>
            <p className="mt-3 text-sm italic text-ink-muted">{business.address.landmarkNote}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <OpenSign />
              <a
                href={mapDirectionsUrl(fullAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link font-sc text-sm tracking-[0.06em]"
              >
                Get directions
              </a>
            </div>
          </div>

          {/* Col 2: Brass hours plaque */}
          <div className="lg:col-span-4">
            <HoursPlaque hours={business.openingHours} />
          </div>

          {/* Col 3: Framed map with brass-tooled mat */}
          <div className="lg:col-span-4">
            <div className="brass-plaque p-2.5">
              <GoogleMap
                address={fullAddress}
                title="Map to The Lamplit Page on Victoria Street"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FindShopHeading({ children }: ContentProps) {
  return (
    <h2 id="home-find-shop" className="font-display text-4xl text-ink">
      {children}
    </h2>
  );
}

export const FindShopBand = Object.assign(FindShopRoot, {
  Heading: FindShopHeading,
});

/* --- 6. "Looking for something?" (folded correspondence sheet on laid paper) --- */

function ClosingLetterRoot({ children }: ContentProps) {
  return (
    <section aria-labelledby="home-closing-letter" className="paper-grain relative overflow-hidden pt-4 pb-16 sm:pt-6 sm:pb-20">
      <div className="wrap-narrow relative z-10">
        <GiltRule className="mb-10" />
        <div className="letter-sheet relative overflow-hidden rounded-[2px] px-6 py-10 text-center sm:px-12 sm:py-14">
          <BookplateCornerFlourish
            corner="top-left"
            className="absolute top-2.5 left-2.5 h-12 w-12 opacity-55"
          />
          <BookplateCornerFlourish
            corner="bottom-right"
            className="absolute right-2.5 bottom-2.5 h-12 w-12 opacity-55"
          />
          <FolioColophonWatermark className="absolute -right-16 -bottom-16 h-56 w-56 opacity-[0.06]" />
          <div className="relative z-10">
            <FountainPenMotif className="mx-auto mb-4 h-22 w-32" />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingLetterSalutation({ children }: ContentProps) {
  return (
    <p className="font-display text-2xl italic text-oxblood">{children}</p>
  );
}

function ClosingLetterHeading({ children }: ContentProps) {
  return (
    <h2 id="home-closing-letter" className="mt-2 font-display text-4xl text-ink sm:text-5xl">
      {children}
    </h2>
  );
}

function ClosingLetterBody({ children }: ContentProps) {
  return (
    <p className="mx-auto mt-4 max-w-[46ch] text-lg italic leading-relaxed text-ink-muted">
      {children}
    </p>
  );
}

function ClosingLetterAction({ children, href }: { children: ReactNode; href: string }) {
  return (
    <p className="mt-7">
      <SiteLink href={href} className="button-primary cloth-weave">
        {children}
      </SiteLink>
    </p>
  );
}

export const ClosingLetterBand = Object.assign(ClosingLetterRoot, {
  Salutation: ClosingLetterSalutation,
  Heading: ClosingLetterHeading,
  Body: ClosingLetterBody,
  Action: ClosingLetterAction,
});
