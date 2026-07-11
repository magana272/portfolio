// Section pager (home page) — the two triangles jump between full-height panels.
// Down (green) goes to the next panel's top. Up (red) snaps to the CURRENT
// panel's top when you're scrolled past it, then to the previous panel — so
// scrolling up always lands flush at a section top. pages/home.js calls
// initPager().
import { reducedMotion } from '../core.js';

export function initPager() {
    var pager = document.querySelector('.section-pager');
    if (!pager) return;

    var buttons = Array.prototype.slice.call(pager.querySelectorAll('.pager-btn'));
    var reduce = reducedMotion;
    var TOL = 4;

    // Every snap panel, in document order (projects, roles, and the screen bands).
    function panels() {
        return Array.prototype.slice.call(document.querySelectorAll('.screen, .feature, .exp'));
    }

    // Document-relative top. offsetTop is relative to the offsetParent, which
    // breaks once a panel sits inside a positioned ancestor (e.g. #experience is
    // position:relative for the timeline rail); this stays correct always.
    function docTop(el) {
        return el.getBoundingClientRect().top + window.scrollY;
    }

    function scrollToPanel(el) {
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }

    function go(dir) {
        var list = panels();
        var y = window.scrollY;
        if (dir > 0) {
            for (var i = 0; i < list.length; i++) {
                if (docTop(list[i]) > y + TOL) { scrollToPanel(list[i]); return; }
            }
        } else {
            var target = list[0];
            for (var j = 0; j < list.length; j++) {
                if (docTop(list[j]) < y - TOL) target = list[j];
            }
            scrollToPanel(target);
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            go(parseInt(btn.getAttribute('data-dir'), 10));
        });
    });

    // Grey out up at the very top and down at the very bottom.
    function updateState() {
        var doc = document.documentElement;
        var atTop = window.scrollY < TOL;
        var atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - TOL;
        buttons.forEach(function (btn) {
            var dir = parseInt(btn.getAttribute('data-dir'), 10);
            btn.disabled = (dir < 0 && atTop) || (dir > 0 && atBottom);
        });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () { updateState(); ticking = false; });
            ticking = true;
        }
    }, { passive: true });
    window.addEventListener('resize', updateState);
    updateState();
}
