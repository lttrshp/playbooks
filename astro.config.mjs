// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkObsidianCallouts from './src/plugins/remark-obsidian-callouts.mjs';

const base = (process.env.SITE_BASE || '/').replace(/\/?$/, '/');

export default defineConfig({
  site: 'https://playbooks.lettership.com',
  base,
  // The old single chapter was split into per-screen playbooks. Astro does
  // not prefix redirect targets with the base, so they carry it themselves.
  redirects: {
    '/inrichten': base,
    '/en/inrichten': `${base}en/`,
  },
  markdown: {
    remarkPlugins: [remarkObsidianCallouts],
  },
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
        LanguageSelect: './src/components/LanguageSelect.astro',
        Footer: './src/components/Footer.astro',
        SocialIcons: './src/components/SocialIcons.astro',
      },
      pagefind: true,
      sidebar: [
        {
          label: 'Instellen van je Lettership',
          translations: { en: 'Setting up your Lettership' },
          items: [
            { slug: 'instellingen/profiel' },
            { slug: 'instellingen/huisstijl' },
            { slug: 'instellingen/vormgeving' },
            { slug: 'instellingen/mail' },
            { slug: 'instellingen/embed' },
          ],
        },
        { slug: 'artikelen' },
        { slug: 'paginas' },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      lastUpdated: false,
      credits: false,
    }),
  ],
});
