# Manuel Magana — Portfolio

### Live: [magana272.github.io/portfolio](https://magana272.github.io/portfolio/)

A single-page editorial resume site. Projects, experience, education, skills, and
publication — with a full case-study page behind every project.

## Structure

The JavaScript is written as **ES modules** — each file has one responsibility and
`import`s exactly what it needs, so dependencies point downward only
(`pages` → `features`/`content` → `models` → `core`) with no global state or load
order to keep straight. Each HTML page loads a single `<script type="module">`
entry point (`pages/home.js` or `pages/project.js`) and the browser pulls in the
rest of the graph.

```
index.html                 Home page
pages/
  project.html             Case-study page (?id=<slug>)
assets/
  css/                     Stylesheet split by concern, loaded in cascade order:
    base.css               tokens (:root), reset, layout primitives, a11y
    nav.css                menu orb + overlay + jump-list
    hero.css               landing header
    sections.css           section headings shared across bands
    projects.css           project panels, cards, generated covers
    experience.css         experience bands
    education-skills.css    education, skills, publication
    life.css               off-the-clock panels (photos, jiu-jitsu, listening)
    footer.css             footer
    responsive.css         reduced-motion + breakpoints + touch targets
    print.css              print stylesheet
    deep-dive.css          case-study page (.dd-*)
    pager.css              section pager triangles
  js/
    core.js                Shared helpers (named exports): esc, slugify, padNum,
                           colour maths, media detection, reduced-motion flag
    includes.js            Client-side HTML includes: swaps [data-include]
                           placeholders for partials; exports `ready` (a Promise)
    models/
      project.js           Project class — data + how a project renders
      experience.js        Experience class — data + how a role renders
    content/
      projects.js          PROJECTS data (pure)
      experiences.js       EXPERIENCES data (pure)
      deep-dives.js        DEEP_DIVES case-study copy (pure)
      photos.js            PHOTOS mosaic data (pure)
    features/
      menu.js              Orb hold-to-open menu (both pages)
      scroll-spy.js        Active-section tracking + orb theming (home)
      media-loader.js      On-screen video playback + progressive images (home)
      photo-mosaic.js      Masonry build + FLIP expand + JJ tags (home)
    pages/
      home.js              Home entry point — builds panels, inits features
      project.js           Deep-dive entry point — renders a case study
      include.js           Builds the "Work" project jump-list in the menu
partials/
  nav.html                 Shared nav (orb + overlay), injected on every page
static/media/                     Screenshots and clips
static/resumes_and_cvs/           PDF resume and CV
```

> **Reusable markup with no build step.** Shared components (currently the nav)
> live as HTML partials under `partials/` and are pulled in at runtime by
> `includes.js` wherever a page has `<div data-include="partials/nav.html">`.

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
