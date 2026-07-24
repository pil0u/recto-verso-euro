/**
 * Sharing: a clean plain-text summary (Wordle-style) plus a deep link that
 * encodes the full ranking so a click reopens the app straight on the shared
 * result.
 */

import { LETTERS, type Letter } from './data/designs';
import { t } from './i18n';

const MEDALS = ['🥇', '🥈', '🥉'];

export interface SharedResult {
  ranking: Letter[];
  confidence: number; // 0..1
}

/** Confidence (0..1) → a 0–5 star string, e.g. "★★★★☆". */
export function stars(confidence: number): string {
  const filled = Math.max(0, Math.min(5, Math.round(confidence * 5)));
  return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

/** The Wordle-style clipboard text: clean, link at the bottom. */
export function buildShareText(result: SharedResult): string {
  const top3 = result.ranking
    .slice(0, 3)
    .map((letter, i) => `${MEDALS[i]} Design ${letter}`)
    .join('\n');
  return [`${t('appName')} 🇪🇺 💶`, t('shareHeadline'), top3, `→ ${buildDeepLink(result)}`].join(
    '\n',
  );
}

/** App URL carrying the ranking + confidence in the hash. */
export function buildDeepLink(result: SharedResult): string {
  const base = `${location.origin}${location.pathname}`;
  const conf = Math.round(result.confidence * 100);
  return `${base}#r=${result.ranking.join('')}&c=${conf}`;
}

/** Parse a shared-result deep link from the current location hash, if valid. */
export function parseDeepLink(hash: string): SharedResult | null {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const r = params.get('r');
  if (!r) return null;
  const letters = r.toUpperCase().split('') as Letter[];
  const valid =
    letters.length === LETTERS.length &&
    letters.every((l) => LETTERS.includes(l)) &&
    new Set(letters).size === LETTERS.length;
  if (!valid) return null;
  const c = Number(params.get('c'));
  const confidence = Number.isFinite(c) ? Math.max(0, Math.min(100, c)) / 100 : 0;
  return { ranking: letters, confidence };
}

/** Copy text to the clipboard, with a legacy fallback. Resolves to success. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
