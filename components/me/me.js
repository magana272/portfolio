// Me collage — renders the #about-me section body from ME data (content/me.js):
// a lead paragraph over the photo columns. Each photo ships its light .webp as
// src with the full .png in data-full, which lib/media-loader.js swaps in near
// the viewport; the width/height give the browser each aspect ratio up front.
var WEBP = 'static/media/img/me/web/webp/';
var PNG = 'static/media/img/me/web/pngs/';

function photoTag(p) {
    return '<img width="' + p.w + '" height="' + p.h + '"' +
        ' src="' + WEBP + p.n + '.webp"' +
        ' data-full="' + PNG + p.n + '.png"' +
        ' alt="' + (p.a || '') + '" loading="lazy">';
}

export function renderMe(data) {
    return '<div class="wrap">' +
        '<div class="section-head"><h2 class="kicker" id="me-heading">Off the clock</h2></div>' +
        '<p class="me-lead">' + data.lead + '</p>' +
        '<div class="me-photos">' +
            data.photos.map(photoTag).join('') +
        '</div>' +
    '</div>';
}
