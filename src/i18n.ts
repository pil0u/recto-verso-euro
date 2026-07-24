/**
 * Tiny dependency-free i18n layer.
 *
 * All 24 official EU languages ship — the same set offered by the ECB's own
 * design-proposals pages and public survey. The browser language is detected on
 * first visit; the user can switch at any time and the choice is remembered in
 * localStorage.
 *
 * Design descriptions are quoted verbatim from the ECB (see data/descriptions.ts).
 * UI wording follows the ECB's terminology in each language.
 */

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

const CS: Strings = {
  langName: 'Čeština',
  appName: 'Recto Verso Euro',
  tagline: 'Které budoucí eurobankovky se vám líbí víc?',
  intro:
    'ECB vybrala 10 návrhů pro příští sérii eurobankovek. Porovnávejte je vždy po dvou — líc i rub — a objevte své osobní pořadí. Soukromí především: nic z toho, co děláte, se nikam neukládá ani nesleduje, kromě vašeho vlastního prohlížeče.',
  start: 'Začít porovnávat',
  themeCulture: 'Evropská kultura',
  themeRivers: 'Řeky a ptáci',
  recto: 'Líc',
  verso: 'Rub',
  comparison: 'Porovnání {n}',
  which: 'Kterou sérii máte raději?',
  preferLeft: 'Tuto mám raději',
  preferRight: 'Tuto mám raději',
  undo: 'Zpět',
  showResults: 'Zobrazit mé výsledky',
  orientView: 'Orientace',
  orientDefault: 'Výchozí',
  orientLandscape: 'Na šířku',
  orientPortrait: 'Na výšku',
  confidence: 'Jistota',
  keepComparing: 'Pokračovat v porovnávání',
  earlyStopTitle: 'Pozor — ve vašem pořadí jsou stále mezery',
  earlyStopBody:
    'Zatím jste neporovnali dost návrhů, abyste si byli pořadím zcela jistí. Můžete si zobrazit dosavadní pořadí, nebo pokračovat pro přesnější výsledek.',
  seeResultsAnyway: 'Zobrazit dosavadní pořadí',
  resume: 'Pokračovat',
  complete: 'Hotovo',
  resultTitle: 'Vaše pořadí eurobankovek',
  yourPodium: 'Vaše stupně vítězů',
  fullRanking: 'Úplné pořadí',
  designer: 'od',
  viewOnEcb: 'Zobrazit na webu ECB',
  share: 'Zkopírovat můj výsledek',
  copied: 'Zkopírováno do schránky!',
  addToPool: 'Přidat můj výsledek do souhrnu',
  pooled: 'Děkujeme — anonymně přidáno!',
  poolFailed: 'Souhrn se nepodařilo načíst — vaše pořadí je bezpečně uloženo lokálně.',
  startOver: 'Začít znovu',
  disclaimer:
    'Neoficiální fanouškovský projekt — bez vazby na ECB. Svůj skutečný hlas odevzdejte v {survey}. Obrázky bankovek © Evropská centrální banka, zobrazené jako návrhy designu.',
  surveyLinkText: 'oficiálním průzkumu ECB',
  shareHeadline: 'Mé oblíbené návrhy eurobankovek:',
  madeBy: 'Obrázky © ECB · návrhy designu',
};

