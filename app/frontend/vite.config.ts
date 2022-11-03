/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: { alias: { '@': '/src' } },
	plugins: [react()],
	server: {
		host: true,
		port: Number(process.env.PORT),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'c8'
    }
  }
});
