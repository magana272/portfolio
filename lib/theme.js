// SECTIONTHEME — every band's colour story in one registry, keyed by the
// band's display name (a project's `name` or a section's `title`). The
// Project and Section models look their theme up here by that name, so all
// the per-band colours live and get tuned in a single place. Values may be
// hexes or CSS vars.
//
// A theme has two groups:
//
//   orb: {flood, ink, hot, hover, active} — the menu orb while the band is on
//   screen. flood floods the orb + overlay, ink is the links at rest, hot the
//   numbers/tags, hover/active the one-per-menu link interaction colour.
//   Omitted keys fall back to the :root defaults (yellow flood, near-black
//   ink, deep red accent); a band with no entry wears the default orb.
//   Menu.applyTheme() is the only consumer (it writes the --orb-* vars).
//
//   band: {accent, ink, inkMid, inkSoft, line, pink} — the band's OWN
//   content, every key optional. themeVars() below is the only mapping to
//   CSS; the section stylesheets consume the vars with :root-token fallbacks,
//   so an omitted key renders from the global tokens:
//     accent  → --sec-accent   kicker, labels, list numerals, panel indexes,
//                              link hovers; defaults to the orb flood (the
//                              band colour's complement, so it pops by
//                              construction). Set it explicitly only where
//                              the flood misses 4.5:1 on the band/tint
//                              background — then a lighter tint of the same
//                              flood hue. Also the deep-dive accent (--pink
//                              on the .dd-page reads --sec-accent).
//     ink     → --sec-ink      the band's primary text tone (falls back to
//                              --on-dark on dark bands, --ink on light ones).
//     inkMid  → --sec-ink-mid  the band's mid text tone (secondary copy).
//     inkSoft → --sec-ink-soft the band's soft text tone (notes, captions).
//     line    → --sec-line     rules and dividers inside the band.
//     pink    → --pink         the project panel's card accent (headings,
//                              links, motifs on the light pcard). Applied by
//                              Project.styleVars() on the panel only — NOT by
//                              applyThemeVars() — because the deep-dive page
//                              derives its --pink from --sec-accent instead.
//
// Contrast contract: every orb ink/hot/hover value must clear WCAG 4.5:1
// against its flood, and every band key against the band/tint background.
// These vars paint text down to 0.62rem (nav numbers, tags, foot links), so
// the large-text 3:1 allowance never applies. Hover must also differ in hue
// from ink, since the two are close in lightness on bright floods and hue
// plus the translateX shift is what makes hover read.
export const SECTIONTHEME = {
    // ── Projects (keyed by Project.name) ──
    'PayPath': {   // gold flood, emerald links, raspberry numbers, cobalt hover
        orb: { flood: '#ffd21e', ink: '#0e6b47', hot: '#a61e4d', hover: '#1a4d9e', active: '#1a4d9e' },
        band: { pink: '#0d5f40' }
    },
    'DADA-85': {   // sky flood, ember links, fire-red numbers, violet hover
        orb: { flood: '#66d9e8', ink: '#7f330f', hot: '#a30d18', hover: '#5235ab', active: '#5235ab' },
        band: { accent: '#99e9f2', pink: '#8a3609' }
    },
    'Trak': {      // amber flood, cobalt links, brick numbers, deep-teal hover
        orb: { flood: '#ffa94d', ink: '#17428a', hot: '#8a1c1c', hover: '#054d38', active: '#054d38' },
        band: { accent: '#ffc078', pink: '#1a4489' }
    },
    'WhatToDo': {  // lime flood, grape links, raspberry numbers, deep-cyan hover
        orb: { flood: '#c0eb75', ink: '#5a22ad', hot: '#a61e4d', hover: '#095c6b', active: '#095c6b' },
        band: { pink: '#4c1e93' }
    },
    'Physiological Signal Analytics Platform': {  // green flood, crimson links, indigo numbers, burnt-amber hover
        orb: { flood: '#69db7c', ink: '#9d1049', hot: '#2b3d9e', hover: '#823000', active: '#823000' },
        band: { pink: '#8a0e40' }
    },
    'Paxos Key-Value Store': {  // coral flood, teal links, wine-rose numbers, indigo hover
        orb: { flood: '#ffa8a8', ink: '#084d52', hot: '#8a1444', hover: '#2b3aa5', active: '#2b3aa5' },
        band: { accent: '#ffc9c9', pink: '#0a5257' }
    },
    'Cell Type Classification from scRNA-seq': {  // pale-green flood, plum links, raspberry numbers, indigo hover
        orb: { flood: '#b2f2bb', ink: '#8a1a86', hot: '#a61e4d', hover: '#6741d9', active: '#6741d9' },
        band: { pink: '#781575' }
    },
    'Emotion Recognition from Physiological Signals': {  // royal-blue flood, cream links, blush numbers, mint hover; periwinkle accent on the bronze tint (the flood is too dark there)
        orb: { flood: '#3b41c4', ink: '#f0e9d8', hot: '#ffc1c1', hover: '#63e6be', active: '#63e6be' },
        band: { accent: '#dbe4ff', pink: '#7a4a06' }
    },

    // ── Sections (keyed by Section.title) ──
    'About': {     // cream band → royal blue flood
        orb: { flood: '#2528a6', ink: '#ecdcc0', hot: '#8dfaa1', hover: '#ffd21e', active: '#ffd21e' }
    },
    'Education': { // emerald band → rose pink flood, forest links, wine accent
        orb: { flood: '#ff5f8f', ink: '#04331f', hot: '#590722', hover: '#590722', active: '#590722' },
        band: { accent: '#ffc2d1' }
    },
    'Skills': {    // violet band → lime flood, grape links, forest hover
        orb: { flood: '#c8f542', ink: '#5b21c0', hot: '#173404', hover: '#33691e', active: '#33691e' }
    },
    'Off the clock': {  // near-black band → bright orange flood
        orb: { flood: '#ff8c1a', ink: '#141018', hot: '#2528a6', hover: '#2528a6', active: '#2528a6' }
    },
    'Photography': {    // near-black band → film white flood
        orb: { flood: '#f4f0e8', ink: '#141018' }
    },
    'Jiu-Jitsu': {      // near-black band → rose pink flood, wine accent
        orb: { flood: '#ff5f8f', ink: '#141018', hot: '#590722', hover: '#590722', active: '#590722' }
    },
    'Listening & Watching': {  // near-black band → lime flood
        orb: { flood: '#c8f542', ink: '#141018', hot: '#5b21c0', hover: '#5b21c0', active: '#5b21c0' }
    }
};

// ── Theme → CSS bridge ──────────────────────────────────────────────────────
// The one mapping from a theme's band group to the band-level custom
// properties. JS applies vars, CSS holds every rule that consumes them — no
// colour decisions anywhere else. (The menu orb has its own writer,
// Menu.applyTheme(), because its vars live on <html> and change with scroll;
// band.pink is applied by Project.styleVars(), see the schema note above.)

export function themeVars(theme) {
    var vars = {};
    if (!theme) return vars;
    var orb = theme.orb || {};
    var band = theme.band || {};
    vars['--sec-accent'] = band.accent || orb.flood;
    if (band.ink) vars['--sec-ink'] = band.ink;
    if (band.inkMid) vars['--sec-ink-mid'] = band.inkMid;
    if (band.inkSoft) vars['--sec-ink-soft'] = band.inkSoft;
    if (band.line) vars['--sec-line'] = band.line;
    return vars;
}

export function applyThemeVars(el, theme) {
    var vars = themeVars(theme);
    for (var key in vars) el.style.setProperty(key, vars[key]);
}
