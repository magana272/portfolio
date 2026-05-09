class Project {
    constructor(name, category, lang, tech, bullets, links) {
        this.name = name;
        this.category = category;
        this.lang = lang;
        this.tech = tech;
        this.bullets = bullets;
        this.links = links || [];
    }

    render() {
        var div = document.createElement('div');
        div.className = 'project';
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

        div.innerHTML =
            '<div class="project-header">' +
                '<span class="project-name">' + this.name + '</span><br>' +
                '<span class="project-tech">' + this.tech + '</span>' +
            '</div>' +
            '<ul>' +
                this.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') +
            '</ul>' +
            linksHtml;

        return div;
    }
}
