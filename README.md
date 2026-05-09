# Manuel Magana — Portfolio

### Live: [magana272.github.io/portfolio](https://magana272.github.io/portfolio/)

A simple HTML resume site. Education, experience, projects, skills, and publications — all on one page.

## Structure

```
index.html              Main page
styles.css              Stylesheet
experience/
  experience.js         Experience class
  experiences.js        Experience data
project/
  project.js            Project class
  projects.js           Project data
  filter.js             Category + language filter
resumes_and_cvs/        PDF resume and CV
```

## Features

- **Filterable projects** — filter by category (Software Engineering / Machine Learning) and by language (Python, Go, Java, C)
- **Data-driven** — experience and project content lives in JS, rendered from class instances
- **Print stylesheet** — clean output when printed, filters hidden
- **No frameworks** — vanilla HTML, CSS, and JavaScript
