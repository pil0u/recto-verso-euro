/** The result screen: podium, full ranking, confidence, share, pool, restart. */

import { designDescription, ecbDesignUrl, getDesign, type Letter } from '../data/designs';
import { poolEnabled } from '../config';
import { getLang, surveyUrl, t } from '../i18n';
import { banknoteSet } from './banknoteSet';
import { el, on } from './dom';

export interface ResultCallbacks {
  onRestart: () => void;
  onShare: () => Promise<void> | void;
  onPool: () => Promise<void> | void;
}

export interface ResultViewState {
  ranking: Letter[];
  confidence: number; // 0..1
  complete: boolean;
  /** When true, this is a result opened from someone else's shared link. */
  shared?: boolean;
}

const MEDALS = ['🥇', '🥈', '🥉'];

export function resultView(state: ResultViewState, cb: ResultCallbacks): HTMLElement {
  const podium = el(
    'div',
    { class: 'podium' },
    state.ranking.slice(0, 3).map((letter, i) =>
      el('div', { class: `podium-slot rank-${i + 1}` }, [
        el('span', { class: 'medal', text: MEDALS[i] }),
        banknoteSet(letter, { compact: true, showTheme: true }),
      ]),
    ),
  );

  const list = el(
    'ol',
    { class: 'ranking-list' },
    state.ranking.map((letter, i) => rankingRow(letter, i + 1)),
  );

  const shareBtn = el('button', { class: 'btn primary', type: 'button', text: t('share') });
  const toast = el('span', { class: 'toast', 'aria-live': 'polite' });
  on(shareBtn, 'click', async () => {
    await cb.onShare();
    toast.textContent = t('copied');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  });

  const actions = el('div', { class: 'result-actions' }, [shareBtn]);

  if (poolEnabled()) {
    const poolBtn = el('button', { class: 'btn', type: 'button', text: t('addToPool') });
    on(poolBtn, 'click', async () => {
      poolBtn.disabled = true;
      await cb.onPool();
      poolBtn.textContent = t('pooled');
    });
    actions.append(poolBtn);
  }

  const restartBtn = el('button', { class: 'btn ghost', type: 'button', text: t('startOver') });
  on(restartBtn, 'click', cb.onRestart);
  actions.append(restartBtn, toast);

  return el('section', { class: 'screen result' }, [
    el('h1', { class: 'result-title', text: t('resultTitle') }),
    el('h2', { class: 'section-title', text: t('yourPodium') }),
    podium,
    actions,
    el('h2', { class: 'section-title', text: t('fullRanking') }),
    list,
    disclaimer(),
  ]);
}

function rankingRow(letter: Letter, rank: number): HTMLElement {
  const design = getDesign(letter);
  const themeLabel = design.theme === 'culture' ? t('themeCulture') : t('themeRivers');
  const summary = el('summary', {}, [
    el('span', { class: 'rank-num', text: String(rank) }),
    el('span', { class: 'rank-letter', text: `Design ${letter}` }),
    el('span', { class: 'rank-designer', text: `${t('designer')} ${design.designer}` }),
    el('span', { class: `theme theme-${design.theme}`, text: themeLabel }),
  ]);
  const body = el('div', { class: 'rank-body' }, [
    el('p', { class: 'rank-desc', text: designDescription(letter, getLang()) }),
    el('a', {
      class: 'ecb-link',
      href: ecbDesignUrl(letter, getLang()),
      target: '_blank',
      rel: 'noopener',
      text: t('viewOnEcb'),
    }),
  ]);
  return el('li', {}, [el('details', { class: 'rank-item' }, [summary, body])]);
}

function disclaimer(): HTMLElement {
  const survey = el('a', {
    href: surveyUrl(),
    target: '_blank',
    rel: 'noopener',
    text: t('surveyLinkText'),
  });
  const [before, after] = t('disclaimer').split('{survey}');
  return el('p', { class: 'disclaimer' }, [before, survey, after ?? '']);
}
