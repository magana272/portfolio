// Shared foundation: the helpers that would otherwise be duplicated across the
// site (HTML escaping, slugs, the menu-orb colour maths, media detection, the
// reduced-motion flag). Everything else imports what it needs from here.

// ── Text ──────────────────────────────────────────────────────────────────

// Escape a value for safe interpolation into HTML — text or an attribute
// (quotes included, so it is safe in both).
export function esc(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// "DADA-85" -> "dada-85". Shared by project/experience slugs and the deep-dive
// section ids.
export function slugify(s) {
    return String(s).toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Zero-pad a 1-based index for display: 7 -> "07", 12 -> "12".
export function padNum(n) {
    return (n < 10 ? '0' : '') + n;
}

// A comma-separated tech string as inline mono chips joined by middots:
// "Go, MongoDB" -> `<span class="t">Go</span><span class="dot">·</span>...`.
// Shared by the Project and Experience models' techLine().
export function formatTechList(tech) {
    return String(tech).split(',').map(function (t) { return t.trim(); }).filter(Boolean)
        .map(function (t) { return '<span class="t">' + esc(t) + '</span>'; })
        .join('<span class="dot">·</span>');
}

// ── Colour (menu-orb theming) ───────────────────────────────────────────────
// The orb wears a colour triple per band; these are mirrored on the deep-dive
// page so a project's orb looks the same on its home band and its case-study
// page.
function hexToHsl(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return null;
    var n = parseInt(m[1], 16);
    var r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var l = (max + min) / 2, d = max - min, h = 0, s = 0;
    if (d) {
        s = d / (1 - Math.abs(2 * l - 1));
        if (max === r) h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h *= 60;
        if (h < 0) h += 360;
    }
    return { h: h, s: s * 100, l: l * 100 };
}

// A tint flipped 180° on the wheel and lifted to a bright pop (dark ink stays
// readable on it): the flood colour for tinted bands.
export function complement(tint) {
    var hsl = hexToHsl(tint);
    if (!hsl) return null;
    return 'hsl(' + Math.round((hsl.h + 180) % 360) + ', ' +
        Math.round(Math.max(hsl.s, 85)) + '%, 68%)';
}

// The tint's hue swung a further 120° (the remaining triad corner), kept dark so
// it reads on the bright flood: the third, "hot" colour.
export function triad(tint) {
    var hsl = hexToHsl(tint);
    if (!hsl) return null;
    return 'hsl(' + Math.round((hsl.h + 120) % 360) + ', ' +
        Math.round(Math.max(hsl.s, 85)) + '%, 30%)';
}

// ── Media ───────────────────────────────────────────────────────────────────

export function isVideo(src) {
    return /\.(webm|mp4|mov)$/i.test(src);
}

// ── Environment ─────────────────────────────────────────────────────────────

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
