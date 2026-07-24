/** The result screen: podium, full ranking, confidence, share, pool, restart. */

import { ecbDesignUrl, getDesign, type Letter } from '../data/designs';
import { poolEnabled } from '../config';
import { getLang, t, ECB_SURVEY_URL } from '../i18n';
import { stars } from '../share';
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
  const pct = Math.round(state.confidence * 100);

  const confidenceEl = el('div', { class: 'confidence-badge' }, [
    el('span', { class: 'stars', text: stars(state.confidence) }),
    el('span', {
      class: 'conf-label',
      text: state.complete ? `${t('complete')} · 100%` : `${t('confidence')}: ${pct}%`,
    }),
  ]);

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
    confidenceEl,
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
    el('p', { class: 'rank-desc', text: design.description[getLang()] }),
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
    href: ECB_SURVEY_URL,
    target: '_blank',
    rel: 'noopener',
    text: getLang() === 'fr' ? 'enquête officielle de la BCE' : 'official ECB survey',
  });
  const text = t('disclaimer');
  const [before, after] = text.split('{survey}');
  return el('p', { class: 'disclaimer' }, [before, survey, after ?? '']);
}
