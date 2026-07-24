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

interface SetOptions {
  /** Result-page hero: only the €50 front. */
  compact?: boolean;
  lazy?: boolean;
  showTheme?: boolean;
  /**
   * When false, strip all text (design header, denomination labels, front/back
   * captions) — a clean, unbiased side-by-side of just the artwork. Used in the
   * comparison view so nothing nudges the choice.
   */
  chrome?: boolean;
}

function face(letter: Letter, denom: Denomination, side: 'front' | 'back', opts: SetOptions) {
  return el('figure', { class: `note-face${isPortrait(letter, denom, side) ? ' portrait' : ''}` }, [
    el('img', {
      src: imageUrl(letter, denom, side),
      alt: `Design ${letter} €${denom} ${side === 'front' ? t('recto') : t('verso')}`,
      loading: opts.lazy ? 'lazy' : 'eager',
      decoding: 'async',
    }),
    opts.chrome === false
      ? ''
      : el('figcaption', { text: side === 'front' ? t('recto') : t('verso') }),
  ]);
}

function note(letter: Letter, denom: Denomination, opts: SetOptions): HTMLElement {
  const faces = el('div', { class: 'faces' }, [
    face(letter, denom, 'front', opts),
    face(letter, denom, 'back', opts),
  ]);
  return el('div', { class: 'note' }, [
    opts.chrome === false ? '' : el('span', { class: 'denom', text: `€${denom}` }),
    faces,
  ]);
}

export function banknoteSet(letter: Letter, opts: SetOptions = {}): HTMLElement {
  const design = getDesign(letter);
  const themeLabel = design.theme === 'culture' ? t('themeCulture') : t('themeRivers');

  const header =
    opts.chrome === false
      ? ''
      : el('div', { class: 'set-header' }, [
          el('span', { class: 'set-letter', text: `Design ${letter}` }),
          opts.showTheme
            ? el('span', { class: `theme theme-${design.theme}`, text: themeLabel })
            : '',
        ]);

  if (opts.compact) {
    // Uniform landscape hero on the podium; portrait designs are rotated so all
    // three winners are shown at the same size and orientation.
    const portrait = isPortrait(letter, 50, 'front');
    return el('div', { class: 'set compact' }, [
      header,
      el('div', { class: 'note hero' }, [
        el('figure', { class: `note-face${portrait ? ' portrait' : ''}` }, [
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

  const notes = DENOMINATIONS.map((d) => note(letter, d, { ...opts, lazy: opts.lazy ?? true }));
  return el('div', { class: `set${opts.chrome === false ? ' bare' : ''}` }, [
    header,
    el('div', { class: 'notes' }, notes),
  ]);
}
