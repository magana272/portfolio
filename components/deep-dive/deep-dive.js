// Deep-dive model: one project's case study — the Project it belongs to plus
// its long-form copy — and the logic to render it as the deep-dive page's
// markup, one method per block. The copy lives in content/deep-dives.js keyed
// by slug; DeepDivePage pairs it with its Project and renders one of these.
import { esc, slugify, isVideo } from '../../lib/core.js';

// #anchor id for an on-page block, from its title. Shared by the blocks and
// the sidebar outline that points at them.
function sectionId(title) {
    return 'sec-' + slugify(title);
}

export class DeepDive {
    constructor(project, cs) {
        this.project = project;
        this.cs = cs;
    }

    // ── Data helpers (fallback chains used by more than one block) ──

    highlights() {
        return this.cs.highlights || this.cs.evidence || [];
    }

    caseLinks() {
        return (this.cs.links && this.cs.links.length) ? this.cs.links : this.project.links;
    }

    // ── Blocks ──

    mediaTag(src) {
        return isVideo(src)
            ? '<video src="' + encodeURI(src) + '" autoplay muted loop playsinline preload="metadata"></video>'
            : '<img src="' + esc(src) + '" alt="' + esc(this.project.name) + '" loading="lazy">';
    }

    // Hero summary (Problem / Approach / Outcome)
    summaryHtml() {
        var items = [
            { label: 'Problem', value: this.cs.problem },
            { label: 'Approach', value: this.cs.approach || this.cs.scope },
            { label: 'Outcome', value: this.cs.outcome }
        ].filter(function (i) { return i.value; });

        return items.length
            ? '<div class="dd-summary">' + items.map(function (i) {
                return '<div class="dd-summary-item">' +
                    '<span class="dd-summary-label">' + esc(i.label) + '</span>' +
                    '<p>' + esc(i.value) + '</p>' +
                '</div>';
            }).join('') + '</div>'
            : '';
    }

    // The cover becomes the hero visual...
    heroMediaHtml() {
        var coverSrc = this.project.coverSrc();
        return coverSrc
            ? '<div class="dd-hero-media' + (this.project.fit === 'contain' ? ' is-contain' : '') + '"' +
                  (this.project.mediaBg ? ' style="--media-bg:' + this.project.mediaBg + '"' : '') + '>' +
                  this.mediaTag(coverSrc) +
              '</div>'
            : '';
    }

    // ...and the rest of the media form a gallery.
    galleryHtml() {
        var dive = this;
        var coverSrc = this.project.coverSrc();
        var gallery = this.project.media.filter(function (src) { return src !== coverSrc; });
        return gallery.length
            ? '<div class="dd-media">' + gallery.map(function (src) { return dive.mediaTag(src); }).join('') + '</div>'
            : '';
    }

    noteHtml() {
        return this.cs.note
            ? '<div class="dd-note"><span class="dd-note-label">Note</span><p>' + esc(this.cs.note) + '</p></div>'
            : '';
    }

    // The standout results / decisions
    highlightsHtml() {
        var highlights = this.highlights();
        if (!highlights.length) return '';
        return '<section class="dd-block dd-highlights" id="' + sectionId('Highlights') + '"><h2>Highlights</h2><ul>' +
            highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') +
            '</ul></section>';
    }

    // Body sections from the case-study copy
    sectionsHtml() {
        return (this.cs.sections || []).map(function (sec) {
            var body = (sec.body || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
            var list = (sec.list && sec.list.length)
                ? '<ul>' + sec.list.map(function (li) { return '<li>' + esc(li) + '</li>'; }).join('') + '</ul>'
                : '';
            return '<section class="dd-block dd-section" id="' + sectionId(sec.title) + '">' +
                '<h2>' + esc(sec.title) + '</h2>' + body + list +
            '</section>';
        }).join('');
    }

    linksHtml() {
        var links = this.caseLinks();
        if (!links || !links.length) return '';
        return '<section class="dd-block dd-section" id="' + sectionId('Links') + '"><h2>Links</h2>' +
            '<ul class="dd-links">' + links.map(function (l) {
                return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' <span aria-hidden="true">&rarr;</span></a></li>';
            }).join('') + '</ul></section>';
    }

    // Sidebar: at a glance
    glanceHtml() {
        var items = [
            { label: 'Role', value: this.cs.role },
            { label: 'Duration', value: this.cs.duration },
            { label: 'Type', value: this.cs.type },
            { label: 'Year', value: this.cs.year || this.cs.published }
        ].filter(function (i) { return i.value; });

        return items.length
            ? '<div class="dd-glance"><h3>At a glance</h3><dl>' + items.map(function (i) {
                return '<dt>' + esc(i.label) + '</dt><dd>' + esc(i.value) + '</dd>';
            }).join('') + '</dl></div>'
            : '';
    }

    stackHtml() {
        return (this.cs.stack && this.cs.stack.length)
            ? '<div class="dd-stack"><h3>Stack</h3><ul>' + this.cs.stack.map(function (s) {
                return '<li>' + esc(s) + '</li>';
            }).join('') + '</ul></div>'
            : '';
    }

    // Sidebar: section outline — one entry per block that made it in
    outlineHtml() {
        var targets = [];
        if (this.highlights().length) targets.push('Highlights');
        (this.cs.sections || []).forEach(function (s) { targets.push(s.title); });
        var links = this.caseLinks();
        if (links && links.length) targets.push('Links');
        return targets.length
            ? '<nav class="dd-outline"><h3>On this page</h3><ul>' + targets.map(function (t) {
                return '<li><a href="#' + sectionId(t) + '">' + esc(t) + '</a></li>';
            }).join('') + '</ul></nav>'
            : '';
    }

    heroHtml() {
        var eyebrow = this.cs.eyebrow || this.cs.type;
        return '<header class="dd-hero">' +
            '<span class="dd-eyebrow">Deep Dive' + (eyebrow ? ' &middot; ' + esc(eyebrow) : '') + '</span>' +
            '<h1>' + esc(this.project.name) + '</h1>' +
            (this.project.description ? '<p class="dd-lead">' + esc(this.project.description) + '</p>' : '') +
            this.heroMediaHtml() +
            this.summaryHtml() +
        '</header>';
    }

    // The whole case study, hero over the two-column layout. Every deep dive
    // renders this same structure so the "Learn more" pages stay consistent.
    html() {
        return '<div class="dd-layout">' +
                '<main class="dd-main">' +
                    this.heroHtml() +
                    this.galleryHtml() +
                    this.noteHtml() +
                    this.highlightsHtml() +
                    this.sectionsHtml() +
                    this.linksHtml() +
                '</main>' +
                '<aside class="dd-aside">' +
                    this.glanceHtml() +
                    this.stackHtml() +
                    this.outlineHtml() +
                '</aside>' +
            '</div>';
    }
}
