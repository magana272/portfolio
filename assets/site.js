(function () {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Entrance animations (skip if user prefers reduced motion)
    if (!prefersReducedMotion) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.feature, .pcard, .job, .edu-entry, .skills-grid, .pub-title').forEach(function (el) {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    // Only play looping project videos while they're on screen — the DADA-85
    // clip is heavy, so we don't want it decoding off-screen. Skip autoplay
    // entirely when the user prefers reduced motion: the poster frame stands in,
    // and the multi-megabyte clip is never even fetched.
    var videos = document.querySelectorAll('.feature-media video, .pcard-cover video');
    if (!prefersReducedMotion && videos.length && 'IntersectionObserver' in window) {
        var vObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var v = entry.target;
                if (entry.isIntersecting) {
                    var p = v.play();
                    if (p && p.catch) p.catch(function () {});
                } else {
                    v.pause();
                }
            });
        }, { threshold: 0.2 });
        videos.forEach(function (v) { vObserver.observe(v); });
    }

    // The nav is always visible; add a subtle shadow once the page scrolls.
    var siteNav = document.querySelector('.site-nav');
    var navLinks = document.querySelectorAll('.nav-links a');
    var sections = [];
    navLinks.forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        if (el) sections.push({ el: el, link: link });
    });

    function updateNavScrolled() {
        if (siteNav) siteNav.classList.toggle('is-scrolled', window.scrollY > 8);
    }

    function updateActiveNav() {
        var scrollPos = window.scrollY + 140;
        var active = null;
        sections.forEach(function (s) {
            if (s.el.offsetTop <= scrollPos) active = s;
        });
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        if (active) active.link.classList.add('active');
    }

    var scrollTicking = false;
    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            requestAnimationFrame(function () {
                updateNavScrolled();
                updateActiveNav();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
    updateNavScrolled();
    updateActiveNav();

    // Mobile hamburger menu
    var navToggle = document.querySelector('.nav-toggle');
    if (navToggle && siteNav) {
        var setMenu = function (open) {
            siteNav.classList.toggle('menu-open', open);
            navToggle.setAttribute('aria-expanded', String(open));
            navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        };
        navToggle.addEventListener('click', function () {
            setMenu(!siteNav.classList.contains('menu-open'));
        });
        navLinks.forEach(function (a) {
            a.addEventListener('click', function () { setMenu(false); });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setMenu(false);
        });
    }

    // Expand all / collapse all (Experience cards)
    document.querySelectorAll('.expand-all-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var section = btn.closest('section');
            var cards = section.querySelectorAll('.card');
            var allExpanded = Array.from(cards).every(function (c) {
                return !c.classList.contains('collapsed');
            });
            cards.forEach(function (c) {
                c.classList.toggle('collapsed', allExpanded);
            });
            btn.textContent = allExpanded ? 'Expand all' : 'Collapse all';
        });
    });
})();
