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
node scripts/serve.mjs 5500      # then open http://127.0.0.1:5500/
# or python3 -m http.server 5500, VS Code Live Server, or GitHub Pages
```

There is still no build/bundler — the browser loads the modules directly.

---

## Architecture (pages / sections / shared, zero dependencies)

Three tiers: routes under `pages/` compose the site, one folder per page
section under `components/section/<name>-section/` renders it (JS + its own
CSS co-located, so "edit this section's format" always has one obvious
place), and `components/shared/` holds the few cross-page primitives (nav,
pager). Shared helpers live in `lib/`, pure data in `content/`, global
styles in `styles/`. It is plain buildless ESM; there is no framework or
bundler.

```
index.html                          home route (root; GitHub Pages requirement)
pages/                              route controllers, one folder per route
  page.js                           class Page — the shared boot sequence (base class)
  home/home-page.js                 class HomePage extends Page — mounts the bands, panels, spy
  deep-dive/deep-dive.html          deep-dive route (<base href="../../">)
  deep-dive/deep-dive-page.js       class DeepDivePage extends Page — pairs ?id with
                                    its copy, delegates markup to the DeepDive model
  deep-dive/deep-dive.js + .css     class DeepDive (case study → markup), co-located
                                    with its page (page content, not a home section)
  project.html                      redirect stub → deep-dive/deep-dive.html (+ query)
  project/project.html              redirect stub at the older co-located URL, same target
components/section/                 one folder per home section, each owning its CSS
  section.js + section.css          class Section — the primitive (id, title, group,
                                    background, theme, tag, sublistGroup)
  about-section/about-section.css   hero band styles (moved out of styles/hero.css;
                                    the hero markup stays inline in index.html)
  projects-section/
    project.js                      class Project (data + renderFeature; href() → deep dive)
    projects-section.css            the shared panel template all 8 bands use
    <slug>.css × 8                  per-project overrides (paypath.css, whattodo.css, ...),
                                    scoped to #work-<slug>, imported after the template —
                                    the place to tweak ONE project band's format
  experience-section/experience.js + experience-section.css
                                    class Experience (headHtml/bodyHtml/asideHtml)
  education-section/education.js + education-section.css
  skills-section/skills.js + skills-section.css
  about-me-section/me.js + about-me-section.css
  photography-section/photo-mosaic.js + photography-section.css
  jiujitsu-section/jiujitsu.js + jiujitsu-section.css
  listening-section/listening.js + listening-section.css
components/shared/                  cross-page primitives only
  nav/nav.html                      shell partial (orb + overlay + empty lists)
  nav/nav.js                        class Menu — builds links from sections, hold-to-open,
                                    applyTheme() (the ONLY writer of --orb-*)
  nav/nav.css                       orb + overlay + menu styles (uses --orb-hover/--orb-active)
  nav/scroll-spy.js                 active-section spy; themes the orb via menu.applyTheme()
  pager/pager.js + pager.css        section pager triangles (home)
lib/
  core.js                           shared helpers (esc, slugify, padNum, complement, triad,
                                    isVideo, reducedMotion, formatTechList)
  theme.js                          SECTIONTHEME — the orb/band colour registry, one theme
                                    per band keyed by name/title; models look theirs up here
  includes.js                       HTML-partial loader; exports `ready` (a Promise)
  media-loader.js                   on-screen video + progressive image upgrades (home)
content/                            pure data
  sections.js                       SECTIONS — the nav/band source of truth (id, title,
                                    cluster, background); each project is a
                                    group:'project' Section built from PROJECTS
  projects.js  experiences.js  deep-dives.js  photos.js
  education.js  skills.js  me.js  jiujitsu.js  listening.js   (the five content bands)
styles/
  main.css                          the only <link>; @imports everything in cascade order
  base.css  hero.css  footer.css  responsive.css  print.css   global / page sheets only
