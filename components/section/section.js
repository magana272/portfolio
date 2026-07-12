// Section model: one nav-addressable band of a page — its anchor id, its menu
// label and cluster, the band's background colour, and the orb colour triple
// the menu wears while the band is on screen. The instances live in
// content/sections.js; the Page paints them, the Menu builds its links from
// them, and the scroll spy themes the orb from them — no other copy of any of
// that data exists. Each project band is itself a Section (group 'project'),
// so the projects heading nests them as its jump-list rather than duplicating
// them as a separate array.
import { SECTIONTHEME, applyThemeVars } from '../../lib/theme.js';

export class Section {
    constructor(opts) {
        this.id = opts.id;                        // element id, also the #anchor
        this.title = opts.title;                  // menu label
        // Which menu cluster the section belongs to: 'main' (the numbered
        // list), 'off' (the off-the-clock cluster), 'off-label' (the cluster's
        // heading link), or 'project' (a project band nested under the
        // projects heading).
        this.group = opts.group || 'main';
        this.background = opts.background || '';  // the band's colour
        // Orb theme for this band — looked up in the SECTIONTHEME registry
        // (lib/theme.js) by title, or null → the :root default orb.
        // A theme is {flood, ink, hot, hover, active}: flood on the orb/overlay,
        // ink the links at rest, hot the numbers/tags, hover/active the
        // one-per-menu link interaction colour. Project bands share the entry
        // keyed by their name (their Section's title is the project name).
        this.theme = SECTIONTHEME[this.title] || null;
        // Small tag shown beside this section's name when it appears as a
        // nested sub-link (a project's tagline / category).
        this.tag = opts.tag || '';
        // If set, the Menu nests every Section in this group under this
        // section's menu link as a numbered jump-list (the projects heading
        // sets sublistGroup: 'project').
        this.sublistGroup = opts.sublistGroup || '';
    }

    el() {
        return document.getElementById(this.id);
    }

    // The band paints itself — the background is Section data, not a per-id
    // CSS rule. A no-op on pages that don't carry the band. Alongside the
    // background it hands the theme to applyThemeVars() (lib/theme.js), which
    // sets the band-level custom properties (--sec-accent, --sec-ink-mid,
    // --sec-ink-soft) the section stylesheets consume — the colour decisions
    // stay in the theme registry, the rules stay in CSS.
    applyBackground() {
        var el = this.el();
        if (!el) return;
        if (this.background) el.style.background = this.background;
        applyThemeVars(el, this.theme);
    }
}
