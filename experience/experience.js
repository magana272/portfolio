class Experience {
    constructor(title, company, start, end, location, bullets) {
        this.title = title;
        this.company = company;
        this.start = start;
        this.end = end;
        this.location = location;
        this.bullets = bullets;
    }

    render() {
        var div = document.createElement('div');
        div.className = 'job';

        div.innerHTML =
            '<div class="job-header">' +
                '<span class="job-title">' + this.title + '</span> ' +
                '<span class="job-company">&mdash; ' + this.company + '</span><br>' +
                '<span class="job-meta">' + this.start + ' &ndash; ' + this.end + ' &middot; ' + this.location + '</span>' +
            '</div>' +
            '<ul>' +
                this.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') +
            '</ul>';

        return div;
    }
}
