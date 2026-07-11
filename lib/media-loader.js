// Lazy media (home page): play looping project videos only while on screen, and
// progressively upgrade every img[data-full] from its light webp to the full png
// as it nears the viewport. pages/home/home.js calls initMediaLoader() after the
// project panels and photo mosaic are built (so their media exists to observe).
import { reducedMotion } from './core.js';

export function initMediaLoader() {
    // ── Project videos ──
    // Only play while on screen — the DADA-85 clip is heavy, so we don't decode
    // it off-screen. Skip autoplay entirely under reduced motion: the poster
    // frame stands in and the multi-megabyte clip is never fetched.
    var videos = document.querySelectorAll('.feature-media video, .pcard-cover video');
    if (!reducedMotion && videos.length && 'IntersectionObserver' in window) {
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

    // ── Progressive image quality ──
    // Every img[data-full] on the page — the mosaic tiles and the static me/
    // collage. Each starts on its light webp and swaps to the full png (once)
    // when it nears the viewport, so the page never queues dozens of multi-MB
    // downloads at a time.
    var swappable = Array.prototype.slice.call(document.querySelectorAll('img[data-full]'));

    function upgrade(img) {
        if (img.dataset.upgraded) return;
        img.dataset.upgraded = '1';
        var full = new Image();
        full.onload = function () { img.src = full.src; };
        full.src = img.dataset.full;
    }

    swappable.forEach(function (img) {
        img.addEventListener('error', function () {
            img.src = img.dataset.full; // no webp — fall back to the png
        }, { once: true });
    });

    if ('IntersectionObserver' in window) {
        var watcher = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                watcher.unobserve(entry.target);
                upgrade(entry.target);
            });
        }, { rootMargin: '300px' });
        swappable.forEach(function (img) { watcher.observe(img); });
    } else {
        swappable.forEach(function (img) {
            img.addEventListener('load', function () { upgrade(img); }, { once: true });
        });
    }

    // Once the rest of the page has loaded, fetch the remaining webps in the
    // background so both photo sections are ready before they scroll into view —
    // a few at a time, so the prefetch never lands as one burst of fetch + decode
    // work.
    window.addEventListener('load', function () {
        var queue = swappable.filter(function (img) {
            return img.loading === 'lazy' && !img.complete;
        });

        function next() {
            var img = queue.shift();
            while (img && img.complete) img = queue.shift();
            if (!img) return;
            img.addEventListener('load', next, { once: true });
            img.addEventListener('error', next, { once: true });
            img.loading = 'eager';
        }

        function start() { next(); next(); next(); }
        if ('requestIdleCallback' in window) { requestIdleCallback(start); }
        else { setTimeout(start, 800); }
    });
}
