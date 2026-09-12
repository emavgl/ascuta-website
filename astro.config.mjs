import { defineConfig } from 'astro/config';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').pop();

export default defineConfig({
  output: 'static',
  base: process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}/` : '/',
});
