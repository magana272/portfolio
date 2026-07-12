// Jiu-jitsu band — renders the #jiujitsu section body from JIUJITSU data
// (content/jiujitsu.js): a centred poster of the gym name, the training photo
// with tap-to-reveal Instagram tags (photo-mosaic.js wires the #jj-photo
// toggle), the Skrap Pack credit, and the disciplines line. The photo ships a
// .jpg src with a .png data-full for lib/media-loader.js to upgrade.
export function renderJiujitsu(data) {
    var photo = data.photo;
    var credit = data.credit;

    var tags = data.tags.map(function (t) {
        return '<a class="jj-tag" style="left: ' + t.left + '; top: ' + t.top + ';"' +
            ' href="https://instagram.com/' + t.handle + '" target="_blank" rel="noopener">' + t.handle + '</a>';
    }).join('');

    return '<div class="wrap jj-wrap">' +
        '<h2 class="kicker jj-title" id="jj-heading">' + data.title + '</h2>' +
        '<div class="jj-figure">' +
            '<div class="jj-photo-wrap" id="jj-photo">' +
                '<img width="' + photo.w + '" height="' + photo.h + '" src="' + photo.src + '"' +
                    ' data-full="' + photo.full + '" alt="' + photo.alt + '" loading="lazy">' +
                tags +
            '</div>' +
            '<a class="jj-credit" href="' + credit.href + '" target="_blank" rel="noopener"' +
                ' aria-label="' + credit.label + ' on Instagram">' +
                '<img class="jj-logo" src="' + credit.logo + '" alt="' + credit.label + '"' +
                    ' width="' + credit.w + '" height="' + credit.h + '" loading="lazy">' +
            '</a>' +
        '</div>' +
        '<div class="jj-meta">' +
            '<span class="life-note">' + data.disciplines + '</span>' +
            '<a class="jj-gym-link" href="' + data.coach.href + '" target="_blank" rel="noopener">' +
                data.coach.name + ' <span aria-hidden="true">&#8599;</span></a>' +
        '</div>' +
    '</div>';
}
