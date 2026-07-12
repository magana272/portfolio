// Skills band — renders the #skills section body from SKILLS data
// (content/skills.js) as a label/value grid. A row may carry a small italic
// `note` that trails its label (the Laboratory aside). Values hold their own
// HTML entities, so they are interpolated raw.
export function renderSkills(rows) {
    return '<div class="wrap">' +
        '<div class="section-head">' +
            '<h2 class="kicker" id="skills-heading">Technical Skills</h2>' +
        '</div>' +
        '<div class="skills-grid">' +
            rows.map(function (r) {
                var label = r.note
                    ? r.label + ' <em class="skill-aside">' + r.note + '</em>'
                    : r.label;
                return '<span class="skill-label">' + label + '</span>' +
                       '<span class="skill-value">' + r.value + '</span>';
            }).join('') +
        '</div>' +
    '</div>';
}
