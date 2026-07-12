// Client-side HTML includes for shared markup — the buildless answer to reusable
// components. A page marks where a partial goes with
//     <div data-include="components/shared/nav/nav.html"></div>
// and this module fetches that file and swaps the placeholder for its contents.
//
// An optional data-link-prefix rewrites the partial's in-page (#anchor) links so
// one shared component works from a subdirectory too: the deep-dive page sets
// data-link-prefix="index.html", turning #about into index.html#about so the
// link points back to the home page.
//
// Runs on module evaluation (module scripts are deferred, so the DOM is ready).
// Exports `ready` — a Promise the page controllers await before wiring behaviour
// (menu, scroll spy) to the injected markup.

function loadIncludes() {
    var placeholders = Array.prototype.slice.call(document.querySelectorAll('[data-include]'));

    return Promise.all(placeholders.map(function (el) {
        var url = el.getAttribute('data-include');
        var prefix = el.getAttribute('data-link-prefix') || '';
        return fetch(url).then(function (res) {
            if (!res.ok) throw new Error(url + ' -> HTTP ' + res.status);
            return res.text();
        }).then(function (html) {
            var tpl = document.createElement('template');
            tpl.innerHTML = html;
            if (prefix) {
                tpl.content.querySelectorAll('a[href^="#"]').forEach(function (a) {
                    a.setAttribute('href', prefix + a.getAttribute('href'));
                });
            }
            el.replaceWith(tpl.content);
        }).catch(function (err) {
            // Leave the placeholder in place and surface the reason (most often:
            // opened via file:// instead of a local server).
            console.error('[includes] could not load', url, err);
        });
    }));
}

export const ready = loadIncludes();
