/**
 * Client-side module store for the card-to-hero shared element transition.
 * Stores the bounding rect of the card image that was clicked so the
 * CaseStudyHero can animate from that position to full-screen.
 *
 * Using module-level state (not React context) so there are no re-renders
 * and the data is available synchronously at render time.
 */

export type FromRect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

let stored: FromRect | null = null;

export function setFromData(rect: FromRect) {
  stored = rect;
}

export function getFromData(): FromRect | null {
  return stored;
}

export function clearFromData() {
  stored = null;
}
