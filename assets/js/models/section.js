// Section model: one nav-addressable band of a page — its anchor id, its menu
// label and cluster, the band's background colour, and the orb colour triple
// the menu wears while the band is on screen. The instances live in
// content/sections.js; the Page paints them, the Menu builds its links from
// them, and the scroll spy themes the orb from them — no other copy of any of
// that data exists.
import { complement, triad } from '../core.js';

export class Section {
    constructor(opts) {
        this.id = opts.id;                        // element id, also the #anchor
        this.title = opts.title;                  // menu label
        // Which menu cluster the section belongs to: 'main' (the numbered
        // list), 'off' (the off-the-clock cluster), or 'off-label' (the
        // cluster's heading link).
        this.group = opts.group || 'main';
        this.background = opts.background || '';  // the band's colour
        // Orb triple {flood, ink, hot} for this band. Omitted → the :root
        // defaults (yellow flood, near-black ink, deep red hot).
        this.theme = opts.theme || null;
        // Optional jump-list nested under the section's menu link: entries of
        // {anchor, num, name, tag, hover} (the Projects band lists its panels).
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

    // Computed triple for tinted bands (projects, roles), which carry --tint
    // instead of a hand-tuned theme: the tint's complement floods, the tint
    // itself inks the links, the triad's third hue runs hot.
    static themeFromTint(tint) {
        var flood = complement(tint);
        return flood ? { flood: flood, ink: tint, hot: triad(tint) } : null;
    }
}
