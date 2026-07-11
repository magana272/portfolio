// Section model: one nav-addressable band of a page — its anchor id, its menu
// label and cluster, the band's background colour, and the orb colour triple
// the menu wears while the band is on screen. The instances live in
// content/sections.js; the Page paints them, the Menu builds its links from
// them, and the scroll spy themes the orb from them — no other copy of any of
// that data exists. Each project band is itself a Section (group 'project'),
// so the projects heading nests them as its jump-list rather than duplicating
// them as a separate array.
import { complement, triad } from '../../lib/core.js';

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
        // Orb theme for this band: {flood, ink, hot, hover, active}. flood is
        // the orb/overlay colour, ink the links at rest, hot the list numbers
        // and tags, and hover/active the one-per-menu link interaction colour
        // (the band accent). Omitted keys fall back to the :root defaults
        // (yellow flood, near-black ink, deep red accent).
        this.theme = opts.theme || null;
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
    // CSS rule. A no-op on pages that don't carry the band.
    applyBackground() {
        var el = this.el();
        if (el && this.background) el.style.background = this.background;
    }

    // Orb theme from a spec: a full {flood, ink, hot, hover, active} object is
    // used as-is (hand-tuned menu colours), a tint colour string is expanded
    // via themeFromTint, and anything falsy yields no theme (the :root default
    // orb). This is what a project band's Section is built from —
    // Section.theme(project.theme) — so a project can either hand-tune its orb
    // or fall back to its tint.
    static theme(spec) {
        if (!spec) return null;
        return typeof spec === 'string' ? Section.themeFromTint(spec) : spec;
    }

    // Computed theme for a tinted band from a single tint colour: the tint's
    // complement floods, the tint itself inks the links, and the triad's third
    // hue is the accent — worn by the numbers/tags (hot) and, one per menu, the
    // hover/active links.
    static themeFromTint(tint) {
        var flood = complement(tint);
        if (!flood) return null;
        var accent = triad(tint);
        return { flood: flood, ink: tint, hot: accent, hover: accent, active: accent };
    }
}
