// Menu — the shared orb + flooding overlay as one class. Hold the circle in
// the corner and it floods the page with the menu; release early and it
// springs back shut. Keyboard users and reduced-motion users toggle it with a
// plain click instead.
//
// Each page's Page.init() constructs one Menu from its Section list
// (content/sections.js), so everything menu-shaped lives here: the link list
// is built from the sections, the hold-to-open behaviour is wired here, and
// applyTheme() is the only place the --orb-* custom properties are written —
// the scroll spy and the deep-dive page both recolour the menu through it.
//   HOLD_MS must match the .nav-overlay.is-holding clip-path transition
//   duration in nav.css.
import { esc, padNum, reducedMotion } from '../../lib/core.js';

export class Menu {
    constructor(opts) {
        opts = opts || {};
        this.sections = opts.sections || [];
        this.prefix = opts.linkPrefix || '';      // '' on the home page, 'index.html' on subpages
        this.orb = document.querySelector('.nav-orb');
        this.overlay = document.querySelector('.nav-overlay');
    }

    init() {
        if (!this.orb || !this.overlay) return;
        this.build();
        this.wire();
    }

    // ── Links (built from the page's sections) ──

    sectionHref(section) {
        return this.prefix + '#' + section.id;
    }

    // Each link carries --item-hover: its destination band's colour. nav.css
    // blends it into the hover state, so hovering a link previews the section
    // it leads to.
    sectionLink(section, inner) {
        return '<a href="' + this.sectionHref(section) + '"' +
            (section.background ? ' style="--item-hover:' + section.background + '"' : '') +
            '>' + (inner || '') + esc(section.title) + '</a>';
    }

    // A section's nested jump-list (the Projects band lists its panels),
    // rendered from the Section's sublist entries. Hover previews each entry's
    // own colour (the project tint).
    sublistHtml(section) {
        var menu = this;
        if (!section.sublist.length) return '';
        return '<ul class="nav-menu-sub">' + section.sublist.map(function (item) {
            return '<li><a href="' + menu.prefix + '#' + item.anchor + '"' +
                    (item.hover ? ' style="--item-hover:' + item.hover + '"' : '') + '>' +
                    '<span class="nav-sub-num">' + item.num + '</span>' +
                    '<span class="nav-sub-name">' + esc(item.name) + '</span>' +
                    '<span class="nav-sub-tag">' + esc(item.tag) + '</span>' +
                '</a></li>';
        }).join('') + '</ul>';
    }

    build() {
        var menu = this;

        var links = this.overlay.querySelector('.nav-menu-links');
        if (links) {
            links.innerHTML = this.sections
                .filter(function (s) { return s.group === 'main'; })
                .map(function (s, i) {
                    return '<li>' +
                        menu.sectionLink(s, '<span class="nav-num">' + padNum(i + 1) + '</span>') +
                        menu.sublistHtml(s) +
                    '</li>';
                }).join('');
        }

        var off = this.overlay.querySelector('.nav-menu-off');
        if (off) {
            var label = this.sections.filter(function (s) { return s.group === 'off-label'; })[0];
            var offLinks = this.sections.filter(function (s) { return s.group === 'off'; });
            off.innerHTML =
                (label
                    ? '<a class="nav-menu-off-label" href="' + this.sectionHref(label) + '"' +
                          (label.background ? ' style="--item-hover:' + label.background + '"' : '') + '>' +
                          esc(label.title) + '</a>'
                    : '') +
                '<ul class="nav-menu-off-links">' +
                    offLinks.map(function (s) { return '<li>' + menu.sectionLink(s) + '</li>'; }).join('') +
                '</ul>';
        }
    }

