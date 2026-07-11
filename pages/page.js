// Page — the base class every page controller extends. It owns the boot
// sequence the pages used to duplicate: paint the section bands, run the
// page's own render(), wait for the nav partial to land, stand up the Menu
// (built from the same sections, jump-list included), then hand back control
// through onNavReady(). Subclasses declare their data (sections, link prefix)
// and their two hooks; this class owns the order.
import { ready as includesReady } from '../lib/includes.js';
import { Menu } from '../components/nav/nav.js';

export class Page {
    constructor(opts) {
        opts = opts || {};
        this.sections = opts.sections || [];
        // '' when the page owns the sections, 'index.html' from a subpage so
        // the menu links point back home.
        this.linkPrefix = opts.linkPrefix || '';
        this.menu = null;
    }

    // Subclass hooks. render() builds the page's own markup and behaviours
    // (runs before the nav partial lands); onNavReady() wires anything that
    // needs the injected nav (scroll spy, menu theming).
    render() {}
    onNavReady() {}

    init() {
        var page = this;
        // Each band paints itself from its Section — a no-op for sections that
        // aren't on this page.
        this.sections.forEach(function (s) { s.applyBackground(); });
        this.render();
        return includesReady.then(function () {
            page.menu = new Menu({ sections: page.sections, linkPrefix: page.linkPrefix });
            page.menu.init();
            page.onNavReady();
        });
    }
}
