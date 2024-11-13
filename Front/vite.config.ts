import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
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
