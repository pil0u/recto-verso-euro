/**
 * A comparison session: the list of answers so far, plus a freshly-fitted
 * rating model derived from them. Persists to localStorage so an interrupted
 * session can be resumed and a finished result re-viewed.
 */

import { LETTERS, type Letter } from './data/designs';
import { RatingModel, type Comparison } from './engine/rating';

const STORAGE_KEY = 'rve.session';

export interface PersistedSession {
  comparisons: Comparison<Letter>[];
  flipped: boolean;
  finished: boolean;
}

export class Session {
  private comparisons: Comparison<Letter>[] = [];
  flipped = false;
  finished = false;
  private modelCache: RatingModel<Letter> | null = null;

  constructor(restore = true) {
    if (restore) this.load();
  }

  /** Rating model over the current answers (rebuilt only when answers change). */
  model(): RatingModel<Letter> {
    if (!this.modelCache) {
      this.modelCache = new RatingModel<Letter>(LETTERS, this.comparisons);
    }
    return this.modelCache;
  }

  count(): number {
    return this.comparisons.length;
  }

  canUndo(): boolean {
    return this.comparisons.length > 0;
  }

  /** The next pair to show, or null when the ranking is fully resolved. */
  nextPair(): [Letter, Letter] | null {
    return this.model().nextPair();
  }

  record(winner: Letter, loser: Letter): void {
    this.comparisons.push({ winner, loser });
    this.invalidate();
    this.save();
  }

  undo(): void {
    this.comparisons.pop();
    this.finished = false;
    this.invalidate();
    this.save();
  }

  ranking(): Letter[] {
    return this.model().ranking();
  }

  confidence(): number {
    return this.model().confidence();
  }

  isComplete(): boolean {
    return this.model().isComplete();
  }

  finish(): void {
    this.finished = true;
    this.save();
  }

  reset(): void {
    this.comparisons = [];
    this.flipped = false;
    this.finished = false;
    this.invalidate();
    clearStored();
  }

  setFlipped(flipped: boolean): void {
    this.flipped = flipped;
    this.save();
  }

  private invalidate(): void {
    this.modelCache = null;
  }

  private save(): void {
    const data: PersistedSession = {
      comparisons: this.comparisons,
      flipped: this.flipped,
      finished: this.finished,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage disabled — session just won't persist */
    }
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as PersistedSession;
      if (Array.isArray(data.comparisons)) {
        this.comparisons = data.comparisons.filter(
          (c) => LETTERS.includes(c.winner) && LETTERS.includes(c.loser),
        );
      }
      this.flipped = Boolean(data.flipped);
      this.finished = Boolean(data.finished);
    } catch {
      /* corrupt storage — start fresh */
    }
  }
}

export function hasStoredSession(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw) as PersistedSession;
    return Array.isArray(data.comparisons) && data.comparisons.length > 0;
  } catch {
    return false;
  }
}

function clearStored(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* no-op */
  }
}
