import { describe, it, expect } from 'vitest';
import { RatingModel, type Comparison } from './rating';

const ITEMS = ['A', 'B', 'C', 'D', 'E'] as const;
type Item = (typeof ITEMS)[number];

/** A seedable RNG (mulberry32) for deterministic tie-breaking in tests. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** All comparisons consistent with a strict order A > B > C > D > E. */
function transitiveComparisons(): Comparison<Item>[] {
  const cmps: Comparison<Item>[] = [];
  for (let i = 0; i < ITEMS.length; i++) {
    for (let j = i + 1; j < ITEMS.length; j++) {
      cmps.push({ winner: ITEMS[i], loser: ITEMS[j] });
    }
  }
  return cmps;
}

describe('RatingModel', () => {
  it('recovers a total order from fully consistent comparisons', () => {
    const model = new RatingModel(ITEMS, transitiveComparisons());
    expect(model.ranking()).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('has ~zero confidence with no data and high confidence once resolved', () => {
    const empty = new RatingModel(ITEMS, []);
    expect(empty.confidence()).toBeLessThan(0.02);

    const resolved = new RatingModel(ITEMS, transitiveComparisons());
    expect(resolved.confidence()).toBeGreaterThan(empty.confidence());
    expect(resolved.confidence()).toBeLessThanOrEqual(1);
  });

  it('confidence increases as consistent comparisons accumulate', () => {
    const few = new RatingModel(ITEMS, transitiveComparisons().slice(0, 3));
    const many = new RatingModel(ITEMS, transitiveComparisons());
    expect(many.confidence()).toBeGreaterThan(few.confidence());
  });

  it('probability is symmetric and ordered', () => {
    const model = new RatingModel(ITEMS, transitiveComparisons());
    expect(model.probability('A', 'E')).toBeGreaterThan(0.5);
    expect(model.probability('E', 'A')).toBeLessThan(0.5);
    expect(model.probability('A', 'E') + model.probability('E', 'A')).toBeCloseTo(1, 5);
  });

  it('nextPair returns an unasked, valid pair', () => {
    const asked: Comparison<Item>[] = [{ winner: 'A', loser: 'B' }];
    const model = new RatingModel(ITEMS, asked);
    const pair = model.nextPair(seeded(1));
    expect(pair).not.toBeNull();
    const [x, y] = pair!;
    expect(x).not.toEqual(y);
    // Must not re-ask the A/B pair.
    expect(new Set([x, y])).not.toEqual(new Set(['A', 'B']));
  });

  it('is complete when every pair has been asked', () => {
    const model = new RatingModel(ITEMS, transitiveComparisons());
    expect(model.nextPair(seeded(1))).toBeNull();
    expect(model.isComplete()).toBe(true);
  });

  it('is deterministic given a fixed RNG seed', () => {
    const asked: Comparison<Item>[] = [{ winner: 'A', loser: 'B' }];
    const a = new RatingModel(ITEMS, asked).nextPair(seeded(42));
    const b = new RatingModel(ITEMS, asked).nextPair(seeded(42));
    expect(a).toEqual(b);
  });

  it('early on, with no signal, offers a spread of different first pairs across seeds', () => {
    const seen = new Set<string>();
    for (let seed = 0; seed < 20; seed++) {
      const pair = new RatingModel(ITEMS, []).nextPair(seeded(seed))!;
      seen.add([...pair].sort().join('|'));
    }
    // Freshness: not everyone gets the same opening pair.
    expect(seen.size).toBeGreaterThan(1);
  });
});
