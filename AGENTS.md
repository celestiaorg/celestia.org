# AGENTS.md — rules for coding agents

This is the canonical guide for AI coding agents (Claude Code, Cursor, Codex, etc.) working in
this repo. It's the "don't make a mess" contract. Humans: see [README.md](./README.md) and
[ONBOARDING.md](./ONBOARDING.md). Claude-specific notes: [CLAUDE.md](./CLAUDE.md).

## What this is
The Celestia.org marketing site: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS**.
Runtime is **Node.js 22** (pinned in `.nvmrc`). Package manager is **npm** (use the `package-lock.json`).

## Setup
```bash
fnm use        # or: nvm use   → Node 22 (first time: fnm install 22.11.0)
npm install
npm run dev     # http://localhost:3000
```
If a command fails with `Node.js version ">=20.9.0" is required`, you're on the wrong Node — run
`fnm use` (the repo needs Node 22; an already-open terminal may be stale).

## The golden rule — verify before you claim done
Always run **`npm run verify`** (= `lint` + `typecheck` + `build`) and make it pass before saying a
task is complete or pushing. The same gate runs on `git push` (Husky pre-push). **Never bypass it
with `--no-verify`.** The production build is a **hard type gate** — it fails on any TypeScript error.

For visual changes, actually open the page in a browser at **mobile (~390px)** and **desktop (~1440px)**.

## Conventions (match the surrounding code)
- **TypeScript everywhere.** Components/pages are `.tsx`, logic/data are `.ts`. Type props with real
  types, not `any`. The whole `src/` tree is already TS — keep it that way.
- **Routing:** a folder with `page.tsx` under `src/app/` is a URL. `(group)` folders don't appear in
  the URL; `[slug]` is dynamic; `_private` folders aren't routed. **Internal links end in a trailing
  slash** (`/about/`) — always include it.
- **Imports:** use the `@/*` alias → `src/*` (e.g. `@/components/Meta/Meta`).
- **Edit copy in `src/data/<page>/`** (typed objects), not inside components. Markdown content
  (glossary/learn) lives in `src/content/`.
- **Styling:** Tailwind utilities first; tokens in `tailwind.config.js`. Wrap page sections in
  `<Container size="2xl">`. New work uses the `font-nuberNext` / `font-nuberNextWide` /
  `font-robotoMono` families. Reach for SCSS only for complex animations.
- **Pages set metadata** via `export const metadata = Meta(seo)` (seo from `src/data/<page>/seo.ts`).
- **Dev-only pages:** name a file `page.dev.tsx` — it routes in dev but is excluded from production
  builds. Visit `/dev` locally for a live site map of all routes.

## Do NOT
- ❌ Bypass the verify gate, or claim done without running it.
- ❌ Resurrect legacy patterns (the `Heroes`/`Introduction` families, the `untitledSans`/`youth`
  fonts) into new work — use the `*New` / redesigned component families.
- ❌ Add large binaries (videos, >~1 MB images) — flag them for a human; the git history is already heavy.
- ❌ Touch `public/cells/**`, `public/fonts/**`, or font config unless explicitly asked (licensing).
- ❌ Commit secrets or `.env*` files. `NEXT_PUBLIC_*` vars ship to the browser — never put secrets there.
- ❌ Switch package managers (npm only) or run `npm audit fix --force` (pulls breaking majors).
- ❌ Change `next.config.js` build flags casually — `--webpack` is required (it preserves the
  lumina-node WASM pipeline that Turbopack would skip).

## Git workflow
- Branch from `main`: `feature/…` (new), `fix/…` (bug), `chore/…` (config/cleanup), `content/…` (copy/assets).
- **Conventional Commits:** `type(scope): short description` (e.g. `feat(about): add leadership grid`).
  Keep commits small and focused — one logical change each.
- Open a PR into `main` with a short what/why and a screenshot for visual changes. Don't commit to `main`.

## Where to look
- [ONBOARDING.md](./ONBOARDING.md) — full contributor tour (routing model, new-page recipe, styling, git).
- [README.md](./README.md) — setup, env vars, scripts, deployment.
