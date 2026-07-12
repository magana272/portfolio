// Home route controller and entry point: HomePage extends Page. This is the
// single module index.html loads (<script type="module">); its imports pull in
// the rest of the graph, so the load order lives here explicitly.
//
// The base Page owns the shared boot order (layout → render → nav partial →
// Menu → onNavReady). This subclass fills in what is unique to the home page:
//   layout()   — mount every band's component (education, skills, me,
//                jiu-jitsu, listening) and build the project + experience
//                panels.
//   render()   — wire the behaviours over that structure (mosaic, media
//                loader, pager).
//   onNavReady — the scroll spy, which needs the injected menu.
import { PROJECTS } from '../content/projects.js';
import { EXPERIENCES } from '../content/experiences.js';
import { SECTIONS } from '../content/sections.js';
import { PHOTOS } from '../content/photos.js';
import { EDUCATION } from '../content/education.js';
import { SKILLS } from '../content/skills.js';
import { ME } from '../content/me.js';
import { JIUJITSU } from '../content/jiujitsu.js';
import { LISTENING } from '../content/listening.js';
import { Page } from './page.js';
import { renderEducation } from '../components/education/education.js';
import { renderSkills } from '../components/skills/skills.js';
import { renderMe } from '../components/me/me.js';
import { renderJiujitsu } from '../components/jiujitsu/jiujitsu.js';
import { renderListening } from '../components/listening/listening.js';
import { initScrollSpy } from '../components/shared/nav/scroll-spy.js';
import { initMediaLoader } from '../lib/media-loader.js';
import { initPhotoMosaic } from '../components/photo-mosaic/photo-mosaic.js';
import { initPager } from '../components/shared/pager/pager.js';

class HomePage extends Page {
    constructor() {
        super({ sections: SECTIONS, linkPrefix: '' });
    }

    // Structure: paint the bands (super), fill each content band from its
    // component, then build the project and experience panels.
    layout() {
        super.layout();
        this.mount('education', renderEducation(EDUCATION));
        this.mount('skills', renderSkills(SKILLS));
        this.mount('about-me', renderMe(ME));
        this.mount('jiujitsu', renderJiujitsu(JIUJITSU));
        this.mount('listening', renderListening(LISTENING));
        this.buildProjectPanels();
        this.buildExperiences();
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

    // Behaviour: the media loader observes the project videos and the mosaic
    // tiles, so it runs after layout() built both.
    render() {
        initPhotoMosaic(PHOTOS);
        initMediaLoader();
        initPager();
    }

    // Nav-dependent: the spy needs both the injected menu and the built panels.
    onNavReady() {
        initScrollSpy(this.sections, this.menu);
    }
}

new HomePage().init();
