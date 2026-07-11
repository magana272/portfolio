// Photography mosaic (home page). Builds the grid from the photos data HomePage passes in; clicking
// a photo expands it in place, and the grid reflows while the other photos
// animate to their new positions (FLIP). Also wires the jiu-jitsu photo's tag
// toggle. pages/index.js calls initPhotoMosaic(PHOTOS).
import { reducedMotion } from '../../lib/core.js';

var BASE = 'static/media/img/photography/web/pngs/';
var WEBP = 'static/media/img/photography/web/webp/';

export function initPhotoMosaic(photos) {
    var mosaic = document.getElementById('photo-mosaic');

    if (mosaic) {
        photos.forEach(function (p, i) {
            var a = document.createElement('a');
            a.className = 'photo' + (p.s ? ' ' + p.s : '');
            a.href = BASE + p.n + '.png';
            a.setAttribute('data-index', i);
            var img = document.createElement('img');
            // Light webp first; the full png swaps in when the tile nears the
            // viewport (see lib/media-loader.js).
            img.src = WEBP + p.n + '.webp';
            img.dataset.full = BASE + p.n + '.png';
            img.alt = p.a || '35mm film photograph';
            img.loading = 'lazy';
            if (p.w && p.h) { img.width = p.w; img.height = p.h; }
            a.appendChild(img);
            mosaic.appendChild(a);
        });

        // Masonry: set each tile's row span from its image's natural aspect ratio
        // so photos are never cropped or letterboxed. The grid's rows are a fine
        // 8px unit (see .photo-mosaic); span = tile height in that unit.
        var ROW = 8, GAP = 8;

        function sizeTile(tile) {
            var img = tile.querySelector('img');
            // The width/height attrs give the ratio up front; naturalWidth is the
            // fallback for entries without baked dims (then we must wait for load).
            var w = +img.getAttribute('width') || img.naturalWidth;
            var h = +img.getAttribute('height') || img.naturalHeight;
            if (!w || !h) return; // ratio unknown yet — keep placeholder span
            var tileH = tile.clientWidth * h / w;
            tile.style.gridRow = 'span ' + Math.max(1, Math.round((tileH + GAP) / (ROW + GAP)));
        }

        function layout() {
            Array.prototype.forEach.call(mosaic.children, sizeTile);
        }

        mosaic.querySelectorAll('img').forEach(function (img) {
            if (img.getAttribute('width')) return; // span already known — no relayout on load
            img.addEventListener('load', function () { sizeTile(img.parentNode); }, { once: true });
        });
        layout();

        var relayoutTimer;
        window.addEventListener('resize', function () {
            clearTimeout(relayoutTimer);
            relayoutTimer = setTimeout(layout, 100);
        });

        var prefersReduced = reducedMotion;

        // Document scroll position that centres a rect (viewport-relative) on screen.
        function centreY(rect) {
            return Math.max(0, window.scrollY + rect.top - (window.innerHeight - rect.height) / 2);
        }

        // FLIP: capture positions, change the layout, then animate from old to
        // new. When centreEl is given, the page also scrolls so it lands centred.
        function flip(mutate, centreEl) {
            var photos = Array.prototype.slice.call(mosaic.children);
            var first = photos.map(function (p) { return p.getBoundingClientRect(); });

            mutate();

            var last = photos.map(function (p) { return p.getBoundingClientRect(); });
            var targetY = centreEl ? centreY(last[photos.indexOf(centreEl)]) : null;

            if (prefersReduced) {
                if (targetY !== null) window.scrollTo(0, targetY);
                return;
            }

            photos.forEach(function (p, i) {
                var f = first[i], l = last[i];
                var dx = f.left - l.left, dy = f.top - l.top;
                var sx = l.width ? f.width / l.width : 1;
                var sy = l.height ? f.height / l.height : 1;
                if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 &&
                    Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) return;
                p.style.transformOrigin = 'top left';
                p.style.transition = 'none';
                p.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
            });

            void mosaic.offsetWidth; // force the inverted state to render
            requestAnimationFrame(function () {
                photos.forEach(function (p) {
                    p.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1)';
                    p.style.transform = '';
                });
                if (targetY !== null) window.scrollTo({ top: targetY, behavior: 'smooth' });
            });
        }

        function toggle(el) {
            var expand = !el.classList.contains('expanded');
            flip(function () {
                mosaic.querySelectorAll('.photo.expanded').forEach(function (p) { p.classList.remove('expanded'); });
                if (expand) el.classList.add('expanded');
                layout(); // spans depend on tile width, which the class change altered
            }, expand ? el : null);
        }

        mosaic.addEventListener('click', function (e) {
            var a = e.target.closest('.photo');
            if (!a) return;
            e.preventDefault();
            toggle(a);
        });

        // Click anywhere outside the collage collapses the open photo.
        document.addEventListener('click', function (e) {
            if (e.target.closest('#photo-mosaic')) return;
            var open = mosaic.querySelector('.photo.expanded');
            if (open) toggle(open);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var open = mosaic.querySelector('.photo.expanded');
            if (open) toggle(open);
        });
    }

    // Jiu-Jitsu photo — tap the image to reveal Instagram-style name tags.
    var jj = document.getElementById('jj-photo');
    if (jj) {
        jj.addEventListener('click', function (e) {
            if (e.target.closest('.jj-tag')) return; // let the tag links through
            jj.classList.toggle('tags-on');
        });
    }
}
