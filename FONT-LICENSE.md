# Font Licensing — NuberNext

The website's `public/fonts/nubernext/*.woff2` files are the **licensed webfonts**
from the foundry (full character sets), not trial/subset cuts.

## NuberNext — The Northern Block Ltd

- **Foundry:** The Northern Block Ltd (Corbridge, Northumberland, England)
- **Order #:** 2305618654760674271
- **Licences held:** **Web** EULA (webfont, `@font-face`) **+ Desktop** EULA
- **EULAs on file:** `licenses/nubernext/NuberNext-Web-EULA.html`, `licenses/nubernext/NuberNext-Desktop-EULA.html`

### Cuts in use on the site

| File (`public/fonts/nubernext/`) | Typeface | Role |
|---|---|---|
| `NuberNext-Regular.woff2` | NuberNext Regular | body (400) |
| `NuberNext-DemiBold.woff2` | NuberNext DemiBold | body emphasis (500) |
| `NuberNextWide-Regular.woff2` | NuberNext **Wide** Regular | display fallback (400) |
| `NuberNextWide-DemiBold.woff2` | NuberNext **Wide** DemiBold | headings / display (500) |
| `NuberNextWide-Bold.woff2` | NuberNext **Wide** Bold | headings / display (600) |
| `NuberNextExtended-Bold.woff2` | NuberNext **Extended** Bold | big stat numerals (700) |

> Note: "Wide" and "Extended" are **two different widths** of NuberNext. Headings use
> Wide; the large stat numbers use Extended. Both are covered by this order.
>
> Weight remap (see `src/app/fonts.js`): NuberNext DemiBold = 500, Wide DemiBold = 500,
> Wide Bold = 600, Extended Bold = 700.

### Licence terms (summary — see the EULA files for the binding text)

- **Web:** may be used as a webfont (`@font-face`) for a **pre-purchased number of domains**.
  If the number of domains grows beyond what was purchased, an updated licence is required first.
  → Make sure `celestia.org` (and any staging/preview domains that serve these fonts) are within the purchased domain count.
- **Not permitted** without further/other licensing: use inside a logo or trademark; in interactive
  software / video games; in electronic templates; desktop static-image creation (that is the **Desktop**
  licence's scope — held separately, covers Figma / exported images).

## Roboto Mono (monospace)

- `public/fonts/roboto-mono/RobotoMono-Variable.woff2` — **SIL Open Font License 1.1** (free).
  See `public/fonts/roboto-mono/RobotoMono-OFL.txt`. Not part of the Northern Block order.
