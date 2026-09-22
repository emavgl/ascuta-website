# Ascuta Website

Public website for Ascuta, maintained separately from the private Android application repository.

This is an Astro static site intended for deployment to a public GitHub repository using GitHub Pages and GitHub Actions.

## Development

```bash
npm ci
npm run check
npm run build
npm run dev
```

The generated site is written to `dist/`.

## Pricing

Lifetime Pro prices are read from Google Play and stored in `public/prices.json`.
Regenerate them with the `playconsole-cli` tool installed and authenticated
(`playconsole-cli doctor`):

```bash
npm run prices
```

The pricing page resolves the visitor's country client-side and shows that
region's price, falling back to USD when the country cannot be determined.
