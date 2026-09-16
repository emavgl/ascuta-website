import { defineConfig } from 'astro/config';

// Project Pages are served from /<repo>/ on both github.io and the custom
// domain (viglianisi.eu/ascuta-website/), so the base is fixed here. It must
// NOT be derived from GITHUB_REPOSITORY: after a repo rename the last
// deployment keeps pointing at the old base and the site renders unstyled.
export default defineConfig({
  output: 'static',
  base: process.env.GITHUB_ACTIONS ? '/ascuta-website/' : '/',
});
