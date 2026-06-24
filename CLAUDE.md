# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Follow [AGENTS.md](./AGENTS.md)** — it's the canonical, cross-tool agent guide (guardrails,
> conventions, the `npm run verify` gate, git workflow). The notes below add Claude-specific
> architecture context. For the human contributor tour see [ONBOARDING.md](./ONBOARDING.md).

## Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build (also type-checks)
npm run start        # Start production server
npm run lint         # Run ESLint (flat config)
npm run typecheck    # tsc --noEmit
npm run verify       # lint + typecheck + build (the pre-push gate)
npm run verify-seo   # Verify SEO metadata

# Node version
nvm use              # Use version from .nvmrc
```

## Architecture Overview

This is the Celestia.org marketing website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. The `src/` tree is fully TypeScript (`.ts`/`.tsx`); components/pages use `.tsx`. The build runs on Node 22 and uses the webpack builder (`next build --webpack`) to preserve the lumina-node WASM pipeline.

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (default)/          # Route group with shared Nav/Footer layout
│   │   ├── page.js         # Homepage
│   │   ├── ecosystem/      # Ecosystem explorer
│   │   ├── learn/          # Learning content (beginners/intermediates)
│   │   ├── glossary/       # Dynamic glossary pages
│   │   └── ...             # Other static pages
│   ├── api/subscribe/      # Mailchimp newsletter API endpoint
│   └── styles/             # Global SCSS styles
├── components/             # React components (mostly server components)
├── macros/                 # Reusable micro-components
│   ├── Copy/               # Typography (Display, Heading, Body, RichText)
│   ├── Buttons/            # Button variants (Primary, Secondary, Ghost, etc.)
│   ├── Grids/              # Layout (Row, Column)
│   └── SVGs/               # Icon components
├── data/                   # Static data as JS objects (page content, configs)
├── content/                # Markdown content (glossary terms)
├── lib/                    # Content processing (getPostsMetadata)
├── utils/                  # Utility functions
└── context/                # React context (BannerContext, ScrollPosition)
```

### Key Patterns

**Page Structure**: Each page exports metadata via `Meta()` helper and renders component compositions:
```javascript
import Meta from "@/components/Meta/Meta";
import seo from "@/data/{page}/seo";
export const metadata = Meta(seo);
```

**Client Components**: Marked with `"use client"` directive when they need interactivity (Nav, carousels, forms).

**Data Flow**: Static data in `/src/data/` → Page components → UI components. Markdown content parsed with `gray-matter`.

**Styling**: Tailwind-first with SCSS modules for complex component styles. Uses `clsx` and `tailwind-merge` for dynamic classes.

### Import Alias

`@/*` maps to `./src/*` - use absolute imports like `@/components/Nav/Nav`.

### Environment Variables

Required for full functionality (see `sample.env`):
- `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_SERVER_PREFIX`
- `RECAPTCHA_SECRET_KEY`

### Special Configurations

- **WebAssembly**: Enabled for `lumina-node` blockchain integration
- **Trailing slashes**: Enabled in URLs
- **Image optimization**: Disabled (uses unoptimized images)
- **Analytics**: Plausible at `plausible.celestia.org`

### Component Conventions

- Components in `/src/components/` are organized by feature
- Macros in `/src/macros/` are small, reusable primitives
- Typography uses Display/Heading/Body components with size props
- Buttons support `href` (links) or `onClick` (actions)

### Content Management

- **Markdown**: Glossary and learn content in `/src/content/` with YAML front matter
- **Data files**: Structured content in `/src/data/` as exported JS objects
- **External**: Blog posts fetched from Ghost CMS at `blog.celestia.org`
