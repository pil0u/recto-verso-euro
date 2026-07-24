import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Session, hasStoredSession } from './session';
import { type Letter } from './data/designs';

/** In-memory localStorage so persistence is actually exercised under the node env. */
function memStorage(): Storage {
  const m = new Map<string, string>();
  return {
    get length() {
      return m.size;
    },
    getItem: (k) => (m.has(k) ? m.get(k)! : null),
    setItem: (k, v) => void m.set(k, String(v)),
    removeItem: (k) => void m.delete(k),
    clear: () => m.clear(),
    key: (i) => [...m.keys()][i] ?? null,
  };
}

beforeEach(() => {
  vi.stubGlobal('localStorage', memStorage());
});

describe('confidence peak', () => {
  it('never drops within a run', () => {
    const s = new Session(false);
    const pairs: [Letter, Letter][] = [
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'C'],
      ['A', 'D'],
      ['B', 'D'],
    ];
    let prev = 0;
    for (const [w, l] of pairs) {
      s.record(w, l);
      const c = s.confidence();
      expect(c).toBeGreaterThanOrEqual(prev);
      expect(c).toBeLessThanOrEqual(1);
      prev = c;
    }
  });

  it('resets to 0 when undone back to empty', () => {
    const s = new Session(false);
    s.record('A', 'B');
    s.record('A', 'C');
    expect(s.confidence()).toBeGreaterThan(0);
    s.undo();
    s.undo();
    expect(s.count()).toBe(0);
    expect(s.confidence()).toBe(0);
  });
});

describe('persistence', () => {
  it('round-trips answers through localStorage', () => {
    const s1 = new Session(false);
    s1.record('A', 'B');
    s1.record('C', 'D');
    expect(hasStoredSession()).toBe(true);

    const s2 = new Session(true);
    expect(s2.count()).toBe(2);
    expect(s2.ranking()).toHaveLength(10);
  });

  it('starts clean when storage is corrupt', () => {
    localStorage.setItem('rve.session', '{ this is not json');
    const s = new Session(true);
    expect(s.count()).toBe(0);
    expect(hasStoredSession()).toBe(false);
  });

  it('drops answers referencing unknown designs', () => {
    localStorage.setItem(
      'rve.session',
      JSON.stringify({
        comparisons: [
          { winner: 'A', loser: 'B' },
          { winner: 'Z', loser: 'B' }, // Z is not a real design
        ],
        peak: 0.3,
        finished: false,
        orient: 'default',
      }),
    );
    const s = new Session(true);
    expect(s.count()).toBe(1);
  });
});
