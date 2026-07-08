// Turn a project name into a URL-safe slug: "DADA-85" -> "dada-85".
function projectSlug(name) {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function projectEsc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var CATEGORY_LABEL = { swe: 'Software', ml: 'Machine Learning' };

class Project {
    // Constructed from a single options object so the growing set of fields
    // (media, colour, case study, etc.) stays readable.
    constructor(opts) {
        this.name = opts.name;
        this.featured = !!opts.featured;
        this.tint = opts.tint || '#f4f4f2';
        this.ink = opts.ink || '#111214';       // dark accent, used on the light case-study page
        this.fg = opts.fg || '#f4f0e8';          // light text on the dark jewel panel (index)
        this.category = opts.category;
        this.lang = opts.lang;
        this.tech = opts.tech;
        this.bullets = opts.bullets || [];
        this.links = opts.links || [];
        this.description = opts.description || '';
        this.takeaway = opts.takeaway || '';
        this.media = [].concat(opts.media || []);
        this.cover = opts.cover || '';
        // 'cover' fills the frame (screenshots); 'contain' shows the whole image
        // without cropping (charts, diagrams).
        this.fit = opts.fit || 'cover';
        // Frame colour behind a 'contain' image — default white suits light
        // figures; set dark for figures with a black background.
        this.mediaBg = opts.mediaBg || '';
        this.poster = opts.poster || '';
        this.mono = opts.mono || '';
        this.caseStudy = opts.caseStudy || null;
        this.slug = opts.slug || projectSlug(opts.name);
    }

    isVideo(src) {
        return /\.(webm|mp4|mov)$/i.test(src);
    }

    firstImage() {
        for (var i = 0; i < this.media.length; i++) {
            if (!this.isVideo(this.media[i])) return this.media[i];
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
        if (this.caseStudy) return 'pages/project.html?id=' + encodeURIComponent(this.slug);
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
            if (this.isVideo(src)) {
                var poster = this.poster ? ' poster="' + projectEsc(this.poster) + '"' : '';
                // No `autoplay` attribute and preload="none": playback is driven by
                // site.js only when motion is allowed and the clip is on screen, so
                // reduced-motion users see the poster and never fetch the heavy file.
                return '<video src="' + encodeURI(src) + '"' + poster + ' muted loop playsinline preload="none"></video>';
            }
            return '<img src="' + projectEsc(src) + '" alt="' + projectEsc(this.name) + ' preview" loading="lazy">';
        }
        return this.generatedSvg();
    }

    // A typographic cover for projects without screenshots. Colours inherit the
    // project hue (var(--pink)) set on the card, so each reads distinctly.
    generatedSvg() {
        var motif = this.category === 'ml' ? this.mlMotif() : this.sweMotif();
        return '<svg class="gen" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + projectEsc(this.name) + '">' +
            motif +
            '<text class="gen-mono" x="200" y="132" text-anchor="middle">' + projectEsc(this.monogram()) + '</text>' +
            '<text class="gen-label" x="200" y="170" text-anchor="middle">' + projectEsc(this.catLabel()) + '</text>' +
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
        return this.tech.split(',').map(function (t) { return t.trim(); }).filter(Boolean)
            .map(function (t) { return '<span class="t">' + projectEsc(t) + '</span>'; })
            .join('<span class="dot">·</span>');
    }

    extLinksHtml() {
        return this.links.map(function (l) {
            return '<a class="proj-ext" href="' + projectEsc(l.url) + '" target="_blank" rel="noopener">' + projectEsc(l.label) + '</a>';
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
        var num = (index < 10 ? '0' : '') + index;

        section.innerHTML =
            '<div class="wrap feature-inner">' +
                '<a class="feature-media' + (this.hasMedia() ? '' : ' is-gen') + (this.fit === 'contain' ? ' is-contain' : '') + '" href="' + href + '" tabindex="-1" aria-hidden="true">' +
                    this.mediaEl() +
                '</a>' +
                '<div class="f-head">' +
                    '<div class="feature-kicker"><span class="feature-index">' + num + '</span>' + projectEsc(this.catLabel()) + '</div>' +
                    '<h3 class="feature-title"><a href="' + href + '">' + projectEsc(this.name) + '</a></h3>' +
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

    // Compact tinted card for the secondary project grid.
    renderCard() {
        var article = document.createElement('article');
        article.className = 'pcard';
        article.dataset.category = this.category;
        article.dataset.lang = this.lang;
        article.setAttribute('style', this.styleVars());

        var href = this.href();
        var ext = this.extLinksHtml();

        article.innerHTML =
            '<a class="pcard-cover' + (this.hasMedia() ? '' : ' is-gen') + (this.fit === 'contain' ? ' is-contain' : '') + '" href="' + href + '" tabindex="-1" aria-hidden="true">' +
                this.mediaEl() +
            '</a>' +
            '<div class="pcard-body">' +
                '<div class="pcard-head">' +
                    '<span class="pcard-cat">' + projectEsc(this.catLabel()) + '</span>' +
                    '<a class="proj-more" href="' + href + '">Learn more <span aria-hidden="true">&rarr;</span></a>' +
                '</div>' +
                '<h3 class="pcard-title"><a href="' + href + '">' + projectEsc(this.name) + '</a></h3>' +
                (this.description ? '<p class="pcard-desc">' + this.description + '</p>' : '') +
                (this.tech ? '<div class="proj-tech">' + this.chipsHtml() + '</div>' : '') +
                (ext ? '<div class="proj-links">' + ext + '</div>' : '') +
            '</div>';

        return article;
    }
}
