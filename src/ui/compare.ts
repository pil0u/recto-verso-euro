/** The comparison screen: two sets, pick the one you prefer via big side buttons. */

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

  // Big buttons pinned to the left and right edges, always reachable while scrolling.
  const preferBtn = (dir: 'left' | 'right', winner: Letter) => {
    const btn = el('button', { class: `prefer-btn ${dir}`, type: 'button' }, [
      el('span', { class: 'prefer-arrow', 'aria-hidden': 'true', text: dir === 'left' ? '‹' : '›' }),
      el('span', { class: 'prefer-label', text: t('preferLeft') }),
    ]);
    on(btn, 'click', () => cb.onChoose(winner, winner === a ? b : a));
    return btn;
  };

  const arena = el('div', { class: 'arena' }, [
    el('div', { class: 'side' }, [banknoteSet(a, { chrome: false, lazy: false })]),
    el('div', { class: 'side' }, [banknoteSet(b, { chrome: false, lazy: false })]),
  ]);

  return el('section', { class: 'screen compare' }, [
    top,
    el('h2', { class: 'which', text: t('which') }),
    arena,
    preferBtn('left', a),
    preferBtn('right', b),
  ]);
}
