import { business } from '../content/business';
import { FolioColophonWatermark, GiltRule, LampMark, MarbledBand } from './art/marks';
import { SiteLink } from './site-link';

const FOOTER_NAV = [
  { href: '/', label: 'Home' },
  { href: '/staff-picks/', label: 'Staff Picks' },
  { href: '/events/', label: 'Events' },
  { href: '/book-club/', label: 'Book Club' },
  { href: '/contact/', label: 'Visit & Contact' },
] as const;

export function SiteFooter() {
  return (
    <footer className="paper-deep-grain relative mt-16 overflow-hidden text-ink">
      <MarbledBand />
      <FolioColophonWatermark className="absolute -right-20 -bottom-24 h-72 w-72 opacity-[0.07]" />
      <div className="wrap relative z-10 py-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Colophon identity */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <LampMark className="h-8 w-8 shrink-0" />
              <p className="font-display text-2xl">{business.name}</p>
            </div>
            <p className="mt-3 max-w-[38ch] text-base text-ink-muted">
              {business.address.street}, {business.address.locality} {business.address.postcode},{' '}
              {business.address.country}
            </p>
            <p className="mt-2 text-sm italic text-ink-muted">
              Mon–Wed &amp; Fri 10:00–18:00 · Thu 10:00–20:30 · Sat 09:30–18:00 · Sun 11:00–17:00
            </p>
          </div>

          {/* Direct contact */}
          <div className="md:col-span-4">
            <p className="font-sc text-sm tracking-[0.12em] text-ink-muted">Desk &amp; Enquiries</p>
            <ul className="mt-3 space-y-1.5 text-base">
              <li>
                <a className="text-link" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </li>
              {business.phone ? (
                <li>
                  <a
                    className="text-link"
                    href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                  >
                    {business.phone}
                  </a>
                </li>
              ) : null}
            </ul>
            <p className="mt-3 text-sm text-ink-muted">{business.enquiries.confirmationNotice}</p>
          </div>

          {/* Pages */}
          <div className="md:col-span-3">
            <p className="font-sc text-sm tracking-[0.12em] text-ink-muted">Shelves &amp; Pages</p>
            <ul className="mt-3 space-y-1.5 font-sc text-base">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <SiteLink href={item.href} className="text-ink no-underline hover:text-primary hover:underline">
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <GiltRule className="my-8" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-ink-muted">
          <p className="italic">
            Colophon — Set in IM Fell English and Crimson Pro. Fictitious sample shop for the Jamstacks gallery.
          </p>
          <p>
            Built for{' '}
            <a className="text-link" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
