# Recto Verso Euro 🇪🇺 💶

A tiny, private, client-side web app to rank the **10 shortlisted designs for the next euro banknotes**. You compare two design sets at a time — front and back of every denomination — pick the one you prefer, and get your personal ranking plus a shareable summary.

**Live:** https://pil0u.github.io/recto-verso-euro/

> ⚠️ **Unofficial fan project — not affiliated with the ECB.** Cast your real vote in the [official ECB survey](https://surveys.ecb.europa.eu/10b/neweuro/) (open until **21 September 2026**).

## How it works

- **Pairwise comparisons.** You never rank 10 things at once — you just answer "this one or that one". A **Bradley–Terry** rating model turns your answers into a ranking, and picks each next pair to be the _most informative_ one to ask (maximum-entropy outcome), so a full ranking takes ~25 comparisons instead of 45.
- **Confidence, live.** A confidence score climbs from 0% as you answer. Stop whenever you like — you always get a ranking, with an honest heads-up if it's still rough. Answer everything and you reach a complete, 100% ranking.
- **Private by design.** No analytics, no cookies, no tracking, no backend. Your progress lives only in your browser's `localStorage`. The banknote images are served **directly by the ECB** (see credits) — we never copy or modify them.
- **Shareable.** One click copies a Wordle-style summary plus a deep link that reopens the app on your exact ranking.
- **All 24 official EU languages**, auto-detected from your browser and switchable any time. UI wording follows the ECB's terminology; the design descriptions are quoted verbatim from the ECB's design-proposals pages.

## Develop

```bash
npm install
npm run dev       # local dev server
npm test          # unit tests (rating engine, deep-link sharing, session)
npm run lint      # eslint
npm run build     # production build to dist/
```

Stack: **Vite + TypeScript**, no UI framework. The app code is a few kB; the bulk of the bundle is the translated content itself — 24 languages of UI strings plus the ECB descriptions, held as one file per language under [`src/data/`](src/data/).

## Credits

Banknote images © **European Central Bank**, shown here as _design proposals_ per the ECB's [Terms of Use](https://www.ecb.europa.eu/services/data-protection/privacy-statements/html/ecb.terms_use_design_proposals.en.html) for information and educational purposes. This project is independent and not endorsed by the ECB.
