/**
 * The ten shortlisted future euro banknote design proposals (A–J).
 *
 * Images are NOT bundled: per the ECB Terms of Use they may not be copied,
 * redistributed or altered, so we hotlink the originals straight from the
 * ECB website (unmodified) and credit the ECB as the source.
 * See: https://www.ecb.europa.eu/services/data-protection/privacy-statements/html/ecb.terms_use_design_proposals.en.html
 */

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
  /** Official ECB description, per language. */
  description: { en: string; fr: string };
}

/** Base directory for the individual per-note images on the ECB site. */
const IMG_BASE =
  'https://www.ecb.europa.eu/euro/banknotes/future_banknotes/shared/img';

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

/** Official ECB page for a given design's language (anchored to the design). */
export function ecbDesignUrl(letter: Letter, lang: 'en' | 'fr'): string {
  return `https://www.ecb.europa.eu/euro/banknotes/future_banknotes/html/design-proposals.${lang}.html#proposal${letter}`;
}

export const DESIGNS: readonly Design[] = [
  {
    letter: 'A',
    designer: 'Studio Joost Grootens',
    theme: 'culture',
    description: {
      en: 'The design can be explained as a reflection on how culture is formed. The eyes represent observing, sensing and reflecting, while the mouth symbolises expression, dialogue and exchange. By focusing on these elements, the portraits move beyond individual identity towards a shared human capacity for cultural production. On the reverse, contemporary cultural spaces show people of different backgrounds and ages meeting and interacting.',
      fr: 'Le graphisme peut être expliqué comme une réflexion sur l’avènement de la culture. Les yeux représentent l’observation, le ressenti et la réflexion, tandis que la bouche symbolise l’expression, le dialogue et l’échange. En mettant l’accent sur ces éléments, les portraits transcendent l’identité individuelle et louent la capacité des êtres humains à créer ensemble de la culture. Au verso, des espaces culturels contemporains montrent des personnes d’horizons et d’âges différents qui se rencontrent et interagissent.',
    },
  },
  {
    letter: 'B',
    designer: 'PunktFormStrich',
    theme: 'rivers',
    description: {
      en: 'The "Rivers and birds" banknote series communicates its concept through a direct connection between visual elements and their meaning. Each banknote presents a specific bird species in relation to its habitat, linking biodiversity with European landscapes. Horizontal bar structures translate the individual sound of each bird into a visual form, while a vertical scale indicates its flight speed. On the reverse, EU buildings and the map of Europe establish a connection between natural environments and shared cultural identity.',
      fr: 'La série de billets « Fleuves et oiseaux » transmet son message en reliant directement des éléments visuels et leur signification. Chaque coupure présente une espèce spécifique d’oiseaux dans son habitat, faisant ainsi le lien entre biodiversité et paysages européens. Les structures à barres horizontales traduisent visuellement le son individuel de chaque oiseau, tandis qu’une échelle verticale indique la vitesse de son vol. Au verso, les bâtiments de l’UE et la carte de l’Europe établissent un lien entre les environnements naturels et l’identité culturelle partagée.',
    },
  },
  {
    letter: 'C',
    designer: 'Neue Gestaltung GmbH',
    theme: 'culture',
    description: {
      en: 'The design tells a simple story: Europe is a shared cultural space. Each banknote is instantly identifiable by its dominant colour and its own central motif; each portrays a personality whose life and work connects Europeans across centuries. The reverse pairs a map of Europe, lightly overlaid with the constellations that have long guided travellers, with a present-day scene of the cultural space the note represents. People are rendered without specific features so that citizens can recognise themselves in them.',
      fr: 'Le graphisme raconte une histoire simple : l’Europe est un espace culturel partagé. Chaque coupure est instantanément identifiable par sa couleur dominante et son motif central spécifique ; chacune d’entre elles présente le portrait d’une personnalité dont la vie et l’œuvre relient les Européens à travers les siècles. Le verso associe une carte de l’Europe — avec, légèrement superposées, les constellations qui ont longtemps guidé les voyageurs — à une scène contemporaine de l’espace culturel que représente le billet. Les personnes sont représentées sans aucun trait spécifique de sorte que tous les Européens puissent se reconnaître en elles.',
    },
  },
  {
    letter: 'D',
    designer: 'Rudy Guedj and François Girard-Meunier',
    theme: 'rivers',
    description: {
      en: 'Six birds appear within abstracted landscapes, connected by the continuous journey of a river, from a mountain source to a stormy sea. Light accompanies this progression, evolving from a soft presence into a dynamic, incisive force. The scenes invite close inspection, placing the viewer in the position of a birdwatcher. On the reverse, EU institutions are expressed through human gestures and a morphing fabric-like mesh: hands hold, stabilise, align and debate, suggesting cooperation in action.',
      fr: 'Six oiseaux apparaissent dans des paysages abstraits, reliés par le parcours continu d’un fleuve, d’une source montagneuse à une mer démontée. La lumière accompagne cette progression, passant d’une présence douce à une force dynamique et incisive. Les scènes invitent à une inspection attentive, mettant l’observateur à la place d’un ornithologue. Au verso, les institutions de l’UE sont reflétées à travers des gestes humains et un maillage ressemblant à du tissu en transformation : les mains tiennent, stabilisent, s’alignent et débattent, ce qui suggère une coopération dans l’action.',
    },
  },
  {
    letter: 'E',
    designer: 'Myrsini Vardopoulou',
    theme: 'culture',
    description: {
      en: 'The communicative approach focuses on the universal value of each person\'s work rather than their personality. The circle and the symbols function as a visual message denoting an intellectual space that offers the viewer immediate visual familiarity. Symbolic details provide subtle references for a deeper conceptual reading. The design communicates that, despite the diversity of the individuals, their contribution constitutes a unified source of inspiration.',
      fr: 'L’approche communicationnelle met l’accent sur la valeur universelle du travail de chacun, plutôt que sur leur personnalité. Le cercle et les symboles agissent comme un message visuel dépeignant un espace intellectuel au visuel immédiatement familier. Des détails symboliques fournissent des références subtiles pour une lecture conceptuelle plus approfondie. Le graphisme signale que, malgré la diversité des individus, leur contribution constitue une source unifiée d’inspiration.',
    },
  },
  {
    letter: 'F',
    designer: 'Jan Robert Dünnweller',
    theme: 'culture',
    description: {
      en: 'The design aims to illustrate the official motto of the EU – "United in diversity". Europe is united by a rich shared cultural history and heritage, represented by the portraits of iconic European figures. This diversity is visualised in a collage through a multitude of forms and textures that together create a new whole. The collage forms the background for hand-drawn portraits and depictions of shared cultural spaces.',
      fr: 'Le graphisme vise à illustrer la devise officielle de l’UE : « Unie dans la diversité ». L’Europe est unie par la richesse de son histoire et de son patrimoine culturels partagés, représentés par les portraits de personnalités européennes emblématiques. Cette diversité est visualisée par un collage d’une multitude de formes et de textures qui, regroupées, créent un nouvel ensemble. Le collage forme l’arrière-plan de portraits dessinés à la main et de représentations d’espaces culturels communs.',
    },
  },
  {
    letter: 'G',
    designer: 'Rubio & del Amo and Cruz más Cruz',
    theme: 'culture',
    description: {
      en: 'An engaging gaze meets the viewer from the centre of the banknote. It encapsulates a dialogue between those who have forged our cultural identity and those of us making Europe a place at the forefront of thought. A dominant, consistent colour meets a linear pattern that provides a shared texture. If we turn the banknotes horizontally, we see four vertical blocks, each inspired by a letter: "E", "U", "R" and "O".',
      fr: 'Un regard engageant croise le vôtre depuis le centre du billet. Il englobe un dialogue entre ceux qui ont forgé notre identité culturelle et ceux d’entre nous qui font de l’Europe une place à l’avant-garde de la pensée. Une couleur dominante et homogène s’insère dans un profil linéaire qui crée une texture partagée. En tenant les billets à l’horizontale, on observe quatre blocs verticaux, chacun inspiré par une lettre : « E », « U », « R » et « O ».',
    },
  },
  {
    letter: 'H',
    designer: 'Atelier Goppel-Toperngpong',
    theme: 'rivers',
    description: {
      en: 'Water flows. It is the very foundation for life, shaping our environment and the habitats for the rich European birdlife depicted on the banknotes. Water can take on many characteristics, such as balance or consistency; using these as analogies for the EU institutions creates trust and understanding. A drop might seem negligible, but over centuries a stream is powerful enough to sculpt mountain ranges — a fitting analogy for millions united by a common goal.',
      fr: 'L’eau s’écoule. C’est le fondement même de la vie, qui façonne notre environnement et les habitats de la riche avifaune européenne représentée sur les billets. L’eau peut être associée à de nombreuses caractéristiques, comme l’équilibre ou la cohérence ; utiliser ces qualités comme analogies pour les institutions de l’UE permet de créer la confiance. Une goutte peut paraître négligeable mais, au cours des siècles, un courant est suffisamment puissant pour sculpter des massifs montagneux — une analogie appropriée pour des millions de personnes unies par un objectif commun.',
    },
  },
  {
    letter: 'I',
    designer: 'Isabelle Daëron',
    theme: 'rivers',
    description: {
      en: 'From the beat of a bird\'s wing to the flow of rivers, movement is at the heart of this proposal. It seeks to embody both the dynamism of the EU and the tangible and intangible flows that pass through its territory. As a true messenger, the bird – appearing alone on the front and as a group on the back – symbolises the dialogue and interdependence between our societies and nature, through the interweaving of two patterns: one hand-drawn in felt-tip pen and the other vector-based.',
      fr: 'Du battement d’aile d’un oiseau au courant des rivières, le mouvement est au cœur de cette proposition qui entend incarner à la fois le dynamisme de l’UE et les flux matériels et immatériels qui traversent son territoire. Véritable messager, l’oiseau, qui apparaît seul au recto et en groupe au verso, symbolise le dialogue et l’interdépendance entre nos sociétés et la nature, à travers l’imbrication de deux schémas : l’un dessiné à la main au stylo-feutre et l’autre vectoriel.',
    },
  },
  {
    letter: 'J',
    designer: 'Ville Tietäväinen',
    theme: 'rivers',
    description: {
      en: 'This euro banknote series tells a visual story of European rivers, from their origins in mountain springs to merging with the sea. The main characters are the European birds in their natural habitats. The higher the denomination, the closer the imagery gets to the sea. The security foils each show one phase of a river with the associated bird. Even the EU buildings on the reverse merge with the wings of the birds on the front.',
      fr: 'Cette série de billets en euros raconte une histoire visuelle de fleuves européens, depuis leur source dans les montagnes jusqu’à leur rencontre avec la mer. Les principaux « acteurs » sont les oiseaux européens dans leurs habitats naturels. Plus la valeur faciale est élevée, plus l’image se rapproche de la mer. Les films de sécurité montrent chacun une phase d’un fleuve avec l’oiseau associé. Même les bâtiments de l’UE situés au verso fusionnent avec les ailes des oiseaux au recto.',
    },
  },
];

export function getDesign(letter: Letter): Design {
  const d = DESIGNS.find((x) => x.letter === letter);
  if (!d) throw new Error(`Unknown design: ${letter}`);
  return d;
}

export const LETTERS: readonly Letter[] = DESIGNS.map((d) => d.letter);
