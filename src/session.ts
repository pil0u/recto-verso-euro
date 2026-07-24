/**
 * A comparison session: the list of answers so far, plus a freshly-fitted
 * rating model derived from them. Persists to localStorage so an interrupted
 * session can be resumed and a finished result re-viewed.
 */

import { LETTERS, type Letter } from './data/designs';
import { RatingModel, type Comparison } from './engine/rating';

const STORAGE_KEY = 'rve.session';

export type OrientMode = 'default' | 'landscape' | 'portrait';

export interface PersistedSession {
  comparisons: Comparison<Letter>[];
  peak: number;
  finished: boolean;
  orient: OrientMode;
}

export class Session {
  private comparisons: Comparison<Letter>[] = [];
  finished = false;
  /** How to display the notes: native, all-landscape, or all-portrait. */
  orient: OrientMode = 'default';
  /** Highest confidence reached this run, so the displayed value never drops. */
  private peak = 0;
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
    this.peak = Math.max(this.peak, this.model().confidence());
    this.save();
  }

  undo(): void {
    this.comparisons.pop();
    this.finished = false;
    this.invalidate();
    // Removing an answer legitimately lowers certainty; re-baseline the peak.
    this.peak = this.comparisons.length > 0 ? this.model().confidence() : 0;
    this.save();
  }

  ranking(): Letter[] {
    return this.model().ranking();
  }

  /** Monotonic within a run: the highest confidence reached so far. */
  confidence(): number {
    return this.peak;
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
    this.peak = 0;
    this.finished = false;
    this.invalidate();
    clearStored();
  }

  setOrient(orient: OrientMode): void {
    this.orient = orient;
    this.save();
  }

  private invalidate(): void {
    this.modelCache = null;
  }

  private save(): void {
    const data: PersistedSession = {
      comparisons: this.comparisons,
      peak: this.peak,
      finished: this.finished,
      orient: this.orient,
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
      this.finished = Boolean(data.finished);
      this.orient =
        data.orient === 'landscape' || data.orient === 'portrait' ? data.orient : 'default';
      this.invalidate();
      this.peak =
        typeof data.peak === 'number'
          ? data.peak
          : this.comparisons.length > 0
            ? this.model().confidence()
            : 0;
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
