/** App controller: screen routing, language, deep links, resume, share/pool. */

import type { Letter } from './data/designs';
import { getLang, setLang, LANGS, t, type Lang } from './i18n';
import { Session, hasStoredSession } from './session';
import {
  buildShareText,
  copyToClipboard,
  parseDeepLink,
  submitToPool,
  type SharedResult,
} from './share';
import { clear, el, on } from './ui/dom';
import { compareView } from './ui/compare';
import { resultView } from './ui/result';

type Screen = 'intro' | 'compare' | 'result' | 'shared';

export class App {
  private root: HTMLElement;
  private session = new Session();
  private screen: Screen = 'intro';
  private currentPair: [Letter, Letter] | null = null;
  private pairHistory: [Letter, Letter][] = [];
  private sharedResult: SharedResult | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    setLang(getLang()); // sync <html lang>

    const shared = parseDeepLink(location.hash);
    if (shared) {
      this.sharedResult = shared;
      this.screen = 'shared';
    } else if (this.session.finished && this.session.count() > 0) {
      this.screen = 'result';
    }
    this.render();

    // React to a shared link pasted while the app is already open.
    window.addEventListener('hashchange', () => {
      const s = parseDeepLink(location.hash);
      if (s) {
        this.sharedResult = s;
        this.screen = 'shared';
        this.render();
      }
    });
  }

  // --- screen transitions -------------------------------------------------

  private startFresh(): void {
    this.session.reset();
    this.pairHistory = [];
    this.currentPair = null;
    this.goCompare();
  }

  private resume(): void {
    this.pairHistory = [];
    this.currentPair = null;
    this.session.finished = false;
    this.goCompare();
  }

  private goCompare(): void {
    if (!this.currentPair) this.currentPair = this.session.nextPair();
    if (!this.currentPair) {
      this.goResult();
      return;
    }
    this.screen = 'compare';
    this.render();
  }

  private goResult(): void {
    this.session.finish();
    this.screen = 'result';
    this.render();
  }

  private choose(winner: Letter, loser: Letter): void {
    if (this.currentPair) this.pairHistory.push(this.currentPair);
    this.session.record(winner, loser);
    this.currentPair = this.session.nextPair();
    if (!this.currentPair) this.goResult();
    else this.render();
  }

  private undo(): void {
    if (!this.session.canUndo()) return;
    this.session.undo();
    this.currentPair = this.pairHistory.pop() ?? this.session.nextPair();
    this.screen = 'compare';
    this.render();
  }

  private requestResults(): void {
    if (this.session.isComplete()) this.goResult();
    else this.showEarlyStopModal();
  }

  // --- sharing ------------------------------------------------------------

  private currentResult(): SharedResult {
    if (this.screen === 'shared' && this.sharedResult) return this.sharedResult;
    return {
      ranking: this.session.ranking(),
      confidence: this.session.isComplete() ? 1 : this.session.confidence(),
    };
  }

  private async share(): Promise<void> {
    await copyToClipboard(buildShareText(this.currentResult()));
  }

  private async pool(): Promise<void> {
    await submitToPool(this.currentResult());
  }

  // --- rendering ----------------------------------------------------------

  private render(): void {
    clear(this.root);
    this.root.append(this.header(), this.screenNode(), this.footer());
  }

  private screenNode(): HTMLElement {
    switch (this.screen) {
      case 'compare':
        return compareView(
          {
            pair: this.currentPair!,
            count: this.session.count(),
            confidence: this.session.confidence(),
            canUndo: this.session.canUndo(),
          },
          {
            onChoose: (w, l) => this.choose(w, l),
            onUndo: () => this.undo(),
            onShowResults: () => this.requestResults(),
          },
        );
      case 'result':
        return resultView(
          {
            ranking: this.session.ranking(),
            confidence: this.session.isComplete() ? 1 : this.session.confidence(),
            complete: this.session.isComplete(),
          },
          this.resultCallbacks(),
        );
      case 'shared':
        return resultView(
          { ...this.sharedResult!, complete: false, shared: true },
          this.resultCallbacks(),
        );
      default:
        return this.introNode();
    }
  }

  private resultCallbacks() {
    return {
      onRestart: () => {
        location.hash = '';
        this.startFresh();
      },
      onShare: () => this.share(),
      onPool: () => this.pool(),
    };
  }

  private introNode(): HTMLElement {
    const start = el('button', { class: 'btn primary big', type: 'button', text: t('start') });
    on(start, 'click', () => this.startFresh());

    const actions = el('div', { class: 'intro-actions' }, [start]);
    if (hasStoredSession() && !this.session.finished) {
      const resume = el('button', { class: 'btn', type: 'button', text: t('resume') });
      on(resume, 'click', () => this.resume());
      actions.append(resume);
    }

    return el('section', { class: 'screen intro' }, [
      el('p', { class: 'tagline', text: t('tagline') }),
      el('p', { class: 'intro-text', text: t('intro') }),
      actions,
    ]);
  }

  private header(): HTMLElement {
    const brand = el('button', { class: 'brand', type: 'button', text: t('appName') });
    on(brand, 'click', () => {
      location.hash = '';
      this.screen = this.session.finished ? 'result' : 'intro';
      this.render();
    });

    const toggle = el(
      'div',
      { class: 'lang-toggle', role: 'group', 'aria-label': 'Language' },
      LANGS.map((lang) => {
        const b = el('button', {
          class: `lang${getLang() === lang ? ' active' : ''}`,
          type: 'button',
          text: lang.toUpperCase(),
        });
        on(b, 'click', () => this.switchLang(lang));
        return b;
      }),
    );

    return el('header', { class: 'app-header' }, [brand, toggle]);
  }

  private footer(): HTMLElement {
    return el('footer', { class: 'app-footer' }, [el('span', { text: t('madeBy') })]);
  }

  private switchLang(lang: Lang): void {
    if (lang === getLang()) return;
    setLang(lang);
    this.render();
  }

  private showEarlyStopModal(): void {
    const seeAnyway = el('button', {
      class: 'btn primary',
      type: 'button',
      text: t('seeResultsAnyway'),
    });
    const keepGoing = el('button', { class: 'btn ghost', type: 'button', text: t('keepComparing') });
    const overlay = el('div', { class: 'modal-overlay' }, [
      el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true' }, [
        el('h2', { text: t('earlyStopTitle') }),
        el('p', { text: t('earlyStopBody') }),
        el('div', { class: 'modal-actions' }, [keepGoing, seeAnyway]),
      ]),
    ]);
    const close = () => overlay.remove();
    on(keepGoing, 'click', close);
    on(seeAnyway, 'click', () => {
      close();
      this.goResult();
    });
    on(overlay, 'click', (e) => {
      if (e.target === overlay) close();
    });
    this.root.append(overlay);
  }
}
