import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://koyomimanabe.github.io',
  base: '/ghcp-school-intro-0422',
  integrations: [tailwind()],
});
