import { business } from '../content/business';
import { OpenBadge } from './open-badge';

/** Hanging shop-door sign wrapping the inherited OpenBadge component. */
export function OpenSign({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Hanging string and brass eyelet */}
      <svg viewBox="0 0 64 16" className="h-4 w-14 text-gilt" fill="none" aria-hidden="true">
        <path d="M10 15 L32 3 L54 15" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="32" cy="3" r="2.2" fill="var(--lamp)" stroke="var(--ink)" strokeWidth="1" />
      </svg>
      <div className="hanging-sign">
        <span className="h-2 w-2 rounded-full bg-lamp" aria-hidden="true" />
        <OpenBadge hours={business.openingHours} />
      </div>
    </div>
  );
}
