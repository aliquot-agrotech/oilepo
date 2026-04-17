// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
	plugins: [tailwindcss()],
    preview: {
      port: 4321,
      host: true,    // This enables listening on all network interfaces
    },
    server: {        // Also add this for development server
      host: true,    // This enables listening on all network interfaces
      port: 4321
    }
  },
  image: {
	  domains: ["s3.oilepo.com"],
  }
});