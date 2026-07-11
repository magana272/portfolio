// Page — the base class every page controller extends. It owns the boot
// sequence the pages used to duplicate, split into two subclass hooks:
//
//   layout()  — build the page's DOM structure: paint the section bands and
//               mount each band's component. The base paints the backgrounds
//               (common to every page); a subclass overrides, calls
//               super.layout(), then mounts its own sections/panels.
//   render()  — wire behaviour over the structure layout() built (media
//               loaders, the pager, scroll observers). Runs before the nav
//               partial lands.
//
// init() runs layout() → render(), waits for the nav partial, stands up the
// Menu (built from the same sections, jump-list included), then hands back
// control through onNavReady(). Subclasses declare their data (sections, link
// prefix) and these hooks; this class owns the order.
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

    // Structure. Base implementation paints every band from its Section — a
    // no-op for sections not on this page. Subclasses call super.layout() and
    // then mount their own components.
    layout() {
        this.sections.forEach(function (s) { s.applyBackground(); });
    }

    // Fill a section element's body with a component's markup. A no-op when the
    // section isn't on this page, so the same call is safe on every page.
    mount(id, html) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }

    // Subclass hooks. render() wires behaviour after layout() (runs before the
    // nav partial lands); onNavReady() wires anything that needs the injected
    // nav (scroll spy, menu theming).
    render() {}
    onNavReady() {}

    init() {
        var page = this;
        this.layout();
        this.render();
        return includesReady.then(function () {
            page.menu = new Menu({ sections: page.sections, linkPrefix: page.linkPrefix });
            page.menu.init();
            page.onNavReady();
        });
    }
}
