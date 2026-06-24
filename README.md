# celestia.org

Marketing website for [Celestia](https://celestia.org) — the modular blockchain network.
Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

> New here? Read **[ONBOARDING.md](./ONBOARDING.md)** for the guided tour (routing model,
> where things live, the new-page recipe, and the git workflow). This README is the technical
> reference.

## Stack

| | |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19 |
| **Language** | TypeScript (`src/` is fully `.ts`/`.tsx`) |
| **Styling** | Tailwind CSS (utility-first) + a few SCSS modules |
| **Animation** | framer-motion |
| **Fonts** | self-hosted via `next/font/local` (NuberNext + Roboto Mono) |
| **Content** | Markdown (`gray-matter`) for glossary/learn; JS/TS objects for page copy |
| **Integrations** | Mailchimp (newsletter), Google Apps Script (contact form), Ghost CMS (blog), Plausible (analytics), lumina-node (WASM light node) |
| **Runtime** | Node.js **22 LTS** · npm |
| **Deploy** | Docker image → GitHub Container Registry → self-hosted, behind Cloudflare |

## Prerequisites

- **Node.js 22** (the repo pins `v22.11.0` in `.nvmrc`; Next 16 requires ≥ 20.9).
  Use a version manager so you get the right one automatically:
  ```bash
  fnm use      # or: nvm use   — reads .nvmrc
  # first time: fnm install 22.11.0   (or nvm install 22.11.0)
  ```
- **npm** (lockfile is `package-lock.json` — don't introduce yarn/pnpm).

## Getting started

```bash
git clone https://github.com/celestiaorg/celestia.org.git
cd celestia.org
fnm use                 # Node 22 (see Prerequisites)
npm install
cp sample.env .env.local   # then fill in values (see Environment variables)
npm run dev             # → http://localhost:3000
```

> The git history is large (video assets). For a faster clone: `git clone --depth 1 <url>`.

## Environment variables

Copy `sample.env` → `.env.local` and fill in what you need. Most pages render without any of
these; they only gate specific features (newsletter, contact form, blog, analytics).

| Variable | Used by | Public? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical URLs / SEO | yes |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA widget (forms) | yes |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA verification (server) | no |
| `GOOGLE_APPS_SCRIPT_URL` | contact form backend (see `docs/google-forms-setup.md`) | no |
| `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_SERVER_PREFIX` | newsletter subscribe API | no |
| `NEXT_PUBLIC_GHOST_API_URL`, `NEXT_PUBLIC_GHOST_CONTENT_API_KEY` | blog posts from Ghost CMS | yes |

> `NEXT_PUBLIC_*` vars are inlined into the client bundle — never put secrets behind that prefix.
> `.env.local` is gitignored; never commit real secrets.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with hot reload (`next dev --webpack`) |
| `npm run build` | Production build (`next build --webpack`; also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `eslint.config.mjs`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run verify` | `lint` + `typecheck` + `build` — the **pre-push gate** |
| `npm run verify-seo` | Validate page SEO metadata |
| `npm run check-links` | Build, serve, and crawl for broken links |
| `npm test` | Unit tests (`node --test`) |

> **Why `--webpack`?** Next 16 defaults `build`/`dev` to Turbopack, which ignores the custom
> `webpack()` block in `next.config.js` that wires up the lumina-node WASM. The flag keeps that
> pipeline working.

## Project structure

```
src/
├── app/              Routes (App Router). A folder with page.tsx = a URL.
│   ├── (default)/     Route group sharing the Header/Footer chrome
│   ├── api/           Route handlers (contact, newsletter, health)
│   └── dev/           Dev-only pages (page.dev.tsx — excluded from prod builds)
├── components/        Feature components (one folder each)
├── macros/            Small reusable primitives (Buttons, Copy, Grids, SVGs)
├── data/              Page copy + SEO as typed objects   ←★ edit copy here
├── content/           Markdown (glossary, learn) with YAML front-matter
├── context/           React context providers
├── lib/ · utils/      Content processing & helpers
└── vendor.d.ts        Ambient types for untyped deps (react-slick, react-stickynode)

public/                Static assets (images, videos, fonts) served from /
```

## Conventions

- **TypeScript everywhere** — components/pages are `.tsx`, logic/data are `.ts`. The build is a
  hard type gate (`next build` fails on type errors).
- **Routing:** folders under `src/app/` with a `page.tsx` are URLs. `(group)` folders don't appear
  in the URL; `[slug]` is dynamic; `_private` folders aren't routed. **URLs end in a trailing slash**
  (`/about/`) — include it on internal links.
- **Imports:** use the `@/*` alias → `src/*` (e.g. `@/components/Meta/Meta`).
- **Styling:** Tailwind utilities first; design tokens live in `tailwind.config.js`; reach for SCSS
  only for complex animations. New work uses the `font-nuberNext*` / `font-robotoMono` families.
- **Copy lives in `src/data/<page>/`**, not inside components.
- **Dev-only pages:** name a file `page.dev.tsx` — it's a route in `next dev` but excluded from
  production builds. Example: visit **`/dev`** locally for a live site map of all routes.

## Quality gate & git hooks

A **Husky `pre-push` hook** runs `lint + typecheck + build` before every push. The build runs in an
isolated `.next-verify` dir (cleaned up on exit) so it never clobbers a running `next dev`. Fix
failures rather than bypassing with `--no-verify`.

## Deployment

Self-hosted via Docker (not Vercel). On push to `main`, GitHub Actions
(`.github/workflows/docker-build-publish.yml`):

1. builds the image (`node:22-alpine` → `npm install` → `npm run build`),
2. pushes it to `ghcr.io/celestiaorg/celestia.org:latest`,
3. purges the Cloudflare cache.

The build contract is simply: `npm install` → `npm run build` → `next start`. Verify deploy-affecting
changes locally with `docker build .`. A second workflow (`link-checker.yml`) crawls links on PRs.

## Documentation

- **[ONBOARDING.md](./ONBOARDING.md)** — contributor guide: routing model, where things live, the
  new-page recipe, styling, and the git workflow (branching, Conventional Commits).
- **[AGENTS.md](./AGENTS.md)** — rules for AI coding agents (Claude Code, Cursor, Codex).
- **[FONT-LICENSE.md](./FONT-LICENSE.md)** — font licensing (NuberNext is per-domain licensed).
- **[CLAUDE.md](./CLAUDE.md)** — architecture notes for AI coding assistants.

## Contributing

Branch from `main` (`feature/…`, `fix/…`, `chore/…`), write
[Conventional Commits](https://www.conventionalcommits.org/), and open a PR into `main`. Make sure
`npm run verify` passes. Full details in [ONBOARDING.md](./ONBOARDING.md).
