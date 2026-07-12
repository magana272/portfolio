# Manuel Magana — Portfolio

### Live: [magana272.github.io/portfolio](https://magana272.github.io/portfolio/)

A single-page editorial resume site. Projects, experience, education, skills, and
publication — with a full case-study page behind every project.

## Structure

The JavaScript is written as **ES modules**: each file has one responsibility
and `import`s exactly what it needs, so dependencies point downward only
(`pages` → `components/section` / `components/shared` / `content` → `lib`)
with no global state or load order to keep straight. Each HTML page loads a
single `<script type="module">` entry point and the browser pulls in the rest
of the graph.

```
index.html                     Home page (thin shell of empty section bands)
pages/                         Route controllers
  page.js                      Page base class (layout → render → nav → onNavReady)
  home/home-page.js            Home entry point: mounts every band and panel
  deep-dive/                   Case-study page (?id=<slug>): html shell, page
                               controller, and the renderer (.dd-*) co-located
  project.html, project/       Redirect stubs for the old case-study URLs
components/
  section/                     One folder per home section, each owning its CSS:
    section.js + section.css   the Section primitive (band id, title, background, theme)
    about-section/             hero band styles
    projects-section/          Project model + shared panel template + one
                               override sheet per project (whattodo.css, ...)
    experience-section/        Experience model + band styles
    education-section/  skills-section/
    about-me-section/  photography-section/  jiujitsu-section/  listening-section/
  shared/                      Cross-page primitives only
    nav/                       Orb + overlay menu, scroll spy, nav partial
    pager/                     Section pager triangles
lib/                           Shared helpers: core.js, theme.js (SECTIONTHEME),
                               includes.js (HTML partials), media-loader.js
content/                       Pure data: sections, projects, experiences,
                               deep-dives, photos, education, skills, me,
                               jiujitsu, listening
styles/                        main.css (@imports in cascade order) + global sheets
static/                        Screenshots, clips, PDFs
tests/                         Playwright suite (visual baselines + smoke); npm test
scripts/                       Dev static server + import-boundary lint
```

> **Reusable markup with no build step.** The shared nav lives as an HTML
> partial (`components/shared/nav/nav.html`) and is pulled in at runtime by
> `lib/includes.js` wherever a page has a `<div data-include="...">`.

**Serve over http.** Both ES modules and the HTML partials use fetch under the
hood, so the site must be served over http (Live Server, GitHub Pages) — opening
`index.html` straight off disk (`file://`) is blocked by the browser. There is no
build step; the browser loads the modules directly.

## Features

- **Image-first project cards** — each project shows a preview and a "Learn more"
  link at the top; no toggling required to see the media. Projects without a
  screenshot get a generated cover.
- **Case studies** — every project links to a consistent case-study page
  (Problem / Approach / Outcome, Highlights, sections, stack, and links).
- **Persistent top nav** — always visible, with active-section tracking.
- **Data-driven** — experience and project content lives in JS, rendered from
  class instances.
- **Print stylesheet** — clean output when printed.
- **No frameworks** — vanilla HTML, CSS, and JavaScript.
