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

## Desktop

`/desktop` is the product page for Ascuta Desktop. Download and install
commands point at the canonical
[`emavgl/ascuta-desktop`](https://github.com/emavgl/ascuta-desktop/releases)
releases, not at mirror assets on this repository. Keep it that way: the
`desktop-latest` release here is a stale historical mirror.

## Pricing

Lifetime Pro prices are read from Google Play and stored in `public/prices.json`.
Regenerate them with the `playconsole-cli` tool installed and authenticated
(`playconsole-cli doctor`):

```bash
npm run prices
```

The pricing page resolves the visitor's country client-side and shows that
region's price, falling back to USD when the country cannot be determined.
