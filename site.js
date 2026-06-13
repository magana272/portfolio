(function () {
    // Entrance animations (skip if user prefers reduced motion)
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.card, .edu-entry, .skills-grid, .pub-title').forEach(function (el) {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    // Sticky nav active section tracking
    var navLinks = document.querySelectorAll('.site-nav a');
    var sections = [];
    navLinks.forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        if (el) sections.push({ el: el, link: link });
    });

    function updateActiveNav() {
        var scrollPos = window.scrollY + 100;
        var active = null;
        sections.forEach(function (s) {
            if (s.el.offsetTop <= scrollPos) {
                active = s;
            }
        });
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        if (active) active.link.classList.add('active');
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

    // Expand all / collapse all
    document.querySelectorAll('.expand-all-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var section = btn.closest('section');
            var cards = section.querySelectorAll('.card');
            var allExpanded = Array.from(cards).every(function (c) {
                return !c.classList.contains('collapsed');
            });

            cards.forEach(function (c) {
                if (allExpanded) {
                    c.classList.add('collapsed');
                } else {
                    c.classList.remove('collapsed');
                }
            });
            btn.textContent = allExpanded ? 'Expand all' : 'Collapse all';
        });
    });
})();
