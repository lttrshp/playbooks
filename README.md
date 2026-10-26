# Lettership Playbooks

Short guides for Lettership writers: how the platform works and how to grow a newsletter. Built with [Starlight](https://starlight.astro.build) (Astro), bilingual Dutch/English, deployed to GitHub Pages on every push to `main`.

- Content: `src/content/docs/` as Markdown. Dutch is the root locale; English lives in `src/content/docs/en/` under the same file names. An untranslated page falls back to Dutch with a notice.
- Screenshots: `src/assets/playbooks/`.
- Fonts: Season and General Sans are licensed, so they are not in this repository; the build downloads them from lettership.com (see `.github/workflows/deploy.yml`).
- Styling: `src/styles/lettership.css`, ported from the `marketing` layout in `lttrshp/monolith`.

Editing in Obsidian: open the repository root as a vault. `.obsidian/app.json` keeps links in Markdown format (Starlight does not read `[[wikilinks]]`) and drops pasted images in `src/assets/playbooks/`. The Obsidian Git plugin pulls on startup and commits and pushes edits to `main`, which deploys them.

Callouts use Obsidian's syntax, which `src/plugins/remark-obsidian-callouts.mjs` renders as Starlight asides: `> [!tip] Title` (plum on salmon; also `example`), `> [!note] Title` (neutral) and `> [!caution] Title` (warning), with the body on the following `> ` lines.

```sh
npm install
npm run dev
```

For playbooks.lettership.com: set `SITE_BASE=/` in the workflow and add the custom domain under Settings › Pages.
