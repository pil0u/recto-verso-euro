/**
 * Probabilistic active-comparison engine.
 *
 * Model: Bradley–Terry. Each item i has a latent strength θ_i and
 *   P(i beats j) = σ(θ_i − θ_j),  σ(x) = 1 / (1 + e^−x).
 *
 * Fitting: MAP estimation with a zero-mean Gaussian prior on θ (which both
 * regularises and pins the otherwise shift-invariant strengths). Uncertainty
 * comes from a Laplace approximation — the posterior covariance is the inverse
 * of the negative-log-posterior Hessian at the MAP.
 *
 * From that we derive:
 *   - ranking():    items sorted by strength (most-probable order),
 *   - confidence(): how sure we are of the overall order, 0 → 1,
 *   - nextPair():   the unasked pair with the most uncertain outcome
 *                   (maximum expected information), or null when nothing
 *                   informative is left to ask.
 *
 * The engine is generic over item ids (strings) so it can be unit-tested in
 * isolation from the banknote data.
 */

export interface Comparison<T extends string = string> {
  winner: T;
  loser: T;
}

/** Injectable RNG so production is fresh-per-user but tests are deterministic. */
export type Rng = () => number;

export interface RatingModelOptions {
  /** Variance of the Gaussian prior on strengths. Larger = weaker regularisation. */
  priorVariance?: number;
  /** Gradient-ascent iterations for the MAP fit. */
  iterations?: number;
  /** Gradient-ascent learning rate. */
  learningRate?: number;
}

const DEFAULTS = {
  // Tuned by simulation (see git history): recovers a consistent user's true
  // order in ~25 comparisons with ~50% confidence by the 8th click.
  priorVariance: 24,
  iterations: 400,
  learningRate: 0.15,
};

/**
 * A fitted model over a fixed set of items and the comparisons seen so far.
 * Cheap to construct (n = 10), so callers rebuild it after every answer.
 */
export class RatingModel<T extends string = string> {
  readonly items: readonly T[];
  readonly comparisons: readonly Comparison<T>[];
  /** MAP strength per item, aligned to `items`. */
  readonly strength: number[];
  private readonly index: Map<T, number>;
  private readonly opts: Required<RatingModelOptions>;

  constructor(
    items: readonly T[],
    comparisons: readonly Comparison<T>[],
    options: RatingModelOptions = {},
  ) {
    this.items = items;
    this.comparisons = comparisons;
    this.opts = { ...DEFAULTS, ...options };
    this.index = new Map(items.map((it, i) => [it, i]));
    this.strength = this.fit();
  }

  private idx(item: T): number {
    const i = this.index.get(item);
    if (i === undefined) throw new Error(`Unknown item: ${item}`);
    return i;
  }

  /** MAP fit via gradient ascent on the log-posterior. */
  private fit(): number[] {
    const n = this.items.length;
    const theta = new Array<number>(n).fill(0);
    const { iterations, learningRate, priorVariance } = this.opts;

    for (let step = 0; step < iterations; step++) {
      const grad = new Array<number>(n).fill(0);
      for (const c of this.comparisons) {
        const w = this.idx(c.winner);
        const l = this.idx(c.loser);
        // P(loser beats winner) is the residual that pulls the strengths apart.
        const pLoser = sigmoid(theta[l] - theta[w]);
        grad[w] += pLoser;
        grad[l] -= pLoser;
      }
      for (let k = 0; k < n; k++) {
        grad[k] -= theta[k] / priorVariance; // Gaussian prior
        theta[k] += learningRate * grad[k];
      }
    }
    return theta;
  }

  /** P(a beats b) under the current MAP strengths. */
  probability(a: T, b: T): number {
    return sigmoid(this.strength[this.idx(a)] - this.strength[this.idx(b)]);
  }

  /** Items sorted by strength, strongest first (the most-probable ranking). */
  ranking(): T[] {
    return [...this.items].sort((a, b) => this.strength[this.idx(b)] - this.strength[this.idx(a)]);
  }

  /**
   * Overall confidence in the ranking, 0 → 1.
   *
   * The fraction of the ranking's adjacent steps that are "settled". An adjacent
   * pair counts as settled if the two items were compared directly, or if the
   * model already predicts their order decisively (transitivity). This reaches
   * 1 exactly when the whole order is pinned down — which is what "done" should
   * mean — instead of asymptotically stalling below 100%.
   *
   * No data → nothing settled → 0.
   */
  confidence(): number {
    const order = this.ranking();
    if (order.length < 2) return 1;
    const asked = new Set(this.comparisons.map((c) => pairKey(c.winner, c.loser)));
    let settled = 0;
    for (let k = 0; k < order.length - 1; k++) {
      const a = order[k];
      const b = order[k + 1];
      if (asked.has(pairKey(a, b)) || this.probability(a, b) >= RESOLVED_P) settled++;
    }
    return settled / (order.length - 1);
  }

  /**
   * The most informative unasked pair, or null when nothing informative remains.
   *
   * Information ≈ binary entropy of the predicted outcome: a pair we can't call
   * (p ≈ 0.5) teaches us the most; a pair we can already predict confidently
   * teaches us nothing. Among near-equally-informative pairs we pick randomly,
   * which keeps the sequence fresh and different for every user.
   */
  nextPair(rng: Rng = Math.random, minEntropy = MIN_ENTROPY): [T, T] | null {
    const asked = new Set(this.comparisons.map((c) => pairKey(c.winner, c.loser)));
    const candidates: { pair: [T, T]; entropy: number }[] = [];
    for (let i = 0; i < this.items.length; i++) {
      for (let j = i + 1; j < this.items.length; j++) {
        const a = this.items[i];
        const b = this.items[j];
        if (asked.has(pairKey(a, b))) continue;
        candidates.push({ pair: [a, b], entropy: binaryEntropy(this.probability(a, b)) });
      }
    }
    if (candidates.length === 0) return null;
    const best = Math.max(...candidates.map((c) => c.entropy));
    if (best < minEntropy) return null; // every remaining pair is already predictable
    // Randomly break ties among the (near-)most-informative pairs.
    const top = candidates.filter((c) => c.entropy >= best - ENTROPY_BAND);
    const chosen = top[Math.floor(rng() * top.length)] ?? top[0];
    // Randomise which side is A vs B too, to avoid positional bias.
    return rng() < 0.5 ? chosen.pair : [chosen.pair[1], chosen.pair[0]];
  }

  /**
   * True when the ranking is fully determined — every adjacent step settled —
   * or there is simply no informative pair left to ask.
   */
  isComplete(minEntropy = MIN_ENTROPY): boolean {
    return this.confidence() >= 1 || this.nextPair(() => 0, minEntropy) === null;
  }
}

/** A predicted win probability at/above this counts an adjacency as settled. */
const RESOLVED_P = 0.75;
/** Below this outcome-entropy (nats), a pair is considered already decided. */
const MIN_ENTROPY = 0.2; // ≈ p outside [0.03, 0.97] region weighted; see binaryEntropy
/** Pairs within this entropy of the best are treated as equally informative. */
const ENTROPY_BAND = 0.02;

function sigmoid(x: number): number {
  if (x >= 0) return 1 / (1 + Math.exp(-x));
  const e = Math.exp(x);
  return e / (1 + e);
}

/** Binary entropy in nats. Max ln2 ≈ 0.693 at p = 0.5. */
function binaryEntropy(p: number): number {
  if (p <= 0 || p >= 1) return 0;
  return -p * Math.log(p) - (1 - p) * Math.log(1 - p);
}

/** Canonical, order-independent key for a pair. */
function pairKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}
