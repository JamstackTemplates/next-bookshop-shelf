import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { LampMark } from './art/marks';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/staff-picks/', label: 'Staff Picks' },
  { href: '/events/', label: 'Events' },
  { href: '/book-club/', label: 'Book Club' },
  { href: '/contact/', label: 'Visit & Contact' },
] as const;

export function SiteHeader() {
  return (
    <header className="walnut-band border-brass-moulding relative z-30">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gilt/35" aria-hidden="true" />
      <div className="wrap flex min-h-[4.75rem] items-center justify-between gap-4 py-3">
        <SiteLink
          href="/"
          className="group flex items-center gap-2.5 text-walnut-ink no-underline hover:no-underline"
        >
          <LampMark className="h-9 w-9 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <span className="font-display text-2xl leading-none tracking-tight sm:text-[1.65rem]">
            {business.name}
          </span>
        </SiteLink>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Main" className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <SiteLink
                key={item.href}
                href={item.href}
                markCurrent="page"
                className="rounded-ui px-3 py-1.5 font-sc text-[0.98rem] tracking-[0.06em] text-walnut-ink/95 no-underline transition-colors hover:bg-walnut-deep/60 hover:text-lamp hover:no-underline aria-[current=page]:bg-walnut-deep aria-[current=page]:text-lamp aria-[current=page]:ring-1 aria-[current=page]:ring-gilt/85 aria-[current=page]:shadow-[inset_0_-2px_0_0_var(--lamp)]"
              >
                {item.label}
              </SiteLink>
            ))}
          </nav>
          <div className="lamp-pull-wrap" title="Switch between afternoon and after hours">
            <DarkModeToggle />
          </div>
        </div>

        {/* Mobile disclosure menu (works without JavaScript) */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="lamp-pull-wrap">
            <DarkModeToggle />
          </div>
          <details className="group relative">
            <summary className="flex min-h-10 cursor-pointer list-none items-center gap-1.5 rounded-ui border border-gilt/70 bg-walnut-deep px-3 py-1.5 font-sc text-sm tracking-[0.08em] text-walnut-ink transition-colors group-open:border-lamp group-open:text-lamp group-open:ring-1 group-open:ring-lamp/60">
              <span>Menu</span>
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 5h10M3 8h10M3 11h10" strokeLinecap="round" />
              </svg>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 mt-2 w-56 rounded-ui border border-gilt bg-surface p-3 text-ink shadow-xl"
            >
              <p className="mb-2 border-b border-line px-2 pb-2 font-sc text-xs tracking-[0.12em] text-ink-muted">
                The Lamplit Page
              </p>
              <ul className="space-y-1">
                <li>
                  <SiteLink
                    href="/"
                    markCurrent="page"
                    className="nav-mobile-link block rounded-ui px-2.5 py-1.5 font-sc text-base text-ink no-underline transition-colors hover:bg-paper-deep/70 hover:text-primary hover:no-underline"
                  >
                    Home
                  </SiteLink>
                </li>
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <SiteLink
                      href={item.href}
                      markCurrent="page"
                      className="nav-mobile-link block rounded-ui px-2.5 py-1.5 font-sc text-base text-ink no-underline transition-colors hover:bg-paper-deep/70 hover:text-primary hover:no-underline"
                    >
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
