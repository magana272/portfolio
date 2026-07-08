# Manuel Magana — Portfolio

### Live: [magana272.github.io/portfolio](https://magana272.github.io/portfolio/)

A single-page editorial resume site. Projects, experience, education, skills, and
publication — with a full case-study page behind every project.

## Structure

```
index.html                 Main page
pages/
  project.html             Case-study page (?id=<slug>)
assets/
  styles.css               Stylesheet
  site.js                  Home-page behavior (nav, reveal, expand-all)
  page.js                  Renders a case study from PROJECTS data
data/
  experience/
    experience.js          Experience class
    experiences.js         Experience data
  project/
    project.js             Project class (card + generated covers)
    projects.js            Project data + case studies
media/                     Screenshots and clips
resumes_and_cvs/           PDF resume and CV
```

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
