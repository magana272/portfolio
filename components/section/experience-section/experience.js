import { slugify, padNum, formatTechList } from '../../../lib/core.js';

export class Experience {
    constructor(opts) {
        this.title = opts.title;
        this.company = opts.company;
        this.start = opts.start;
        this.end = opts.end;
        this.location = opts.location;
        this.bullets = opts.bullets || [];
        this.color = opts.color || '#1c2340';   // jewel-tone band background
        this.tech = opts.tech || '';            // comma-separated stack for the aside
        this.takeaway = opts.takeaway || '';
    }

    slug() {
        return slugify(this.company);
    }

    // Tech as inline mono spans, shared with Project via core's formatTechList.
    techLine() {
        return formatTechList(this.tech);
    }

    // The three parts of a panel, one helper each: the kicker/heading block,
    // the takeaway + bullets box, and the big-number/stack aside.

    headHtml(num) {
        return '<div class="exp-head">' +
                '<div class="exp-kicker"><span class="exp-index">' + num + '</span> Experience</div>' +
                '<h3 class="exp-title">' + this.company + ': <span class="exp-role">' + this.title + '</span></h3>' +
                '<p class="exp-meta">' + this.start + ' &ndash; ' + this.end + ' &middot; ' + this.location + '</p>' +
            '</div>';
    }

    bodyHtml() {
        var takeawayHtml = this.takeaway
            ? '<p class="exp-takeaway">' + this.takeaway + '</p>'
            : '';
        return '<div class="exp-inner">' +
                takeawayHtml +
                '<ul class="exp-bullets">' +
                    this.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') +
                '</ul>' +
            '</div>';
    }

    asideHtml(num) {
        var techHtml = this.tech
            ? '<div class="exp-tech"><span class="exp-tech-label">Stack</span>' +
                  '<p class="exp-tech-list">' + this.techLine() + '</p>' +
              '</div>'
            : '';
        return '<div class="exp-aside">' +
                '<span class="exp-bignum" aria-hidden="true">' + num + '</span>' +
                techHtml +
            '</div>';
    }

    // Full-height panel: company:role heading over a flush-edge blue box of
    // bullets. Bands alternate left/right (v1/v2), starting on the left.
    render(index) {
        var section = document.createElement('article');
        section.className = 'band exp v' + (((index - 1) % 2) + 1);
        section.id = 'exp-' + this.slug();

        var num = padNum(index);
        section.innerHTML =
            '<div class="exp-layout">' +
                this.headHtml(num) +
                this.bodyHtml() +
            '</div>' +
            this.asideHtml(num);

        return section;
    }
}
