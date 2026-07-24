/**
 * Optional anonymous "pool" of results.
 *
 * The app is fully functional with NO backend. If you later want to aggregate
 * rankings, create a free Google Form with three questions (ranking,
 * confidence, language), then paste its details below. No account key is
 * embedded in the code and no change to the app logic is needed.
 *
 * How to fill this in:
 *   1. Create a Google Form with 3 short-answer questions.
 *   2. Open the live form, "Inspect" each field, and copy its `entry.NNN` name.
 *   3. Copy the form's POST URL (ends with `/formResponse`).
 *
 * Leave `formActionUrl` empty to keep the app 100% local (the pool button hides).
 */
export const POOL = {
  formActionUrl: '', // e.g. 'https://docs.google.com/forms/d/e/1FAIp...abc/formResponse'
  fields: {
    ranking: 'entry.0000000000', // e.g. 'entry.1234567890'
    confidence: 'entry.1111111111',
    lang: 'entry.2222222222',
  },
} as const;

export function poolEnabled(): boolean {
  return POOL.formActionUrl.trim().length > 0;
}
