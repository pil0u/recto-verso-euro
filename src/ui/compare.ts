/** The comparison screen: two sets, pick the one you prefer. */

import type { Letter } from '../data/designs';
import { t } from '../i18n';
import { banknoteSet } from './banknoteSet';
import { el, on } from './dom';

export interface CompareCallbacks {
  onChoose: (winner: Letter, loser: Letter) => void;
  onUndo: () => void;
  onShowResults: () => void;
}

export interface CompareViewState {
  pair: [Letter, Letter];
  count: number;
  confidence: number; // 0..1
  canUndo: boolean;
}

export function compareView(state: CompareViewState, cb: CompareCallbacks): HTMLElement {
  const [a, b] = state.pair;
  const pct = Math.round(state.confidence * 100);

  const confBar = el('div', { class: 'confbar', title: `${pct}% ${t('confidence')}` }, [
    el('div', { class: 'confbar-fill', style: `width:${pct}%` }),
  ]);

  const undoBtn = el('button', {
    class: 'btn ghost',
    type: 'button',
    text: t('undo'),
    disabled: !state.canUndo,
  });
  const resultsBtn = el('button', { class: 'btn ghost', type: 'button', text: t('showResults') });
  on(undoBtn, 'click', cb.onUndo);
  on(resultsBtn, 'click', cb.onShowResults);

  const top = el('div', { class: 'compare-top' }, [
    el('div', { class: 'progress' }, [
      el('span', { class: 'count', text: t('comparison', { n: String(state.count + 1) }) }),
      confBar,
      el('span', { class: 'conf-pct', text: `${pct}%` }),
    ]),
    el('div', { class: 'controls' }, [undoBtn, resultsBtn]),
  ]);

  const side = (letter: Letter, label: string) => {
    const chooseBtn = el('button', { class: 'btn primary choose', type: 'button', text: label });
    const panel = el('div', { class: 'side', role: 'group' }, [
      chooseBtn,
      banknoteSet(letter, { showTheme: true, lazy: false }),
    ]);
    const choose = () => cb.onChoose(letter, letter === a ? b : a);
    on(chooseBtn, 'click', choose);
    return panel;
  };

  const arena = el('div', { class: 'arena' }, [
    side(a, t('preferLeft')),
    el('div', { class: 'versus', text: 'vs', 'aria-hidden': 'true' }),
    side(b, t('preferRight')),
  ]);

  return el('section', { class: 'screen compare' }, [
    top,
    el('h2', { class: 'which', text: t('which') }),
    arena,
  ]);
}
