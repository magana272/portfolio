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

## Architecture (Next-style layout, zero dependencies)

The tree is shaped like a Next.js app — routes under `pages/`, co-located
components under `components/<name>/` (JS + CSS + markup together), shared
helpers in `lib/`, pure data in `content/`, global styles in `styles/` — but
it is plain buildless ESM; there is no framework or bundler.

```
index.html                          home route (root; GitHub Pages requirement)
pages/
  page.js                           class Page — the shared boot sequence (base class)
  index.js                          class HomePage extends Page — mounts the bands, panels, spy
  project/project.html              deep-dive route (<base href="../../">)
  project/project.js                class DeepDivePage extends Page — pairs ?id with
                                    its copy, delegates markup to the DeepDive model
  project.html                      redirect stub → project/project.html (+ query)
components/                         one folder per component, JS (+ CSS) co-located
  nav/nav.html                      shell partial (orb + overlay + empty lists)
  nav/nav.js                        class Menu — builds links from sections, hold-to-open,
                                    applyTheme() (the ONLY writer of --orb-*)
  nav/nav.css                       orb + overlay + menu styles (uses --orb-hover/--orb-active)
  nav/scroll-spy.js                 active-section spy; themes the orb via menu.applyTheme()
  section/section.js + section.css  class Section (id, title, group, background, theme, tag, sublistGroup)
  project/project.js + project.css  class Project (data + renderFeature; href() → deep dive)
  experience/experience.js + .css   class Experience (data + render)
  deep-dive/deep-dive.js + .css     class DeepDive (case study → markup, one method per block)
  pager/pager.js + pager.css        section pager triangles (home)
  photo-mosaic/photo-mosaic.js+.css masonry + FLIP expand + JJ tags (photos injected by HomePage)
  education/education.js            renderEducation(EDUCATION) → #education body
  skills/skills.js                 renderSkills(SKILLS) → #skills body
  me/me.js                         renderMe(ME) → #about-me collage body
  jiujitsu/jiujitsu.js             renderJiujitsu(JIUJITSU) → #jiujitsu body
  listening/listening.js           renderListening(LISTENING) → #listening body
lib/
  core.js                           shared helpers (esc, slugify, padNum, complement, triad,
                                    isVideo, reducedMotion, formatTechList)
  includes.js                       HTML-partial loader; exports `ready` (a Promise)
  media-loader.js                   on-screen video + progressive image upgrades (home)
content/                            pure data
  sections.js                       SECTIONS — the nav/band source of truth (id, title,
                                    cluster, background); each project is a
                                    group:'project' Section built from PROJECTS
  sectionstheme.js                  SECTIONTHEME — the orb menu colour registry, one theme
                                    per band keyed by name/title; models look theirs up here
  projects.js  experiences.js  deep-dives.js  photos.js
  education.js  skills.js  me.js  jiujitsu.js  listening.js   (the five content bands)
styles/
  main.css                          the only <link>; @imports everything in cascade order
  base.css  hero.css  footer.css  responsive.css  print.css   global / page sheets only
static/                             images, video, PDFs
```

Rules that keep it coherent:
- **Dependencies point downward:** `pages → components / content → lib`.
  Components mostly don't import `content/` (pages inject data — e.g.
  `initPhotoMosaic(PHOTOS)`, `renderEducation(EDUCATION)`); `content/`
  constructs component classes (`content/projects.js` builds `Project`s). The
  one deliberate exception: the `Project` and `Section` models import
  `content/sectionstheme.js` (the SECTIONTHEME colour registry) and look their
  theme up in it by name/title — a shared config table, so both models read
  the same source. (No import cycle: sectionstheme.js imports nothing.)
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
- **Component CSS is co-located:** each band's styles live next to its JS
  (`components/education/education.css`, `skills/`, `me/`, `jiujitsu/`,
  `listening/`). `styles/` now holds only genuinely global/page sheets (base,
  hero, footer, responsive, print) plus the shared `.life-note` utility (moved
  into `base.css`, since photography's static head and the jiu-jitsu component
  both use it). `styles/main.css` `@import`s the component sheets in band
  order.
- **CSS:** `styles/main.css` `@import`s global files from `styles/` and each
  component's stylesheet from its folder, in the same cascade order as the old
  13-link set (photo-mosaic.css sits where its rules sat inside life.css).
  Band backgrounds are Section data, not per-id CSS rules; the `--band-*`
  palette tokens stay in `styles/base.css`.
- **Routes:** the deep-dive URL moved to `pages/project/project.html`;
  `Project.href()` points there, and the stub at `pages/project.html`
  redirects old links, preserving `?id=` and `#hash`.

### Static assets
Images, videos, and PDFs live under `static/`:
- `static/media/img/…`, `static/media/vid/…`
- `static/resumes_and_cvs/…`

Paths in the HTML/JS/meta-tags are all `static/media/…` / `static/resumes_and_cvs/…`.

---

## What changed in the SECTIONTHEME-registry pass (2026-07-10, latest)
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
GitHub Pages. CI (`.gitlab-ci.yml`, if used) copies every top-level directory
into `public/`, so `pages/`, `components/`, `lib/`, `content/`, `styles/`, and
`static/` deploy automatically — no path allowlist to maintain.
