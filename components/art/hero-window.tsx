import { asset } from '../../lib/paths';

const HERO_ALT =
  'An arched walnut bookshop bay window on Victoria Street in Edinburgh with gold-leaf lettering reading The Lamplit Page: inside, a brass banker’s lamp lights a reading table of stacked books and a teacup beside a bottle-green wingback armchair, tall bookcases with handwritten staff-pick cards, and a grey tabby cat asleep on the window sill.';

/**
 * Hero illustration: "Window at dusk".
 * Renders matching light-mode (late afternoon) and dark-mode (after hours) editorial illustrations
 * switched via CSS so both prefers-color-scheme and the Jamstacks theme toggle swap instantaneously.
 */
export function HeroWindowArt({ className = '' }: { className?: string }) {
  return (
    <div className={`hero-illustration-blend relative w-full ${className}`}>
      <img
        src={asset('/images/hero-window-light.jpg')}
        alt={HERO_ALT}
        width={2000}
        height={1493}
        fetchPriority="high"
        decoding="async"
        className="hero-img-light h-auto w-full"
      />
      <img
        src={asset('/images/hero-window-dark.jpg')}
        alt={HERO_ALT}
        width={2000}
        height={1493}
        fetchPriority="high"
        decoding="async"
        className="hero-img-dark h-auto w-full"
      />
    </div>
  );
}
