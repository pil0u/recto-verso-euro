/**
 * Tiny dependency-free i18n layer.
 *
 * Four languages ship (English, French, German, Spanish). The browser language
 * is detected on first visit; the user can switch at any time and the choice is
 * remembered in localStorage. Adding a language means adding one more dictionary.
 *
 * Wording (theme names, front/back, "design proposals") follows the ECB's own
 * design-proposals pages in each language.
 */

export type Lang = 'en' | 'fr' | 'de' | 'es';
export const LANGS: readonly Lang[] = ['en', 'fr', 'de', 'es'];

/** The official ECB public survey, in the given language. */
export function surveyUrl(lang: Lang): string {
  return `https://surveys.ecb.europa.eu/lng/${lang}/pageTag/SurveyCampaign/cId/lnQrjWQVXegm5TVV/`;
}

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
  addToPool: string;
  pooled: string;
  poolFailed: string;
  startOver: string;
  disclaimer: string; // contains {survey} placeholder
  surveyLinkText: string;
  shareHeadline: string;
  madeBy: string;
}

const EN: Strings = {
  langName: 'English',
  appName: 'Recto Verso Euro',
  tagline: 'Which future euro banknotes do you prefer?',
  intro:
    'The ECB has shortlisted 10 designs for the next series of euro banknotes. Compare them two at a time — front and back — and discover your personal ranking. Private by design: nothing you do is tracked or stored anywhere but your own browser.',
  start: 'Start comparing',
  themeCulture: 'European culture',
  themeRivers: 'Rivers and birds',
  recto: 'Front',
  verso: 'Back',
  comparison: 'Comparison {n}',
  which: 'Which series do you prefer?',
  preferLeft: 'I prefer this one',
  preferRight: 'I prefer this one',
  undo: 'Undo',
  showResults: 'Show my results',
  orientView: 'Orientation',
  orientDefault: 'Default',
  orientLandscape: 'Landscape',
  orientPortrait: 'Portrait',
  confidence: 'Confidence',
  keepComparing: 'Keep comparing',
  earlyStopTitle: 'Heads up — your ranking still has gaps',
  earlyStopBody:
    'You haven’t compared enough designs yet to be fully sure of the order. You can see your ranking so far, or keep going for a sharper result.',
  seeResultsAnyway: 'See my ranking so far',
  resume: 'Resume',
  complete: 'Complete',
  resultTitle: 'Your euro banknote ranking',
  yourPodium: 'Your podium',
  fullRanking: 'Full ranking',
  designer: 'by',
  viewOnEcb: 'View on the ECB website',
  share: 'Copy my result',
  copied: 'Copied to clipboard!',
  addToPool: 'Add my result to the pool',
  pooled: 'Thanks — added anonymously!',
  poolFailed: 'Couldn’t reach the pool — your ranking is safe locally.',
  startOver: 'Start over',
  disclaimer:
    'Unofficial fan project — not affiliated with the ECB. Cast your real vote in the {survey}. Banknote images © European Central Bank, shown as design proposals.',
  surveyLinkText: 'official ECB survey',
  shareHeadline: 'My favourite euro banknote designs:',
  madeBy: 'Images © ECB · design proposals',
};

const FR: Strings = {
  langName: 'Français',
  appName: 'Recto Verso Euro',
  tagline: 'Quels futurs billets en euros préférez-vous ?',
  intro:
    'La BCE a présélectionné 10 graphismes pour la prochaine série de billets en euros. Comparez-les deux par deux — recto et verso — et découvrez votre classement personnel. Confidentiel par nature : rien n’est suivi ni stocké ailleurs que dans votre navigateur.',
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
  showResults: 'Voir mes résultats',
  orientView: 'Orientation',
  orientDefault: 'Défaut',
  orientLandscape: 'Paysage',
  orientPortrait: 'Portrait',
  confidence: 'Confiance',
  keepComparing: 'Continuer',
  earlyStopTitle: 'Attention — votre classement est incomplet',
  earlyStopBody:
    'Vous n’avez pas encore comparé assez de graphismes pour être certain·e de l’ordre. Vous pouvez voir votre classement actuel ou continuer pour affiner le résultat.',
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
    'Projet indépendant — sans lien avec la BCE. Votez pour de vrai via l’{survey}. Images des billets © Banque centrale européenne, présentées comme propositions de graphisme.',
  surveyLinkText: 'enquête officielle de la BCE',
  shareHeadline: 'Mes billets en euros préférés :',
  madeBy: 'Images © BCE · propositions de graphisme',
};

