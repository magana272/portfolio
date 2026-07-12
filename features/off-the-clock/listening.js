// Listening & Watching band — renders the #listening section body from
// LISTENING data (content/listening.js) as two ranked columns. An artist column
// (kind: 'thumb') shows a square cover beside each name; a film column
// (kind: 'poster') shows a poster and a year. Link labels hold their own
// entities, so they are interpolated raw.
function row(item, kind) {
    return kind === 'poster'
        ? '<li><img class="lw-poster" src="' + item.img + '" alt="" loading="lazy">' +
              '<span class="lw-name">' + item.name + '</span>' +
              '<span class="lw-year">' + item.year + '</span></li>'
        : '<li><img class="lw-thumb" src="' + item.img + '" alt="" loading="lazy">' +
              '<span class="lw-name">' + item.name + '</span></li>';
}

function column(col) {
    return '<div class="lw-col">' +
        '<div class="lw-col-head">' +
            '<span class="lw-label">' + col.label + '</span>' +
            '<a class="lw-link" href="' + col.link.href + '" target="_blank" rel="noopener">' + col.link.label + '</a>' +
        '</div>' +
        '<ol class="lw-list lw-list--img">' +
            col.items.map(function (item) { return row(item, col.kind); }).join('') +
        '</ol>' +
    '</div>';
}

export function renderListening(columns) {
    return '<div class="wrap">' +
        '<div class="section-head">' +
            '<h2 class="kicker" id="lw-heading">Listening &amp; Watching</h2>' +
        '</div>' +
        '<div class="lw-grid">' +
            columns.map(column).join('') +
        '</div>' +
    '</div>';
}
