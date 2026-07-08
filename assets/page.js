// Renders a project case-study page from the shared PROJECTS data.
// Driven by the ?id=<slug> query param. Every case study renders the same
// structure so the "Learn more" pages stay consistent.
(function () {
    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function sectionId(title) {
        return 'sec-' + String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var project = PROJECTS.filter(function (p) { return p.slug === id; })[0];

    var root = document.getElementById('case-study');

    if (!project || !project.caseStudy) {
        document.title = 'Project not found';
        root.innerHTML =
            '<div class="cs-notfound">' +
                '<h1>Project not found</h1>' +
                '<p>No case study exists for &ldquo;' + esc(id || '') + '&rdquo;.</p>' +
                '<a class="cs-back" href="index.html#projects-section">&larr; Back to projects</a>' +
            '</div>';
        return;
    }

    var cs = project.caseStudy;
    document.title = project.name + ' — Case Study';

    // Tint the case study with the project's signature colour.
    if (project.ink) document.body.style.setProperty('--pink', project.ink);
    if (project.tint) document.body.style.setProperty('--tint', project.tint);

    // --- Hero summary (Problem / Approach / Outcome) ---
    var summaryItems = [
        { label: 'Problem', value: cs.problem },
        { label: 'Approach', value: cs.approach || cs.scope },
        { label: 'Outcome', value: cs.outcome }
    ].filter(function (i) { return i.value; });

    var summaryHtml = summaryItems.length
        ? '<div class="cs-summary">' + summaryItems.map(function (i) {
            return '<div class="cs-summary-item">' +
                '<span class="cs-summary-label">' + esc(i.label) + '</span>' +
                '<p>' + esc(i.value) + '</p>' +
            '</div>';
        }).join('') + '</div>'
        : '';

    // --- Media ---
    var mediaHtml = project.media.length
        ? '<div class="cs-media">' + project.media.map(function (src) {
            return /\.(webm|mp4|mov)$/i.test(src)
                ? '<video src="' + encodeURI(src) + '" autoplay muted loop playsinline preload="metadata"></video>'
                : '<img src="' + esc(src) + '" alt="' + esc(project.name) + '" loading="lazy">';
        }).join('') + '</div>'
        : '';

    // --- Case study note ---
    var noteHtml = cs.note
        ? '<div class="cs-note"><span class="cs-note-label">Note</span><p>' + esc(cs.note) + '</p></div>'
        : '';

    // --- Highlights (the standout results / decisions) ---
    var highlights = cs.highlights || cs.evidence || [];
    var highlightsHtml = '';
    if (highlights.length) {
        highlightsHtml =
            '<section class="cs-block cs-highlights" id="' + sectionId('Highlights') + '"><h2>Highlights</h2><ul>' +
            highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') +
            '</ul></section>';
    }

    // --- Body sections ---
    var sections = cs.sections || [];
    var sectionsHtml = sections.map(function (sec) {
        var body = (sec.body || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
        var list = (sec.list && sec.list.length)
            ? '<ul>' + sec.list.map(function (li) { return '<li>' + esc(li) + '</li>'; }).join('') + '</ul>'
            : '';
        return '<section class="cs-block cs-section" id="' + sectionId(sec.title) + '">' +
            '<h2>' + esc(sec.title) + '</h2>' + body + list +
        '</section>';
    }).join('');

    // --- Links ---
    var links = (cs.links && cs.links.length) ? cs.links : project.links;
    var linksHtml = '';
    if (links && links.length) {
        linksHtml =
            '<section class="cs-block cs-section" id="' + sectionId('Links') + '"><h2>Links</h2>' +
            '<ul class="cs-links">' + links.map(function (l) {
                return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' <span aria-hidden="true">&rarr;</span></a></li>';
            }).join('') + '</ul></section>';
    }

    // --- Sidebar: at a glance ---
    var glanceItems = [
        { label: 'Role', value: cs.role },
        { label: 'Duration', value: cs.duration },
        { label: 'Type', value: cs.type },
        { label: 'Year', value: cs.year || cs.published }
    ].filter(function (i) { return i.value; });

    var glanceHtml = glanceItems.length
        ? '<div class="cs-glance"><h3>At a glance</h3><dl>' + glanceItems.map(function (i) {
            return '<dt>' + esc(i.label) + '</dt><dd>' + esc(i.value) + '</dd>';
        }).join('') + '</dl></div>'
        : '';

    var stackHtml = (cs.stack && cs.stack.length)
        ? '<div class="cs-stack"><h3>Stack</h3><ul>' + cs.stack.map(function (s) {
            return '<li>' + esc(s) + '</li>';
        }).join('') + '</ul></div>'
        : '';

    // --- Sidebar: section outline ---
    var outlineTargets = [];
    if (highlights.length) outlineTargets.push('Highlights');
    sections.forEach(function (s) { outlineTargets.push(s.title); });
    if (links && links.length) outlineTargets.push('Links');
    var outlineHtml = outlineTargets.length
        ? '<nav class="cs-outline"><h3>On this page</h3><ul>' + outlineTargets.map(function (t) {
            return '<li><a href="#' + sectionId(t) + '">' + esc(t) + '</a></li>';
        }).join('') + '</ul></nav>'
        : '';

    var eyebrow = cs.eyebrow || cs.type;

    root.innerHTML =
        '<header class="cs-hero">' +
            (eyebrow ? '<span class="cs-eyebrow">' + esc(eyebrow) + '</span>' : '') +
            '<h1>' + esc(project.name) + '</h1>' +
            (project.description ? '<p class="cs-lead">' + esc(project.description) + '</p>' : '') +
            summaryHtml +
        '</header>' +
        '<div class="cs-layout">' +
            '<main class="cs-main">' +
                mediaHtml +
                noteHtml +
                highlightsHtml +
                sectionsHtml +
                linksHtml +
            '</main>' +
            '<aside class="cs-aside">' +
                glanceHtml +
                stackHtml +
                outlineHtml +
            '</aside>' +
        '</div>';

    // Smooth-scroll outline links (base href would otherwise send them to the home page).
    root.querySelectorAll('.cs-outline a').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.getElementById(a.getAttribute('href').slice(1));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
