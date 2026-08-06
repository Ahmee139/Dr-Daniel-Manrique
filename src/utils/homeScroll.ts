export type HomeNavSection = 'home' | 'about' | 'procedures' | 'contact';

const HEADER_PROBE = 96;

let scrollLockTimer: number | null = null;

function clearHash() {
  if (typeof window === 'undefined') return;
  if (!window.location.hash) return;
  const { pathname, search } = window.location;
  window.history.replaceState(null, '', `${pathname}${search}`);
}

/** Layout height of the hero pin — About fully covers once scrollY reaches this. */
function getAboutPinStart(): number {
  const hero = document.querySelector('.pin-panel-hero') as HTMLElement | null;
  if (hero) return Math.round(hero.offsetHeight);
  return Math.round(window.innerHeight);
}

/**
 * Scroll range where About stays fully pinned over the hero
 * (from pin start through the pin-hold spacer).
 */
function getAboutPinTarget(): number {
  const start = getAboutPinStart();
  const hold = document.querySelector('.pin-hold') as HTMLElement | null;
  const holdHidden =
    !hold ||
    hold.offsetHeight < 8 ||
    window.getComputedStyle(hold).display === 'none';

  // On mobile, pin-hold is disabled — scroll to About section top with header offset
  if (holdHidden) {
    const about = document.getElementById('about');
    if (about) {
      const y = Math.round(about.getBoundingClientRect().top + window.scrollY - 8);
      return Math.max(0, y);
    }
    return start;
  }

  const holdH = hold.offsetHeight;
  return Math.round(start + Math.min(Math.max(holdH * 0.4, 48), holdH * 0.55));
}

function cancelPendingScroll() {
  if (scrollLockTimer !== null) {
    window.clearTimeout(scrollLockTimer);
    scrollLockTimer = null;
  }
}

/**
 * Programmatic scroll that bypasses CSS `scroll-behavior` / sticky quirks,
 * then snap-corrects if the browser undershoots.
 */
function scrollWindowTo(
  top: number,
  behavior: ScrollBehavior,
  onDone?: () => void
) {
  cancelPendingScroll();

  const target = Math.max(0, Math.round(top));
  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  const previousPadding = html.style.scrollPaddingTop;

  // Prevent scroll-padding / smooth CSS from shifting pin targets
  html.style.scrollPaddingTop = '0px';
  html.style.scrollBehavior = behavior === 'smooth' ? 'smooth' : 'auto';

  window.scrollTo({ top: target, left: 0, behavior });

  const distance = Math.abs(window.scrollY - target);
  const wait =
    behavior === 'smooth'
      ? Math.min(1600, Math.max(400, distance * 0.65 + 280))
      : 32;

  scrollLockTimer = window.setTimeout(() => {
    scrollLockTimer = null;
    // Sticky stacks often undershoot smooth scroll — hard-correct
    if (Math.abs(window.scrollY - target) > 4) {
      html.style.scrollBehavior = 'auto';
      window.scrollTo({ top: target, left: 0, behavior: 'auto' });
    }
    html.style.scrollBehavior = previousBehavior;
    html.style.scrollPaddingTop = previousPadding;
    onDone?.();
  }, wait);
}

/** Exact hero — document top, fully clear of About/Procedures pins. */
export function scrollToHomeHero(behavior: ScrollBehavior = 'auto') {
  clearHash();
  scrollWindowTo(0, behavior, () => {
    window.dispatchEvent(new CustomEvent('dm-nav-home'));
  });
}

/**
 * Full About pin: About panel covers the viewport completely,
 * then the left/right reveal animation is forced.
 */
export function scrollToHomeAbout(behavior: ScrollBehavior = 'smooth') {
  const target = getAboutPinTarget();

  scrollWindowTo(target, behavior, () => {
    // Ensure we are truly in the about pin zone after correction
    const start = getAboutPinStart();
    if (window.scrollY < start) {
      const html = document.documentElement;
      html.style.scrollBehavior = 'auto';
      window.scrollTo({ top: target, left: 0, behavior: 'auto' });
    }
    window.dispatchEvent(new CustomEvent('dm-reveal-about'));
  });
}

/** Active home nav section from current scroll / pin position. */
export function getActiveHomeSection(): HomeNavSection {
  const contact = document.getElementById('contact');
  if (contact && contact.getBoundingClientRect().top <= HEADER_PROBE) {
    return 'contact';
  }

  const proceduresPanel = document.querySelector('.pin-panel-procedures') as HTMLElement | null;
  if (proceduresPanel && proceduresPanel.getBoundingClientRect().top <= HEADER_PROBE) {
    return 'procedures';
  }

  if (window.scrollY >= getAboutPinStart() - 8) {
    return 'about';
  }

  return 'home';
}
