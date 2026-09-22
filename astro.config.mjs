import { defineConfig } from 'astro/config';

// The site is published to the custom domain ascuta.viglianisi.eu, which
// serves Pages at the domain root (/), not at /<repo>/. Assets must therefore
// be rooted at /, otherwise they 404 and the site renders unstyled.
export default defineConfig({
  output: 'static',
  base: '/',
});
