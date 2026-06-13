class Project {
    constructor(name, category, lang, tech, bullets, links, description, takeaway, image) {
        this.name = name;
        this.category = category;
        this.lang = lang;
        this.tech = tech;
        this.bullets = bullets;
        this.links = links || [];
        this.description = description || '';
        this.takeaway = takeaway || '';
        this.image = image || '';
    }

    render() {
        var div = document.createElement('div');
        div.className = 'project card collapsed';
        div.dataset.category = this.category;
        div.dataset.lang = this.lang;

        var linksHtml = '';
        if (this.links.length) {
            linksHtml = '<div class="project-links">' +
                this.links.map(function (l) {
                    return '<a href="' + l.url + '">' + l.label + '</a>';
                }).join('<span class="sep">/</span>') +
                '</div>';
        }

        var descHtml = this.description
            ? '<span class="project-desc">' + this.description + '</span>'
            : '';

        var takeawayHtml = this.takeaway
            ? '<p class="takeaway">' + this.takeaway + '</p>'
            : '';

        var imageHtml = this.image
            ? '<div class="card-image"><img src="' + this.image + '" alt="' + this.name + '" loading="lazy"></div>'
            : '';

        div.innerHTML =
            '<div class="card-toggle">' +
                '<div class="project-header">' +
                    '<span class="project-name">' + this.name + '</span>' +
                    descHtml +
                    '<span class="project-tech">' + this.tech + '</span>' +
                    linksHtml +
                '</div>' +
                '<span class="chevron" aria-hidden="true"></span>' +
            '</div>' +
            '<div class="card-body">' +
                takeawayHtml +
                imageHtml +
                '<ul>' +
                    this.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') +
                '</ul>' +
            '</div>';

        var toggle = div.querySelector('.card-toggle');
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('aria-expanded', 'false');

        var self = this;
        function toggleCard() {
            var collapsed = div.classList.toggle('collapsed');
            toggle.setAttribute('aria-expanded', String(!collapsed));
        }

        toggle.addEventListener('click', function (e) {
            if (e.target.closest('a')) return;
            toggleCard();
        });
        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard();
            }
        });

        return div;
    }
}