    // ── Theming ──
    // The one copy of the orb-theming logic. The triple: flood (orb +
    // overlay), ink (links; also dimmed to 60% for the muted kicker/active
    // tone), hot (list numbers and tags only). Missing keys fall back to the
    // :root defaults (yellow flood, near-black ink, deep red hot).
    applyTheme(theme) {
        theme = theme || {};
        var root = document.documentElement.style;
        var vals = {
            bg: theme.flood,
            ink: theme.ink,
            muted: theme.ink ? 'color-mix(in srgb, ' + theme.ink + ' 60%, transparent)' : null,
            hot: theme.hot
        };
        ['bg', 'ink', 'muted', 'hot'].forEach(function (key) {
            if (vals[key]) {
                root.setProperty('--orb-' + key, vals[key]);
            } else {
                root.removeProperty('--orb-' + key); // fall back to the CSS defaults
            }
        });
    }

    // ── Behaviour (hold-to-open) ──

    wire() {
        var orb = this.orb;
        var overlay = this.overlay;

        var HOLD_MS = 450;
        var CLOSE_MS = 400; // matches the base .nav-overlay clip-path transition
        var holdTimer = null;
        var hintTimer = null;
        var holding = false;
        var suppressClick = false;
        var isOpen = false;

        function setOpen(open) {
            isOpen = open;
            holding = false;
            clearTimeout(holdTimer);
            overlay.classList.remove('is-holding');
            overlay.classList.toggle('is-open', open);
            orb.classList.remove('is-holding');
            orb.classList.toggle('is-close', open);
            orb.setAttribute('aria-expanded', String(open));
            orb.setAttribute('aria-label', open ? 'Close menu' : 'Hold to open menu');
            document.documentElement.classList.toggle('menu-open', open);
            if (open) {
                orb.classList.remove('show-hint');
                var first = overlay.querySelector('a');
                if (first) first.focus({ preventScroll: true });
            }
        }

        orb.addEventListener('pointerdown', function (e) {
            if (isOpen || reducedMotion || e.button > 0) return;
            e.preventDefault(); // no text selection / iOS magnifier during the hold
            if (orb.setPointerCapture) {
                try { orb.setPointerCapture(e.pointerId); } catch (err) {}
            }
            holding = true;
            orb.classList.add('is-holding');
            overlay.classList.add('is-holding');
            holdTimer = setTimeout(function () {
                suppressClick = true; // releasing still fires a click — ignore it
                setOpen(true);
            }, HOLD_MS);
        });

        function releaseHold() {
            if (!holding) return;
            holding = false;
            clearTimeout(holdTimer);
            orb.classList.remove('is-holding');
            overlay.classList.remove('is-holding'); // springs back shut
            suppressClick = true;
            // Tapped instead of held — nudge toward the gesture
            orb.classList.add('show-hint');
            clearTimeout(hintTimer);
            hintTimer = setTimeout(function () { orb.classList.remove('show-hint'); }, 1500);
        }

        orb.addEventListener('pointerup', releaseHold);
        orb.addEventListener('pointercancel', releaseHold);

        // Keyboard activation never goes through pointerdown, so make sure a
        // stale suppress flag from an interrupted hold can't swallow it.
        orb.addEventListener('keydown', function () { suppressClick = false; });

        orb.addEventListener('click', function () {
            if (suppressClick) { suppressClick = false; return; }
            setOpen(!isOpen); // keyboard toggle, reduced-motion click, or close when open
        });

        // A long press must not summon the browser context menu
        orb.addEventListener('contextmenu', function (e) { e.preventDefault(); });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) {
                setOpen(false);
                orb.focus();
            }
        });

        // Delegated: one handler covers every link build() generated, the
        // sub-list included. Section links jump while the flood still covers
        // the page, then the circle shrinks to reveal the destination;
        // everything else plays the shrink first and navigates once it
        // finishes.
        overlay.addEventListener('click', function (e) {
            var a = e.target.closest('a');
            if (!a || !overlay.contains(a)) return;
            var href = a.getAttribute('href');
            if (!href) return;
            if (href.charAt(0) === '#') {
                e.preventDefault();
                var target = document.getElementById(href.slice(1));
                document.documentElement.classList.remove('menu-open'); // unlock scroll before the jump
                if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
                if (history.pushState) history.pushState(null, '', href);
                setOpen(false);
            } else {
                e.preventDefault();
                setOpen(false);
                setTimeout(function () { window.location.href = href; }, reducedMotion ? 0 : CLOSE_MS);
            }
        });
    }
}
