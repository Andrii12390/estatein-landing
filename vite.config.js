import { defineConfig } from 'vite';

export default defineConfig({
  base: '/estatein-landing/',
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
  },
});
