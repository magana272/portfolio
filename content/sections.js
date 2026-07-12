// Section content — pure data, one Section per home-page band in document
// order. This is the single source of truth the nav hangs off: the Menu builds
// its link list from it (both pages), the scroll spy themes the orb from it,
// and each Section paints its own band background. Each Section's orb theme is
// looked up from the SECTIONTHEME registry (lib/theme.js) by its
// title, so the menu colours live there, not here. Adding a band is the whole
// job: give it an id, title, cluster, and background, and (optionally) an entry
// in SECTIONTHEME.
import { Section } from '../components/section/section.js';
import { PROJECTS } from './projects.js';

// Each project band is its own Section (group 'project'), built from the
// PROJECTS data: id matches the panel Project.renderFeature() creates
// (#work-<slug>) and the tag is its menu jump-list label. Its orb theme is
// looked up by title (= the project name) from SECTIONTHEME, like any other
// band. The projects heading below nests these via sublistGroup: 'project'.
// The panel paints and lays out its own body (Project.renderFeature); the
// Section carries only the nav/orb metadata.
var projectSections = PROJECTS.map(function (p) {
    return new Section({
        id: 'work-' + p.slug,
        title: p.name,
        group: 'project',
        tag: p.tagline || p.catLabel()
    });
});

export const SECTIONS = [
    new Section({ id: 'about', title: 'About', background: 'var(--band-about)' }),
    new Section({
        id: 'projects-section', title: 'Projects',
        background: 'var(--band-work)',
        sublistGroup: 'project'   // nests the project Sections below as the jump-list
    }),
    // Each project band, in document order (inside #projects-section).
    ...projectSections,
    new Section({ id: 'experience-section', title: 'Experience', background: 'var(--band-exp)' }),
    new Section({ id: 'education', title: 'Education', background: 'var(--band-edu)' }),
    new Section({ id: 'skills', title: 'Skills', background: 'var(--band-skills)' }),
    new Section({ id: 'about-me', title: 'Off the clock', group: 'off-label', background: 'var(--band-life)' }),
    new Section({ id: 'photography', title: 'Photography', group: 'off', background: 'var(--band-life)' }),
    new Section({ id: 'jiujitsu', title: 'Jiu-Jitsu', group: 'off', background: 'var(--band-life)' }),
    new Section({ id: 'listening', title: 'Listening & Watching', group: 'off', background: 'var(--band-life)' })
];
