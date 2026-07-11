// Deep-dive route controller and entry point: DeepDivePage extends Page.
// Looks up the project from the ?id=<slug> query param, pairs it with its
// case-study copy, and hands the rendering to the DeepDive model
// (components/deep-dive/deep-dive.js). The base Page owns the shared boot
// order; the menu is built from the same SECTIONS list with links prefixed
// back to index.html, and once the orb exists onNavReady() washes it in the
// project's colours via Menu.applyTheme().
import { PROJECTS } from '../../content/projects.js';
import { DEEP_DIVES } from '../../content/deep-dives.js';
import { SECTIONS } from '../../content/sections.js';
import { Section } from '../../components/section/section.js';
import { DeepDive } from '../../components/deep-dive/deep-dive.js';
import { Page } from '../page.js';
import { esc } from '../../lib/core.js';

class DeepDivePage extends Page {
    constructor() {
        super({ sections: SECTIONS, linkPrefix: 'index.html' });
        this.project = null;
    }

    // Structure: resolve the slug and build the case study into #deep-dive (or
    // the not-found notice). super.layout() paints bands, a no-op here since
    // the home sections aren't on this page.
    layout() {
        super.layout();
        this.root = document.getElementById('deep-dive');

        var params = new URLSearchParams(window.location.search);
        var id = params.get('id');
        var project = PROJECTS.filter(function (p) { return p.slug === id; })[0];
        // Case-study copy lives in its own file (content/deep-dives.js), keyed
        // by slug, so the home page never loads it.
        var cs = project ? DEEP_DIVES[project.slug] : null;

        if (!project || !cs) {
            this.renderNotFound(this.root, id);
            return;
        }

        this.project = project;
        document.title = project.name + ' · Deep Dive';

        // Wash the whole deep dive in the project's signature jewel colour;
        // accents stay light (handled by the .dd-page token remap in the
        // stylesheet). The menu is themed separately in onNavReady().
        if (project.tint) {
            document.body.style.setProperty('--tint', project.tint);
        }

        this.root.innerHTML = new DeepDive(project, cs).html();
    }

    renderNotFound(root, id) {
        document.title = 'Project not found';
        root.innerHTML =
            '<div class="dd-notfound">' +
                '<h1>Project not found</h1>' +
                '<p>No deep dive exists for &ldquo;' + esc(id || '') + '&rdquo;.</p>' +
                '<a class="dd-back" href="index.html#projects-section">&larr; Back to projects</a>' +
            '</div>';
    }

    // Behaviour: smooth-scroll the sidebar outline links (base href would
    // otherwise send them to the home page). A no-op on the not-found notice,
    // which has no outline.
    render() {
        this.root.querySelectorAll('.dd-outline a').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var target = document.getElementById(a.getAttribute('href').slice(1));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Theme the menu once the orb exists with the SAME theme this project's
    // band wears on the home page (Section.theme(project.theme)), so the orb
    // matches everywhere the project appears. The deep-dive page is washed in
    // the project's dark tint, so the theme's bright flood pops just as it does
    // over the home band.
    onNavReady() {
        var theme = this.project && Section.theme(this.project.theme);
        if (theme) this.menu.applyTheme(theme);
    }
}

new DeepDivePage().init();
