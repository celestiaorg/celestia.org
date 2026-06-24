# Repo Health — celestia.org-new

**Snapshot date:** 2026-06-24 · **Branch audited:** `feat/changelog-redesign-port`
**Audited by:** structural + asset + dead-code sweep across `src/`, `public/`, config.

This is a point-in-time health report to clean up before onboarding a new contributor.
Pair it with [`ONBOARDING.md`](./ONBOARDING.md) (the contributor SOP).

---

## TL;DR — what to fix, in priority order

| # | Item | Impact | Effort | Priority |
|---|------|--------|--------|----------|
| 1 | **~151 MB of orphaned videos/images** in `public/` (139 files) | Bloats deploys & clones | Low (delete) | 🔴 P1 |
| 2 | **`/button-preview` is a live, crawlable dev route** | Dev scaffolding shipping to prod | Low | 🔴 P1 |
| 3 | **`.git` history is 5.3 GB** (committed video binaries) | Slow/huge clones for the new hire | Med–High | 🟠 P2 |
| 4 | **Dead code: ~50 unused modules** (see below) | Confusing for newcomers/agents | Low–Med | 🟠 P2 |
| 5 | **Stale README** (still create-next-app boilerplate, says "Inter") | Misleading first read | Low | 🟠 P2 |
| 6 | **Dead imports in root `layout.js`** (`Nav`, `Footer` imported, never rendered) | Minor confusion | Trivial | 🟡 P3 |
| 7 | **`druk` font wired but never applied** | Dead weight in font pipeline | Low | 🟡 P3 |
| 8 | **404 page (`not-found.js`) still uses the OLD `Nav`/`Footer`** | Inconsistent chrome + keeps a whole dead subtree alive | Med | 🟡 P3 |

> None of the above is *broken* — the site builds and runs. This is cleanup + de-risking before adding a contributor.

---

## Stack at a glance

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 15.5** (App Router) |
| UI | **React 18.3** |
| Styling | **Tailwind CSS 3.4** (utility-first) + **SCSS modules** for a few complex components |
| Animation | **framer-motion 11** (note: legacy `motion@10` also installed) |
| Fonts | `next/font/local` — NuberNext + Roboto Mono (new) · Untitled Sans + Youth (legacy) |
| Blockchain widget | **lumina-node** (WASM, light-node block counter) |
| Forms/3rd-party | Mailchimp (newsletter), reCAPTCHA, Plausible analytics |
| Node | **v20.2.0** (`.nvmrc`) · package manager: **npm** |
| Hosting | **Vercel** (preview deploys via Vercel CLI under the `designatives` scope) |
| Hooks | Husky **pre-push** runs `npm run lint` (no pre-commit hook) |

---

## Where things live

```
src/
├── app/                      # Routes (App Router). URL = folder path.
│   ├── (default)/            # Route group — shared HeaderNew + FooterNew layout. NOT in URL.
│   │   └── <page>/page.js    # One folder per page
│   ├── _archive/             # Underscore = NOT routed. Old pages parked here.
│   ├── api/                  # Route handlers (contact, health, subscribe)
│   ├── layout.js             # Root layout: <html>, fonts, analytics
│   └── fonts.js              # All next/font/local definitions
├── components/               # Feature components (PascalCase folders)
│   ├── NewHomepage/ NewPages/ PrivateDA/ Applications/ CaseStudies/ Brand/   # ← redesigned ("new")
│   ├── HeaderNew/ FooterNew/                                                  # ← new chrome (live)
│   └── Nav/ Footer/ Heroes/ Introduction/ ScrollText/ ...                     # ← legacy
├── macros/                   # Small primitives (Copy, Buttons, Grids, SVGs)
├── data/                     # Page content + SEO as plain JS objects (<page>/seo.js, content.js)
├── content/                  # Markdown (glossary, learn) + gray-matter front matter
├── lib/ utils/ hooks/        # Helpers
└── context/                  # React context providers
public/
├── videos/ images/ fonts/    # Static assets (served from / )
├── cells/                    # Self-contained "icon-generator" microsite (vanilla HTML/CSS)
└── favicons/ meta/           # Icons + social-share images
```

`@/*` → `src/*` (import alias). Trailing slashes are **on** (`/about/`, not `/about`).

---

## Redesign status — the central fact about this repo

A redesign ("prototype alignment") is **partially landed**. Understanding this explains 90% of the apparent mess:

- **Chrome:** ✅ fully migrated — every route uses `HeaderNew` + `FooterNew` via `(default)/layout.js`.
- **Pages:** 🟡 ~10 of ~34 ported to new component families; the rest still run on the legacy stack.
- **Fonts:** 🟡 two systems coexist on purpose — new pages use `nuberNext*`/`robotoMono`; legacy pages + the default `<body>` still use `untitledSans`/`youth`.

### Page inventory

**New / redesigned (10):** `/` · `/about` · `/applications` · `/brand` · `/build-with-us` · `/case-studies` · `/contact` · `/get-started` · `/private-blockspace` · *(plus `/button-preview` — dev only, see P1)*

**Legacy (still on old components, ~24):** all of `/learn/*` (11 pages) · `/glossary` + `/glossary/[slug]` · `/what-is-celestia` · `/what-is-da` · `/what-is-tia` · `/community` · `/ecosystem` · `/press` · `/careers` · `/privacy` · `/tos` · `/past-events` · `/run-a-light-node`

