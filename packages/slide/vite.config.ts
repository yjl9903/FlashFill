import { defineConfig } from 'vite';
import ViteRsw from 'vite-plugin-rsw';

export default defineConfig({
  build: {
    minify: false
  },
  plugins: [
    ViteRsw({
      crates: [{ name: '../core', outDir: 'client' }]
    })
  ]
});
