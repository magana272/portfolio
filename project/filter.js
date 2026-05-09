(function () {
    var state = { category: 'all', lang: 'all' };
    var buttons = document.querySelectorAll('.filter-btn');
    var projects = document.querySelectorAll('#projects .project');
    var noResults = document.getElementById('no-results');
    var langButtons = document.querySelectorAll('#lang-filters .filter-btn');

    function filterProjects() {
        var visible = 0;
        projects.forEach(function (p) {
            var catMatch = state.category === 'all' || p.dataset.category === state.category;
            var langMatch = state.lang === 'all' || p.dataset.lang === state.lang;
            var show = catMatch && langMatch;
            p.hidden = !show;
            if (show) visible++;
        });
        noResults.hidden = visible > 0;
    }

    function updateLangButtons() {
        var availableLangs = new Set();
        projects.forEach(function (p) {
            if (state.category === 'all' || p.dataset.category === state.category) {
                availableLangs.add(p.dataset.lang);
            }
        });

        langButtons.forEach(function (btn) {
            if (btn.dataset.value === 'all') return;
            btn.hidden = !availableLangs.has(btn.dataset.value);
        });

        // Reset lang to "all" if current selection is no longer available
        if (state.lang !== 'all' && !availableLangs.has(state.lang)) {
            state.lang = 'all';
            langButtons.forEach(function (b) {
                b.classList.toggle('active', b.dataset.value === 'all');
            });
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var group = btn.dataset.filter;
            state[group] = btn.dataset.value;

            document.querySelectorAll('.filter-btn[data-filter="' + group + '"]').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            if (group === 'category') {
                updateLangButtons();
            }
            filterProjects();
        });
    });
})();