> No page mixes old + new *body* components — each commits to one family. The only cross-cut is the shared new chrome.

---

## Dead & stale code

Verified by reachability from live routes. **None of this is wired to a user-facing page** (except where noted).

### Fully dead — no imports anywhere (safe to delete)
`src/animations/TypeText.js` · `Accordion/Accordion.js` + `FAQAccordion.js` · `Breadcrumb/Breadcrumb.js` · `Carousel/VerticalCarousel.js` · `StructuredData/FAQ.js` · `ScrollText/views/HomepageScrollText.js` · `hooks/useHeaderTheme.js` · `lib/getPagesMetadata.js` · `lib/markdown.js` · `utils/getPosts.js` · `macros/Buttons/{GhostButtonNew,PrimaryButtonNew}.js` · `macros/SVGs/{EmailAltSVG,FacebookSVG,TwitterSVG,SVG}.js` · `macros/Forms/{index,FormInput,FormSelect,FormTextarea}.js` · `Lumina/hooks/useLuminaNode.jsx` (52-byte stub shadowing the real `.js`)

### Dead-for-production — only reachable from `_archive/` (non-routed)
The whole **old homepage tree** rooted at `HomeClient.js`: `Heroes/PrimaryHero` · `AlternatingMediaRows/*` · `AppsCarousel` · `Cards/ExploreCards/*` · `Ecosystem/EcosytemExplorer/*` (note the typo'd dir — the live one is `EcosystemExplorer`) · `Resources/*` (Blog, Podcast, Video, CommunityPosts, Whitepapers) · `Carousel/Carousel.js` · `CommunityCarousel` · `EventCarousel` · `EventList/EventCard` · `ProjectFilter/*` · `utils/{getFilterOptions,formatDate,tw-merge}.js` · 6 `Community*SVG` macros · most of `Lumina/*` (AutoConnectingLuminaNode, DynamicLuminaNode, NodeStatus, StoragePermissionTest, DebugPanel).

### Vestigial — alive only via the 404 page
`Nav/*` + `Footer/Footer.js` are rendered **only** by `src/app/not-found.js`. They are also imported-but-unused in root `layout.js`. They also keep a Lumina subtree (`BlockNumberDisplay` → `DynamicBlockNumberDisplay` → `AutoLuminaContext` → `hooks/useLuminaNode.js`) alive. **Migrate the 404 to `HeaderNew`/`FooterNew` and this entire cluster becomes deletable.**

---

## Orphaned assets — ~151 MB reclaimable (139 files)

- **Videos: ~101.5 MB / 30 files** — e.g. `hero-orb.webm` (18 MB), the unused `privateda_*` variant sets (~75 MB; only `privateda_offerings*` + `fibre_blockspace*` are live), `homepage-hero.mp4` (superseded by `hero-fibre.mp4`), the `*-anim.mp4` set, the `hero/under-*` set.
- **Images: ~49.7 MB / 109 files** — large unused hero PNGs (`build-hero-new-image.png` 8.8 MB, etc.), the entire `app/resources/**` set (thumbnails come from Ghost CMS, not local), legacy build/ecosystem/event icons, duplicate `.webp`/`.png` pairs where only one is used.
- **Keep:** `roboto-mono/RobotoMono-OFL.txt` (license file, never code-referenced but required for compliance).

A full per-file list was produced during the audit; regenerate before deleting and sanity-check against `git log` for anything intentionally staged for an upcoming page.

---

## Other notes

- **`.git` = 5.3 GB.** Video binaries committed over time bloat history. New contributors should clone shallow (`git clone --depth 1 …`). A proper fix (history rewrite via `git filter-repo`/BFG, or moving to Git LFS) is a **maintainer decision** — it rewrites history and forces everyone to re-clone, so don't do it casually.
- **README is create-next-app boilerplate** (mentions "Inter" font, default Vercel copy) — rewrite or point to `ONBOARDING.md`.
- **Two animation libs:** both `framer-motion@11` and `motion@10` are dependencies. Confirm which is actually used and drop the other.
- **`.DS_Store` files** exist on disk under `public/images/` but are correctly gitignored (not tracked) — fine, just delete locally.
- **Branch/commit naming is inconsistent** across history (`feature/*` vs `feat/*`; plain vs Conventional Commits). `ONBOARDING.md` standardizes this going forward.

---

## Suggested cleanup sequence

1. **Delete orphaned assets** (P1) — biggest, safest win. ~151 MB out of the working tree.
2. **Remove or gate `/button-preview`** (P1) — move under `_components-preview` (underscore = unrouted) or delete.
3. **Delete fully-dead modules** (P2) — the "no imports anywhere" list.
4. **Migrate `not-found.js` to `HeaderNew`/`FooterNew`** (P3), then delete the `Nav`/`Footer`/dead-Lumina cluster and the `_archive/` folder.
5. **Drop `druk`** from `fonts.js` + `layout.js`; remove its files.
6. **Rewrite the README** to point at `ONBOARDING.md`.
7. **Decide on `.git` bloat** (maintainer call) — shallow-clone in the meantime.

Do each as its own small PR so review is easy and rollback is clean.
