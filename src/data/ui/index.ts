import type { Lang, Strings } from '../../i18n';
import { CS } from './cs';
import { DA } from './da';
import { DE } from './de';
import { ET } from './et';
import { EN } from './en';
import { ES } from './es';
import { FR } from './fr';
import { GA } from './ga';
import { HR } from './hr';
import { IT } from './it';
import { LV } from './lv';
import { LT } from './lt';
import { HU } from './hu';
import { MT } from './mt';
import { NL } from './nl';
import { PL } from './pl';
import { PT } from './pt';
import { RO } from './ro';
import { SK } from './sk';
import { SL } from './sl';
import { FI } from './fi';
import { SV } from './sv';
import { EL } from './el';
import { BG } from './bg';

/** Every UI string, keyed by language. Typed so a missing language fails the build. */
export const DICT: Record<Lang, Strings> = {
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
