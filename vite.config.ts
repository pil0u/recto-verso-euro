/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

// Served from a GitHub Pages project site: https://pil0u.github.io/recto-verso-euro/
export default defineConfig({
  base: '/recto-verso-euro/',
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
