// SECTIONTHEME — every band's colour story in one registry, keyed by the
// band's display name (a project's `name` or a section's `title`). The
// Project and Section models look their theme up here by that name, so all
// the per-band colours live and get tuned in a single place.
//
// A theme is {flood, ink, hot, hover, active, secAccent?, inkMid?, inkSoft?}.
// The first five drive the menu orb: flood floods the orb + overlay, ink is
// the links at rest, hot the numbers/tags, and hover/active the one-per-menu
// link interaction colour. Omitted keys fall back to the :root defaults
// (yellow flood, near-black ink, deep red accent); a band with no entry here
// wears the default orb. Values may be hexes or CSS vars.
//
// The optional keys drive the band's OWN content, delivered to CSS as custom
// properties by themeVars() below (the only JS → CSS bridge; the section
// stylesheets consume the vars with :root-token fallbacks):
//   secAccent → --sec-accent   kicker, labels, list numerals, panel indexes,
//                              link hovers; defaults to the flood (the band
//                              colour's complement, so it pops by
//                              construction). Set it explicitly only where
//                              the flood misses 4.5:1 on the band/tint
//                              background — then a lighter tint of the same
//                              flood hue. Also the deep-dive accent (--pink).
//   inkMid    → --sec-ink-mid  the band's mid text tone (secondary copy);
//                              falls back to --ink-mid / --on-dark-soft in
//                              the consuming rule.
//   inkSoft   → --sec-ink-soft the band's soft text tone (notes, captions);
//                              falls back to --ink-soft / --on-dark-soft.
//
// Contrast contract: every ink/hot/hover value must clear WCAG 4.5:1 against
// its flood, and inkMid/inkSoft/secAccent against the band background. These
// vars paint text down to 0.62rem (nav numbers, tags, foot links), so the
// large-text 3:1 allowance never applies. Hover must also differ in hue from
// ink, since the two are close in lightness on bright floods and hue plus the
// translateX shift is what makes hover read.
export const SECTIONTHEME = {
    // ── Projects (keyed by Project.name) ──
    'PayPath': { flood: '#ffd21e', ink: '#0e6b47', hot: '#a61e4d', hover: '#1a4d9e', active: '#1a4d9e' },                 // gold flood, emerald links, raspberry numbers, cobalt hover
    'DADA-85': { flood: '#66d9e8', ink: '#7f330f', hot: '#a30d18', hover: '#5235ab', active: '#5235ab', secAccent: '#99e9f2' },  // sky flood, ember links, fire-red numbers, violet hover
    'Trak': { flood: '#ffa94d', ink: '#17428a', hot: '#8a1c1c', hover: '#054d38', active: '#054d38', secAccent: '#ffc078' },   // amber flood, cobalt links, brick numbers, deep-teal hover
    'WhatToDo': { flood: '#c0eb75', ink: '#5a22ad', hot: '#a61e4d', hover: '#095c6b', active: '#095c6b' },                // lime flood, grape links, raspberry numbers, deep-cyan hover
    'Physiological Signal Analytics Platform': { flood: '#69db7c', ink: '#9d1049', hot: '#2b3d9e', hover: '#823000', active: '#823000' },  // green flood, crimson links, indigo numbers, burnt-amber hover
    'Paxos Key-Value Store': { flood: '#ffa8a8', ink: '#084d52', hot: '#8a1444', hover: '#2b3aa5', active: '#2b3aa5', secAccent: '#ffc9c9' },  // coral flood, teal links, wine-rose numbers, indigo hover
    'Cell Type Classification from scRNA-seq': { flood: '#b2f2bb', ink: '#8a1a86', hot: '#a61e4d', hover: '#6741d9', active: '#6741d9' },  // pale-green flood, plum links, raspberry numbers, indigo hover
    'Emotion Recognition from Physiological Signals': { flood: '#3b41c4', ink: '#f0e9d8', hot: '#ffc1c1', hover: '#63e6be', active: '#63e6be', secAccent: '#dbe4ff' },  // royal-blue flood, cream links, blush numbers, mint hover; periwinkle on the bronze tint (the flood is too dark there)

    // ── Sections (keyed by Section.title) ──
    'About': { flood: '#2528a6', ink: '#ecdcc0', hot: '#8dfaa1', hover: '#ffd21e', active: '#ffd21e' },                   // cream band → royal blue flood
    'Education': { flood: '#ff5f8f', ink: '#04331f', hot: '#590722', hover: '#590722', active: '#590722', secAccent: '#ffc2d1' },  // emerald band → rose pink flood, forest links, wine accent
    'Skills': { flood: '#c8f542', ink: '#5b21c0', hot: '#173404', hover: '#33691e', active: '#33691e' },                  // violet band → lime flood, grape links, forest hover
    'Off the clock': { flood: '#ff8c1a', ink: '#141018', hot: '#2528a6', hover: '#2528a6', active: '#2528a6' },           // near-black band → bright orange flood
    'Photography': { flood: '#f4f0e8', ink: '#141018' },                                                                  // near-black band → film white flood
    'Jiu-Jitsu': { flood: '#ff5f8f', ink: '#141018', hot: '#590722', hover: '#590722', active: '#590722' },               // near-black band → rose pink flood, wine accent
    'Listening & Watching': { flood: '#c8f542', ink: '#141018', hot: '#5b21c0', hover: '#5b21c0', active: '#5b21c0' }     // near-black band → lime flood
};

// ── Theme → CSS bridge ──────────────────────────────────────────────────────
// The one mapping from theme keys to the band-level custom properties. JS
// applies vars, CSS holds every rule that consumes them — no colour decisions
// anywhere else. (The menu orb has its own writer, Menu.applyTheme(), because
// its vars live on <html> and change with scroll, not per band element.)

export function themeVars(theme) {
    var vars = {};
    if (!theme) return vars;
    vars['--sec-accent'] = theme.secAccent || theme.flood;
    if (theme.inkMid) vars['--sec-ink-mid'] = theme.inkMid;
    if (theme.inkSoft) vars['--sec-ink-soft'] = theme.inkSoft;
    return vars;
}

export function applyThemeVars(el, theme) {
    var vars = themeVars(theme);
    for (var key in vars) el.style.setProperty(key, vars[key]);
}
