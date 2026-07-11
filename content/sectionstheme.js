// SECTIONTHEME — the orb menu's colour theme for every band, in one registry
// keyed by the band's display name (a project's `name` or a section's
// `title`). The Project and Section models look their theme up here by that
// name, so all the menu colours live and get tuned in a single place.
//
// A theme is {flood, ink, hot, hover, active}: flood floods the orb + overlay,
// ink is the links at rest, hot the numbers/tags, and hover/active the
// one-per-menu link interaction colour. Omitted keys fall back to the :root
// defaults (yellow flood, near-black ink, deep red accent); a band with no
// entry here wears the default orb. Values may be hexes or CSS vars.
export const SECTIONTHEME = {
    // ── Projects (keyed by Project.name) ──
    'PayPath': { flood: '#ffd21e', ink: '#0e6b47', hot: '#a61e4d', hover: '#2ec3d0', active: '#2ec3d0' },                 // gold flood, emerald links, raspberry numbers, teal hover
    'DADA-85': { flood: '#66d9e8', ink: '#963c12', hot: '#c1121f', hover: '#845ef7', active: '#845ef7' },                 // sky flood, ember links, fire-red numbers, violet hover
    'Trak': { flood: '#ffa94d', ink: '#1c4fa1', hot: '#c92a2a', hover: '#12b886', active: '#12b886' },                    // amber flood, cobalt links, red numbers, teal hover
    'WhatToDo': { flood: '#c0eb75', ink: '#5a22ad', hot: '#c2255c', hover: '#1098ad', active: '#1098ad' },                // lime flood, grape links, pink numbers, cyan hover
    'Physiological Signal Analytics Platform': { flood: '#69db7c', ink: '#9d1049', hot: '#364fc7', hover: '#f76707', active: '#f76707' },  // green flood, crimson links, indigo numbers, amber hover
    'Paxos Key-Value Store': { flood: '#ffa8a8', ink: '#0b5e63', hot: '#c2255c', hover: '#4263eb', active: '#4263eb' },   // coral flood, teal links, rose numbers, blue hover
    'Cell Type Classification from scRNA-seq': { flood: '#b2f2bb', ink: '#8a1a86', hot: '#c2255c', hover: '#6741d9', active: '#6741d9' },  // pale-green flood, plum links, rose numbers, indigo hover
    'Emotion Recognition from Physiological Signals': { flood: '#3b41c4', ink: '#f0e9d8', hot: '#ff8787', hover: '#20c997', active: '#20c997' },  // royal-blue flood, cream links, rose numbers, mint hover

    // ── Sections (keyed by Section.title) ──
    'About': { flood: '#2528a6', ink: '#ecdcc0', hot: '#8dfaa1', hover: '#ffd21e', active: '#ffd21e' },                   // cream band → royal blue flood
    'Education': { flood: '#ff5f8f', ink: '#0a5c3e', hot: '#ffffff', hover: 'var(--band-edu)', active: 'var(--band-edu)' }, // emerald band → rose pink flood
    'Skills': { flood: '#c8f542', ink: '#5b21c0', hot: '#173404', hover: 'var(--band-skills)', active: 'var(--band-skills)' }, // violet band → lime flood
    'Off the clock': { flood: '#ff8c1a', ink: '#141018', hot: '#2528a6', hover: '#2528a6', active: '#2528a6' },           // near-black band → bright orange flood
    'Photography': { flood: '#f4f0e8', ink: '#141018' },                                                                  // near-black band → film white flood
    'Jiu-Jitsu': { flood: '#ff5f8f', ink: '#141018', hot: '#ffffff', hover: '#ffffff', active: '#ffffff' },              // near-black band → rose pink flood
    'Listening & Watching': { flood: '#c8f542', ink: '#141018', hot: '#5b21c0', hover: '#5b21c0', active: '#5b21c0' }     // near-black band → lime flood
};
