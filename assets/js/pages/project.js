// Deep-dive page controller and entry point: DeepDivePage extends Page.
// Looks up the project from the ?id=<slug> query param, pairs it with its
// case-study copy, and hands the rendering to the DeepDive model
// (models/deep-dive.js). The base Page owns the shared boot sequence; the menu
// is built from the same SECTIONS list with links prefixed back to index.html,
// and once the orb exists onNavReady() washes it in the project's colours via
// Menu.applyTheme().
import { PROJECTS } from '../content/projects.js';
import { DEEP_DIVES } from '../content/deep-dives.js';
import { SECTIONS } from '../content/sections.js';
import { DeepDive } from '../models/deep-dive.js';
import { Page } from './page.js';
import { esc } from '../core.js';

class DeepDivePage extends Page {
    constructor() {
        super({ sections: SECTIONS, linkPrefix: 'index.html' });
        this.project = null;
    }

    render() {
        var params = new URLSearchParams(window.location.search);
        var id = params.get('id');
        var project = PROJECTS.filter(function (p) { return p.slug === id; })[0];
        // Case-study copy lives in its own file (content/deep-dives.js), keyed
        // by slug, so the home page never loads it.
        var cs = project ? DEEP_DIVES[project.slug] : null;

        var root = document.getElementById('deep-dive');

        if (!project || !cs) {
            this.renderNotFound(root, id);
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

        root.innerHTML = new DeepDive(project, cs).html();
        this.wireOutline(root);
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

    // Smooth-scroll the sidebar outline links (base href would otherwise send
    // them to the home page).
    wireOutline(root) {
        root.querySelectorAll('.dd-outline a').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var target = document.getElementById(a.getAttribute('href').slice(1));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Theme the menu for this project once the orb exists: a cream orb/flood
    // that pops against the dark jewel page, with the menu text in the
    // project's signature colour.
    onNavReady() {
        if (this.project && this.project.tint) {
            this.menu.applyTheme({
                flood: 'var(--on-dark)',
                ink: this.project.tint,
                hot: 'var(--accent-deep)'
            });
        }
    }
}

new DeepDivePage().init();
