// Education band — renders the #education section body from EDUCATION data
// (content/education.js). Degree entries (each with course lines, plain or
// grouped by category) over one publication. The data strings hold their own
// HTML entities and inline tags, so they are interpolated raw, mirroring how
// Project/Experience render their copy.

function courseLine(c) {
    // A plain string is one course list; { cat, courses } prefixes it with a
    // category label (the Berkeley entry groups CS vs MCB).
    return typeof c === 'string'
        ? '<span class="edu-courses">' + c + '</span>'
        : '<span class="edu-courses"><span class="edu-courses-cat">' + c.cat + '</span> ' + c.courses + '</span>';
}

function degreeEntry(d) {
    return '<div class="edu-entry">' +
        '<h3 class="edu-degree">' + d.degree + '</h3> ' +
        '<span class="edu-detail">' + d.detail + '</span><br>' +
        d.courses.map(courseLine).join('') +
    '</div>';
}

export function renderEducation(data) {
    var pub = data.publication;
    return '<div class="wrap">' +
        '<div class="section-head">' +
            '<h2 class="kicker" id="education-heading">Education</h2>' +
        '</div>' +
        data.degrees.map(degreeEntry).join('') +
        '<p class="edu-pub-label">Publication</p>' +
        '<h3 class="pub-title">' + pub.title + '</h3>' +
        '<p class="pub-authors">' + pub.authors + '</p>' +
        '<p class="pub-detail">' + pub.detail + '</p>' +
    '</div>';
}
