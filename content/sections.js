// Section content — pure data, one Section per home-page band in document
// order. This is the single source of truth the whole nav hangs off: the Menu
// builds its link list from it (on both pages), the scroll spy themes the orb
// from it, and each Section paints its own band background. Adding a band here
// is the whole job.
//
// The menu wears exactly three colours per band: the flood (the band's
// colour-wheel complement, on the orb and overlay), the ink (the band's own
// colour, on the links at rest), and one accent colour worn by the list
// numbers/tags (hot) and — one per menu, never a per-link rainbow — the
// hover/active links. hover and active are their own theme keys so they can be
// tuned per band; here every band sets them to its accent. Sections without a
// theme fall back to the :root defaults (yellow flood, near-black ink, deep
// red accent, which also covers hover/active).
import { Section } from '../components/section/section.js';
import { PROJECTS } from './projects.js';

// Each project band is its own Section (group 'project'), built from the
// PROJECTS data: id matches the panel Project.renderFeature() creates
// (#work-<slug>), the orb theme comes from the project's own theme (a hand-
// tuned object, or its tint when it doesn't set one), and the tag is its menu
// jump-list label. The projects heading below nests these via
// sublistGroup: 'project'. The panel paints and lays out its own body
// (Project.renderFeature); the Section carries only the nav/orb metadata.
var projectSections = PROJECTS.map(function (p) {
    return new Section({
        id: 'work-' + p.slug,
        title: p.name,
        group: 'project',
        tag: p.tagline || p.catLabel(),
        theme: Section.theme(p.theme)
    });
});

export const SECTIONS = [
    new Section({
        id: 'about', title: 'About',
        background: 'var(--band-about)',   // cream band → royal blue flood, yellow accent
        theme: { flood: '#2528a6', ink: '#ecdcc0', hot: '#ffd21e', hover: '#ffd21e', active: '#ffd21e' }
    }),
    new Section({
        id: 'projects-section', title: 'Projects',
        background: 'var(--band-work)',
        sublistGroup: 'project'   // nests the project Sections below as the jump-list
    }),
    // Each project band, in document order (inside #projects-section).
    ...projectSections,
    new Section({
        id: 'experience-section', title: 'Experience',
        background: 'var(--band-exp)'
        // no theme: the default yellow orb pops on the royal blue band
    }),
    new Section({
        id: 'education', title: 'Education',
        background: 'var(--band-edu)',     // emerald band → rose pink flood, white accent
        theme: { flood: '#ff5f8f', ink: '#0a5c3e', hot: '#ffffff', hover: '#ffffff', active: '#ffffff' }
    }),
    new Section({
        id: 'skills', title: 'Skills',
        background: 'var(--band-skills)',  // violet band → lime flood; accent falls back to the default
        theme: { flood: '#c8f542', ink: '#5b21c0' }
    }),
    new Section({
        id: 'about-me', title: 'Off the clock', group: 'off-label',
        background: 'var(--band-life)',    // near-black band → bright orange flood, royal blue accent
        theme: { flood: '#ff8c1a', ink: '#141018', hot: '#2528a6', hover: '#2528a6', active: '#2528a6' }
    }),
    new Section({
        id: 'photography', title: 'Photography', group: 'off',
        background: 'var(--band-life)',    // near-black band → film white flood; accent falls back to the default
        theme: { flood: '#f4f0e8', ink: '#141018' }
    }),
    new Section({
        id: 'jiujitsu', title: 'Jiu-Jitsu', group: 'off',
        background: 'var(--band-life)',    // near-black band → rose pink flood, white accent
        theme: { flood: '#ff5f8f', ink: '#141018', hot: '#ffffff', hover: '#ffffff', active: '#ffffff' }
    }),
    new Section({
        id: 'listening', title: 'Listening & Watching', group: 'off',
        background: 'var(--band-life)',    // near-black band → lime flood, violet accent
        theme: { flood: '#c8f542', ink: '#141018', hot: '#5b21c0', hover: '#5b21c0', active: '#5b21c0' }
    })
];
