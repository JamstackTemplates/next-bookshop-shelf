import type { Metadata } from 'next';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '../../components/art/marks';
import { FountainPenMotif } from '../../components/art/motifs';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { HoursPlaque } from '../../components/hours-plaque';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenSign } from '../../components/open-sign';
import { PageHead } from '../../components/page-head';
import { business, formattedAddress } from '../../content/business';
import { mapDirectionsUrl } from '../../lib/maps';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Visit & Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const fullAddress = formattedAddress();

  return (
    <>
      <PageHead
        section="Visit & Contact"
        title={business.enquiries.title}
        motif={<FountainPenMotif className="h-24 w-36" />}
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="paper-grain py-10 sm:py-14">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left column (first on mobile): ex-libris letter-writing panel */}
          <section aria-label="Enquiry desk" className="bookplate-panel p-6 sm:p-9 lg:col-span-7">
            <p className="running-head">Ex Libris · The Lamplit Page Enquiry Desk</p>
            <h2 className="mt-2 font-display text-3xl text-ink">Send a note to the counter</h2>
            <p className="mt-3 text-base text-ink-muted">
              Ask us to hunt down a title, set aside a staff pick, request a seat at a Thursday
              reading or story hour, join the Fireside Book Club, or suggest an author evening.
            </p>

            <div className="mt-5 rounded-[2px] border border-line bg-paper/60 p-4 sm:p-5">
              <h3 className="font-sc text-sm tracking-[0.12em] text-ink">
                Helpful details to include in your message
              </h3>
              <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[0.98rem] text-ink-muted">
                {business.enquiries.usefulToInclude.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>

            <p className="mt-5 border-l-2 border-oxblood pl-3.5 text-sm italic text-ink">
              {business.enquiries.confirmationNotice} No payment is taken online; ticket prices are
              paid in the shop.
            </p>

            <div className="mt-7">
              {hosted ? (
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              ) : (
                <div className="rounded-[2px] border border-gilt/80 bg-paper p-6">
                  <h3 className="font-display text-2xl text-ink">Write to us by email</h3>
                  <p className="mt-2 text-base text-ink-muted">
                    Our online enquiry form is not connected on this preview. Send your message
                    directly to{' '}
                    <a className="text-link font-medium" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>{' '}
                    or ring the shop on{' '}
                    <a
                      className="text-link font-medium"
                      href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                    >
                      {business.phone}
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Right column: Visit card (email, phone, address, directions, hours plaque, open sign, map) */}
          <aside aria-label="Visit and contact details" className="space-y-8 lg:col-span-5">
            {/* Direct contact block */}
            <div className="borrowing-card rounded-[2px] p-6 pt-7">
              <p className="running-head">Direct desk</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="mt-1 h-5 w-5 shrink-0 text-gilt" />
                  <div>
                    <p className="font-sc text-xs tracking-[0.12em] text-ink-muted">Email</p>
                    <a
                      className="text-link wrap-anywhere font-display text-2xl"
                      href={`mailto:${business.email}`}
                    >
                      {business.email}
                    </a>
                    <div className="mt-2">
                      <CopyEmail email={business.email} />
                    </div>
                  </div>
                </div>

                {business.phone ? (
                  <div className="flex items-start gap-3 border-t border-line pt-4">
                    <PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-gilt" />
                    <div>
                      <p className="font-sc text-xs tracking-[0.12em] text-ink-muted">Telephone</p>
                      <a
                        className="text-link font-display text-2xl tabular-nums"
                        href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                      >
                        {business.phone}
                      </a>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-3 border-t border-line pt-4">
                  <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-gilt" />
                  <div>
                    <p className="font-sc text-xs tracking-[0.12em] text-ink-muted">Shopfront</p>
                    <address className="mt-0.5 not-italic text-base text-ink">
                      {business.address.street}
                      <br />
                      {business.address.locality} {business.address.postcode},{' '}
                      {business.address.country}
                    </address>
                    <p className="mt-2 text-sm text-ink-muted">{business.address.directionsNote}</p>
                    <p className="mt-1.5 text-xs italic text-ink-muted">
                      {business.address.landmarkNote}
                    </p>
                    <p className="mt-2.5">
                      <a
                        href={mapDirectionsUrl(fullAddress)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link font-sc text-xs tracking-[0.08em]"
                      >
                        Open directions in Google Maps
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <OpenSign />
              </div>
            </div>

            <HoursPlaque hours={business.openingHours} />

            <div className="brass-plaque p-2.5">
              <GoogleMap
                address={fullAddress}
                title="Map to The Lamplit Page on Victoria Street"
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
