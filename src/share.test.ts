import { describe, it, expect, beforeAll, vi } from 'vitest';
import { buildDeepLink, parseDeepLink, stars } from './share';
import { LETTERS, type Letter } from './data/designs';

beforeAll(() => {
  // buildDeepLink reads location.origin/pathname; parseDeepLink is pure.
  vi.stubGlobal('location', { origin: 'https://example.com', pathname: '/recto-verso-euro/' });
});

const FULL = [...LETTERS] as Letter[]; // A..J in canonical order

describe('deep link round-trip', () => {
  it('recovers the exact ranking and confidence for any permutation', () => {
    const rankings: Letter[][] = [
      FULL,
      [...FULL].reverse(),
      ['H', 'D', 'B', 'J', 'I', 'G', 'E', 'C', 'F', 'A'],
    ];
    for (const ranking of rankings) {
      const link = buildDeepLink({ ranking, confidence: 0.68 });
      const parsed = parseDeepLink(new URL(link).hash);
      expect(parsed?.ranking).toEqual(ranking);
      // confidence survives as whole-percent precision (0.68 -> 68 -> 0.68)
      expect(parsed?.confidence).toBeCloseTo(0.68, 5);
    }
  });

  it('accepts lower-case letters in the hash', () => {
    const parsed = parseDeepLink('#r=abcdefghij&c=50');
    expect(parsed?.ranking).toEqual(FULL);
    expect(parsed?.confidence).toBe(0.5);
  });
});

describe('parseDeepLink rejects malformed hashes', () => {
  it.each([
    ['no r param', '#c=50'],
    ['too short', '#r=ABC'],
    ['too long', '#r=ABCDEFGHIJK'],
    ['duplicate letter (dup A, no J)', '#r=AABCDEFGHI'],
    ['unknown letter', '#r=ABCDEFGHIZ'],
    ['empty', ''],
  ])('returns null for %s', (_label, hash) => {
    expect(parseDeepLink(hash)).toBeNull();
  });
});

describe('confidence clamping', () => {
  it('clamps out-of-range and non-numeric c to [0,1]', () => {
    expect(parseDeepLink('#r=ABCDEFGHIJ&c=999')?.confidence).toBe(1);
    expect(parseDeepLink('#r=ABCDEFGHIJ&c=-5')?.confidence).toBe(0);
    expect(parseDeepLink('#r=ABCDEFGHIJ&c=nope')?.confidence).toBe(0);
    expect(parseDeepLink('#r=ABCDEFGHIJ')?.confidence).toBe(0); // missing c
  });
});

describe('stars', () => {
  it('maps confidence to a 5-slot bar', () => {
    expect(stars(0)).toBe('☆☆☆☆☆');
    expect(stars(1)).toBe('★★★★★');
    expect(stars(0.6)).toBe('★★★☆☆'); // round(3.0)
  });
});