const DE: Strings = {
  langName: 'Deutsch',
  appName: 'Recto Verso Euro',
  tagline: 'Welche künftigen Euro-Banknoten gefallen Ihnen am besten?',
  intro:
    'Die EZB hat 10 Entwürfe für die nächste Euro-Banknotenserie in die engere Wahl genommen. Vergleichen Sie sie paarweise — Vorder- und Rückseite — und entdecken Sie Ihr persönliches Ranking. Von Grund auf vertraulich: Nichts wird verfolgt oder gespeichert, außer in Ihrem eigenen Browser.',
  start: 'Vergleich starten',
  themeCulture: 'Europäische Kultur',
  themeRivers: 'Flüsse und Vögel',
  recto: 'Vorderseite',
  verso: 'Rückseite',
  comparison: 'Vergleich {n}',
  which: 'Welche Serie bevorzugen Sie?',
  preferLeft: 'Diese gefällt mir besser',
  preferRight: 'Diese gefällt mir besser',
  undo: 'Zurück',
  showResults: 'Ergebnisse anzeigen',
  orientView: 'Ausrichtung',
  orientDefault: 'Standard',
  orientLandscape: 'Querformat',
  orientPortrait: 'Hochformat',
  confidence: 'Sicherheit',
  keepComparing: 'Weiter vergleichen',
  earlyStopTitle: 'Hinweis — Ihr Ranking ist noch lückenhaft',
  earlyStopBody:
    'Sie haben noch nicht genügend Entwürfe verglichen, um die Reihenfolge sicher zu bestimmen. Sie können Ihr bisheriges Ranking ansehen oder weitermachen, um das Ergebnis zu schärfen.',
  seeResultsAnyway: 'Bisheriges Ranking ansehen',
  resume: 'Fortsetzen',
  complete: 'Fertig',
  resultTitle: 'Ihr Euro-Banknoten-Ranking',
  yourPodium: 'Ihr Podium',
  fullRanking: 'Vollständiges Ranking',
  designer: 'von',
  viewOnEcb: 'Auf der EZB-Website ansehen',
  share: 'Mein Ergebnis kopieren',
  copied: 'In die Zwischenablage kopiert!',
  addToPool: 'Mein Ergebnis anonym beitragen',
  pooled: 'Danke — anonym hinzugefügt!',
  poolFailed: 'Sammlung nicht erreichbar — Ihr Ranking bleibt lokal gespeichert.',
  startOver: 'Neu starten',
  disclaimer:
    'Inoffizielles Fan-Projekt — nicht mit der EZB verbunden. Stimmen Sie offiziell in der {survey} ab. Banknotenbilder © Europäische Zentralbank, gezeigt als Entwürfe.',
  surveyLinkText: 'offiziellen EZB-Umfrage',
  shareHeadline: 'Meine liebsten Euro-Banknoten-Entwürfe:',
  madeBy: 'Bilder © EZB · Entwürfe',
};

const ES: Strings = {
  langName: 'Español',
  appName: 'Recto Verso Euro',
  tagline: '¿Qué futuros billetes en euros prefieres?',
  intro:
    'El BCE ha preseleccionado 10 diseños para la próxima serie de billetes en euros. Compáralos de dos en dos — anverso y reverso — y descubre tu clasificación personal. Privado por diseño: nada de lo que haces se rastrea ni se almacena fuera de tu propio navegador.',
  start: 'Empezar',
  themeCulture: 'Cultura europea',
  themeRivers: 'Ríos y aves',
  recto: 'Anverso',
  verso: 'Reverso',
  comparison: 'Comparación {n}',
  which: '¿Qué serie prefieres?',
  preferLeft: 'Prefiero esta',
  preferRight: 'Prefiero esta',
  undo: 'Deshacer',
  showResults: 'Ver mis resultados',
  orientView: 'Orientación',
  orientDefault: 'Predeterminado',
  orientLandscape: 'Horizontal',
  orientPortrait: 'Vertical',
  confidence: 'Confianza',
  keepComparing: 'Seguir comparando',
  earlyStopTitle: 'Atención: tu clasificación aún tiene lagunas',
  earlyStopBody:
    'Todavía no has comparado suficientes diseños para estar seguro del orden. Puedes ver tu clasificación actual o seguir comparando para afinar el resultado.',
  seeResultsAnyway: 'Ver mi clasificación actual',
  resume: 'Reanudar',
  complete: 'Completado',
  resultTitle: 'Tu clasificación de billetes en euros',
  yourPodium: 'Tu podio',
  fullRanking: 'Clasificación completa',
  designer: 'por',
  viewOnEcb: 'Ver en el sitio del BCE',
  share: 'Copiar mi resultado',
  copied: '¡Copiado al portapapeles!',
  addToPool: 'Añadir mi resultado al conjunto',
  pooled: '¡Gracias, añadido de forma anónima!',
  poolFailed: 'No se pudo acceder al conjunto: tu clasificación queda guardada localmente.',
  startOver: 'Empezar de nuevo',
  disclaimer:
    'Proyecto independiente, sin relación con el BCE. Emite tu voto real en la {survey}. Imágenes de los billetes © Banco Central Europeo, mostradas como propuestas de diseño.',
  surveyLinkText: 'encuesta oficial del BCE',
  shareHeadline: 'Mis diseños de billetes en euros favoritos:',
  madeBy: 'Imágenes © BCE · propuestas de diseño',
};

const DICT: Record<Lang, Strings> = { en: EN, fr: FR, de: DE, es: ES };

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
