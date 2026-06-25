# Onboarding & Working Guide — celestia.org-new

Welcome 👋 This is the guide for working on the Celestia website. It's written to be
read top-to-bottom once, then used as a checklist. It works whether you're editing by
hand or driving a coding agent — this overview suits both, and links out to the deeper docs.

Driving an AI agent (Claude Code / Cursor / Codex)? Point it at [`AGENTS.md`](./AGENTS.md) — the
canonical agent guardrails — plus this guide.

---

## 1. Get set up

### 1a. First time on this machine? Install these once — in this order

Don't assume anything is installed. Go top to bottom; **skip a step only if the "Check" command
already prints a version.** Commands are for **macOS** (notes for Windows below).

| # | Tool | What it's for | Install (macOS) | Check |
|---|------|---------------|-----------------|-------|
| 1 | **Terminal** | where you run commands | already on your Mac — open **Terminal** (⌘-Space → "Terminal") | — |
| 2 | **Git** | clone the repo + save changes | run `xcode-select --install` (includes Git), or get it from [git-scm.com](https://git-scm.com) | `git --version` |
| 3 | **nvm** | installs & switches Node versions | `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh \| bash` — then **close and reopen Terminal** | `nvm --version` |
| 4 | **Node 22** | runs the site (**npm** ships with it) | `nvm install 22.11.0` | `node -v` → `v22.x` · `npm -v` |
| 5 | **A code editor** | edit the code | [VS Code](https://code.visualstudio.com) or [Cursor](https://cursor.com) | — |

> 💡 **You do NOT install Next.js or React yourself.** They're project dependencies that
> `npm install` (below) downloads automatically. There's nothing global to set up for them.

> 🪟 **On Windows:** the smoothest path is to install **WSL** (Ubuntu) and run everything above
> inside it. Alternatively use [nvm-windows](https://github.com/coreybutler/nvm-windows) + [Git for
> Windows](https://git-scm.com/download/win). Ask if you get stuck.

### 1b. Run the site (the everyday steps)

```bash
# 1. Get the code (first time only)
git clone https://github.com/celestiaorg/celestia.org.git
cd celestia.org

# 2. Use the right Node version (the repo pins it in .nvmrc)
nvm use            # or: fnm use   → Node v22.11.0  (first time in the folder: nvm install)

# 3. Install dependencies (downloads Next.js, React, etc. — first run takes a minute)
npm install

# 4. Start the dev server
npm run dev        # → http://localhost:3000  (auto-reloads as you edit)
```

> **Heads up — the repo is heavy.** Git history is large (lots of video). If a full clone
> is painfully slow, ask for a **shallow clone**: `git clone --depth 1 <url>`.

Other commands you'll use:

| Command | What it does |
|---------|--------------|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build (also type-checks) |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run verify` | lint + typecheck + build — **runs automatically when you `git push`** |
| `npm run verify-seo` | Checks page metadata is valid |

---

## 2. The one mental model you need: **folders are pages**

This is a **Next.js App Router** site. The rule:

> A folder with a `page.tsx` inside `src/app/` becomes a URL.

```
src/app/(default)/about/page.tsx   →   celestia.org/about/
src/app/(default)/contact/page.tsx →   celestia.org/contact/
```

Three special pieces of folder syntax you'll see:

| Syntax | Meaning | Example here |
|--------|---------|--------------|
| `(name)` parentheses | **Route group** — organizes files, does NOT appear in the URL | `(default)/` wraps every page with the shared header + footer |
| `[slug]` square brackets | **Dynamic route** — one folder serves many URLs | `glossary/[slug]/page.tsx` → `/glossary/data-availability/` etc. |
| `_name` underscore | **Private folder** — Next.js **ignores it for routing** | `_button-preview/` is a dev-only showcase, not a live URL |

**That underscore trick is how you hide a page.** Want to park a page or keep a
work-in-progress off the live site? Put it in (or rename its folder to) an
underscore-prefixed folder and it instantly stops being a URL — no deleting needed.

> URLs here always end in a trailing slash (`/about/`). When you link internally, include it.

---

## 3. Where everything lives

```
src/
├── app/                  ← ROUTES live here (see §2). Plus root layout.tsx + fonts.ts
│   ├── (default)/        ← all real pages (share header/footer)
│   └── api/              ← backend endpoints (contact form, newsletter)
├── components/           ← the building blocks of pages (one folder each)
├── macros/               ← tiny reusable bits (buttons, headings, icons, grids)
├── data/                 ← page TEXT and SEO as typed TS objects  ←★ edit copy HERE
├── content/              ← Markdown pages (glossary, learn articles)
└── context/, lib/, utils/  ← plumbing, rarely touched

public/                   ← static files served as-is
├── images/  videos/      ← drop assets here, reference as "/images/foo.png"
└── fonts/                ← font files (don't add fonts without a license — see FONT-LICENSE.md)
```

**Two habits that save time:**
- Want to change wording on a page? It's almost always in `src/data/<page>/` — not the component.
- Want a new asset on a page? Put the file in `public/images/...` and reference it with a
  root-absolute path: `/images/my-thing.png`. (Images are served un-optimized, so export
  them at sensible sizes — don't drop a 10 MB PNG.)

### ⚠️ This repo is mid-redesign — old vs new

Some pages use the **new** design system, some are still on **legacy** components.
You'll almost always be working on the new ones:

- **New component families:** `NewHomepage/`, `NewPages/`, `PrivateDA/`, `Applications/`,
  `CaseStudies/`, `Brand/`, plus `HeaderNew/` + `FooterNew/` (the site-wide chrome).
- **New fonts:** use the `font-nuberNext` / `font-nuberNextWide` (headings) /
  `font-robotoMono` (mono) Tailwind classes.
- **Legacy** bits that remain (`Heroes/`, `Introduction/`, the `untitledSans`/`youth` fonts)
  belong to not-yet-ported pages. **Don't copy legacy patterns into new work** — use the
  `*New` / redesigned families. If you're unsure which a file is, ask.

---

## 4. How to build / prototype a new page

Copy the shape of an existing new page — here's the real pattern (from `/get-started`):

```tsx
// src/app/(default)/my-page/page.tsx
import Meta from "@/components/Meta/Meta";
import MyHero from "@/components/NewPages/MyPage/MyHero";
import seo from "@/data/my-page/seo";          // SEO title/description as a typed object

export const metadata = Meta(seo);             // ← wires up the <title>, social cards, etc.

export default function MyPage() {
  return (
    <div className="bg-[#040207]">
      <MyHero />
      {/* more sections... */}
    </div>
  );
}
```

So a new page = **three things**:
1. A folder + `page.tsx` under `src/app/(default)/` (the route).
2. Section components under `src/components/NewPages/MyPage/`.
3. Copy + SEO in `src/data/my-page/` (`seo.ts`, and `content.ts` for body text).

**Prototyping safely (recommended workflow):**
- Build it inside an **underscore folder** first, e.g. `src/app/(default)/_wip-my-page/` —
  it won't go live, but you can still preview it by temporarily renaming, or build the
  components and preview them in isolation.
- When it's ready, rename the folder to remove the underscore → it's live.
- Reuse existing `components/` and `macros/` (buttons, headings, `Container`) instead of
  reinventing — it keeps the design consistent and is faster.

**Dev-only pages (never shipped to production):** name the file `page.dev.tsx` instead of
`page.tsx`. The `.dev.*` extension is only registered as a route in development (see
`next.config.js` → `pageExtensions`), so it works locally but is excluded from the
production build entirely. Example: visit **`/dev`** locally — a live site map of every
page in the app (handy for finding routes). It does not exist on celestia.org.

---

## 5. Styling — Tailwind first

- **Default to Tailwind utility classes** in the JSX: `className="flex items-center gap-4 ..."`.
- **Design tokens** live in `tailwind.config.js` — use the named ones instead of raw hex
  where they exist (colors like `purple-soft`, the font families). The site's dark
  background is `#040207`.
- **Layout width:** wrap page content in `<Container size="2xl">` — it caps content width
  and adds the correct page gutters automatically. Don't hand-roll max-widths for full
  page sections.
- **Fonts in new work:** `font-nuberNext` (body), `font-nuberNextWide` (headings/display),
  `font-robotoMono` (tags/mono).
- **SCSS** (`.scss` files next to a component) is used only for a few complex animations/
  carousels. You almost never need to add new SCSS — reach for Tailwind first.

---

## 6. Git workflow — the rules

### Branching
- **Never commit directly to `main`.** `main` is the source of truth.
- Branch from `main`, named by type + short kebab description:

  ```bash
  git checkout main
  git pull
  git checkout -b feature/team-page-redesign
  ```

  Prefixes: `feature/…` (new work) · `fix/…` (bug) · `chore/…` (cleanup/config) ·
  `content/…` (copy/asset only). *(History has a mix of `feat/` and `feature/` — going
  forward, pick `feature/` and stick to it.)*

### Commits — Conventional Commits
Format: `type(scope): short description`

```
feat(about): add leadership grid section
fix(hero): stop homepage video stretching past 1520px
content(applications): update agentic payments copy
chore(assets): remove unused privateda video variants
```

Types: `feat` · `fix` · `content` · `chore` · `refactor` · `docs`. Keep the subject under
~70 chars, present tense, no trailing period. Commit small and often — one logical change
per commit beats one giant "stuff" commit.

### ✅ Commit / 🚫 Don't commit

| ✅ Commit | 🚫 Never commit |
|----------|----------------|
| Source code (`src/**`) | `node_modules/`, `.next/`, build output (gitignored) |
| Page data & content | `.env` / any secrets or API keys |
| Reasonably-sized assets you actually use | `.DS_Store` and editor junk (gitignored) |
| Config you intentionally changed | **Large videos without checking first** — they bloat the repo permanently (ask before adding anything over a few MB) |
| | Unrelated reformatting mixed into a feature commit |

### Pull requests
1. Push your branch: `git push -u origin feature/my-thing`
2. Open a PR **into `main`**, describe what + why, add a screenshot for visual changes.
3. `npm run verify` (lint + typecheck + build) runs automatically on push (a **pre-push
   hook**) — if it fails, the push is blocked. Fix the errors, don't bypass with `--no-verify`.
4. Get a review before merging. Don't merge your own PR for anything non-trivial.

---

## 7. Working with a coding agent

Driving Claude Code / Cursor / Codex? The standing rules live in
**[`AGENTS.md`](./AGENTS.md)** — the canonical, cross-tool agent guide (Codex reads it natively;
Cursor uses it via `.cursor/rules/`; Claude Code via `CLAUDE.md`, which points to it). Point your
agent at `AGENTS.md` and this guide, and you're set — no rules to copy-paste here.

---

## 8. Pre-push self-check ✅

Run through this before every push:

- [ ] On a feature branch off `main` (not on `main` itself)?
- [ ] `npm run dev` — page looks right at **mobile (~390px)** and **desktop (~1440px)**?
- [ ] `npm run verify` passes (lint + typecheck + build, no errors)?
- [ ] No `.env`, secrets, `node_modules`, or stray huge files staged? (`git status` to check)
- [ ] Commit messages are `type(scope): description`?
- [ ] Only files related to *this* change are included?
- [ ] Internal links include the trailing slash (`/about/`)?

---

## 9. Repo-specific gotchas (the stuff that'll trip you up)

- **Trailing slashes are required** on internal links.
- **Images are un-optimized** — export at the size you need; don't ship oversized files.
- **Two font systems exist** during the redesign — use the new `nuberNext*` fonts; ignore
  the legacy `untitledSans`/`youth`.
- **The git repo is large** (video history). Don't add more big binaries without asking;
  prefer shallow clones.
- **`docs/` is gitignored** — files put there won't be committed. (That's why this guide
  lives at the repo root.)
- **`/button-preview`** is a dev-only showcase page, not a real page — don't link to it.
- **The build is a hard type gate** — `next build` (and the pre-push hook) fail on TypeScript
  errors, so run `npm run typecheck` as you work.

Questions? Ask before guessing on anything involving deletions, fonts/licenses, or large
assets — those are the easy ways to create a mess. Everything else: experiment freely on a
branch, that's what they're for. 🚀