static/                             images, video, PDFs
tests/ + playwright.config.js       Playwright suite: visual baselines + smoke (npm test)
scripts/
  serve.mjs                         keep-alive static server for dev/tests (node scripts/serve.mjs)
  check-boundaries.mjs              import-tier lint, wired as npm pretest
```

Rules that keep it coherent (lint-enforced by `scripts/check-boundaries.mjs`,
which runs as `npm test`'s pretest):
- **Tiers point downward only:** `pages` may import anything below it; a
  section dir under `components/section/` imports only `lib` (and may import
  the Section primitive, `components/section/section.js`) — NEVER another
  section's directory (promote shared code to `components/shared/` or
  `lib/`); `components/shared` imports only `lib`; `lib` imports only `lib`.
  `content/` is pure data but constructs the model classes it holds data for
  (`content/projects.js` builds `Project`s), so `content → section/shared`
  is the one allowed upward-looking edge (no cycle: the models never import
  `content`). Sections don't reach into `content/` themselves; pages inject
  data (e.g. `initPhotoMosaic(PHOTOS)`, `renderEducation(EDUCATION)`). The
  SECTIONTHEME colour registry lives in `lib/theme.js` precisely so the
  `Project` and `Section` models can look their theme up without a
  section/shared → content import.
- **No `window.*` globals**; every page loads a single
  `<script type="module">` entry and the browser pulls in the import graph.
- **Class layer — the Page lifecycle:** `Page.init()` runs `layout()` (build
  the DOM: base paints the Section bands, subclass mounts its components and
  panels) → `render()` (wire behaviour over that structure: media loader,
  pager, deep-dive outline) → await the nav partial → build the `Menu` →
  `onNavReady()` (nav-dependent: scroll spy, menu theming). `Page.mount(id,
  html)` fills a section shell, a no-op when the id isn't on the page.
  `SECTIONS` is the single source of truth for the menu and bands on BOTH
  pages; the deep-dive page passes `linkPrefix: 'index.html'` and the Menu
  prefixes the hrefs it generates (`data-link-prefix` is unused but still
  supported by `lib/includes.js`).
- **`index.html` is a thin shell:** the five content bands (education, skills,
  about-me, jiu-jitsu, listening) are empty `<section id>` elements whose
  bodies `HomePage.layout()` mounts from their components + `content/` data —
  the same pattern as the project/experience panels. Only photography keeps a
  small static head in the HTML (its mosaic is JS-filled).
- **Theming flows one way: registry → vars → rules.** A band's whole colour
  story lives in its SECTIONTHEME entry (`lib/theme.js`), in two groups:
  `orb: {flood, ink, hot, hover, active}` for the menu (consumed only by
  `Menu.applyTheme()`, the single writer of `--orb-*`), and
  `band: {accent, ink, inkMid, inkSoft, line, pink}` for the band's own
  content, every key optional. `themeVars()`/`applyThemeVars()` in the same
  file are the ONLY mapping from band keys to the band-level custom
  properties (`--sec-accent`, `--sec-ink`, `--sec-ink-mid`, `--sec-ink-soft`,
  `--sec-line`), applied by `Section.applyBackground()`,
  `Project.styleVars()`, and the deep-dive page (where `--sec-accent` feeds
  `--pink`). `band.pink` is the project panel's card accent, applied by
  `Project.styleVars()` only (the old per-project `ink` field in
  content/projects.js moved here). CSS holds every rule that consumes the
  vars, always with a :root-token fallback
  (`var(--sec-ink, var(--on-dark))`, `var(--sec-line, var(--line))`), so a
  band with no theme keys renders from the global tokens. JS never
  hard-codes a colour or picks a fallback anywhere else; to retune a band,
  edit its theme entry, not a stylesheet and not a controller.
- **Every section owns its CSS:** to change a section's format, open its dir
  (`components/section/experience-section/experience-section.css`, ...). The
  hero lives in `about-section/about-section.css`. To change ONE project
  band, edit its override sheet (`projects-section/whattodo.css`, scoped to
  `#work-whattodo`); the shared panel template is
  `projects-section/projects-section.css`. `styles/` holds only genuinely
  global/page sheets (base, footer, responsive, print) plus the shared
  `.life-note` utility (in `base.css`). `styles/main.css` `@import`s the
  section sheets in band order.
