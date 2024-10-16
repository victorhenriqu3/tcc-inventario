import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //mkcert(),
    react({
      include: '**/*.tsx',
    }),
  ],
  server: {
    open: true,
    //  https: true,
    watch: {
      usePolling: true,
    },
  },
});
