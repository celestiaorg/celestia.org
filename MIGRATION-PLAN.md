# Migration & Upgrade Plan — celestia.org-new

A feasibility audit + safe execution plan for three asks:

1. **Upgrade to latest Next.js + latest React** (and the deps they drag along).
2. **Update the rest of the packages** where it's worth it.
3. **Adopt TypeScript** across the codebase, file by file.
4. **Add a pre-push gate** (typecheck + test build) that runs on `git push`, not on commit.

> Status: **plan only — nothing changed yet.** This documents *how* to do it safely, in what
> order, and what can break the deployment. Read [`REPO-HEALTH.md`](./REPO-HEALTH.md) for repo
> state and [`ONBOARDING.md`](./ONBOARDING.md) for workflow.

---

## Progress log (branch `chore/deps-ts-foundation`)

**Done & verified (Node bumped to 22.11.0 via fnm default):**
- ✅ **Phase 0** — `.dockerignore`, `.nvmrc`→22, lenient `tsconfig.json` (excludes `.next`), TS devDeps, `typescript.ignoreBuildErrors` guard, `typecheck`/`verify` scripts, pre-push gate = lint+typecheck+**build**.
- ✅ **Phase 1a** — in-range minor/patch bumps (`npm update`): framer-motion 11.18.2, sass 1.101, tailwind-merge 3.6, etc. No majors.
- ✅ **Phase 1b** — **React 19.2.7**. Codemod = 0 changes. `react-slick`/`react-stickynode` verified working in-browser (their shipped builds don't use the removed `findDOMNode`).
- ✅ **Phase 1c** — **Next 16.2.9** + **eslint 9 flat config** (`eslint.config.mjs`; `next lint`→`eslint .`). Build/dev use **`next build --webpack`** to keep the webpack pipeline. **Docker build passes (exit 0)** — deploy is safe. `/dev` dev-only route survived. Browser: carousel + sticky nav render.
- ✅ **Phase 2 — COMPLETE.** The entire `src/` tree is now TypeScript (**0 `.js`/`.jsx` left**), converted in 8 verified slices: utils/lib → macros → components (chrome, homepage/pages, feature/nav) → context+Lumina → data → app pages → app infra (layouts, api, sitemap, fonts). `.next/types` route validation **re-enabled**, `typescript.ignoreBuildErrors` **removed** — so `next build` is now a hard type gate. Untyped deps (`react-slick`, `react-stickynode`) covered by `src/vendor.d.ts`. Fixed real latent bugs found via typing: glossary `page.tsx`/`[slug]` stubs had invalid page-props (`children`), GhostButton was internally misnamed.

**Findings to remember:**
- **Lumina WASM copy is currently a no-op:** `lumina-node@0.10.3` ships no `.wasm` at `node_modules/lumina-node/**/*.wasm`, so **both** Next 15 and Next 16 produce 0 wasm in `.next`. The `--webpack` flag preserves prior behavior exactly — no regression. Revisit the WASM wiring when Lumina is revived / bumped to 1.0.
- **react-hooks v7 "compiler-era" rules** (set-state-in-effect, refs, static-components, purity, immutability) ship as errors in eslint-config-next 16; demoted to **warn** in `eslint.config.mjs` to stay behavior-equivalent with Next 15 and keep the gate green. Promote back to error incrementally.
- **Docker warnings** (`SecretsUsedInArgOrEnv` for MAILCHIMP/RECAPTCHA ARGs) are pre-existing Dockerfile patterns, unrelated to this migration.

**Remaining:** Phase 2 continues (macros → `*New` components → app routes; ~215 files left). Deferred by prior decision: Tailwind 3→4, lumina 1.0, react-slick/stickynode majors, markdown-to-jsx/next-plausible/copy-webpack-plugin majors. Flip `typescript.ignoreBuildErrors` OFF + re-include `.next/types` once TS conversion completes.

---

## TL;DR verdict

| Workstream | Feasibility | Effort | Deploy risk | Recommendation |
|---|---|---|---|---|
| Safe minors/patches (sass, framer-motion 11.x, eslint-config-next, etc.) | ✅ Trivial | ~1 hr | None | **Do first, one PR** |
| **React 18 → 19** | ✅ Easy here | ~0.5–1 day | Low | **Do** — codebase is unusually clean for it |
| **Next 15 → 16** | ⚠️ Moderate | ~1–2 days | **Medium-High** | **Do, but** the WASM/webpack issue is the crux (see §3.2) |
| ESLint 8 → 10 (flat config) | ⚠️ Moderate | ~0.5 day | None (dev-only) | Do with the Next 16 bump |
| **Tailwind 3 → 4** | ⚠️ Labor-heavy | ~2–4 days | Medium (visual regressions) | **Defer** — high effort, low user value, big regression surface |
| lumina-node 0.10 → 1.0 | ⚠️ Risky (WASM) | ~0.5–2 days | Medium | **Defer** — widget is dormant anyway |
| react-slick 0.30 → 0.31 / replace | ⚠️ jQuery-era | ~0.5 day | Low | Defer or replace when that page is touched |
| **TypeScript adoption** | ✅ Feasible, incremental | **Weeks, spread out** | Low *if* staged correctly (§4) | **Do incrementally**, never big-bang |
| Pre-push typecheck + build hook | ✅ Easy | ~1 hr | None | **Do** (husky already installed) |

**Bottom line:** React 19 + Next 16 + the safe minors + the pre-push hook is a realistic **1–2 week**
effort and the high-value core. **Tailwind 4, lumina 1.0, and react-slick should be explicitly
deferred** — they're where the effort and regression risk concentrate, for little user benefit.
**TypeScript is the big one** — feasible but it's an ongoing, file-by-file effort measured in weeks,
not a single migration. The two are independent and can run in parallel.

---

## 1. Current state (measured, not guessed)

- **235 JS/JSX files** in `src/` (`227 .js` + `8 .jsx`), **~22,000 LOC**, **89 `"use client"`** components.
  Only **1** file is already TS (`src/constants/analytics.ts`).
- **Local Node: `v20.2.0`** (`.nvmrc`). **Docker: `node:22-alpine`.** ⚠️ These already disagree, and
  **Next 16 requires Node ≥ 20.9** — so `.nvmrc` (20.2.0) is below the floor and must bump.
- Package manager: **npm** (`package-lock.json`). Husky 9 already wired (`prepare: "husky"`).

### `npm outdated` (the majors that matter)

| Package | Current | Latest | Jump |
|---|---|---|---|
| next | 15.5.19 | **16.2.9** | major |
| react / react-dom | 18.3.1 | **19.2.7** | major |
| tailwindcss | 3.4.4 | **4.3.1** | major (new engine) |
| eslint | 8.57 | **10.5** | major (flat config) |
| eslint-config-next | 15.5 | 16.2.9 | tracks Next |
| framer-motion | 11.2 | 12.41 | major (pkg renamed `motion`) |
| lumina-node | 0.10.3 | **1.0.0** | major (WASM) |
| next-plausible | 3.12 | 4.0 | major |
| markdown-to-jsx | 7.4 | 9.8 | major |
| react-stickynode | 4.1 | 5.0 | major |
| copy-webpack-plugin | 13 | 14 | major (build dep) |
| sass, bowser, react-slick, tailwind-merge, linkinator | minor/patch | — | safe |

---

## 2. The deployment contract — what must NOT break

The site is **self-hosted via Docker** (we hand over code; someone else runs it). The `Dockerfile`:

```dockerfile
FROM node:22-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install            # ← not `npm ci`
COPY . .
RUN npm run build          # ← `next build` — the make-or-break step
EXPOSE 3000
CMD ["npm", "run", "start"]  # ← `next start` (NOT standalone)
```

**Implications for every change below:**

- **The build is the gate.** Anything that makes `next build` fail breaks their pipeline. This is the
  single contract to protect. Always run `npm run build` locally (and ideally `docker build .`) before
  pushing an upgrade.
- **No `output: standalone`** — they run full `next start`, so we don't need to worry about standalone
  tracing, but we also can't lean on it.
- **No `.dockerignore`** — `COPY . .` copies the local `node_modules`/`.next` over the freshly installed
  ones. Harmless today but fragile. **Quick win: add a `.dockerignore`** (`node_modules`, `.next`, `.git`)
  so the image always builds from a clean `npm install`. Do this early; it de-risks everything after.
- **`npm install` not `npm ci`** — lockfile drift won't fail their build, but it means our local lockfile
  is what they get. Keep `package-lock.json` committed and in sync.
- **Node floor.** Docker is on 22 (fine for Next 16). But bump **`.nvmrc` to `v20.19.x` or `v22.x`** and
  call it out, so local dev matches and nobody hits the Next 16 Node-version error.

### 2.1 ⚠️ The one that will bite: Next 16 + Turbopack vs. the WASM webpack config

`next.config.js` has a **custom `webpack()`** block that enables `asyncWebAssembly` and copies
`lumina-node`'s `.wasm` files into the build (via `copy-webpack-plugin`). **In Next 16, `next build`
defaults to Turbopack, which ignores `webpack()` entirely.** If we bump to 16 and do nothing, the WASM
copy silently stops happening and the Lumina light-node integration breaks at runtime.

Two options:
- **(a) Keep webpack for build:** run `next build --webpack` (and `next dev --webpack`). Lowest-risk —
  the existing WASM config keeps working unchanged. Update the `build`/`dev` scripts accordingly.
- **(b) Port WASM handling to Turbopack** config. More future-proof but more work, and Turbopack's WASM
  asset story differs from `copy-webpack-plugin`.

**Recommendation: (a) for the Next 16 bump** — keep webpack via the flag so the upgrade is bisectable and
the WASM path is untouched. Revisit Turbopack later as its own task. (Note: Lumina is currently *dormant*
per REPO-HEALTH, so the blast radius is small either way — but don't let the bump silently break it.)

---

## 3. Part A — Dependency upgrades (recommended order)

Each tier = its own PR, each verified with `npm run build` + a click-through. **One major per PR** so a
regression is trivial to bisect/revert.

### Tier 0 — `.dockerignore` + `.nvmrc` bump (prep)
Add `.dockerignore`, bump `.nvmrc` to `v22.x`, update the README/ONBOARDING Node line. No app code changes.

### Tier 1 — Safe minors/patches (one PR, low risk)
`sass`, `bowser`, `react-slick` (0.30→0.31 patch), `tailwind-merge`, `linkinator`, `framer-motion` within
11.x (→ 11.18, which adds React 19 readiness), `eslint-config-next` to latest 15.x. Run build + lint. Done.

### Tier 2 — React 18 → 19 (the good news)
The breaking-change surface in React 19 is **nearly absent here** — measured:
- ❌ no `defaultProps` on function components, ❌ no `PropTypes`/`prop-types`, ❌ no string refs,
  ❌ no `ReactDOM.render`/`hydrate`, ❌ no `useFormState`. ✅ only **1** `forwardRef` (still works in 19).
- **framer-motion is the main dependency to watch** (used in **53 files**). Bump framer-motion to ≥11.11
  (React 19-ready) *before* flipping React, or go to `motion` v12 in the same PR.
- Steps: `npm i react@19 react-dom@19`, run `npx types-react-codemod@latest preset-19 ./src` (harmless on
  JS, useful once TS lands), `npm run build`, click through homepage + a few animated pages (framer-motion),
  the contact form, and the Lumina widget if enabled.
- **Risk: Low.** This is the cleanest part of the whole plan.

### Tier 3 — Next 15 → 16 (+ eslint-config-next 16, eslint 8 → 9/flat)
- Run `npx @next/codemod@canary upgrade latest`.
- **Apply the WASM/Turbopack decision from §2.1** (recommend `--webpack` build flag).
- Audit async APIs: Next 15 already made `cookies()/headers()/params/searchParams` async — confirm no
  sync usage slipped in. Check the **1 `next/head`** import (legacy) and the dynamic `[slug]` routes.
- ESLint: Next 16 pairs with newer eslint. Migrate `.eslintrc.json` → `eslint.config.mjs` (flat config).
  Dev-only, won't affect the Docker build, but the **pre-push hook runs lint** so it must pass.
- Verify: full `npm run build`, then ideally `docker build .` locally to mirror prod exactly.
- **Risk: Medium-High**, concentrated entirely in the WASM/webpack path and the build defaults.

### Tier 4 — Explicitly DEFER (call these out, don't silently skip)
- **Tailwind 3 → 4:** new Oxide engine, **CSS-first `@theme` config**. Our `tailwind.config.js` is JS with
  a **computed `fontSize` function** (vw-scaled sizes), custom plugins, and `@tailwindcss/line-clamp`
  (now native in v4 — must be removed). This is a 2–4 day port with a real visual-regression surface across
  every page. **High effort, low user value. Defer to its own dedicated project** with screenshot diffs.
- **lumina-node 0.10 → 1.0:** WASM major; the widget is dormant. Defer until/unless Lumina is revived.
- **react-slick / react-stickynode majors:** jQuery-era carousel (1 file) and sticky nav (3 files). Replace
  or bump opportunistically when those pages are next touched, not as part of this push.
- `markdown-to-jsx` 7→9, `next-plausible` 3→4, `copy-webpack-plugin` 13→14: low urgency; fold into a later
  housekeeping PR after the core majors land.

---

## 4. Part B — TypeScript adoption (incremental, never big-bang)

**Feasible, but it's an ongoing effort (weeks), not a migration.** 235 files / ~22k LOC. The only sane
path is **coexistence**: TS and JS in the same tree via `allowJs`, converting file-by-file.

### 4.1 Setup (day one, ~2 hrs) — zero app changes
1. `npm i -D typescript @types/react @types/react-dom @types/node`.
2. Replace `jsconfig.json` with a **lenient** `tsconfig.json`:
   ```jsonc
   {
     "compilerOptions": {
       "allowJs": true,            // ← JS and TS coexist
       "checkJs": false,           // don't typecheck untouched JS yet
       "strict": false,            // turn on later, per-area
       "noEmit": true,
       "skipLibCheck": true,
       "jsx": "preserve",
       "moduleResolution": "bundler",
       "paths": { "@/*": ["./src/*"] }
     },
     "include": ["src", "next-env.d.ts"]
   }
   ```
   (Next auto-generates `next-env.d.ts` on first build; commit it.)
3. **Protect the Docker build from in-progress types.** When `tsconfig.json` exists, `next build`
   typechecks and **fails on any type error** — which would break the deployment mid-migration. So set:
   ```js
   // next.config.js — during the migration only
   typescript: { ignoreBuildErrors: true },
   ```
   and instead enforce types in the **pre-push hook** (§5). Once the codebase is fully `.ts`/`.tsx` and
   clean under `strict`, **remove this flag** so the build re-becomes a hard type gate.

### 4.1b Known debt from Phase 0 (landed)
- **`tsconfig.json` excludes `.next`** so `tsc --noEmit` stays green on the all-JS codebase. Side effect:
  Next's generated **route-prop type validation (`.next/types`) is not enforced** by the pre-push typecheck
  yet. Re-include `.next/types/**/*.ts` once the glossary route stubs are cleaned up.
- **Glossary stubs:** `glossary/page.js` and `glossary/[slug]/page.js` are empty-fragment stubs (the real
  content is rendered by `glossary/layout.js`). The `[slug]` stub has dead args (`{ props, chidren }` —
  note the typo) that render nothing and only exist as a required `page.js`. Harmless today; tidy them when
  converting the glossary to TS (that's what tripped `.next/types` typecheck).
- TypeScript resolved to **v6** (`^6.0.3`); typecheck + build both pass on it.

### 4.2 Conversion order (low-risk → high-value)
1. **Leaf utilities & data first** — `src/utils/`, `src/lib/`, `src/data/`, `src/constants/` (already 1 `.ts`).
   Pure functions and plain objects type cleanly and give the most leverage (everything imports them).
2. **`macros/`** — small primitives (Button, Copy, Grid, SVG). Establish shared prop-type patterns here.
3. **`components/`** — feature components. Prioritize the **`*New`/redesigned families** (the live ones);
   leave legacy/`_archive` JS as-is or delete per the cleanup plan rather than typing dead code.
4. **`app/` routes & layouts last** — they tie the typed pieces together.
5. Skip/defer: `_archive`, dormant Lumina, anything slated for deletion. **Don't type code you'll delete.**

### 4.3 Tactics that keep it safe
- **One area per PR**, each PR ends green on `npm run build` + `tsc --noEmit`.
- Start with `strict: false`; once an area is fully converted, opt it into stricter checks.
- Allow `// @ts-expect-error` / `any` as **temporary** debt with a TODO — momentum over purity early on.
- Codemod the mechanical part: `npx ts-migrate` or just rename `.js`→`.tsx` + fix reds. Manual typing of
  props is where the real work is — budget per-component.
- **Decouple from Part A.** Don't entangle the React/Next bump with TS conversion in the same PRs.

> **Honest sizing:** at a sustainable pace this is **several weeks** of part-time work, or a focused
> 1–2 week sprint if it's someone's whole job. It's the largest item on this page by far. The upside is
> real (autocomplete, refactor safety, fewer prop bugs) — but it's a marathon, scoped per-area.

---

## 5. Part C — Pre-push gate (typecheck + test build), push-only

Husky 9 is already installed and a `pre-push` hook already runs lint. **Extend the existing
`.husky/pre-push`** — no need for lefthook (husky is already wired via `prepare: "husky"`).

Add scripts:
```jsonc
// package.json
"scripts": {
  "typecheck": "tsc --noEmit",
  "verify": "npm run lint && npm run typecheck && npm run build"
}
```

Update `.husky/pre-push` (runs on `git push`, **never blocks `git commit`** — exactly as asked):
```sh
#!/usr/bin/env sh
echo "🔍 pre-push: lint + typecheck + build…"
npm run lint || exit 1
npm run typecheck || exit 1
npm run build || exit 1     # mirrors the Docker build gate locally
echo "✅ pre-push checks passed"
```

Notes:
- A full `next build` on push takes ~1–3 min. If that's too slow for the team, drop `build` from the hook
  and keep `lint + typecheck`, running the full build in CI / before release instead. (Recommend keeping
  build in the hook **until** there's CI, since the Docker host has no safety net of its own.)
- `typecheck` is only meaningful once `tsconfig.json` exists (§4.1). Add the line then.
- This local build gate is what lets us safely keep `typescript.ignoreBuildErrors` off the critical path:
  type errors get caught **before** push, so the Docker build stays green.

---

## 6. Recommended sequencing

```
Phase 0  (prep, ~half day)
  └─ .dockerignore + .nvmrc bump + tsconfig(lenient)+TS deps + pre-push (lint+typecheck)

Phase 1  (deps core, ~1 week)         Phase 2  (TS, parallel & ongoing)
  ├─ Tier 1 safe minors  (1 PR)          ├─ utils/lib/data/constants  (PRs)
  ├─ React 18→19         (1 PR)          ├─ macros/                   (PRs)
  └─ Next 15→16 + eslint (1 PR) ⚠️WASM    ├─ components/*New           (PRs)
                                          └─ app/ routes              (PRs)

Phase 3  (later / opt-in)
  ├─ add `build` to pre-push, flip ignoreBuildErrors OFF once TS is clean
  ├─ Tailwind 3→4   (dedicated project, screenshot diffs)
  ├─ lumina 1.0, react-slick/stickynode, markdown-to-jsx, next-plausible
  └─ revisit Turbopack (drop the --webpack flag) once WASM is ported
```

Phase 1 and Phase 2 are independent — deps can be one person, TS another, no collisions if TS PRs avoid
`next.config.js`/`package.json` churn during a dep PR.

## 7. Safety / rollback

- **One major per PR**, each green on `npm run build`; revert = revert one PR.
- **`docker build .` locally** before pushing the Next 16 PR — it's the only way to catch a Docker-specific
  break (alpine, libc6-compat, WASM copy) before the host does.
- Keep `package-lock.json` committed and in sync (their `npm install` consumes it).
- The pre-push build gate is the early-warning system; don't `--no-verify` past it on upgrade branches.

---

*Generated as a feasibility audit. Nothing in the repo has been changed by this document.*
</content>
</invoke>
