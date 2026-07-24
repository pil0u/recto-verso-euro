# Recto Verso Euro 🇪🇺 💶

A tiny, private, client-side web app to rank the **10 shortlisted designs for the
next euro banknotes**. You compare two design sets at a time — front and back of
every denomination — pick the one you prefer, and get your personal ranking plus
a shareable summary.

**Live:** https://pil0u.github.io/recto-verso-euro/

> ⚠️ **Unofficial fan project — not affiliated with the ECB.** Cast your real vote
> in the [official ECB survey](https://www.ecb.europa.eu/euro/banknotes/future_banknotes/html/index.en.html)
> (open until **21 September 2026**).

## How it works

- **Pairwise comparisons.** You never rank 10 things at once — you just answer
  "this one or that one". A **Bradley–Terry** rating model turns your answers into
  a ranking, and picks each next pair to be the _most informative_ one to ask
  (maximum-entropy outcome), so a full ranking takes ~25 comparisons instead of 45.
- **Confidence, live.** A confidence score climbs from 0% as you answer. Stop
  whenever you like — you always get a ranking, with an honest heads-up if it's
  still rough. Answer everything and you reach a complete, 100% ranking.
- **Private by design.** No analytics, no cookies, no tracking, no backend. Your
  progress lives only in your browser's `localStorage`. The banknote images are
  served **directly by the ECB** (see credits) — we never copy or modify them.
- **Shareable.** One click copies a Wordle-style summary plus a deep link that
  reopens the app on your exact ranking.
- **English & French**, auto-detected from your browser, switchable any time.

## Develop

```bash
npm install
npm run dev       # local dev server
npm test          # unit tests for the rating engine
npm run lint      # eslint
npm run build     # production build to dist/
```

Stack: **Vite + TypeScript**, no UI framework. The shipped bundle is ~12 kB gzipped.

## Optional: an anonymous results pool

The app is fully functional with **no backend**. If you later want to collect
anonymous rankings, create a free **Google Form** with three short-answer
questions (ranking, confidence, language) and fill in
[`src/config.ts`](src/config.ts) with the form's POST URL and field names. No
account key is embedded in the code. Leave it blank to stay 100% local (the pool
button simply doesn't appear).

## Credits

Banknote images © **European Central Bank**, shown here as _design proposals_ per
the ECB's [Terms of Use](https://www.ecb.europa.eu/services/data-protection/privacy-statements/html/ecb.terms_use_design_proposals.en.html)
for information and educational purposes. This project is independent and not
endorsed by the ECB.
