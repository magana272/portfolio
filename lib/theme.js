// SECTIONTHEME — every band's colour story in one registry, keyed by the
// band's display name (a project's `name` or a section's `title`). The
// Project and Section models look their theme up here by that name, so all
// the per-band colours live and get tuned in a single place. Values may be
// hexes or CSS vars.
//
// EXPLICITNESS CONTRACT (enforced by scripts/check-theme.mjs, npm pretest):
// every entry fills every key of its groups — no implicit fallbacks hiding
// in the CSS. Sections carry orb + band; projects carry orb + band (with
// pink) + dd. The dd element-channel keys are the one optional extra.
//
// A theme's groups:
//
//   orb: {flood, ink, hot, hover, active} — the menu orb while the band is on
//   screen. flood floods the orb + overlay, ink is the links at rest, hot the
//   numbers/tags, hover/active the one-per-menu link interaction colour.
//   Menu.applyTheme() is the only consumer (it writes the --orb-* vars).
//
//   band: {accent, ink, inkMid, inkSoft, line, pink} — the band's OWN
//   content. themeVars() below is the only mapping to CSS; the section
//   stylesheets consume the vars (each still carries a :root-token fallback
//   as a safety net for unthemed elements):
//     accent  → --sec-accent   kicker, labels, list numerals, panel indexes,
//                              link hovers; conventionally the orb flood (the
//                              band colour's complement) unless the flood
//                              misses 4.5:1 on the band/tint background —
//                              then a lighter tint of the same flood hue.
//                              Also the deep-dive accent default.
//     ink     → --sec-ink      the band's primary text tone. NOTE: text
//                              sitting on a light card INSIDE a band (the
//                              experience white box, the pcard) reads the
//                              global --ink, not this — keep band ink tuned
//                              to the band background.
//     inkMid  → --sec-ink-mid  the band's mid text tone (secondary copy).
//     inkSoft → --sec-ink-soft the band's soft text tone (notes, captions).
//     line    → --sec-line     rules and dividers inside the band.
//     pink    → --pink         (projects only) the panel's card accent.
//                              Applied by Project.styleVars() on the panel
//                              only — NOT by applyThemeVars() — because the
//                              deep-dive page derives its --pink from
//                              --sec-accent instead.
//
//   dd: — (projects only) the deep-dive page:
//     tones: {accent, ink, inkMid, inkSoft, line, surface} — the page's
//     palette, delivered as the --dd-* vars the .dd-page tone channels read
//     (pages/deep-dive/deep-dive.css). accent feeds the page's --pink.
//     element channels (optional): {heroInk, eyebrowInk, labelInk,
//     headingInk, headingNum, noteAccent, copyInk} repaint one element kind
//     directly, overriding the role defaults assigned in the .dd-page block.
//     Print re-pins every channel to ink-on-white regardless.
//
// Contrast contract: every orb ink/hot/hover value must clear WCAG 4.5:1
// against its flood, and every band key against the band/tint background.
// These vars paint text down to 0.62rem (nav numbers, tags, foot links), so
// the large-text 3:1 allowance never applies. Hover must also differ in hue
// from ink, since the two are close in lightness on bright floods and hue
// plus the translateX shift is what makes hover read.

// The cream deep-dive palette every project starts from (the same values the
// .dd-page channels used as literals before the registry went explicit).
var DD_CREAM = {
    ink: '#f4f0e8',
    inkMid: '#dbd6cc',
    inkSoft: '#cdc8be',
    line: 'rgba(244, 240, 232, 0.16)',
    surface: 'rgba(244, 240, 232, 0.07)'
};

// The tone set light-band content wears (cream hero, white projects band):
// the global :root token values, stated explicitly.
var LIGHT_BAND = { ink: '#111214', inkMid: '#56585c', inkSoft: '#636469', line: '#e5e5e2' };

// The tone set dark-band content wears (the jewel and near-black bands).
var DARK_BAND = { ink: '#f4f0e8', inkMid: '#cfc9be', inkSoft: '#cfc9be', line: '#e5e5e2' };

