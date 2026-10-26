// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://playbooks.lettership.com',
  base: process.env.SITE_BASE || '/',
  integrations: [
    starlight({
      title: 'Lettership Playbooks',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Nederlands', lang: 'nl' },
        en: { label: 'English', lang: 'en' },
      },
      logo: {
        src: './src/assets/wordmark.svg',
        replacesTitle: true,
      },
      favicon: '/img/favicon.svg',
      head: [
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.bunny.net' } },
        { tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.bunny.net/css?family=lora:400,500,600,400i&display=swap' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#fbf3ec' } },
      ],
      customCss: ['./src/styles/lettership.css'],
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
        Footer: './src/components/Footer.astro',
        SocialIcons: './src/components/SocialIcons.astro',
      },
      pagefind: true,
      sidebar: [
        {
          label: 'Playbooks',
          translations: { en: 'Playbooks' },
          items: [
            { slug: 'inrichten' },
          ],
        },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      lastUpdated: false,
      credits: false,
    }),
  ],
});
