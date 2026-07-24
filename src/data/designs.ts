/**
 * The ten shortlisted future euro banknote design proposals (A–J).
 *
 * Images are NOT bundled: per the ECB Terms of Use they may not be copied,
 * redistributed or altered, so we hotlink the originals straight from the
 * ECB website (unmodified) and credit the ECB as the source.
 * See: https://www.ecb.europa.eu/services/data-protection/privacy-statements/html/ecb.terms_use_design_proposals.en.html
 */

import type { Lang } from '../i18n';
import { DESCRIPTIONS } from './descriptions';

export type Theme = 'culture' | 'rivers';
export type Side = 'front' | 'back';
export type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';

/** Denominations, low to high — used to align notes across two sets. */
export const DENOMINATIONS = [5, 10, 20, 50, 100, 200] as const;
export type Denomination = (typeof DENOMINATIONS)[number];

export interface Design {
  letter: Letter;
  /** Designer / studio, as credited by the ECB. */
  designer: string;
  theme: Theme;
}

/** Official ECB description of a design in the given language. */
export function designDescription(letter: Letter, lang: Lang): string {
  return DESCRIPTIONS[letter][lang];
}

/** Base directory for the individual per-note images on the ECB site. */
const IMG_BASE = 'https://www.ecb.europa.eu/euro/banknotes/future_banknotes/shared/img';

/**
 * Verified image URL pattern (all 120 combinations confirmed to exist):
 *   banknote-design-proposal-{letter}-{denomination}-{side}.jpg
 */
export function imageUrl(letter: Letter, denom: Denomination, side: Side): string {
  return `${IMG_BASE}/banknote-design-proposal-${letter.toLowerCase()}-${denom}-${side}.jpg`;
}

/**
 * Displayed orientation of each note (the ECB JPEGs carry EXIF rotation, so the
 * *rendered* orientation — what a browser shows — is what matters here):
 *   - Designs G, I, J are portrait on every note.
 *   - Design D is mixed: fronts portrait, backs landscape.
 *   - All other designs (A, B, C, E, F, H) are landscape throughout.
 */
export function isPortrait(letter: Letter, _denom: Denomination, side: Side): boolean {
  if (letter === 'G' || letter === 'I' || letter === 'J') return true;
  return letter === 'D' && side === 'front';
}

/** Official ECB page for a given design in the chosen language (anchored). */
export function ecbDesignUrl(letter: Letter, lang: Lang): string {
  return `https://www.ecb.europa.eu/euro/banknotes/future_banknotes/html/design-proposals.${lang}.html#proposal${letter}`;
}

export const DESIGNS: readonly Design[] = [
  { letter: 'A', designer: 'Studio Joost Grootens', theme: 'culture' },
  { letter: 'B', designer: 'PunktFormStrich', theme: 'rivers' },
  { letter: 'C', designer: 'Neue Gestaltung GmbH', theme: 'culture' },
  { letter: 'D', designer: 'Rudy Guedj and François Girard-Meunier', theme: 'rivers' },
  { letter: 'E', designer: 'Myrsini Vardopoulou', theme: 'culture' },
  { letter: 'F', designer: 'Jan Robert Dünnweller', theme: 'culture' },
  { letter: 'G', designer: 'Rubio & del Amo and Cruz más Cruz', theme: 'culture' },
  { letter: 'H', designer: 'Atelier Goppel-Toperngpong', theme: 'rivers' },
  { letter: 'I', designer: 'Isabelle Daëron', theme: 'rivers' },
  { letter: 'J', designer: 'Ville Tietäväinen', theme: 'rivers' },
];

export function getDesign(letter: Letter): Design {
  const d = DESIGNS.find((x) => x.letter === letter);
  if (!d) throw new Error(`Unknown design: ${letter}`);
  return d;
}

export const LETTERS: readonly Letter[] = DESIGNS.map((d) => d.letter);
