/**
 * Tiny dependency-free i18n layer.
 *
 * Two languages ship today (English, French). The browser language is detected
 * on first visit; the user can switch at any time and the choice is remembered
 * in localStorage. Adding a language later means adding one more dictionary.
 */

export type Lang = 'en' | 'fr';
export const LANGS: readonly Lang[] = ['en', 'fr'];

/** URL of the official ECB survey — where we send people to cast the real vote. */
export const ECB_SURVEY_URL =
  'https://www.ecb.europa.eu/euro/banknotes/future_banknotes/html/index.en.html';

interface Strings {
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
  flip: string;
  showResults: string;
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
  addToPool: string;
  pooled: string;
  poolFailed: string;
  startOver: string;
  disclaimer: string; // contains {survey} placeholder
  shareHeadline: string; // "My top euro banknote designs:"
  shareConfidence: string; // "Confidence"
  madeBy: string;
}

const EN: Strings = {
  langName: 'English',
  appName: 'Recto Verso Euro',
  tagline: 'Which future euro banknotes do you prefer?',
  intro:
    'The ECB shortlisted 10 design sets for the next euro banknotes. Compare them two at a time and discover your personal ranking. Private by design — nothing you do is tracked or stored anywhere but your own browser.',
  start: 'Start comparing',
  themeCulture: 'European culture',
  themeRivers: 'Rivers and birds',
  recto: 'Front',
  verso: 'Back',
  comparison: 'Comparison {n}',
  which: 'Which set do you prefer?',
  preferLeft: 'I prefer this one',
  preferRight: 'I prefer this one',
  undo: 'Undo',
  flip: 'Rotate 90°',
  showResults: 'Show my results',
  confidence: 'Confidence',
  keepComparing: 'Keep comparing',
  earlyStopTitle: 'Heads up — your ranking still has gaps',
  earlyStopBody:
    'You haven’t compared enough sets yet to be fully sure of the order. You can see your ranking so far, or keep going for a sharper result.',
  seeResultsAnyway: 'See my ranking so far',
  resume: 'Resume',
  complete: 'Complete',
  resultTitle: 'Your euro banknote ranking',
  yourPodium: 'Your podium',
  fullRanking: 'Full ranking',
  designer: 'by',
  viewOnEcb: 'View on the ECB site',
  share: 'Copy my result',
  copied: 'Copied to clipboard!',
  addToPool: 'Add my result to the pool',
  pooled: 'Thanks — added anonymously!',
  poolFailed: 'Couldn’t reach the pool — your ranking is safe locally.',
  startOver: 'Start over',
  disclaimer:
    'Unofficial fan project — not affiliated with the ECB. Cast your real vote in the {survey}. Banknote images © European Central Bank, shown as design proposals.',
  shareHeadline: 'My top euro banknote designs:',
  shareConfidence: 'Confidence',
  madeBy: 'Images © ECB · design proposals',
};

const FR: Strings = {
  langName: 'Français',
  appName: 'Recto Verso Euro',
  tagline: 'Quels futurs billets en euros préférez-vous ?',
  intro:
    'La BCE a présélectionné 10 séries de graphismes pour les prochains billets en euros. Comparez-les deux par deux et découvrez votre classement personnel. Confidentiel par nature — rien n’est suivi ni stocké ailleurs que dans votre navigateur.',
  start: 'Commencer',
  themeCulture: 'Culture européenne',
  themeRivers: 'Fleuves et oiseaux',
  recto: 'Recto',
  verso: 'Verso',
  comparison: 'Comparaison {n}',
  which: 'Quelle série préférez-vous ?',
  preferLeft: 'Je préfère celle-ci',
  preferRight: 'Je préfère celle-ci',
  undo: 'Annuler',
  flip: 'Pivoter à 90°',
  showResults: 'Voir mes résultats',
  confidence: 'Confiance',
  keepComparing: 'Continuer',
  earlyStopTitle: 'Attention — votre classement est incomplet',
  earlyStopBody:
    'Vous n’avez pas encore comparé assez de séries pour être certain·e de l’ordre. Vous pouvez voir votre classement actuel ou continuer pour affiner le résultat.',
  seeResultsAnyway: 'Voir mon classement actuel',
  resume: 'Reprendre',
  complete: 'Terminé',
  resultTitle: 'Votre classement des billets en euros',
  yourPodium: 'Votre podium',
  fullRanking: 'Classement complet',
  designer: 'par',
  viewOnEcb: 'Voir sur le site de la BCE',
  share: 'Copier mon résultat',
  copied: 'Copié dans le presse-papiers !',
  addToPool: 'Ajouter mon résultat au classement collectif',
  pooled: 'Merci — ajouté anonymement !',
  poolFailed: 'Classement collectif injoignable — votre résultat reste en local.',
  startOver: 'Recommencer',
  disclaimer:
    'Projet indépendant — sans lien avec la BCE. Votez pour de vrai via l’{survey}. Images des billets © Banque centrale européenne, présentées comme propositions.',
  shareHeadline: 'Mes billets en euros préférés :',
  shareConfidence: 'Confiance',
  madeBy: 'Images © BCE · propositions de graphisme',
};

const DICT: Record<Lang, Strings> = { en: EN, fr: FR };

const STORAGE_KEY = 'rve.lang';
let current: Lang = detectLang();

function detectLang(): Lang {
  const saved = safeGet(STORAGE_KEY);
  if (saved === 'en' || saved === 'fr') return saved;
  const prefs = navigator.languages ?? [navigator.language];
  return prefs.some((l) => l.toLowerCase().startsWith('fr')) ? 'fr' : 'en';
}

export function getLang(): Lang {
  return current;
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