const DA: Strings = {
  langName: 'Dansk',
  appName: 'Recto Verso Euro',
  tagline: 'Hvilke fremtidige eurosedler foretrækker du?',
  intro:
    'ECB har udvalgt 10 designforslag til den næste serie af eurosedler. Sammenlign dem to ad gangen – forside og bagside – og find din helt egen rangordning. Privat af natur: intet af det, du gør, spores eller gemmes andre steder end i din egen browser.',
  start: 'Begynd at sammenligne',
  themeCulture: 'Europæisk kultur',
  themeRivers: 'Floder og fugle',
  recto: 'Forside',
  verso: 'Bagside',
  comparison: 'Sammenligning {n}',
  which: 'Hvilken serie foretrækker du?',
  preferLeft: 'Jeg foretrækker denne',
  preferRight: 'Jeg foretrækker denne',
  undo: 'Fortryd',
  showResults: 'Vis mine resultater',
  orientView: 'Retning',
  orientDefault: 'Standard',
  orientLandscape: 'Liggende',
  orientPortrait: 'Stående',
  confidence: 'Sikkerhed',
  keepComparing: 'Fortsæt med at sammenligne',
  earlyStopTitle: 'Bemærk – din rangordning har stadig huller',
  earlyStopBody:
    'Du har endnu ikke sammenlignet nok designforslag til at være helt sikker på rækkefølgen. Du kan se din rangordning indtil videre eller fortsætte for at få et skarpere resultat.',
  seeResultsAnyway: 'Se min rangordning indtil videre',
  resume: 'Fortsæt',
  complete: 'Færdig',
  resultTitle: 'Din rangordning af eurosedler',
  yourPodium: 'Dit podie',
  fullRanking: 'Fuld rangordning',
  designer: 'af',
  viewOnEcb: "Se på ECB's website",
  share: 'Kopiér mit resultat',
  copied: 'Kopieret til udklipsholder!',
  addToPool: 'Føj mit resultat til puljen',
  pooled: 'Tak – tilføjet anonymt!',
  poolFailed: 'Kunne ikke nå puljen – din rangordning er gemt sikkert lokalt.',
  startOver: 'Start forfra',
  disclaimer:
    'Uofficielt fanprojekt – ikke tilknyttet ECB. Afgiv din rigtige stemme i {survey}. Sedelbilleder © Den Europæiske Centralbank, vist som designforslag.',
  surveyLinkText: "ECB's officielle undersøgelse",
  shareHeadline: 'Mine yndlingsdesign til eurosedler:',
  madeBy: 'Billeder © ECB · designforslag',
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

const ET: Strings = {
  langName: 'Eesti',
  appName: 'Recto Verso Euro',
  tagline: 'Millised tuleviku europangatähed sulle rohkem meeldivad?',
  intro:
    'EKP on koostanud lühinimekirja 10 kavandist euro pangatähtede järgmise seeria jaoks. Võrdle neid kahekaupa – esikülge ja tagakülge – ning leia oma isiklik pingerida. Privaatsus on sisse ehitatud: midagi sinu tegevusest ei jälgita ega salvestata kuskil mujal kui sinu enda brauseris.',
  start: 'Alusta võrdlemist',
  themeCulture: 'Euroopa kultuur',
  themeRivers: 'Jõed ja linnud',
  recto: 'Esikülg',
  verso: 'Tagakülg',
  comparison: 'Võrdlus {n}',
  which: 'Kumb seeria sulle rohkem meeldib?',
  preferLeft: 'Eelistan seda',
  preferRight: 'Eelistan seda',
  undo: 'Võta tagasi',
  showResults: 'Näita mu tulemusi',
  orientView: 'Suund',
  orientDefault: 'Vaikimisi',
  orientLandscape: 'Rõhtpaigutus',
  orientPortrait: 'Püstpaigutus',
  confidence: 'Kindlus',
  keepComparing: 'Jätka võrdlemist',
  earlyStopTitle: 'Pane tähele – su pingereas on veel lünki',
  earlyStopBody:
    'Sa pole veel piisavalt kavandeid võrrelnud, et järjestuses täiesti kindel olla. Võid vaadata oma senist pingerida või jätkata täpsema tulemuse saamiseks.',
  seeResultsAnyway: 'Vaata mu senist pingerida',
  resume: 'Jätka',
  complete: 'Valmis',
  resultTitle: 'Sinu euro pangatähtede pingerida',
  yourPodium: 'Sinu poodium',
  fullRanking: 'Täielik pingerida',
  designer: 'autor',
  viewOnEcb: 'Vaata EKP veebilehel',
  share: 'Kopeeri mu tulemus',
  copied: 'Kopeeritud lõikelauale!',
  addToPool: 'Lisa mu tulemus üldkogumisse',
  pooled: 'Aitäh – lisatud anonüümselt!',
  poolFailed: 'Üldkogumit ei õnnestunud tabada – sinu pingerida on kohalikult turvaliselt alles.',
  startOver: 'Alusta uuesti',
  disclaimer:
    'Mitteametlik fänniprojekt – ei ole seotud EKPga. Anna oma päris hääl {survey}. Pangatähtede pildid © Euroopa Keskpank, esitatud kavandiettepanekutena.',
  surveyLinkText: 'EKP ametlikus küsitluses',
  shareHeadline: 'Minu lemmikkavandid euro pangatähtedele:',
  madeBy: 'Pildid © EKP · kavandiettepanekud',
};

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

const GA: Strings = {
  langName: 'Gaeilge',
  appName: 'Recto Verso Euro',
  tagline: 'Cé na nótaí bainc euro don todhchaí is fearr leat?',
  intro:
    'Chuir an BCE 10 ndearadh ar an ngearrliosta don chéad sraith eile de nótaí bainc euro. Déan comparáid eatarthu ina mbeirteanna — an t-éadan agus an cúl — agus faigh amach do rangú féin. Príobháideach ó dhúchas: ní dhéantar aon ní a dhéanann tú a rianú ná a stóráil in aon áit seachas i do bhrabhsálaí féin.',
  start: 'Tosaigh ag déanamh comparáide',
  themeCulture: 'Cultúr Eorpach',
  themeRivers: 'Aibhneacha agus éin',
  recto: 'Éadan',
  verso: 'Cúl',
  comparison: 'Comparáid {n}',
  which: 'Cé acu sraith is fearr leat?',
  preferLeft: 'Is fearr liom an ceann seo',
  preferRight: 'Is fearr liom an ceann seo',
  undo: 'Cealaigh',
  showResults: 'Taispeáin mo thorthaí',
  orientView: 'Treoshuíomh',
  orientDefault: 'Réamhshocrú',
  orientLandscape: 'Tírdhreach',
  orientPortrait: 'Portráid',
  confidence: 'Muinín',
  keepComparing: 'Lean ort ag déanamh comparáide',
  earlyStopTitle: 'Aire — tá bearnaí i do rangú fós',
  earlyStopBody:
    'Níl go leor dearaí curtha i gcomparáid agat go fóill le bheith lánchinnte faoin ord. Is féidir leat do rangú go dtí seo a fheiceáil, nó leanúint ar aghaidh chun toradh níos géire a fháil.',
  seeResultsAnyway: 'Féach ar mo rangú go dtí seo',
  resume: 'Atosaigh',
  complete: 'Críochnaithe',
  resultTitle: 'Do rangú ar nótaí bainc euro',
  yourPodium: 'Do phóidiam',
  fullRanking: 'Rangú iomlán',
  designer: 'le',
  viewOnEcb: 'Féach ar shuíomh gréasáin an BCE',
  share: 'Cóipeáil mo thoradh',
  copied: 'Cóipeáilte chuig an ngearrthaisce!',
  addToPool: 'Cuir mo thoradh leis an linn',
  pooled: 'Go raibh maith agat — curtha leis gan ainm!',
  poolFailed: 'Níorbh fhéidir teacht ar an linn — tá do rangú slán go háitiúil.',
  startOver: 'Tosaigh as an nua',
  disclaimer:
    'Tionscadal neamhoifigiúil ó lucht leanúna — gan bhaint leis an BCE. Caith do vóta fíor sa {survey}. Íomhánna na nótaí bainc © an Banc Ceannais Eorpach, á dtaispeáint mar mholtaí dearaidh.',
  surveyLinkText: 'suirbhé oifigiúil an BCE',
  shareHeadline: 'Na dearaí nótaí bainc euro is fearr liom:',
  madeBy: 'Íomhánna © BCE · moltaí dearaidh',
};

const HR: Strings = {
  langName: 'Hrvatski',
  appName: 'Recto Verso Euro',
  tagline: 'Koje buduće euronovčanice vam se više sviđaju?',
  intro:
    'ESB je u uži izbor uvrstio 10 dizajna za sljedeću seriju euronovčanica. Usporedite ih dva po dva — prednju i stražnju stranu — i otkrijte svoju osobnu ljestvicu. Privatno po dizajnu: ništa što radite ne prati se niti pohranjuje bilo gdje osim u vašem pregledniku.',
  start: 'Započni usporedbu',
  themeCulture: 'Europska kultura',
  themeRivers: 'Rijeke i ptice',
  recto: 'Prednja strana',
  verso: 'Stražnja strana',
  comparison: 'Usporedba {n}',
  which: 'Koja vam se serija više sviđa?',
  preferLeft: 'Ova mi se više sviđa',
  preferRight: 'Ova mi se više sviđa',
  undo: 'Poništi',
  showResults: 'Prikaži moje rezultate',
  orientView: 'Orijentacija',
  orientDefault: 'Zadano',
  orientLandscape: 'Vodoravno',
  orientPortrait: 'Uspravno',
  confidence: 'Pouzdanost',
  keepComparing: 'Nastavi usporedbu',
  earlyStopTitle: 'Pozor — vaša ljestvica još ima praznina',
  earlyStopBody:
    'Još niste usporedili dovoljno dizajna da biste bili posve sigurni u redoslijed. Možete pogledati svoju dosadašnju ljestvicu ili nastaviti za precizniji rezultat.',
  seeResultsAnyway: 'Pogledaj moju dosadašnju ljestvicu',
  resume: 'Nastavi',
  complete: 'Dovršeno',
  resultTitle: 'Vaša ljestvica euronovčanica',
  yourPodium: 'Vaše pobjedničko postolje',
  fullRanking: 'Potpuna ljestvica',
  designer: 'autor',
  viewOnEcb: 'Pogledaj na mrežnim stranicama ESB-a',
  share: 'Kopiraj moj rezultat',
  copied: 'Kopirano u međuspremnik!',
  addToPool: 'Dodaj moj rezultat u zbir',
  pooled: 'Hvala — dodano anonimno!',
  poolFailed: 'Nije moguće doći do zbira — vaša je ljestvica sigurna lokalno.',
  startOver: 'Počni ispočetka',
  disclaimer:
    'Neslužbeni projekt obožavatelja — nije povezan s ESB-om. Svoj pravi glas dajte u {survey}. Slike novčanica © Europska središnja banka, prikazane kao prijedlozi dizajna.',
  surveyLinkText: 'službenoj anketi ESB-a',
  shareHeadline: 'Moji omiljeni dizajni euronovčanica:',
  madeBy: 'Slike © ESB · prijedlozi dizajna',
};

const IT: Strings = {
  langName: 'Italiano',
  appName: 'Recto Verso Euro',
  tagline: 'Quali future banconote in euro preferisci?',
  intro:
    'La BCE ha selezionato 10 disegni per la prossima serie di banconote in euro. Confrontali due alla volta — fronte e retro — e scopri la tua classifica personale. Riservato per natura: nulla di ciò che fai viene tracciato o memorizzato al di fuori del tuo browser.',
  start: 'Inizia a confrontare',
  themeCulture: 'Cultura europea',
  themeRivers: 'Fiumi e uccelli',
  recto: 'Fronte',
  verso: 'Retro',
  comparison: 'Confronto {n}',
  which: 'Quale serie preferisci?',
  preferLeft: 'Preferisco questa',
  preferRight: 'Preferisco questa',
  undo: 'Annulla',
  showResults: 'Mostra i miei risultati',
  orientView: 'Orientamento',
  orientDefault: 'Predefinito',
  orientLandscape: 'Orizzontale',
  orientPortrait: 'Verticale',
  confidence: 'Affidabilità',
  keepComparing: 'Continua a confrontare',
  earlyStopTitle: 'Attenzione — la tua classifica ha ancora delle lacune',
  earlyStopBody:
    "Non hai ancora confrontato abbastanza disegni per essere del tutto sicuro dell'ordine. Puoi vedere la tua classifica attuale oppure continuare per un risultato più preciso.",
  seeResultsAnyway: 'Vedi la mia classifica attuale',
  resume: 'Riprendi',
  complete: 'Completato',
  resultTitle: 'La tua classifica delle banconote in euro',
  yourPodium: 'Il tuo podio',
  fullRanking: 'Classifica completa',
  designer: 'di',
  viewOnEcb: 'Vedi sul sito della BCE',
  share: 'Copia il mio risultato',
  copied: 'Copiato negli appunti!',
  addToPool: 'Aggiungi il mio risultato al sondaggio',
  pooled: 'Grazie — aggiunto in forma anonima!',
  poolFailed: 'Impossibile raggiungere il sondaggio — la tua classifica è al sicuro in locale.',
  startOver: 'Ricomincia',
  disclaimer:
    'Progetto amatoriale non ufficiale — non affiliato alla BCE. Esprimi il tuo voto reale nel {survey}. Immagini delle banconote © Banca centrale europea, mostrate come proposte di design.',
  surveyLinkText: 'sondaggio ufficiale della BCE',
  shareHeadline: 'I miei disegni preferiti per le banconote in euro:',
  madeBy: 'Immagini © BCE · proposte di design',
};

const LV: Strings = {
  langName: 'Latviešu',
  appName: 'Recto Verso Euro',
  tagline: 'Kuras nākotnes euro banknotes tev patīk vislabāk?',
  intro:
    'ECB ir izvēlējusies 10 dizainus nākamajai euro banknošu sērijai. Salīdzini tos pa pāriem — priekšpusi un aizmuguri — un atklāj savu personīgo vērtējumu. Privāts jau pēc būtības: nekas no tā, ko tu dari, netiek izsekots vai saglabāts nekur citur kā vien tavā paša pārlūkā.',
  start: 'Sākt salīdzināt',
  themeCulture: 'Eiropas kultūra',
  themeRivers: 'Upes un putni',
  recto: 'Priekšpuse',
  verso: 'Aizmugure',
  comparison: '{n}. salīdzinājums',
  which: 'Kura sērija tev patīk labāk?',
  preferLeft: 'Man patīk šī',
  preferRight: 'Man patīk šī',
  undo: 'Atsaukt',
  showResults: 'Rādīt manus rezultātus',
  orientView: 'Orientācija',
  orientDefault: 'Noklusējums',
  orientLandscape: 'Horizontāla',
  orientPortrait: 'Vertikāla',
  confidence: 'Pārliecība',
  keepComparing: 'Turpināt salīdzināt',
  earlyStopTitle: 'Uzmanību — tavā vērtējumā vēl ir robi',
  earlyStopBody:
    'Tu vēl neesi salīdzinājis pietiekami daudz dizainu, lai būtu pilnīgi drošs par secību. Vari apskatīt savu līdzšinējo vērtējumu vai turpināt, lai iegūtu precīzāku rezultātu.',
  seeResultsAnyway: 'Skatīt manu līdzšinējo vērtējumu',
  resume: 'Turpināt',
  complete: 'Pabeigts',
  resultTitle: 'Tavs euro banknošu vērtējums',
  yourPodium: 'Tavs pjedestāls',
  fullRanking: 'Pilns vērtējums',
  designer: 'autors:',
  viewOnEcb: 'Skatīt ECB tīmekļa vietnē',
  share: 'Kopēt manu rezultātu',
  copied: 'Nokopēts starpliktuvē!',
  addToPool: 'Pievienot manu rezultātu kopvērtējumam',
  pooled: 'Paldies — pievienots anonīmi!',
  poolFailed: 'Neizdevās sasniegt kopvērtējumu — tavs vērtējums ir droši saglabāts lokāli.',
  startOver: 'Sākt no jauna',
  disclaimer:
    'Neoficiāls fanu projekts — nav saistīts ar ECB. Nodod savu īsto balsi {survey}. Banknošu attēli © Eiropas Centrālā banka, parādīti kā dizaina priekšlikumi.',
  surveyLinkText: 'oficiālajā ECB aptaujā',
  shareHeadline: 'Mani iecienītākie euro banknošu dizaini:',
  madeBy: 'Attēli © ECB · dizaina priekšlikumi',
};

const LT: Strings = {
  langName: 'Lietuvių',
  appName: 'Recto Verso Euro',
  tagline: 'Kurie būsimi euro banknotai jums labiau patinka?',
  intro:
    'ECB atrinko 10 kito euro banknotų serijos dizaino variantų. Lyginkite juos po du – priekinę ir kitą puses – ir sužinokite savo asmeninę reitingų eilę. Privatu iš prigimties: niekas, ką darote, nėra sekama ar saugoma niekur kitur, tik jūsų pačių naršyklėje.',
  start: 'Pradėti lyginti',
  themeCulture: 'Europos kultūra',
  themeRivers: 'Upės ir paukščiai',
  recto: 'Priekinė pusė',
  verso: 'Kita pusė',
  comparison: '{n} palyginimas',
  which: 'Kuriai serijai teikiate pirmenybę?',
  preferLeft: 'Man labiau patinka šis',
  preferRight: 'Man labiau patinka šis',
  undo: 'Anuliuoti',
  showResults: 'Rodyti mano rezultatus',
  orientView: 'Orientacija',
  orientDefault: 'Numatytoji',
  orientLandscape: 'Gulsčioji',
  orientPortrait: 'Stačioji',
  confidence: 'Patikimumas',
  keepComparing: 'Toliau lyginti',
  earlyStopTitle: 'Dėmesio – jūsų reitingų eilėje dar yra spragų',
  earlyStopBody:
    'Dar nepalyginote pakankamai dizaino variantų, kad būtų galima visiškai užtikrintai nustatyti eilę. Galite peržiūrėti dabartinį savo reitingą arba tęsti, kad rezultatas būtų tikslesnis.',
  seeResultsAnyway: 'Rodyti dabartinį mano reitingą',
  resume: 'Tęsti',
  complete: 'Baigta',
  resultTitle: 'Jūsų euro banknotų reitingas',
  yourPodium: 'Jūsų pjedestalas',
  fullRanking: 'Visas reitingas',
  designer: 'autorius',
  viewOnEcb: 'Žiūrėti ECB svetainėje',
  share: 'Kopijuoti mano rezultatą',
  copied: 'Nukopijuota į iškarpinę!',
  addToPool: 'Įtraukti mano rezultatą į bendrą rinkinį',
  pooled: 'Ačiū – įtraukta anonimiškai!',
  poolFailed: 'Nepavyko pasiekti bendro rinkinio – jūsų reitingas saugiai išsaugotas įrenginyje.',
  startOver: 'Pradėti iš naujo',
  disclaimer:
    'Neoficialus gerbėjų projektas – nesusijęs su ECB. Atiduokite savo tikrąjį balsą {survey}. Banknotų atvaizdai © Europos Centrinis Bankas, pateikiami kaip dizaino pasiūlymai.',
  surveyLinkText: 'oficialioje ECB apklausoje',
  shareHeadline: 'Mano mėgstamiausi euro banknotų dizaino variantai:',
  madeBy: 'Atvaizdai © ECB · dizaino pasiūlymai',
};

const HU: Strings = {
  langName: 'Magyar',
  appName: 'Recto Verso Euro',
  tagline: 'Melyik jövőbeli eurobankjegyek tetszenek jobban?',
  intro:
    'Az EKB 10 tervet válogatott be az eurobankjegyek következő sorozatához. Hasonlítsd össze őket kettesével – az előlapot és a hátlapot –, és fedezd fel a saját rangsorodat. Alapból magánjellegű: semmit sem követünk vagy tárolunk, csak a saját böngésződben.',
  start: 'Összehasonlítás indítása',
  themeCulture: 'Európai kultúra',
  themeRivers: 'Folyók és madarak',
  recto: 'Előlap',
  verso: 'Hátlap',
  comparison: '{n}. összehasonlítás',
  which: 'Melyik sorozat tetszik jobban?',
  preferLeft: 'Ezt választom',
  preferRight: 'Ezt választom',
  undo: 'Visszavonás',
  showResults: 'Eredményeim megtekintése',
  orientView: 'Tájolás',
  orientDefault: 'Alapértelmezett',
  orientLandscape: 'Fekvő',
  orientPortrait: 'Álló',
  confidence: 'Megbízhatóság',
  keepComparing: 'Tovább hasonlítom',
  earlyStopTitle: 'Figyelem – a rangsorod még hiányos',
  earlyStopBody:
    'Még nem hasonlítottál össze elég tervet ahhoz, hogy biztos legyél a sorrendben. Megnézheted az eddigi rangsorodat, vagy folytathatod a pontosabb eredményért.',
  seeResultsAnyway: 'Eddigi rangsorom megtekintése',
  resume: 'Folytatás',
  complete: 'Kész',
  resultTitle: 'Az eurobankjegy-rangsorod',
  yourPodium: 'A dobogód',
  fullRanking: 'Teljes rangsor',
  designer: 'tervező:',
  viewOnEcb: 'Megtekintés az EKB honlapján',
  share: 'Eredményem másolása',
  copied: 'Vágólapra másolva!',
  addToPool: 'Eredményem hozzáadása a közöshöz',
  pooled: 'Köszönjük – névtelenül hozzáadva!',
  poolFailed: 'Nem sikerült elérni a közös adatokat – a rangsorod helyben biztonságban van.',
  startOver: 'Újrakezdés',
  disclaimer:
    'Nem hivatalos rajongói projekt – nem áll kapcsolatban az EKB-val. Add le valódi szavazatod itt: {survey}. A bankjegyképek © Európai Központi Bank, tervjavaslatként bemutatva.',
  surveyLinkText: 'hivatalos EKB-felmérés',
  shareHeadline: 'Kedvenc eurobankjegy-terveim:',
  madeBy: 'Képek © EKB · tervjavaslatok',
};

const MT: Strings = {
  langName: 'Malti',
  appName: 'Recto Verso Euro',
  tagline: 'Liema karti tal-flus tal-euro tal-futur tippreferi?',
  intro:
    "Il-BĊE għażel 10 disinji fil-lista qasira għas-sensiela li jmiss ta' karti tal-flus tal-euro. Qabbilhom tnejn tnejn — quddiem u wara — u skopri l-klassifika personali tiegħek. Privat mid-disinn: xejn minn dak li tagħmel ma jiġi ttraċċat jew maħżun ħlief fil-browser tiegħek stess.",
  start: 'Ibda qabbel',
  themeCulture: 'Il-kultura Ewropea',
  themeRivers: 'Xmajjar u għasafar',
  recto: 'Quddiem',
  verso: 'Wara',
  comparison: 'Tqabbil {n}',
  which: 'Liema sensiela tippreferi?',
  preferLeft: 'Nippreferi din',
  preferRight: 'Nippreferi din',
  undo: 'Ħassar',
  showResults: 'Uri r-riżultati tiegħi',
  orientView: 'Orjentazzjoni',
  orientDefault: 'Prestabbilita',
  orientLandscape: 'Orizzontali',
  orientPortrait: 'Vertikali',
  confidence: 'Fiduċja',
  keepComparing: 'Kompli qabbel',
  earlyStopTitle: 'Attenzjoni — il-klassifika tiegħek għad fiha lakuni',
  earlyStopBody:
    "Għadek ma qabbiltx biżżejjed disinji biex tkun ċert għalkollox mill-ordni. Tista' tara l-klassifika tiegħek s'issa, jew tkompli għal riżultat aktar preċiż.",
  seeResultsAnyway: "Ara l-klassifika tiegħi s'issa",
  resume: 'Kompli',
  complete: 'Lest',
  resultTitle: 'Il-klassifika tiegħek tal-karti tal-flus tal-euro',
  yourPodium: 'Il-podju tiegħek',
  fullRanking: 'Klassifika sħiħa',
  designer: 'minn',
  viewOnEcb: 'Ara fis-sit web tal-BĊE',
  share: 'Ikkopja r-riżultat tiegħi',
  copied: 'Ikkupjat fil-clipboard!',
  addToPool: 'Żid ir-riżultat tiegħi mal-ġabra',
  pooled: "Grazzi — miżjud b'mod anonimu!",
  poolFailed: 'Ma stajniex naslu għall-ġabra — il-klassifika tiegħek hija sigura lokalment.',
  startOver: "Erġa' ibda",
  disclaimer:
    "Proġett mhux uffiċjali tal-partitarji — mhux affiljat mal-BĊE. Ivvota bis-serjetà fl-{survey}. Immaġni tal-karti tal-flus © Bank Ċentrali Ewropew, murija bħala proposti ta' disinn.",
  surveyLinkText: 'istħarriġ uffiċjali tal-BĊE',
  shareHeadline: 'Id-disinji favoriti tiegħi tal-karti tal-flus tal-euro:',
  madeBy: "Immaġni © BĊE · proposti ta' disinn",
};

const NL: Strings = {
  langName: 'Nederlands',
  appName: 'Recto Verso Euro',
  tagline: 'Welke toekomstige eurobankbiljetten vind jij het mooist?',
  intro:
    'De ECB heeft 10 ontwerpen geselecteerd voor de volgende serie eurobankbiljetten. Vergelijk ze twee aan twee — voor- en achterzijde — en ontdek je persoonlijke ranglijst. Privacy by design: niets van wat je doet wordt gevolgd of ergens opgeslagen, behalve in je eigen browser.',
  start: 'Begin met vergelijken',
  themeCulture: 'Europese cultuur',
  themeRivers: 'Rivieren en vogels',
  recto: 'Voorzijde',
  verso: 'Achterzijde',
  comparison: 'Vergelijking {n}',
  which: 'Welke serie vind je mooier?',
  preferLeft: 'Deze vind ik mooier',
  preferRight: 'Deze vind ik mooier',
  undo: 'Ongedaan maken',
  showResults: 'Toon mijn resultaten',
  orientView: 'Weergave',
  orientDefault: 'Standaard',
  orientLandscape: 'Liggend',
  orientPortrait: 'Staand',
  confidence: 'Betrouwbaarheid',
  keepComparing: 'Verder vergelijken',
  earlyStopTitle: 'Let op — je ranglijst heeft nog hiaten',
  earlyStopBody:
    'Je hebt nog niet genoeg ontwerpen vergeleken om zeker te zijn van de volgorde. Je kunt je ranglijst tot nu toe bekijken, of verdergaan voor een scherper resultaat.',
  seeResultsAnyway: 'Bekijk mijn ranglijst tot nu toe',
  resume: 'Hervatten',
  complete: 'Voltooid',
  resultTitle: 'Jouw ranglijst van eurobankbiljetten',
  yourPodium: 'Jouw podium',
  fullRanking: 'Volledige ranglijst',
  designer: 'door',
  viewOnEcb: 'Bekijk op de website van de ECB',
  share: 'Kopieer mijn resultaat',
  copied: 'Gekopieerd naar klembord!',
  addToPool: 'Voeg mijn resultaat toe aan de gemeenschappelijke telling',
  pooled: 'Bedankt — anoniem toegevoegd!',
  poolFailed: 'Kon de gemeenschappelijke telling niet bereiken — je ranglijst is lokaal veilig.',
  startOver: 'Opnieuw beginnen',
  disclaimer:
    'Onofficieel fanproject — niet gelieerd aan de ECB. Breng je echte stem uit in de {survey}. Afbeeldingen van bankbiljetten © Europese Centrale Bank, getoond als ontwerpvoorstellen.',
  surveyLinkText: 'officiële ECB-enquête',
  shareHeadline: 'Mijn favoriete ontwerpen voor eurobankbiljetten:',
  madeBy: 'Afbeeldingen © ECB · ontwerpvoorstellen',
};

const PL: Strings = {
  langName: 'Polski',
  appName: 'Recto Verso Euro',
  tagline: 'Które przyszłe banknoty euro wolisz?',
  intro:
    'EBC wybrał 10 projektów do następnej serii banknotów euro. Porównuj je parami — awers i rewers — i odkryj swój osobisty ranking. Prywatność od podstaw: nic, co robisz, nie jest śledzone ani zapisywane nigdzie poza Twoją własną przeglądarką.',
  start: 'Zacznij porównywać',
  themeCulture: 'Kultura europejska',
  themeRivers: 'Rzeki i ptaki',
  recto: 'Awers',
  verso: 'Rewers',
  comparison: 'Porównanie {n}',
  which: 'Którą serię wolisz?',
  preferLeft: 'Wolę tę',
  preferRight: 'Wolę tę',
  undo: 'Cofnij',
  showResults: 'Pokaż moje wyniki',
  orientView: 'Orientacja',
  orientDefault: 'Domyślna',
  orientLandscape: 'Pozioma',
  orientPortrait: 'Pionowa',
  confidence: 'Pewność',
  keepComparing: 'Porównuj dalej',
  earlyStopTitle: 'Uwaga — w Twoim rankingu są jeszcze luki',
  earlyStopBody:
    'Nie porównałeś jeszcze wystarczającej liczby projektów, aby mieć pewność co do kolejności. Możesz zobaczyć swój dotychczasowy ranking albo kontynuować, by uzyskać dokładniejszy wynik.',
  seeResultsAnyway: 'Pokaż mój dotychczasowy ranking',
  resume: 'Wznów',
  complete: 'Ukończono',
  resultTitle: 'Twój ranking banknotów euro',
  yourPodium: 'Twoje podium',
  fullRanking: 'Pełny ranking',
  designer: 'proj.',
  viewOnEcb: 'Zobacz na stronie EBC',
  share: 'Skopiuj mój wynik',
  copied: 'Skopiowano do schowka!',
  addToPool: 'Dodaj mój wynik do puli',
  pooled: 'Dziękujemy — dodano anonimowo!',
  poolFailed: 'Nie udało się połączyć z pulą — Twój ranking jest bezpieczny lokalnie.',
  startOver: 'Zacznij od nowa',
  disclaimer:
    'Nieoficjalny projekt fanowski — niepowiązany z EBC. Oddaj swój prawdziwy głos w {survey}. Zdjęcia banknotów © Europejski Bank Centralny, prezentowane jako propozycje projektów.',
  surveyLinkText: 'oficjalnej ankiecie EBC',
  shareHeadline: 'Moje ulubione projekty banknotów euro:',
  madeBy: 'Zdjęcia © EBC · propozycje projektów',
};

const PT: Strings = {
  langName: 'Português',
  appName: 'Recto Verso Euro',
  tagline: 'Que futuras notas de euro prefere?',
  intro:
    'O BCE pré-selecionou 10 propostas para a próxima série de notas de euro. Compare-as duas a duas — frente e verso — e descubra a sua classificação pessoal. Privado desde a conceção: nada do que faz é registado ou guardado em qualquer lado além do seu próprio navegador.',
  start: 'Começar a comparar',
  themeCulture: 'Cultura europeia',
  themeRivers: 'Rios e aves',
  recto: 'Frente',
  verso: 'Verso',
  comparison: 'Comparação {n}',
  which: 'Que série prefere?',
  preferLeft: 'Prefiro esta',
  preferRight: 'Prefiro esta',
  undo: 'Anular',
  showResults: 'Ver os meus resultados',
  orientView: 'Orientação',
  orientDefault: 'Predefinida',
  orientLandscape: 'Horizontal',
  orientPortrait: 'Vertical',
  confidence: 'Confiança',
  keepComparing: 'Continuar a comparar',
  earlyStopTitle: 'Atenção — a sua classificação ainda tem lacunas',
  earlyStopBody:
    'Ainda não comparou propostas suficientes para ter a certeza da ordem. Pode ver a sua classificação até agora ou continuar para um resultado mais rigoroso.',
  seeResultsAnyway: 'Ver a minha classificação até agora',
  resume: 'Retomar',
  complete: 'Concluído',
  resultTitle: 'A sua classificação das notas de euro',
  yourPodium: 'O seu pódio',
  fullRanking: 'Classificação completa',
  designer: 'por',
  viewOnEcb: 'Ver no sítio do BCE',
  share: 'Copiar o meu resultado',
  copied: 'Copiado para a área de transferência!',
  addToPool: 'Adicionar o meu resultado ao conjunto',
  pooled: 'Obrigado — adicionado anonimamente!',
  poolFailed: 'Não foi possível aceder ao conjunto — a sua classificação está guardada localmente.',
  startOver: 'Recomeçar',
  disclaimer:
    'Projeto de fãs não oficial — sem qualquer ligação ao BCE. Registe o seu voto real no {survey}. Imagens das notas © Banco Central Europeu, apresentadas como propostas de design.',
  surveyLinkText: 'inquérito oficial do BCE',
  shareHeadline: 'As minhas propostas favoritas de notas de euro:',
  madeBy: 'Imagens © BCE · propostas de design',
};

const RO: Strings = {
  langName: 'Română',
  appName: 'Recto Verso Euro',
  tagline: 'Ce viitoare bancnote euro preferi?',
  intro:
    'BCE a selectat 10 modele pentru următoarea serie de bancnote euro. Compară-le două câte două — față și revers — și descoperă-ți clasamentul personal. Confidențial din concepție: nimic din ce faci nu este urmărit sau stocat nicăieri, ci doar în propriul browser.',
  start: 'Începe comparația',
  themeCulture: 'Cultura europeană',
  themeRivers: 'Râuri și păsări',
  recto: 'Față',
  verso: 'Revers',
  comparison: 'Comparația {n}',
  which: 'Ce serie preferi?',
  preferLeft: 'O prefer pe aceasta',
  preferRight: 'O prefer pe aceasta',
  undo: 'Anulează',
  showResults: 'Arată-mi rezultatele',
  orientView: 'Orientare',
  orientDefault: 'Implicit',
  orientLandscape: 'Peisaj',
  orientPortrait: 'Portret',
  confidence: 'Încredere',
  keepComparing: 'Continuă comparația',
  earlyStopTitle: 'Atenție — clasamentul tău încă are lacune',
  earlyStopBody:
    'Nu ai comparat încă suficiente modele pentru a fi complet sigur de ordine. Poți vedea clasamentul de până acum sau poți continua pentru un rezultat mai precis.',
  seeResultsAnyway: 'Vezi clasamentul de până acum',
  resume: 'Reia',
  complete: 'Finalizat',
  resultTitle: 'Clasamentul tău de bancnote euro',
  yourPodium: 'Podiumul tău',
  fullRanking: 'Clasament complet',
  designer: 'de',
  viewOnEcb: 'Vezi pe site-ul BCE',
  share: 'Copiază rezultatul meu',
  copied: 'Copiat în clipboard!',
  addToPool: 'Adaugă rezultatul meu la ansamblu',
  pooled: 'Mulțumim — adăugat anonim!',
  poolFailed: 'Nu s-a putut accesa ansamblul — clasamentul tău este salvat local.',
  startOver: 'Începe din nou',
  disclaimer:
    'Proiect neoficial al fanilor — fără afiliere cu BCE. Votează cu adevărat în {survey}. Imagini cu bancnote © Banca Centrală Europeană, prezentate ca propuneri de design.',
  surveyLinkText: 'sondajul oficial al BCE',
  shareHeadline: 'Modelele mele preferate de bancnote euro:',
  madeBy: 'Imagini © BCE · propuneri de design',
};

const SK: Strings = {
  langName: 'Slovenčina',
  appName: 'Recto Verso Euro',
  tagline: 'Ktoré budúce eurové bankovky sa vám páčia najviac?',
  intro:
    'ECB vybrala do užšieho výberu 10 návrhov pre novú sériu eurových bankoviek. Porovnávajte ich vždy po dvoch — lícnu aj rubovú stranu — a zistite svoje osobné poradie. Súkromie od základu: nič z toho, čo robíte, sa nesleduje ani neukladá nikam inam než do vášho vlastného prehliadača.',
  start: 'Začať porovnávať',
  themeCulture: 'Európska kultúra',
  themeRivers: 'Rieky a vtáky',
  recto: 'Líce',
  verso: 'Rub',
  comparison: 'Porovnanie {n}',
  which: 'Ktorá séria sa vám páči viac?',
  preferLeft: 'Túto mám radšej',
  preferRight: 'Túto mám radšej',
  undo: 'Späť',
  showResults: 'Zobraziť moje výsledky',
  orientView: 'Orientácia',
  orientDefault: 'Predvolená',
  orientLandscape: 'Na šírku',
  orientPortrait: 'Na výšku',
  confidence: 'Istota',
  keepComparing: 'Pokračovať v porovnávaní',
  earlyStopTitle: 'Pozor — vaše poradie má ešte medzery',
  earlyStopBody:
    'Zatiaľ ste neporovnali dosť návrhov na to, aby bolo poradie úplne isté. Môžete si pozrieť doterajšie poradie alebo pokračovať pre presnejší výsledok.',
  seeResultsAnyway: 'Zobraziť doterajšie poradie',
  resume: 'Pokračovať',
  complete: 'Dokončené',
  resultTitle: 'Vaše poradie eurových bankoviek',
  yourPodium: 'Váš stupienok víťazov',
  fullRanking: 'Kompletné poradie',
  designer: 'od',
  viewOnEcb: 'Zobraziť na webovej stránke ECB',
  share: 'Skopírovať môj výsledok',
  copied: 'Skopírované do schránky!',
  addToPool: 'Pridať môj výsledok do ankety',
  pooled: 'Ďakujeme — pridané anonymne!',
  poolFailed: 'Anketa je nedostupná — vaše poradie je bezpečne uložené lokálne.',
  startOver: 'Začať odznova',
  disclaimer:
    'Neoficiálny fanúšikovský projekt — nie je spojený s ECB. Svoj skutočný hlas odovzdajte v {survey}. Obrázky bankoviek © Európska centrálna banka, zobrazené ako návrhy dizajnu.',
  surveyLinkText: 'oficiálnom prieskume ECB',
  shareHeadline: 'Moje obľúbené návrhy eurových bankoviek:',
  madeBy: 'Obrázky © ECB · návrhy dizajnu',
};

const SL: Strings = {
  langName: 'Slovenščina',
  appName: 'Recto Verso Euro',
  tagline: 'Kateri prihodnji eurobankovci so vam ljubši?',
  intro:
    'ECB je v ožji izbor za naslednjo serijo eurobankovcev uvrstila 10 oblikovnih predlogov. Primerjajte jih po dva naenkrat – sprednjo in hrbtno stran – ter odkrijte svojo osebno razvrstitev. Zasebno že v zasnovi: nič, kar počnete, se ne sledi ali shranjuje nikjer razen v vašem brskalniku.',
  start: 'Začni primerjati',
  themeCulture: 'Evropska kultura',
  themeRivers: 'Reke in ptice',
  recto: 'Sprednja stran',
  verso: 'Hrbtna stran',
  comparison: 'Primerjava {n}',
  which: 'Katera serija vam je ljubša?',
  preferLeft: 'Ta mi je ljubši',
  preferRight: 'Ta mi je ljubši',
  undo: 'Razveljavi',
  showResults: 'Pokaži moje rezultate',
  orientView: 'Usmerjenost',
  orientDefault: 'Privzeto',
  orientLandscape: 'Ležeče',
  orientPortrait: 'Pokončno',
  confidence: 'Zanesljivost',
  keepComparing: 'Nadaljuj primerjanje',
  earlyStopTitle: 'Pozor – vaša razvrstitev ima še vrzeli',
  earlyStopBody:
    'Zaenkrat še niste primerjali dovolj predlogov, da bi bili povsem prepričani o vrstnem redu. Ogledate si lahko dosedanjo razvrstitev ali nadaljujete za natančnejši rezultat.',
  seeResultsAnyway: 'Poglej dosedanjo razvrstitev',
  resume: 'Nadaljuj',
  complete: 'Dokončano',
  resultTitle: 'Vaša razvrstitev eurobankovcev',
  yourPodium: 'Vaše stopničke',
  fullRanking: 'Celotna razvrstitev',
  designer: 'avtor',
  viewOnEcb: 'Oglejte si na spletni strani ECB',
  share: 'Kopiraj moj rezultat',
  copied: 'Kopirano v odložišče!',
  addToPool: 'Dodaj moj rezultat v skupni nabor',
  pooled: 'Hvala – dodano anonimno!',
  poolFailed:
    'Skupnega nabora ni bilo mogoče doseči – vaša razvrstitev je varno shranjena lokalno.',
  startOver: 'Začni znova',
  disclaimer:
    'Neuradni oboževalski projekt – ni povezan z ECB. Svoj pravi glas oddajte v {survey}. Slike bankovcev © Evropska centralna banka, prikazane kot oblikovni predlogi.',
  surveyLinkText: 'uradni anketi ECB',
  shareHeadline: 'Moji najljubši predlogi za eurobankovce:',
  madeBy: 'Slike © ECB · oblikovni predlogi',
};

const FI: Strings = {
  langName: 'Suomi',
  appName: 'Recto Verso Euro',
  tagline: 'Mistä tulevaisuuden eurosetelistä pidät eniten?',
  intro:
    'EKP on valinnut 10 ehdotusta seuraavaa eurosetelisarjaa varten. Vertaile niitä kaksi kerrallaan – etu- ja takapuoli – ja löydä oma suosikkijärjestyksesi. Yksityisyys on suunniteltu sisään: mitään toimintaasi ei seurata tai tallenneta muualle kuin omaan selaimeesi.',
  start: 'Aloita vertailu',
  themeCulture: 'Eurooppalainen kulttuuri',
  themeRivers: 'Joet ja linnut',
  recto: 'Etupuoli',
  verso: 'Takapuoli',
  comparison: 'Vertailu {n}',
  which: 'Kummasta sarjasta pidät enemmän?',
  preferLeft: 'Pidän tästä enemmän',
  preferRight: 'Pidän tästä enemmän',
  undo: 'Kumoa',
  showResults: 'Näytä tulokseni',
  orientView: 'Suunta',
  orientDefault: 'Oletus',
  orientLandscape: 'Vaaka',
  orientPortrait: 'Pysty',
  confidence: 'Varmuus',
  keepComparing: 'Jatka vertailua',
  earlyStopTitle: 'Huomio – järjestyksessäsi on vielä aukkoja',
  earlyStopBody:
    'Et ole vielä vertaillut riittävästi ehdotuksia, jotta järjestys olisi täysin varma. Voit katsoa nykyisen järjestyksesi tai jatkaa tarkemman tuloksen saamiseksi.',
  seeResultsAnyway: 'Näytä nykyinen järjestykseni',
  resume: 'Jatka',
  complete: 'Valmis',
  resultTitle: 'Eurosetelien järjestyksesi',
  yourPodium: 'Palkintopallisi',
  fullRanking: 'Koko järjestys',
  designer: 'tekijä',
  viewOnEcb: 'Katso EKP:n verkkosivustolla',
  share: 'Kopioi tulokseni',
  copied: 'Kopioitu leikepöydälle!',
  addToPool: 'Lisää tulokseni koontiin',
  pooled: 'Kiitos – lisätty nimettömästi!',
  poolFailed: 'Koontiin ei saatu yhteyttä – järjestyksesi on tallessa paikallisesti.',
  startOver: 'Aloita alusta',
  disclaimer:
    'Epävirallinen fanihanke – ei yhteydessä EKP:hen. Anna oikea äänesi {survey}. Setelikuvat © Euroopan keskuspankki, esitetään suunnitteluehdotuksina.',
  surveyLinkText: 'EKP:n virallisessa kyselyssä',
  shareHeadline: 'Suosikkini tulevaisuuden euroseteliehdotuksista:',
  madeBy: 'Kuvat © EKP · suunnitteluehdotuksia',
};

const SV: Strings = {
  langName: 'Svenska',
  appName: 'Recto Verso Euro',
  tagline: 'Vilka framtida eurosedlar föredrar du?',
  intro:
    'ECB har valt ut tio förslag till nästa serie eurosedlar. Jämför dem två i taget – framsida och baksida – och upptäck din personliga rangordning. Privat i grunden: inget du gör spåras eller sparas någon annanstans än i din egen webbläsare.',
  start: 'Börja jämföra',
  themeCulture: 'Europeisk kultur',
  themeRivers: 'Floder och fåglar',
  recto: 'Framsida',
  verso: 'Baksida',
  comparison: 'Jämförelse {n}',
  which: 'Vilken serie föredrar du?',
  preferLeft: 'Jag föredrar den här',
  preferRight: 'Jag föredrar den här',
  undo: 'Ångra',
  showResults: 'Visa mitt resultat',
  orientView: 'Orientering',
  orientDefault: 'Standard',
  orientLandscape: 'Liggande',
  orientPortrait: 'Stående',
  confidence: 'Säkerhet',
  keepComparing: 'Fortsätt jämföra',
  earlyStopTitle: 'Obs – din rangordning har fortfarande luckor',
  earlyStopBody:
    'Du har ännu inte jämfört tillräckligt många förslag för att vara helt säker på ordningen. Du kan se din rangordning hittills, eller fortsätta för ett skarpare resultat.',
  seeResultsAnyway: 'Visa min rangordning hittills',
  resume: 'Fortsätt',
  complete: 'Klar',
  resultTitle: 'Din rangordning av eurosedlar',
  yourPodium: 'Din prispall',
  fullRanking: 'Fullständig rangordning',
  designer: 'av',
  viewOnEcb: 'Visa på ECB:s webbplats',
  share: 'Kopiera mitt resultat',
  copied: 'Kopierat till urklipp!',
  addToPool: 'Lägg till mitt resultat i poolen',
  pooled: 'Tack – tillagt anonymt!',
  poolFailed: 'Kunde inte nå poolen – din rangordning finns kvar lokalt.',
  startOver: 'Börja om',
  disclaimer:
    'Inofficiellt fanprojekt – inte anslutet till ECB. Lägg din riktiga röst i {survey}. Sedelbilder © Europeiska centralbanken, visas som designförslag.',
  surveyLinkText: 'ECB:s officiella enkät',
  shareHeadline: 'Mina favoritförslag till eurosedlar:',
  madeBy: 'Bilder © ECB · designförslag',
};

const EL: Strings = {
  langName: 'Ελληνικά',
  appName: 'Recto Verso Euro',
  tagline: 'Ποια μελλοντικά τραπεζογραμμάτια ευρώ προτιμάτε;',
  intro:
    'Η ΕΚΤ επέλεξε 10 σχέδια για την επόμενη σειρά τραπεζογραμματίων ευρώ. Συγκρίνετέ τα ανά δύο — εμπρός και πίσω όψη — και ανακαλύψτε τη δική σας κατάταξη. Ιδιωτικό εξ ορισμού: τίποτα από όσα κάνετε δεν καταγράφεται ούτε αποθηκεύεται πουθενά, παρά μόνο στον δικό σας φυλλομετρητή.',
  start: 'Ξεκινήστε τη σύγκριση',
  themeCulture: 'Ευρωπαϊκός πολιτισμός',
  themeRivers: 'Ποτάμια και πουλιά',
  recto: 'Εμπρός',
  verso: 'Πίσω',
  comparison: 'Σύγκριση {n}',
  which: 'Ποια σειρά προτιμάτε;',
  preferLeft: 'Προτιμώ αυτό',
  preferRight: 'Προτιμώ αυτό',
  undo: 'Αναίρεση',
  showResults: 'Δείτε τα αποτελέσματά μου',
  orientView: 'Προσανατολισμός',
  orientDefault: 'Προεπιλογή',
  orientLandscape: 'Οριζόντιος',
  orientPortrait: 'Κατακόρυφος',
  confidence: 'Βεβαιότητα',
  keepComparing: 'Συνεχίστε τη σύγκριση',
  earlyStopTitle: 'Προσοχή — η κατάταξή σας έχει ακόμα κενά',
  earlyStopBody:
    'Δεν έχετε συγκρίνει ακόμα αρκετά σχέδια ώστε να είστε απόλυτα σίγουροι για τη σειρά. Μπορείτε να δείτε την τρέχουσα κατάταξή σας ή να συνεχίσετε για ένα πιο ακριβές αποτέλεσμα.',
  seeResultsAnyway: 'Δείτε την τρέχουσα κατάταξή μου',
  resume: 'Συνέχεια',
  complete: 'Ολοκληρωμένο',
  resultTitle: 'Η κατάταξή σας για τα τραπεζογραμμάτια ευρώ',
  yourPodium: 'Το βάθρο σας',
  fullRanking: 'Πλήρης κατάταξη',
  designer: 'από',
  viewOnEcb: 'Δείτε το στον ιστότοπο της ΕΚΤ',
  share: 'Αντιγραφή του αποτελέσματός μου',
  copied: 'Αντιγράφηκε στο πρόχειρο!',
  addToPool: 'Προσθέστε το αποτέλεσμά μου στη συλλογή',
  pooled: 'Ευχαριστούμε — προστέθηκε ανώνυμα!',
  poolFailed: 'Δεν ήταν δυνατή η σύνδεση με τη συλλογή — η κατάταξή σας είναι ασφαλής τοπικά.',
  startOver: 'Ξεκινήστε από την αρχή',
  disclaimer:
    'Ανεπίσημο έργο θαυμαστών — χωρίς σχέση με την ΕΚΤ. Δώστε την πραγματική σας ψήφο στην {survey}. Εικόνες τραπεζογραμματίων © Ευρωπαϊκή Κεντρική Τράπεζα, παρουσιάζονται ως προτάσεις σχεδίασης.',
  surveyLinkText: 'επίσημη έρευνα της ΕΚΤ',
  shareHeadline: 'Τα αγαπημένα μου σχέδια τραπεζογραμματίων ευρώ:',
  madeBy: 'Εικόνες © ΕΚΤ · προτάσεις σχεδίασης',
};

const BG: Strings = {
  langName: 'Български',
  appName: 'Recto Verso Euro',
  tagline: 'Кои бъдещи евробанкноти предпочитате?',
  intro:
    'ЕЦБ подбра 10 предложения за дизайн на следващата серия евробанкноти. Сравнявайте ги две по две — лицева и обратна страна — и открийте своето лично класиране. Поверително по замисъл: нищо от действията ви не се проследява или съхранява извън собствения ви браузър.',
  start: 'Започнете сравняването',
  themeCulture: 'Европейска култура',
  themeRivers: 'Реки и птици',
  recto: 'Лицева страна',
  verso: 'Обратна страна',
  comparison: 'Сравнение {n}',
  which: 'Коя серия предпочитате?',
  preferLeft: 'Предпочитам тази',
  preferRight: 'Предпочитам тази',
  undo: 'Отмяна',
  showResults: 'Покажи резултатите ми',
  orientView: 'Ориентация',
  orientDefault: 'По подразбиране',
  orientLandscape: 'Хоризонтална',
  orientPortrait: 'Вертикална',
  confidence: 'Сигурност',
  keepComparing: 'Продължете да сравнявате',
  earlyStopTitle: 'Внимание — класирането ви все още е непълно',
  earlyStopBody:
    'Още не сте сравнили достатъчно предложения, за да сме напълно сигурни в подредбата. Можете да видите класирането си дотук или да продължите за по-точен резултат.',
  seeResultsAnyway: 'Виж класирането ми дотук',
  resume: 'Продължи',
  complete: 'Завършено',
  resultTitle: 'Вашето класиране на евробанкнотите',
  yourPodium: 'Вашият подиум',
  fullRanking: 'Пълно класиране',
  designer: 'от',
  viewOnEcb: 'Вижте на сайта на ЕЦБ',
  share: 'Копирай резултата ми',
  copied: 'Копирано в клипборда!',
  addToPool: 'Добави резултата ми към общите',
  pooled: 'Благодарим — добавено анонимно!',
  poolFailed: 'Няма връзка с общите данни — класирането ви е запазено локално.',
  startOver: 'Започни отначало',
  disclaimer:
    'Неофициален фен проект — без връзка с ЕЦБ. Подайте истинския си глас в {survey}. Изображения на банкноти © Европейска централна банка, показани като предложения за дизайн.',
  surveyLinkText: 'официалната анкета на ЕЦБ',
  shareHeadline: 'Любимите ми предложения за дизайн на евробанкноти:',
  madeBy: 'Изображения © ЕЦБ · предложения за дизайн',
};

const DICT: Record<Lang, Strings> = {
  cs: CS,
  da: DA,
  de: DE,
  et: ET,
  en: EN,
  es: ES,
  fr: FR,
  ga: GA,
  hr: HR,
  it: IT,
  lv: LV,
  lt: LT,
  hu: HU,
  mt: MT,
  nl: NL,
  pl: PL,
  pt: PT,
  ro: RO,
  sk: SK,
  sl: SL,
  fi: FI,
  sv: SV,
  el: EL,
  bg: BG,
};

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
