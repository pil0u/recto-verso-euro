import type { Lang } from '../../i18n';
import { descriptions as cs } from './cs';
import { descriptions as da } from './da';
import { descriptions as de } from './de';
import { descriptions as et } from './et';
import { descriptions as en } from './en';
import { descriptions as es } from './es';
import { descriptions as fr } from './fr';
import { descriptions as ga } from './ga';
import { descriptions as hr } from './hr';
import { descriptions as it } from './it';
import { descriptions as lv } from './lv';
import { descriptions as lt } from './lt';
import { descriptions as hu } from './hu';
import { descriptions as mt } from './mt';
import { descriptions as nl } from './nl';
import { descriptions as pl } from './pl';
import { descriptions as pt } from './pt';
import { descriptions as ro } from './ro';
import { descriptions as sk } from './sk';
import { descriptions as sl } from './sl';
import { descriptions as fi } from './fi';
import { descriptions as sv } from './sv';
import { descriptions as el } from './el';
import { descriptions as bg } from './bg';

const byLang: Record<Lang, Record<string, string>> = {
  cs,
  da,
  de,
  et,
  en,
  es,
  fr,
  ga,
  hr,
  it,
  lv,
  lt,
  hu,
  mt,
  nl,
  pl,
  pt,
  ro,
  sk,
  sl,
  fi,
  sv,
  el,
  bg,
};

const LETTERS = Object.keys(byLang.en);
const CODES = Object.keys(byLang) as Lang[];

/** Official ECB descriptions, keyed by design letter then language. */
export const DESCRIPTIONS: Record<string, Record<Lang, string>> = Object.fromEntries(
  LETTERS.map((letter) => [
    letter,
    Object.fromEntries(CODES.map((lang) => [lang, byLang[lang][letter]])) as Record<Lang, string>,
  ]),
);
