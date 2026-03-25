import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DocbookDateGrid',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['date-fns'],
    },
    sourcemap: true,
    emptyOutDir: false,
  },
});
