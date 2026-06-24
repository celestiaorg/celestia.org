# Onboarding & Working Guide — celestia.org-new

Welcome 👋 This is the guide for working on the Celestia website. It's written to be
read top-to-bottom once, then used as a checklist. It works whether you're editing by
hand or driving a coding agent (Claude/Cursor/etc.) — there's a section for the agent too.

For the *state* of the repo (what's clean, what's messy), see [`REPO-HEALTH.md`](./REPO-HEALTH.md).

---

## 1. Get running in 5 minutes

```bash
# 1. Use the right Node version (the repo pins it in .nvmrc)
nvm use            # → Node v20.2.0  (if missing: nvm install 20.2.0)

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev        # → http://localhost:3000  (auto-reloads as you edit)
```

> **Heads up — the repo is heavy.** Git history is large (lots of video). If a full clone
> is painfully slow, ask for a **shallow clone**: `git clone --depth 1 <url>`.

Other commands you'll use:

| Command | What it does |
|---------|--------------|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build — **run this before pushing** if you changed anything structural |
| `npm run lint` | ESLint — this also runs automatically when you `git push` |
| `npm run verify-seo` | Checks page metadata is valid |

---

## 2. The one mental model you need: **folders are pages**

This is a **Next.js App Router** site. The rule:

> A folder with a `page.js` inside `src/app/` becomes a URL.

```
src/app/(default)/about/page.js   →   celestia.org/about/
src/app/(default)/contact/page.js →   celestia.org/contact/
```

Three special pieces of folder syntax you'll see:

| Syntax | Meaning | Example here |
|--------|---------|--------------|
| `(name)` parentheses | **Route group** — organizes files, does NOT appear in the URL | `(default)/` wraps every page with the shared header + footer |
| `[slug]` square brackets | **Dynamic route** — one folder serves many URLs | `glossary/[slug]/page.js` → `/glossary/data-availability/` etc. |
| `_name` underscore | **Private folder** — Next.js **ignores it for routing** | `_archive/` holds old pages that no longer produce URLs |

**That underscore trick is how you hide a page.** Want to park a page or keep a
work-in-progress off the live site? Put it in (or rename its folder to) an
underscore-prefixed folder and it instantly stops being a URL — no deleting needed.

> URLs here always end in a trailing slash (`/about/`). When you link internally, include it.

---

## 3. Where everything lives

```
src/
├── app/                  ← ROUTES live here (see §2). Plus root layout.js + fonts.js
│   ├── (default)/        ← all real pages (share header/footer)
│   ├── _archive/         ← old pages, NOT live (don't bring these back without asking)
│   └── api/              ← backend endpoints (contact form, newsletter)
├── components/           ← the building blocks of pages (one folder each)
├── macros/               ← tiny reusable bits (buttons, headings, icons, grids)
├── data/                 ← page TEXT and SEO as plain JS objects  ←★ edit copy HERE
├── content/              ← Markdown pages (glossary, learn articles)
└── context/, lib/, utils/, hooks/  ← plumbing, rarely touched

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
- **Legacy** stuff (`Nav/`, `Footer/`, `Heroes/`, `Introduction/`, `HomeClient`, the
  `untitledSans`/`youth` fonts) belongs to not-yet-ported pages. **Don't copy legacy
  patterns into new work.** If you're unsure which a file is, ask.

---

## 4. How to build / prototype a new page

Copy the shape of an existing new page — here's the real pattern (from `/get-started`):

```js
// src/app/(default)/my-page/page.js
import Meta from "@/components/Meta/Meta";
import MyHero from "@/components/NewPages/MyPage/MyHero";
import seo from "@/data/my-page/seo";          // SEO title/description as a JS object

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
1. A folder + `page.js` under `src/app/(default)/` (the route).
2. Section components under `src/components/NewPages/MyPage/`.
3. Copy + SEO in `src/data/my-page/` (`seo.js`, and `content.js` for body text).

**Prototyping safely (recommended workflow):**
- Build it inside an **underscore folder** first, e.g. `src/app/(default)/_wip-my-page/` —
  it won't go live, but you can still preview it by temporarily renaming, or build the
  components and preview them in isolation.
- When it's ready, rename the folder to remove the underscore → it's live.
- Reuse existing `components/` and `macros/` (buttons, headings, `Container`) instead of
  reinventing — it keeps the design consistent and is faster.

**Dev-only pages (never shipped to production):** name the file `page.dev.js` instead of
`page.js`. The `.dev.js` extension is only registered as a route in development (see
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
3. `npm run lint` runs automatically on push (a **pre-push hook**) — if it fails, the push
   is blocked. Fix lint errors, don't bypass.
4. Get a review before merging. Don't merge your own PR for anything non-trivial.

---

## 7. Working with a coding agent

If you're driving Claude/Cursor/etc., give it these standing rules (paste into its context):

- **This is Next.js 15 App Router.** Folders under `src/app/` with `page.js` are routes.
  Underscore-prefixed folders (`_archive`) are not routed.
- **Match the surrounding code** — Tailwind-first, the `font-nuberNext*` fonts for new
  pages, `<Container size="2xl">` for page width, `@/` import alias for `src/`.
- **Edit copy in `src/data/<page>/`, not inside components.**
- **Don't resurrect legacy components** (`Nav`, `Footer`, `HomeClient`, `Heroes`,
  `untitledSans`/`youth` fonts) into new work — use the `*New` / redesigned families.
- **Don't add large binaries** (videos) — flag them for a human instead.
- **Verify before claiming done:** run `npm run build` and `npm run lint`; for visual
  changes, actually look at the page in a browser at mobile + desktop widths.
- **One branch, small commits, Conventional Commit messages** (§6).
- Don't touch `src/app/_archive/**`, `public/cells/**`, or font files unless asked.

---

## 8. Pre-push self-check ✅

Run through this before every push:

- [ ] On a feature branch off `main` (not on `main` itself)?
- [ ] `npm run dev` — page looks right at **mobile (~390px)** and **desktop (~1440px)**?
- [ ] `npm run build` succeeds (no errors)?
- [ ] `npm run lint` passes?
- [ ] No `.env`, secrets, `node_modules`, or stray huge files staged? (`git status` to check)
- [ ] Commit messages are `type(scope): description`?
- [ ] Only files related to *this* change are included?
- [ ] Internal links include the trailing slash (`/about/`)?

---

## 9. Repo-specific gotchas (the stuff that'll trip you up)

- **Trailing slashes are required** on internal links.
- **Images are un-optimized** — export at the size you need; don't ship oversized files.
- **Two font systems exist** during the redesign — use the new `nuberNext*` fonts; ignore
  `untitledSans`/`youth`/`druk`.
- **The git repo is large** (video history). Don't add more big binaries without asking;
  prefer shallow clones.
- **`docs/` is gitignored** — files put there won't be committed. (That's why this guide
  lives at the repo root.)
- **`/button-preview`** is a dev-only showcase page, not a real page — don't link to it.
- **`_archive/` is old, dead code** — read it for reference if useful, but don't wire it
  back into the live site.

Questions? Ask before guessing on anything involving deletions, fonts/licenses, or large
assets — those are the easy ways to create a mess. Everything else: experiment freely on a
branch, that's what they're for. 🚀
