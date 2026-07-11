// Scroll spy (home page) — highlights the menu link for the section currently
// on screen and themes the menu orb to match the band under it, through
// menu.applyTheme(). The static bands' colour triples ride in on the Section
// instances (content/sections.js); tinted bands (projects, roles) compute
// theirs from their --tint. HomePage calls initScrollSpy(sections, menu) after
// the panels are built and the nav partial has landed.
import { Section } from '../models/section.js';

export function initScrollSpy(sections, menu) {
    // Scroll spy — when the orb menu opens, the link for the section currently
    // on screen is highlighted. The hero (#about) is a header, not a main
    // section, so it's queried alongside them.
    var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    var linkById = {};
    navLinks.forEach(function (link) {
        linkById[link.getAttribute('href').slice(1)] = link;
    });
    var spySections = Array.prototype.slice.call(document.querySelectorAll('header[id], main section[id]'));

    var themeById = {};
    (sections || []).forEach(function (s) {
        if (s.theme) themeById[s.id] = s.theme;
    });

    // Every colour band in document order, first-match-wins from the bottom:
    // static sections carry their theme on their Section, tinted bands
    // (projects, experience) get their computed complement. Panels are built
    // before this runs (see pages/home.js), so the bands exist by now.
    var themeSpots = Array.prototype.slice.call(
        document.querySelectorAll('header[id], main section[id], #work .feature, #experience .exp')
    ).map(function (el) {
        var theme = themeById[el.id];
        if (!theme) {
            var tint = el.style.getPropertyValue('--tint');
            theme = (tint && Section.themeFromTint(tint)) || {};
        }
        return { el: el, theme: theme };
    });

    function updateActiveNav() {
        var scrollPos = window.scrollY + 140;
        var current = null;
        spySections.forEach(function (el) {
            if (el.offsetTop <= scrollPos) current = el;
        });
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        if (current && linkById[current.id]) linkById[current.id].classList.add('active');

        var currentTheme = null;
        themeSpots.forEach(function (spot) {
            var top = spot.el.getBoundingClientRect().top + window.scrollY;
            if (top <= scrollPos) currentTheme = spot.theme;
        });
        menu.applyTheme(currentTheme || {});
    }

    var scrollTicking = false;
    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            requestAnimationFrame(function () {
                updateActiveNav();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
    updateActiveNav();
}
