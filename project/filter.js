(function () {
    var state = { category: 'all', lang: 'all' };
    var buttons = document.querySelectorAll('.filter-btn');
    var projects = document.querySelectorAll('#projects .project');
    var noResults = document.getElementById('no-results');
    var langButtons = document.querySelectorAll('#lang-filters .filter-btn');

    var originalLabels = {};
    buttons.forEach(function (btn) {
        originalLabels[btn.dataset.filter + '-' + btn.dataset.value] = btn.textContent;
    });

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

    function updateCounts() {
        var categoryCounts = {};
        var langCounts = { all: 0 };

        projects.forEach(function (p) {
            var cat = p.dataset.category;
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

            if (state.category === 'all' || p.dataset.category === state.category) {
                var lang = p.dataset.lang;
                langCounts[lang] = (langCounts[lang] || 0) + 1;
                langCounts.all++;
            }
        });

        buttons.forEach(function (btn) {
            var key = btn.dataset.filter + '-' + btn.dataset.value;
            var label = originalLabels[key];
            var count;
            if (btn.dataset.filter === 'category') {
                count = categoryCounts[btn.dataset.value] || 0;
            } else {
                count = langCounts[btn.dataset.value] || 0;
            }
            btn.textContent = label + ' (' + count + ')';
        });
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

            if (group === 'category' && btn.classList.contains('active')) {
                state.category = 'all';
                btn.classList.remove('active');
            } else {
                state[group] = btn.dataset.value;
                document.querySelectorAll('.filter-btn[data-filter="' + group + '"]').forEach(function (b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
            }

            if (group === 'category') {
                updateLangButtons();
            }
            updateCounts();
            filterProjects();
        });
    });

    updateCounts();
})();