- **CSS:** `styles/main.css` `@import`s global files from `styles/` and each
  section's stylesheet from its folder. The order is load-bearing (base → nav
  → about/hero → section → projects template → the 8 per-project overrides →
  the other band sheets → footer → responsive → print → deep-dive → pager):
  change only paths when moving files, never the order. Band backgrounds are
  Section data, not per-id CSS rules; the `--band-*` palette tokens stay in
  `styles/base.css`.
- **Routes:** the canonical deep-dive URL is
  `pages/deep-dive/deep-dive.html?id=<slug>`; `Project.href()` points there.
  A moved route always leaves a `location.replace(... + location.search +
  location.hash)` stub at the old path: both `pages/project.html` and
  `pages/project/project.html` redirect old links, preserving `?id=` and
  `#hash`.
- **Tests are the move-safety net:** every import/`@import`/`src`/`href`/
  `data-include` is a literal relative path, so a missed path after a file
  move is a silent runtime 404. Before committing a move, run `npm test`
  (Node 18+, see `.nvmrc`): the boundary lint checks every import resolves,
  the assets spec fails on any local response >= 400, and the visual specs
  diff both pages against committed baselines (`npm run test:update`
  re-captures them after an intended visual change; snapshots are
  darwin-specific, so treat the visual gate as local-only).

### Static assets
Images, videos, and PDFs live under `static/`:
- `static/media/img/…`, `static/media/vid/…`
- `static/resumes_and_cvs/…`

Paths in the HTML/JS/meta-tags are all `static/media/…` / `static/resumes_and_cvs/…`.

---

## What changed in the theme-schema pass (2026-07-11, latest)
- **SECTIONTHEME entries restructured into `orb` + `band` groups.** The orb
  quintet keeps its keys inside `orb: {...}`; the band group grows to
  `{accent, ink, inkMid, inkSoft, line, pink}` (all optional), delivered to
  CSS as `--sec-accent`, `--sec-ink`, `--sec-ink-mid`, `--sec-ink-soft`,
  `--sec-line` by the same single bridge. The grouping also unambiguates
  `ink`: `orb.ink` is menu links, `band.ink` is the band's own primary text.
- **`--pink` is theme data now:** each project's card accent moved from the
  `ink` field in `content/projects.js` into its theme's `band.pink`
  (values unchanged). It is panel-scoped, so `Project.styleVars()` applies
  it; `applyThemeVars()` doesn't, because the deep-dive page derives its
  `--pink` from `--sec-accent`.
- **Section CSS consumes the new vars with fallbacks** (`var(--sec-ink,
  var(--on-dark))` on dark bands, `var(--sec-ink, var(--ink))` on light,
  `var(--sec-line, var(--line))` for rules), so the pass is pixel-identical;
  the keys are opt-in knobs.

## What changed in the theme-bridge pass (2026-07-11, earlier)
- **SECTIONTHEME entries can now carry the band's full colour story:**
  `secAccent` (renamed from `band`), plus new optional `inkMid` and `inkSoft`
  for the band's secondary text tones. All still fall back to the :root
  tokens when omitted.
- **One JS → CSS bridge:** `themeVars()` / `applyThemeVars()` in
  `lib/theme.js` are the single mapping from theme keys to `--sec-accent` /
  `--sec-ink-mid` / `--sec-ink-soft`. The three call sites
  (`Section.applyBackground()`, `Project.styleVars()`, `DeepDivePage`) no
  longer make their own colour decisions — the duplicated
  `theme.band || theme.flood` fallback logic is gone from all of them.
- **`--dd-accent` retired:** the deep-dive accent channel is the same
  `--sec-accent` the home band uses (`--pink: var(--sec-accent, ...)` in
  deep-dive.css). The deep dive keeps its own cream `--ink-mid`/`--ink-soft`
  remap in CSS — its dark wash needs different tones than the home band, so
  theme `inkMid`/`inkSoft` deliberately do NOT flow there.
