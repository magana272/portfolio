class Experience {
    constructor(title, company, start, end, location, bullets, takeaway) {
        this.title = title;
        this.company = company;
        this.start = start;
        this.end = end;
        this.location = location;
        this.bullets = bullets;
        this.takeaway = takeaway || '';
    }

    render() {
        var div = document.createElement('div');
        div.className = 'job card collapsed';

        var takeawayHtml = this.takeaway
            ? '<p class="takeaway">' + this.takeaway + '</p>'
            : '';

        div.innerHTML =
            '<div class="card-toggle">' +
                '<div class="job-header">' +
                    '<span class="job-title">' + this.title + '</span> ' +
                    '<span class="job-company">&mdash; ' + this.company + '</span><br>' +
                    '<span class="job-meta">' + this.start + ' &ndash; ' + this.end + ' &middot; ' + this.location + '</span>' +
                '</div>' +
                '<span class="chevron" aria-hidden="true"></span>' +
            '</div>' +
            '<div class="card-body">' +
                takeawayHtml +
                '<ul>' +
                    this.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') +
                '</ul>' +
            '</div>';

        var toggle = div.querySelector('.card-toggle');
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('aria-expanded', 'false');

        function toggleCard() {
            var collapsed = div.classList.toggle('collapsed');
            toggle.setAttribute('aria-expanded', String(!collapsed));
        }

        toggle.addEventListener('click', toggleCard);
        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard();
            }
        });

        return div;
    }
}