export const SECTIONTHEME = {
    // ── Projects (keyed by Project.name) ──
    // Project panels sit on the white work band; their pcard is a light card,
    // so the band group wears the light tones. dd is each project's
    // case-study page.
    'PayPath': {   // gold flood, emerald links, raspberry numbers, cobalt hover
        orb: { flood: '#ffd21e', ink: '#0e6b47', hot: '#a61e4d', hover: '#1a4d9e', active: '#1a4d9e' },
        band: { accent: '#ffd21e', ...LIGHT_BAND, pink: '#0d5f40' },
        dd: { accent: '#ffd21e', ...DD_CREAM }
    },
    'DADA-85': {   // sky flood, ember links, fire-red numbers, violet hover
        orb: { flood: '#66d9e8', ink: '#7f330f', hot: '#a30d18', hover: '#5235ab', active: '#5235ab' },
        band: { accent: '#99e9f2', ...LIGHT_BAND, inkSoft: '#7f330f', pink: '#8a3609' },
        dd: { accent: '#99e9f2', ...DD_CREAM }
    },
    'Trak': {      // amber flood, cobalt links, brick numbers, deep-teal hover
        orb: { flood: '#ffa94d', ink: '#17428a', hot: '#8a1c1c', hover: '#054d38', active: '#054d38' },
        band: { accent: '#ffc078', ...LIGHT_BAND, pink: '#1a4489' },
        dd: { accent: '#ffc078', ...DD_CREAM }
    },
    'WhatToDo': {  // lime flood, grape links, raspberry numbers, deep-cyan hover
        orb: { flood: '#c0eb75', ink: '#5a22ad', hot: '#a61e4d', hover: '#095c6b', active: '#095c6b' },
        band: { accent: '#c0eb75', ...LIGHT_BAND, pink: '#4c1e93' },
        dd: { accent: '#c0eb75', ...DD_CREAM }
    },
    'Physiological Signal Analytics Platform': {  // green flood, crimson links, indigo numbers, burnt-amber hover
        orb: { flood: '#69db7c', ink: '#9d1049', hot: '#2b3d9e', hover: '#823000', active: '#823000' },
        band: { accent: '#69db7c', ...LIGHT_BAND, pink: '#8a0e40' },
        dd: { accent: '#69db7c', ...DD_CREAM }
    },
    'Paxos Key-Value Store': {  // coral flood, teal links, wine-rose numbers, indigo hover
        orb: { flood: '#ffa8a8', ink: '#084d52', hot: '#8a1444', hover: '#2b3aa5', active: '#2b3aa5' },
        band: { accent: '#ffc9c9', ...LIGHT_BAND, pink: '#0a5257' },
        dd: { accent: '#ffc9c9', ...DD_CREAM }
    },
    'Cell Type Classification from scRNA-seq': {  // pale-green flood, plum links, raspberry numbers, indigo hover
        orb: { flood: '#b2f2bb', ink: '#8a1a86', hot: '#a61e4d', hover: '#6741d9', active: '#6741d9' },
        band: { accent: '#b2f2bb', ...LIGHT_BAND, pink: '#781575' },
        dd: { accent: '#b2f2bb', ...DD_CREAM }
    },
    'Emotion Recognition from Physiological Signals': {  // royal-blue flood, cream links, blush numbers, mint hover; periwinkle accent on the bronze tint (the flood is too dark there)
        orb: { flood: '#3b41c4', ink: '#f0e9d8', hot: '#ffc1c1', hover: '#63e6be', active: '#63e6be' },
        band: { accent: '#dbe4ff', ...LIGHT_BAND, pink: '#7a4a06' },
        dd: { accent: '#dbe4ff', ...DD_CREAM }
    },

    // ── Sections (keyed by Section.title) ──
    'About': {     // cream band → royal blue flood; light band tones
        orb: { flood: '#2528a6', ink: '#ecdcc0', hot: '#8dfaa1', hover: '#ffd21e', active: '#ffd21e' },
        band: { accent: '#2528a6', ...LIGHT_BAND }
    },
    'Experience': {  // jewel-blue roles wear the default orb, stated explicitly
        orb: { flood: '#ffd21e', ink: '#111214', hot: '#b0311b', hover: '#b0311b', active: '#b0311b' },
        band: { accent: '#ffd21e', ...DARK_BAND }
    },
    'Education': { // emerald band → rose pink flood, forest links, wine accent
        orb: { flood: '#ff5f8f', ink: '#04331f', hot: '#590722', hover: '#590722', active: '#590722' },
        band: { accent: '#ffc2d1', ...DARK_BAND }
    },
    'Skills': {    // violet band → lime flood, grape links, forest hover
        orb: { flood: '#c8f542', ink: '#5b21c0', hot: '#173404', hover: '#33691e', active: '#33691e' },
        band: { accent: '#c8f542', ...DARK_BAND }
    },
    'Off the clock': {  // near-black band → bright orange flood
        orb: { flood: '#ff8c1a', ink: '#141018', hot: '#2528a6', hover: '#2528a6', active: '#2528a6' },
        band: { accent: '#ff8c1a', ...DARK_BAND }
    },
    'Photography': {    // near-black band → film white flood; default red accents
        orb: { flood: '#f4f0e8', ink: '#141018', hot: '#b0311b', hover: '#b0311b', active: '#b0311b' },
        band: { accent: '#f4f0e8', ...DARK_BAND }
    },
    'Jiu-Jitsu': {      // near-black band → rose pink flood, wine accent
        orb: { flood: '#ff5f8f', ink: '#141018', hot: '#590722', hover: '#590722', active: '#590722' },
        band: { accent: '#ff5f8f', ...DARK_BAND }
    },
    'Listening & Watching': {  // near-black band → lime flood
        orb: { flood: '#c8f542', ink: '#141018', hot: '#5b21c0', hover: '#5b21c0', active: '#5b21c0' },
        band: { accent: '#c8f542', ...DARK_BAND }
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

// The dd group → the --dd-* vars on the deep-dive page: tone keys feed the
// .dd-page tone channels, element keys override an element channel directly.
// Applied on the .dd-page body by DeepDivePage; the print rules in
// deep-dive.css re-pin every channel, so print stays ink-on-white whatever
// the theme says.
var DD_KEYS = {
    // tones
    accent: '--dd-accent',
    ink: '--dd-ink',
    inkMid: '--dd-ink-mid',
    inkSoft: '--dd-ink-soft',
    line: '--dd-line',
    surface: '--dd-surface',
    // element channels
    heroInk: '--dd-hero-ink',
    eyebrowInk: '--dd-eyebrow-ink',
    labelInk: '--dd-label-ink',
    headingInk: '--dd-heading-ink',
    headingNum: '--dd-heading-num',
    noteAccent: '--dd-note-accent',
    copyInk: '--dd-copy-ink'
};

export function ddVars(theme) {
    var vars = {};
    if (!theme || !theme.dd) return vars;
    for (var key in DD_KEYS) {
        if (theme.dd[key]) vars[DD_KEYS[key]] = theme.dd[key];
    }
    return vars;
}

export function applyDdVars(el, theme) {
    var vars = ddVars(theme);
    for (var key in vars) el.style.setProperty(key, vars[key]);
}