- **Section stylesheets consume the tone vars** with their old values as
  fallbacks (`var(--sec-ink-soft, var(--on-dark-soft))` on dark bands,
  `var(--sec-ink-mid, var(--ink-mid))` on light ones), so this pass is
  pixel-identical; the keys are opt-in knobs from here on.

## What changed in the per-section pass (2026-07-11, earlier)
- **One directory per section, each owning its CSS**, replacing the features/
  tree from earlier the same day: `components/section/<name>-section/` holds
  each home band's JS + stylesheet (about-section takes the hero styles out
  of `styles/hero.css`; photography-section takes the photo mosaic; the four
  off-the-clock bands each get their own dir again). The Section primitive
  moved beside them (`components/section/section.js`, out of
  `components/shared/section/`).
- **Per-project override sheets:** the 8 project bands keep one shared
  template (`projects-section/projects-section.css`) and each gains its own
  override file (`paypath.css`, `whattodo.css`, ...) scoped to `#work-<slug>`
  and imported right after the template. They start empty; they are the
  designated place to tweak an individual project band's format.
- **Deep-dive renderer co-located with its page:** `deep-dive.js`/`.css`
  moved into `pages/deep-dive/` (page content, not a home section);
  `features/` is gone.
- Boundary lint updated: new `section` tier (imports lib only; may import
  the Section primitive; cross-section imports are an error). Suite green
  throughout with zero visual diffs.

## What changed in the pages/features/shared pass (2026-07-11, earlier)
- **Three-tier layout.** Feature code moved out of `components/` into
  `features/` (`projects`, `experience`, `education`, `skills`,
  `off-the-clock` holding me/photo-mosaic/jiujitsu/listening flat, and
  `deep-dive`); `components/` now holds only `shared/` (nav, section, pager).
  `pages/index.js` → `pages/home/home-page.js`. All moves were `git mv`, one
  commit per feature, paths-only (plus the Experience.render() split into
  headHtml/bodyHtml/asideHtml helpers, markup unchanged).
- **Deep-dive route renamed to match its feature:** `pages/project/*` →
  `pages/deep-dive/deep-dive.html` + `deep-dive-page.js`; `Project.href()`
  updated; redirect stubs left at `pages/project.html` AND
  `pages/project/project.html` (query + hash preserved).
- **`content/sectionstheme.js` → `lib/theme.js`** so the Section model in
  `components/shared/` imports only `lib` (the shared tier no longer touches
  `content/`).
- **Playwright suite added** (`tests/`, `npm test`, Node 18+): full-page
  visual baselines for the home page and all 8 deep dives (slug-keyed names,
  so they survived the URL move with zero pixel diffs), smoke specs (section
  mounting, orb menu, scroll-spy theming, deep-dive rendering, redirects),
  and an assets spec that fails on any local response >= 400. Tests run
  against `scripts/serve.mjs` (python http.server drops connections under
  parallel load; videos are masked/aborted in screenshot specs because their
  metadata resizes layout nondeterministically).
- **`scripts/check-boundaries.mjs`** lint-enforces the tier rules and that
  every relative import resolves; wired as npm pretest.
- **Deploy hygiene:** `.gitlab-ci.yml` now excludes node_modules, tests,
  scripts, and the npm/Playwright config files from the published `public/`.
- Verified: the whole suite green after every step; final visual diffs vs the
  pre-refactor baselines are zero.

## What changed in the band-accent pass (2026-07-11, earlier)
- **`--sec-accent`:** every band's own content (kickers, labels, list
  numerals, panel indexes) can wear an in-band accent from its SECTIONTHEME
  entry, set by `Section.applyBackground()` and `Project.styleVars()` from a
  new optional `band` key (defaulting to the flood). Theme values retuned for
  WCAG 4.5:1 against their floods; the deep-dive `--dd-accent` rides the same
  key. The stray duplicate `<section id="about">` shell was removed from
  `index.html`.

