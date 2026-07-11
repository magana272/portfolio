# Handoff — Manuel Magana Portfolio

A single-page editorial portfolio (home page + one case-study page per project).
Vanilla HTML/CSS/JS, **no build step**, deployed to GitHub Pages.
Live: https://magana272.github.io/portfolio/

---

## ⚠️ Read this first: the site must be served over HTTP

The JS is **ES modules** and the shared nav is loaded as an **HTML partial via
`fetch`**. Both are blocked by the browser on `file://`. If you open
`index.html` by double-clicking it, the page renders **blank / with no menu**.

Always serve it:

```bash
python3 -m http.server 5500      # then open http://127.0.0.1:5500/
# or VS Code Live Server (the repo is set up for it), or GitHub Pages
```

There is still no build/bundler — the browser loads the modules directly.

---

## Architecture (after this session's reorganization)

The project was reorganized from a loose pile of globally-scoped scripts into a
layered, buildless structure.

### JavaScript — ES modules, one entry point per page, class-based pages
- Each HTML page loads a **single** `<script type="module">`
  (`assets/js/pages/home.js` or `assets/js/pages/project.js`); the browser pulls
  in the rest of the import graph.
- Dependencies point downward only: `pages → features/content → models → core`.
- **No `window.*` globals.** `core.js` exports named helpers
  (`esc, slugify, padNum, complement, triad, isVideo, reducedMotion,
  formatTechList`) that everything imports.
- **Class layer (added 2026-07-10):** `Page` is the base class every page
  controller extends (`HomePage`, `DeepDivePage`). `Page.init()` owns the
  shared boot order: paint the Section bands → subclass `render()` → await the
  nav partial → build the `Menu` → subclass `onNavReady()`. A page is: data
  (its `Section[]` + link prefix) plus those two hooks.
- **`SECTIONS` (content/sections.js) is the single source of truth** for the
  home bands: document order, menu label + cluster, band background colour,
  the orb theme triple, and (on the Projects band) the `sublist` — the menu's
  project jump-list entries, built from `PROJECTS`. The Menu builds its links
  AND the jump-list from it on BOTH pages, the scroll spy themes the orb from
  it, and each Section paints its own band background (the old per-id
  background rules are gone from the CSS).
- **`Menu` (features/menu.js) is a class** and the only writer of the `--orb-*`
  custom properties (`applyTheme({flood, ink, hot})`). The orb-theming block
  that used to be duplicated in scroll-spy.js and pages/project.js now has one
  copy here.

```
assets/js/
  core.js                 shared helpers (named exports)
  includes.js             HTML-partial loader; exports `ready` (a Promise)
  models/
    section.js            class Section (id, title, group, background, orb theme, sublist)
    project.js            class Project (data + renderFeature)
    experience.js         class Experience (data + render)
    deep-dive.js          class DeepDive (project + case-study copy → page markup,
                          one method per block: summary, media, highlights, ...)
  content/                pure data
    sections.js           SECTIONS (array of Section — the nav/band source of truth)
    projects.js           PROJECTS (array of Project)
    experiences.js        EXPERIENCES
    deep-dives.js         DEEP_DIVES (case-study copy, keyed by slug)
    photos.js             PHOTOS (photography mosaic)
  features/
    menu.js               class Menu — builds links from sections, hold-to-open,
                          applyTheme() (the only writer of --orb-*)
    scroll-spy.js         active-section spy; themes the orb via menu.applyTheme()
    media-loader.js       on-screen video + progressive images (home)
    photo-mosaic.js       masonry + FLIP expand + JJ tags (home)
    pager.js              section pager triangles (home)
  pages/
    page.js               class Page — the shared boot sequence (base class)
    home.js               class HomePage extends Page — panels + features + spy
    project.js            class DeepDivePage extends Page — pairs ?id with its
                          copy, delegates markup to the DeepDive model
```

### Reusable markup — HTML partials
- Shared markup lives under `partials/`. `partials/nav.html` is now just the
  **shell** (orb button, overlay, kicker, empty link containers, footer links);
  the Menu class fills `.nav-menu-links` and `.nav-menu-off` from `SECTIONS`.
- A page marks the slot with `<div data-include="partials/nav.html">`;
  `assets/js/includes.js` fetches the file and swaps it in.
- Cross-page links: the deep-dive page no longer uses `data-link-prefix` (the
  partial has no `#anchor` links left) — `DeepDivePage` passes
  `linkPrefix: 'index.html'` and the Menu prefixes the hrefs it generates.
  The `data-link-prefix` mechanism still exists in `includes.js` for future
  partials.
- `Page.init()` awaits `includes.js`'s exported `ready` promise before
  building the Menu / wiring nav-dependent behaviour.

### CSS — split by concern, one entry file
`assets/css/main.css` is the only stylesheet either page links; it `@import`s
the 13 concern files in **cascade order**:
`base, nav, hero, sections, projects, experience, education-skills, life,
footer, responsive, print, deep-dive, pager`.
Band backgrounds (`#education`, `.life-panel`, the hero, `.work-sections`) no
longer live in the CSS — each Section applies its own `background` from
`content/sections.js` at boot (the values still reference the `--band-*`
tokens in `base.css`).

### Static assets
Images, videos, and PDFs live under `static/`:
- `static/media/img/…`, `static/media/vid/…`
- `static/resumes_and_cvs/…`

Paths in the HTML/JS/meta-tags are all `static/media/…` / `static/resumes_and_cvs/…`.

---

