// Section model: one nav-addressable band of a page — its anchor id, its menu
// label and cluster, the band's background colour, and the orb colour triple
// the menu wears while the band is on screen. The instances live in
// content/sections.js; the Page paints them, the Menu builds its links from
// them, and the scroll spy themes the orb from them — no other copy of any of
// that data exists.
import { complement, triad } from '../../lib/core.js';

export class Section {
    constructor(opts) {
        this.id = opts.id;                        // element id, also the #anchor
        this.title = opts.title;                  // menu label
        // Which menu cluster the section belongs to: 'main' (the numbered
        // list), 'off' (the off-the-clock cluster), or 'off-label' (the
        // cluster's heading link).
        this.group = opts.group || 'main';
        this.background = opts.background || '';  // the band's colour
        // Orb theme for this band: {flood, ink, hot, hover, active}. flood is
        // the orb/overlay colour, ink the links at rest, hot the list numbers
        // and tags, and hover/active the one-per-menu link interaction colour
        // (the band accent). Omitted keys fall back to the :root defaults
        // (yellow flood, near-black ink, deep red accent).
        this.theme = opts.theme || null;
        // Optional jump-list nested under the section's menu link: entries of
        // {anchor, num, name, tag} (the Projects band lists its panels).
        this.sublist = opts.sublist || [];
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

    // Computed theme for tinted bands (projects, roles), which carry --tint
    // instead of a hand-tuned theme: the tint's complement floods, the tint
    // itself inks the links, and the triad's third hue is the accent — worn by
    // the numbers/tags (hot) and, one per menu, the hover/active links.
    static themeFromTint(tint) {
        var flood = complement(tint);
        if (!flood) return null;
        var accent = triad(tint);
        return { flood: flood, ink: tint, hot: accent, hover: accent, active: accent };
    }
}