## What changed in the SECTIONTHEME-registry pass (2026-07-10)
- **All orb menu colours moved into one registry**, `content/sectionstheme.js`,
  exporting `SECTIONTHEME` — a map of band display-name → `{flood, ink, hot,
  hover, active}` (8 projects keyed by name + 7 sections keyed by title; the
  Projects/Experience headings have no entry → default orb). The `Project` and
  `Section` models import it and look their theme up (`SECTIONTHEME[this.name]`
  / `SECTIONTHEME[this.title]`); a project band's Section shares the project's
  entry because its title IS the project name. The inline `theme:` blocks are
  gone from `projects.js` and `sections.js`. Byte-identical to before — this
  was a pure relocation.
- The old tint→theme derivation (`complement`/`triad` colour-wheel math) is no
  longer used anywhere; every theme is now explicit data. `complement`/`triad`
  in `lib/core.js` are dead exports (safe to delete in a later cleanup). The
  scroll spy dropped its `--tint` fallback (experience bands set no `--tint`,
  so they were already getting the default orb).

## What changed in the project-theme pass (2026-07-10, earlier)
- Every project got a full hand-tuned theme with a distinct `hover`/`active`
  interaction accent separate from the `hot` number accent (e.g. PayPath:
  raspberry numbers, teal hover). Link-on-flood contrast is ≥4:1 everywhere;
  the hover/active glow accents are intentionally brighter/softer (a few are
  low-contrast by design). (These themes now live in SECTIONTHEME, see above.)
- **The deep-dive page themes its menu from the project's own theme**
  (`this.project.theme` in `DeepDivePage.onNavReady`), instead of the old
  hardcoded cream orb. So a project's orb looks identical on its home band and
  its case-study page. Both `applyTheme` call sites (scroll spy + deep dive)
  source a real theme now — no hardcoded `{flood, ink, hot}` anywhere.

## What changed in the each-project-is-a-Section pass (2026-07-10, earlier)
0. Each project got its own orb `theme` (`Project.theme`). *(Superseded: the
   `Section.theme(spec)` / `themeFromTint` factory this pass introduced was
   later replaced by the SECTIONTHEME registry — see the latest pass above.)*
1. Each project band is its own `Section` (`group: 'project'`, id
   `work-<slug>`, theme from `Project.theme`, tagline as its `tag`), built from
   `PROJECTS` in `content/sections.js`.
2. The Projects heading declares `sublistGroup: 'project'`; `Menu.sublistHtml`
   nests every project Section under it as the numbered jump-list. The old
   `Section.sublist` array + the `projectSublist` builder are gone (replaced by
   `tag` + `sublistGroup` on the model).
3. Rendered menu is byte-identical (Projects heading + the same 8 sub-links);
   the scroll spy now themes each project band from its Section's theme instead
   of re-reading `--tint` off the DOM. Verified sublist output, main-list
   numbering, and per-band one-per-menu hover/active.

## What changed in the co-location + menu-colour pass (2026-07-10, earlier)
1. **Component CSS co-located:** `styles/education-skills.css` → `education/` +
   `skills/`; `styles/life.css` → `me/` + `jiujitsu/` + `listening/`; shared
   `.life-note` moved to `styles/base.css`. `styles/main.css` imports the
   component sheets in band order; `styles/` keeps only global/page sheets.
2. **Menu hover/active = one accent per menu.** Replaced the per-link
   `--item-hover` "destination preview" rainbow with a single hover + active
   colour per menu, sourced from each Section's theme (`hover`/`active`, set to
   the band accent). `Menu.applyTheme()` now writes `--orb-hover` /
   `--orb-active`; nav.css uses them for all menu links; the Menu's link
   builders no longer emit per-link `style="--item-hover:…"`. Verified every
   band resolves to exactly one hover and one active colour.

## What changed in the layout()/index.js pass (2026-07-10, earlier)
1. `pages/home/home.js` → `pages/index.js` (Next home-route convention);
   `index.html`'s script src and all comment refs updated.