## What changed in the class-refactor session (2026-07-10, later)
1. **Class architecture:** new `Page` base class (`pages/page.js`) owning the
   shared boot sequence; `HomePage` and `DeepDivePage` extend it. The
   duplicated `includesReady.then(...)` boot blocks are gone.
2. **`Section` model + `SECTIONS` content list:** each home band is a Section
   (id, menu title, cluster, background colour, orb theme). The old
   `ORB_THEMES` map in scroll-spy.js and the per-id background rules in the
   CSS both dissolved into it.
3. **`Menu` class:** builds the nav link lists from the page's sections
   (partial is now a shell), owns hold-to-open, and `applyTheme()` is the
   single copy of the `--orb-*` theming (was duplicated in scroll-spy.js and
   pages/project.js; the deep dive's muted mix moved from 55% → 60% in the
   unification).
4. **Nav hover previews the destination:** every generated link carries
   `--item-hover` (its section's band background; project sub-links use the
   project tint) and nav.css blends it 75/25 with the current ink on hover.
   Resting menu still wears exactly the flood/ink/hot triple; active stays
   muted ink.
5. **One stylesheet entry:** both pages link only `assets/css/main.css`, which
   `@import`s the 13 concern files (the duplicated 13-link `<head>` blocks are
   gone).
6. **`DeepDive` model (models/deep-dive.js):** the deep-dive markup moved out
   of the page controller into a model class (one method per block), matching
   the Project/Experience pattern. Verified byte-identical output for all 8
   case studies. `DeepDivePage` is now just lookup, not-found, tint wash,
   `new DeepDive(project, cs).html()`, and the outline scroll wiring.
7. **`pages/nav-sublist.js` deleted:** the project jump-list is Section data
   now — the Projects Section carries `sublist` entries (built from PROJECTS
   in content/sections.js) and `Menu.build()` renders them. Verified identical
   markup for both link prefixes.

## What changed the previous session (high level)
1. Reorganized JS into the layered ES-module structure above (was ~13 loose
   scripts with global load-order coupling).
2. Removed dead code: `Project.renderCard()` (unused, called an undefined fn),
   the `bullets`/`takeaway`/`featured` project fields (never rendered), and a
   dead `hexToHsl`/`complement` copy in the deep-dive controller.
3. Split the monolithic `styles.css` into 13 concern files.
4. Wired the **section pager** to the home page (it was previously loaded on the
   deep-dive page, which has no panels to page through) + added its button markup.
5. Mobile fixes: re-enabled the (commented-out) rule that stacks the Work panels
   on ≤900px; `scrollbar-gutter: stable` to stop the menu-open jump;
   `justify-content: safe center` so a tall menu doesn't clip on short screens.
6. Extracted the shared nav into `partials/nav.html` + the include loader.
7. Converted the whole JS layer to ES modules (single entry point per page).
8. DRY pass: shared `formatTechList` in `core.js` (was duplicated in both
   models); renamed `pages/include.js` → `pages/nav-sublist.js` to end the
   collision with `includes.js`; made `buildNavSublist(prefix)` page-aware so the
   deep-dive menu's project links point back to `index.html#work-<slug>`.
9. Moved `media/` and `resumes_and_cvs/` under `static/`.

---

## Open items / known state
- **Nav number alignment is NOT done.** We explored making the `01–05` menu
  numbers line up in a column (justified: numbers left, labels flush-right, with
  the wider project sub-list kept from inflating the width via a
  `width:0 / min-width:100%` trick + `max-content` rows). That work was reverted;
  the menu is currently the original **flush-right with ragged numbers**. Revisit
  if column-aligned numbers are still wanted — the tricky part is the nested
  "Work" sub-list, whose long project names are wider than the main labels.
- **Nothing is committed yet.** `git status` shows the old files as deleted and
  `assets/css/`, `assets/js/`, `partials/`, `static/` as untracked. Because the
  media/resumes move + the JS reshuffle happened in the working tree, git sees
  deletes + adds rather than renames. Recommend committing to snapshot the new
  structure (and `git add` the new dirs).
- **Menu label:** item 02 reads "Projects"; it now lives in
  `assets/js/content/sections.js` (the partial no longer carries labels).
- **Band paint timing:** section backgrounds are applied by JS at boot. On a
  slow first load the bands could flash white for a beat before the module
  executes. If that's ever visible, the fix is inlining a tiny critical style
  or reverting the backgrounds to CSS while keeping them mirrored in SECTIONS.
- **Hover preview vs the three-colour rule:** hover showing the destination
  band's colour was this session's request; the *resting* menu still keeps the
  strict flood/ink/hot triple. If the hover preview turns out to be unwanted,
  revert the three `:hover` rules in nav.css to `color: var(--orb-muted, ...)`.
- **Mobile:** the responsive fixes are in but were only reasoned from CSS —
  worth a visual pass on a real phone width.
- An auto-formatter/linter has been actively editing files mid-session (e.g.
  toggling `width: fit-content`, tweaking colors). Re-check a file's current
  state before assuming an edit stuck.

---

## Conventions
- **No em dashes** in copy — use commas, colons, parentheses, or middots.
- **Menu orb three-colour rule:** each band uses exactly flood / ink / hot; the
  "hot" colour appears only on the list numbers and project sub-tags.
- **Keep the asymmetric photo masonry** — fix issues within it, don't swap to a
  justified-rows layout.
- Voice: software-engineer-first (don't frame Manuel as a scientist who found code).

## Deploy
GitHub Pages. CI (`.gitlab-ci.yml`, if used) copies every top-level directory
into `public/`, so `static/`, `partials/`, `assets/` deploy automatically — no
path allowlist to maintain.
