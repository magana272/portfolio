// Project model: one project's data plus the logic to render it as a
// full-height panel on the home page. Content lives in content/projects.js;
// long-form case-study copy lives in content/deep-dives.js.
import { esc, slugify, padNum, isVideo, formatTechList } from '../../lib/core.js';

var CATEGORY_LABEL = { swe: 'Software', ml: 'Machine Learning' };

export class Project {
    // Constructed from a single options object so the growing set of fields
    // (media, colour, deep dive, etc.) stays readable.
    constructor(opts) {
        this.name = opts.name;
        this.tint = opts.tint || '#f10202';
        // Orb theme for this project's band. Either a full theme object
        // ({flood, ink, hot, hover, active}) to hand-tune the menu colours, or
        // left off to derive from the tint. Section.theme() accepts either; the
        // project band's Section (content/sections.js) is built from it.
        this.theme = opts.theme || this.tint;
        this.ink = opts.ink || '#111214';       // dark accent, used on the light deep-dive page
        this.fg = opts.fg || '#f4f0e8';          // light text on the dark jewel panel (index)
        this.category = opts.category;
        this.lang = opts.lang;
        this.tech = opts.tech;
        this.tagline = opts.tagline || '';       // short label for the menu jump-list
        this.links = opts.links || [];
        this.description = opts.description || '';
        this.media = [].concat(opts.media || []);
        this.cover = opts.cover || '';
        // 'cover' fills the frame (screenshots); 'contain' shows the whole image
        // without cropping (charts, diagrams).
        this.fit = opts.fit || 'cover';
        // Frame colour behind a 'contain' image; default white suits light
        // figures; set dark for figures with a black background.
        this.mediaBg = opts.mediaBg || '';
        this.poster = opts.poster || '';
        this.mono = opts.mono || '';
        this.deepDive = opts.deepDive || null;
        this.slug = opts.slug || slugify(opts.name);
    }

    firstImage() {
        for (var i = 0; i < this.media.length; i++) {
            if (!isVideo(this.media[i])) return this.media[i];
        }
        return '';
    }

    coverSrc() {
        return this.cover || this.firstImage() || this.media[0] || '';
    }

    hasMedia() {
        return !!this.coverSrc();
    }

    href() {
        if (this.deepDive) return 'pages/project.html?id=' + encodeURIComponent(this.slug);
        return (this.links[0] && this.links[0].url) || '#';
    }

    catLabel() {
        return CATEGORY_LABEL[this.category] || this.category;
    }

    monogram() {
        if (this.mono) return this.mono;
        var words = this.name.replace(/[^A-Za-z0-9 -]/g, ' ').split(/[\s-]+/).filter(Boolean);
        return words.slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
    }

    // Inner media element: a screenshot, a looping clip, or a generated tile in
    // the project's hue when the project has no imagery.
    mediaEl() {
        var src = this.coverSrc();
        if (src) {
            if (isVideo(src)) {
                var poster = this.poster ? ' poster="' + esc(this.poster) + '"' : '';
                // No `autoplay` attribute and preload="none": playback is driven by
                // features/media-loader.js only when motion is allowed and the clip
                // is on screen, so reduced-motion users see the poster and never
                // fetch the heavy file.
                return '<video src="' + encodeURI(src) + '"' + poster + ' muted loop playsinline preload="none"></video>';
            }
            return '<img src="' + esc(src) + '" alt="' + esc(this.name) + ' preview" loading="lazy">';
        }
        return this.generatedSvg();
    }

    // A typographic cover for projects without screenshots. Colours inherit the
    // project hue (var(--pink)) set on the card, so each reads distinctly.
    generatedSvg() {
        var motif = this.category === 'ml' ? this.mlMotif() : this.sweMotif();
        return '<svg class="gen" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + esc(this.name) + '">' +
            motif +
            '<text class="gen-mono" x="200" y="132" text-anchor="middle">' + esc(this.monogram()) + '</text>' +
            '<text class="gen-label" x="200" y="170" text-anchor="middle">' + esc(this.catLabel()) + '</text>' +
        '</svg>';
    }

    // Loose "neural network" of nodes and links.
    mlMotif() {
        var byCol = [[[70, 60]], [[160, 40], [160, 125], [160, 210]], [[250, 90], [250, 175]], [[340, 130]]];
        var lines = '';
        for (var c = 0; c < byCol.length - 1; c++) {
            byCol[c].forEach(function (a) {
                byCol[c + 1].forEach(function (b) {
                    lines += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"/>';
                });
            });
        }
        var circles = byCol.reduce(function (acc, col) { return acc.concat(col); }, [])
            .map(function (n) { return '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="5"/>'; }).join('');
        return '<g class="gen-motif gen-motif--ml">' + lines + circles + '</g>';
    }

    // Faint stack of "code" lines of varying width.
    sweMotif() {
        var widths = [120, 78, 150, 60, 110, 92, 138, 70];
        var indents = [0, 18, 18, 36, 18, 0, 18, 36];
        var rows = '';
        for (var i = 0; i < widths.length; i++) {
            rows += '<rect x="' + (52 + indents[i]) + '" y="' + (44 + i * 22) + '" width="' + widths[i] + '" height="7" rx="3.5"/>';
        }
        return '<g class="gen-motif gen-motif--swe">' + rows + '</g>';
    }

    // Tech as a clean inline mono list ("Java · Swing · DuckDB …").
    techLine() {
        return formatTechList(this.tech);
    }

    extLinksHtml() {
        return this.links.map(function (l) {
            return '<a class="proj-ext" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>';
        }).join('');
    }

    styleVars() {
        var vars = '--tint:' + this.tint + ';--pink:' + this.ink + ';--panel-fg:' + this.fg;
        if (this.mediaBg) vars += ';--media-bg:' + this.mediaBg;
        return vars;
    }

    // Full-height alternating project panel on a soft tinted colour band.
    renderFeature(index) {
        var section = document.createElement('article');
        // Balanced composition, alternating the media side per project.
        section.className = 'band feature v' + (((index - 1) % 2) + 1);
        section.id = 'work-' + this.slug;
        section.dataset.category = this.category;
        section.dataset.lang = this.lang;
        section.setAttribute('style', this.styleVars());

        var href = this.href();
        var num = padNum(index);

        section.innerHTML =
            '<div class="wrap feature-inner">' +
                '<a class="feature-media' + (this.hasMedia() ? '' : ' is-gen') + (this.fit === 'contain' ? ' is-contain' : '') + '" href="' + href + '" tabindex="-1" aria-hidden="true">' +
                    this.mediaEl() +
                '</a>' +
                '<div class="f-head">' +
                    '<div class="feature-kicker"><span class="feature-index">' + num + '</span>' + esc(this.catLabel()) + '</div>' +
                    '<h3 class="feature-title"><a href="' + href + '">' + esc(this.name) + '</a></h3>' +
                    (this.description ? '<p class="feature-desc">' + this.description + '</p>' : '') +
                    (this.tech ? '<p class="feature-tech">' + this.techLine() + '</p>' : '') +
                '</div>' +
                '<div class="proj-actions f-actions">' +
                    '<a class="proj-more" href="' + href + '">Learn more <span aria-hidden="true">&rarr;</span></a>' +
                    this.extLinksHtml() +
                '</div>' +
            '</div>';

        return section;
    }
}