2. **`Page.layout()` added.** The lifecycle is now `layout()` (build DOM
   structure) → `render()` (wire behaviour) → nav → Menu → `onNavReady()`.
   Base `layout()` paints the bands; `HomePage.layout()` also mounts the five
   content bands + builds the panels; `render()` keeps only the behaviours
   (mosaic/media/pager). `DeepDivePage` split the same way (build case study
   in `layout()`, outline wiring in `render()`). New helper `Page.mount()`.
3. **`index.html` slimmed 230 → 117 lines.** The education, skills, about-me
   (53-photo collage), jiu-jitsu, and listening bodies moved to
   `content/{education,skills,me,jiujitsu,listening}.js` + a render component
   each under `components/`; `index.html` now holds empty `<section>` shells
   that `HomePage.layout()` fills. Photography's small static head stayed.
4. Verified: every component renders DOM-equivalent to the original section
   markup (whitespace-normalized, significant inter-tag spaces asserted
   separately), all 53 collage photos present, syntax + import graph + HTTP
   sweep green.

## What changed in the Next-style restructure (2026-07-10, earlier)
1. Moved the whole tree into `pages/ components/ lib/ content/ styles/` (map
   above); `assets/` and `partials/` are gone. All moves were `git mv` on top
   of a snapshot commit, so history tracks the renames.
2. Deep-dive route co-located at `pages/project/project.html`
   (`<base href="../../">`); redirect stub kept at the old
   `pages/project.html` URL; `Project.href()` updated.
3. `initPhotoMosaic(photos)` now takes its data as a parameter (components
   never import content); `HomePage` passes `PHOTOS`.
4. The masonry block moved from `life.css` into
   `components/photo-mosaic/photo-mosaic.css`, imported at the same cascade
   position; rules byte-identical.
5. Verified: node syntax checks, full import-graph resolution, HTTP 200 sweep,
   stub redirect, and the menu/deep-dive equivalence harnesses (all 8 case
   studies byte-identical through the new paths).

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
4. **Nav hover/active colour** (superseded — see the latest pass below): an
   earlier iteration had per-link `--item-hover` previewing each link's
   destination band. That rainbow was later replaced by a single hover +
   active colour per menu (the band accent).
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
- **Commits:** the class refactor is snapshotted in `42b7e5e`; the Next-style
  restructure is its own follow-up commit (renames tracked via `git mv`).
- **Menu label:** item 02 reads "Projects"; it now lives in
  `content/sections.js` (the partial no longer carries labels).
- **Band paint timing:** section backgrounds are applied by JS at boot. On a
  slow first load the bands could flash white for a beat before the module
  executes. If that's ever visible, the fix is inlining a tiny critical style
  or reverting the backgrounds to CSS while keeping them mirrored in SECTIONS.
- **Menu hover/active = one interaction colour per menu**, and it may be its
  own colour, distinct from the `hot` number/tag accent. Each theme can carry
  `hover` and `active`; `Menu.applyTheme()` writes them to `--orb-hover` /
  `--orb-active`, and nav.css uses those for every menu link's `:hover` and
  `.active`. They fall back to `hot`, then to `--accent-deep`, when omitted.
  The project themes (content/projects.js) set a distinct interaction accent
  per project; the static bands mostly leave them = `hot`. It's still ONE
  hover + ONE active per menu (never a per-link rainbow) — the palette is now
  up to four colours (flood, ink, hot, hover/active), one of each.
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
GitHub Pages. CI (`.gitlab-ci.yml`, if used) copies every top-level entry
into `public/` except the dev-only tooling (node_modules, tests, scripts,
test-results, playwright-report, package.json, package-lock.json,
playwright.config.js, .nvmrc), so `pages/`, `components/`, `lib/`,
`content/`, `styles/`, and `static/` deploy automatically with no path
allowlist to maintain. When adding a new top-level dev directory, add it to
the exclusion list or it gets published.
