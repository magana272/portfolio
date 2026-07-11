// Scroll spy (home page) — highlights the menu link for the section currently
// on screen and themes the menu orb to match the band under it, through
// menu.applyTheme(). Each band's theme rides in on its Section (projects
// included); bands with no Section theme (the experience roles) get the
// default orb. HomePage calls initScrollSpy(sections, menu) after the panels
// are built and the nav partial has landed.

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

    // Every colour band in document order, first-match-wins from the bottom.
    // Sections (projects included) carry their theme on their Section, keyed by
    // element id; a band with no Section theme (the experience roles) gets the
    // default orb ({}). Panels are built before this runs (see pages/index.js),
    // so the bands exist by now.
    var themeSpots = Array.prototype.slice.call(
        document.querySelectorAll('header[id], main section[id], #work .feature, #experience .exp')
    ).map(function (el) {
        return { el: el, theme: themeById[el.id] || {} };
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
