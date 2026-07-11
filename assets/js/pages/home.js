// Home page controller and entry point: HomePage extends Page. This is the
// single module the page loads (<script type="module">); its imports pull in
// the rest of the graph, so the load order lives here explicitly.
//
// The base Page owns the shared boot sequence (paint the section bands, wait
// for the nav partial, build the Menu from SECTIONS, attach the project
// jump-list); this subclass adds what is unique to the home page: the project
// and experience panels, the mosaic/media/pager behaviours, and the scroll spy.
import { PROJECTS } from '../content/projects.js';
import { EXPERIENCES } from '../content/experiences.js';
import { SECTIONS } from '../content/sections.js';
import { Page } from './page.js';
import { initScrollSpy } from '../features/scroll-spy.js';
import { initMediaLoader } from '../features/media-loader.js';
import { initPhotoMosaic } from '../features/photo-mosaic.js';
import { initPager } from '../features/pager.js';

class HomePage extends Page {
    constructor() {
        super({ sections: SECTIONS, linkPrefix: '' });
    }

    // Panels are page markup, independent of the nav partial — built up front.
    // The media loader observes the project videos and the mosaic tiles, so it
    // runs after both exist.
    render() {
        this.buildProjectPanels();
        this.buildExperiences();
        initPhotoMosaic();
        initMediaLoader();
        initPager();
    }

    buildProjectPanels() {
        var work = document.getElementById('work');
        if (!work) return;
        PROJECTS.forEach(function (p, i) {
            work.appendChild(p.renderFeature(i + 1));
        });
    }

    buildExperiences() {
        var container = document.getElementById('experience');
        if (!container) return;
        EXPERIENCES.forEach(function (e, i) {
            container.appendChild(e.render(i + 1));
        });
    }

    // Nav-dependent: the spy needs both the injected menu and the built panels.
    onNavReady() {
        initScrollSpy(this.sections, this.menu);
    }
}

new HomePage().init();
