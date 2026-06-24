# celestia.org

Marketing website for [Celestia](https://celestia.org), built with **Next.js 15 (App Router)**, **React 18**, and **Tailwind CSS**.

## Quick start

```bash
nvm use        # Node version from .nvmrc (v20.2.0)
npm install
npm run dev     # http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server (hot reload) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (also runs automatically on `git push`) |
| `npm run verify-seo` | Validate page SEO metadata |
| `npm run check-links` | Crawl for broken links |
| `npm test` | Run unit tests |

## Documentation

- **[ONBOARDING.md](./ONBOARDING.md)** — start here. Setup, how routing/pages work, where
  components/styles/assets/data live, the new-page recipe, styling conventions, and the git
  workflow (branching, Conventional Commits, what to commit). Written for new contributors
  (and their coding agents).
- **[REPO-HEALTH.md](./REPO-HEALTH.md)** — current-state audit: redesign status, route
  inventory, dependency audit, and the ongoing cleanup tracker.
- **[FONT-LICENSE.md](./FONT-LICENSE.md)** — font licensing (NuberNext is per-domain licensed).
- **[CLAUDE.md](./CLAUDE.md)** — architecture notes for AI coding assistants.

## Stack at a glance

- **Framework:** Next.js 15 App Router · **UI:** React 18
- **Styling:** Tailwind CSS (utility-first) + a few SCSS modules
- **Animation:** framer-motion
- **Fonts:** self-hosted via `next/font/local` (NuberNext + Roboto Mono on redesigned pages)
- **Integrations:** Mailchimp (newsletter), Plausible (analytics), lumina-node (WASM light-node widget)
- **Hosting:** Vercel · **Node:** v20.2.0 · **Package manager:** npm

## Project layout

```
src/app/         Routes (App Router). A folder with page.js = a URL.
src/components/   Feature components
src/macros/       Small reusable primitives (buttons, copy, icons, grids)
src/data/         Page copy + SEO as plain JS objects
src/content/      Markdown (glossary, learn)
public/           Static assets (images, videos, fonts) served from /
```

See [ONBOARDING.md](./ONBOARDING.md) for the full tour.
