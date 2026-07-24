/** Renders one design set as a stack of denominations (front + back each). */

import {
  DENOMINATIONS,
  getDesign,
  imageUrl,
  isPortrait,
  type Denomination,
  type Letter,
} from '../data/designs';
import { t } from '../i18n';
import { el } from './dom';

function note(letter: Letter, denom: Denomination, lazy: boolean): HTMLElement {
  const face = (side: 'front' | 'back') =>
    el('figure', { class: `note-face${isPortrait(letter, denom, side) ? ' portrait' : ''}` }, [
      el('img', {
        src: imageUrl(letter, denom, side),
        alt: `Design ${letter} €${denom} ${side === 'front' ? t('recto') : t('verso')}`,
        loading: lazy ? 'lazy' : 'eager',
        decoding: 'async',
      }),
      el('figcaption', { text: side === 'front' ? t('recto') : t('verso') }),
    ]);

  return el('div', { class: 'note' }, [
    el('span', { class: 'denom', text: `€${denom}` }),
    el('div', { class: 'faces' }, [face('front'), face('back')]),
  ]);
}

/**
 * A full set panel. `compact` (used on the result page) shows only the €50
 * front as a representative hero; otherwise all six denominations are shown.
 */
export function banknoteSet(
  letter: Letter,
  opts: { compact?: boolean; lazy?: boolean; showTheme?: boolean } = {},
): HTMLElement {
  const design = getDesign(letter);
  const themeLabel = design.theme === 'culture' ? t('themeCulture') : t('themeRivers');

  const header = el('div', { class: 'set-header' }, [
    el('span', { class: 'set-letter', text: `Design ${letter}` }),
    opts.showTheme ? el('span', { class: `theme theme-${design.theme}`, text: themeLabel }) : '',
  ]);

  if (opts.compact) {
    return el('div', { class: 'set compact' }, [
      header,
      el('div', { class: 'note hero' }, [
        el('figure', { class: 'note-face' }, [
          el('img', {
            src: imageUrl(letter, 50, 'front'),
            alt: `Design ${letter} €50 ${t('recto')}`,
            loading: 'lazy',
            decoding: 'async',
          }),
        ]),
      ]),
    ]);
  }

  const notes = DENOMINATIONS.map((d) => note(letter, d, opts.lazy ?? true));
  return el('div', { class: 'set' }, [header, el('div', { class: 'notes' }, notes)]);
}
