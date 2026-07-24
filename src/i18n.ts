/**
 * Tiny dependency-free i18n layer.
 *
 * All 24 official EU languages ship — the same set offered by the ECB's own
 * design-proposals pages and public survey. The browser language is detected on
 * first visit; the user can switch at any time and the choice is remembered in
 * localStorage.
 *
 * This module is the machinery only. The translations themselves live as one
 * file per language under `data/ui/` (assembled into `DICT`), mirroring the ECB
 * copy under `data/descriptions/`. UI wording follows the ECB's terminology in
 * each language; design descriptions are quoted verbatim (see data/descriptions).
 */

import { DICT } from './data/ui';

export type Lang =
  | 'cs'
  | 'da'
  | 'de'
  | 'et'
  | 'en'
  | 'es'
  | 'fr'
  | 'ga'
  | 'hr'
  | 'it'
  | 'lv'
  | 'lt'
  | 'hu'
  | 'mt'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'sk'
  | 'sl'
  | 'fi'
  | 'sv'
  | 'el'
  | 'bg';
export const LANGS: readonly Lang[] = [
  'cs',
  'da',
  'de',
  'et',
  'en',
  'es',
  'fr',
  'ga',
  'hr',
  'it',
  'lv',
  'lt',
  'hu',
  'mt',
  'nl',
  'pl',
  'pt',
  'ro',
  'sk',
  'sl',
  'fi',
  'sv',
  'el',
  'bg',
];

/** The official ECB public survey (its own in-page selector offers every language). */
export function surveyUrl(): string {
  return 'https://surveys.ecb.europa.eu/10b/neweuro/';
}

export interface Strings {
  langName: string;
  appName: string;
  tagline: string;
  intro: string;
  start: string;
  themeCulture: string;
  themeRivers: string;
  recto: string;
  verso: string;
  comparison: string; // "Comparison {n}"
  which: string;
  preferLeft: string;
  preferRight: string;
  undo: string;
  showResults: string;
  orientView: string;
  orientDefault: string;
  orientLandscape: string;
  orientPortrait: string;
  confidence: string;
  keepComparing: string;
  earlyStopTitle: string;
  earlyStopBody: string;
  seeResultsAnyway: string;
  resume: string;
  complete: string;
  resultTitle: string;
  yourPodium: string;
  fullRanking: string;
  designer: string;
  viewOnEcb: string;
  share: string;
  copied: string;
  startOver: string;
  disclaimer: string; // contains {survey} placeholder
  surveyLinkText: string;
  shareHeadline: string;
  madeBy: string;
}

const STORAGE_KEY = 'rve.lang';
let current: Lang = detectLang();

function detectLang(): Lang {
  const saved = safeGet(STORAGE_KEY);
  if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
  const prefs = navigator.languages ?? [navigator.language];
  for (const pref of prefs) {
    const code = pref.toLowerCase().slice(0, 2);
    if ((LANGS as readonly string[]).includes(code)) return code as Lang;
  }
  return 'en';
}

export function getLang(): Lang {
  return current;
}

/** The endonym (native name) of a language, for the language picker. */
export function langName(lang: Lang): string {
  return DICT[lang].langName;
}

export function setLang(lang: Lang): void {
  current = lang;
  safeSet(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
}

/** Translate a key, with optional {placeholder} substitution. */
export function t(key: keyof Strings, vars?: Record<string, string>): string {
  let s = DICT[current][key];
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
  return s;
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode / storage disabled — non-fatal */
  }
}
