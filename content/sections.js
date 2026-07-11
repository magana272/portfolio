// Section content — pure data, one Section per home-page band in document
// order. This is the single source of truth the whole nav hangs off: the Menu
// builds its link list from it (on both pages), the scroll spy themes the orb
// from it, each Section paints its own band background, and the hover colour
// of a menu link is its section's background. Adding a band here is the whole
// job.
//
// The menu wears exactly three colours per band: the flood (the band's
// colour-wheel complement, on the orb and overlay), the ink (the band's own
// colour, on the links), and one contrasting hot colour worn only by the list
// numbers and project tags. Sections without a theme fall back to the :root
// defaults (yellow flood, near-black ink, deep red hot).
import { Section } from '../components/section/section.js';
import { PROJECTS } from './projects.js';
import { padNum } from '../lib/core.js';

// The Projects band carries the menu's jump-list: one entry per project panel,
// hover previewing the project's signature tint.
var projectSublist = PROJECTS.map(function (p, i) {
    return {
        anchor: 'work-' + p.slug,
        num: padNum(i + 1),
        name: p.name,
        tag: p.tagline || p.catLabel(),
        hover: p.tint
    };
});

export const SECTIONS = [
    new Section({
        id: 'about', title: 'About',
        background: 'var(--band-about)',
        theme: { flood: '#2528a6', ink: '#ecdcc0', hot: '#ffd21e' }   // cream band → royal blue flood
    }),
    new Section({
        id: 'projects-section', title: 'Projects',
        background: 'var(--band-work)',
        sublist: projectSublist
        // no theme: each project band themes the orb from its own --tint
    }),
    new Section({
        id: 'experience-section', title: 'Experience',
        background: 'var(--band-exp)'
        // no theme: the default yellow orb pops on the royal blue band
    }),
    new Section({
        id: 'education', title: 'Education',
        background: 'var(--band-edu)',
        theme: { flood: '#ff5f8f', ink: '#0a5c3e', hot: '#ffffff' }   // emerald band → rose pink flood
    }),
    new Section({
        id: 'skills', title: 'Skills',
        background: 'var(--band-skills)',
        theme: { flood: '#c8f542', ink: '#5b21c0' }                   // violet band → lime flood
    }),
    new Section({
        id: 'about-me', title: 'Off the clock', group: 'off-label',
        background: 'var(--band-life)',
        theme: { flood: '#ff8c1a', ink: '#141018', hot: '#2528a6' }   // near-black band → bright orange flood
    }),
    new Section({
        id: 'photography', title: 'Photography', group: 'off',
        background: 'var(--band-life)',
        theme: { flood: '#f4f0e8', ink: '#141018' }                   // near-black band → film white flood
    }),
    new Section({
        id: 'jiujitsu', title: 'Jiu-Jitsu', group: 'off',
        background: 'var(--band-life)',
        theme: { flood: '#ff5f8f', ink: '#141018', hot: '#ffffff' }   // near-black band → rose pink flood
    }),
    new Section({
        id: 'listening', title: 'Listening & Watching', group: 'off',
        background: 'var(--band-life)',
        theme: { flood: '#c8f542', ink: '#141018', hot: '#5b21c0' }   // near-black band → lime flood
    })
];
